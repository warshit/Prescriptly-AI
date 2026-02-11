import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Loader2, Mic } from 'lucide-react';
import { Button } from './Button';
import { GoogleGenAI, Chat, Type, FunctionDeclaration } from "@google/genai";
import { MEDICINES } from '../data/medicines';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNavigate, useLocation } from 'react-router-dom';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
}

export const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi, I’m Prescriptly AI. How can I help you today?", sender: 'bot' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Voice Input State
  const [isListening, setIsListening] = useState(false);
  const [speechError, setSpeechError] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatSessionRef = useRef<Chat | null>(null);
  const recognitionRef = useRef<any>(null);

  // Auth & Cart Context
  const { currentUser } = useAuth();
  const { addToCart, clearCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen, isLoading]);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false; // Stop after one sentence/command
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'en-IN'; // Set language to English (India)

            recognitionRef.current.onstart = () => {
                setIsListening(true);
                setSpeechError(null);
            };

            recognitionRef.current.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                if (transcript) {
                    setInput(transcript); // Visual feedback of what was heard
                    handleSend(transcript); // Auto-send as per requirements
                }
            };

            recognitionRef.current.onerror = (event: any) => {
                setIsListening(false);
                console.warn("Speech recognition error:", event.error);
                
                if (event.error === 'not-allowed') {
                    setSpeechError("Microphone access is required for voice input.");
                } else if (event.error === 'no-speech') {
                    setSpeechError("I couldn't hear that clearly. Please try again.");
                } else {
                    setSpeechError("Voice input failed. Please try again.");
                }
                
                // Clear error message after 3 seconds
                setTimeout(() => setSpeechError(null), 3000);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        }
    }
  }, []);

  // Toggle Microphone
  const toggleListening = () => {
    if (!currentUser) {
        navigate('/login', { state: { from: location, message: "Please log in to use voice commands" } });
        return;
    }

    if (!recognitionRef.current) {
        setSpeechError("Speech recognition is not supported in this browser.");
        setTimeout(() => setSpeechError(null), 3000);
        return;
    }

    if (isListening) {
        recognitionRef.current.stop();
    } else {
        try {
            recognitionRef.current.start();
        } catch (err) {
            console.error("Failed to start speech recognition:", err);
            recognitionRef.current.stop(); 
        }
    }
  };

  const handleSend = async (textOverride?: string) => {
    // Auth Check
    if (!currentUser) {
        navigate('/login', { state: { from: location, message: "Please log in to use the AI Agent" } });
        return;
    }

    const textToSend = typeof textOverride === 'string' ? textOverride : input;
    if (!textToSend.trim()) return;

    const userMessage: Message = { id: Date.now(), text: textToSend, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        
        if (!chatSessionRef.current) {
            // Build detailed inventory for AI
            const inventory = MEDICINES.map(m => 
                `- ${m.name} (${m.category}, ₹${m.price}, ${m.requiresPrescription ? 'Rx-Only' : 'OTC'}, ${m.inStock ? 'In Stock' : 'Out of Stock'})`
            ).join('\n');

            // Define the addToCart tool
            const addToCartTool: FunctionDeclaration = {
                name: "addToCart",
                description: "Add a medicine to the user's shopping cart. Execute this ONLY when the user explicitly asks to add, buy, or purchase an item. Do not use for general info.",
                parameters: {
                    type: Type.OBJECT,
                    properties: {
                        medicineName: {
                            type: Type.STRING,
                            description: "The exact name of the medicine from the inventory list."
                        },
                        quantity: {
                            type: Type.NUMBER,
                            description: "The quantity to add. Default is 1."
                        }
                    },
                    required: ["medicineName"]
                }
            };

            // Define the clearCart tool
            const clearCartTool: FunctionDeclaration = {
                name: "clearCart",
                description: "Clears all items from the shopping cart. Execute this ONLY after the user explicitly confirms they want to empty or clear their cart.",
                parameters: {
                    type: Type.OBJECT,
                    properties: {},
                }
            };

            const systemInstruction = `You are Prescriptly AI, a professional pharmacy assistant.
            You help users find medicines from our inventory and can add them to their cart.

            INVENTORY:
            ${inventory}

            *** RULES ***
            1. Use short, clear paragraphs.
            2. If the user wants to buy something, call the 'addToCart' tool.
            3. ONLY suggest medicines from the INVENTORY.
            4. If a user describes symptoms, suggest relevant OTC medicines from the inventory, but advise consulting a doctor.
            5. If the user asks for a medicine not in inventory, apologize and say it's unavailable.
            6. **CLEAR CART RULE**: If the user asks to clear, empty, or remove all items from the cart, you MUST ask for confirmation first (e.g., "Are you sure you want to clear your cart?"). ONLY call the 'clearCart' tool if the user explicitly confirms (yes, sure, do it).

            *** SAFETY ***
            - For serious symptoms (chest pain, breathing trouble), tell them to seek emergency help immediately.
            `;

            chatSessionRef.current = ai.chats.create({
                model: 'gemini-3-flash-preview',
                config: { 
                    systemInstruction,
                    tools: [{ functionDeclarations: [addToCartTool, clearCartTool] }]
                }
            });
        }

        // 1. Send User Message
        let result = await chatSessionRef.current.sendMessage({ message: textToSend });
        
        // 2. Handle Function Calls (Loop to handle potential tool usage)
        while (result.functionCalls && result.functionCalls.length > 0) {
            const functionResponses = [];
            
            for (const call of result.functionCalls) {
                if (call.name === 'addToCart') {
                    const { medicineName, quantity } = call.args as any;
                    const qty = quantity || 1;
                    
                    // Logic to find medicine in real inventory
                    const med = MEDICINES.find(m => m.name.toLowerCase() === medicineName.toLowerCase());
                    
                    if (med) {
                        if (med.inStock !== false) {
                            // EXECUTE REAL ACTION
                            addToCart(med, qty);
                            
                            functionResponses.push({
                                functionResponse: {
                                    name: "addToCart",
                                    response: { result: `Success: Added ${qty} x ${med.name} to cart. Total Price: ₹${med.price * qty}` },
                                    id: call.id
                                }
                            });
                        } else {
                            functionResponses.push({
                                functionResponse: {
                                    name: "addToCart",
                                    response: { result: `Error: ${med.name} is currently out of stock.` },
                                    id: call.id
                                }
                            });
                        }
                    } else {
                        functionResponses.push({
                            functionResponse: {
                                name: "addToCart",
                                response: { result: `Error: Could not find medicine '${medicineName}' in the inventory system.` },
                                id: call.id
                            }
                        });
                    }
                } else if (call.name === 'clearCart') {
                    // EXECUTE REAL ACTION
                    clearCart();
                    
                    functionResponses.push({
                        functionResponse: {
                            name: "clearCart",
                            response: { result: "Success: The cart has been cleared." },
                            id: call.id
                        }
                    });
                }
            }
            
            // Send tool outputs back to model to get final natural language response
            if (functionResponses.length > 0) {
                result = await chatSessionRef.current.sendMessage({ message: functionResponses });
            } else {
                break;
            }
        }

        const botText = result.text;
        setMessages(prev => [...prev, { id: Date.now() + 1, text: botText, sender: 'bot' }]);

    } catch (error) {
        console.error("AI Error:", error);
        setMessages(prev => [...prev, { id: Date.now() + 1, text: "I'm having trouble connecting to the server. Please try again later.", sender: 'bot' }]);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <div className="fixed bottom-6 right-6 z-40 print:hidden">
        <Button 
          onClick={() => setIsOpen(!isOpen)}
          className={`rounded-full w-14 h-14 shadow-xl flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-slate-900 rotate-90' : 'bg-medical-600 hover:scale-105'}`}
        >
          {isOpen ? <X className="h-6 w-6 text-white" /> : <MessageCircle className="h-7 w-7 text-white" />}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-40 w-[90vw] md:w-[400px] h-[500px] max-h-[70vh] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-medical-600 p-4 flex items-center gap-3">
            <div className="bg-white/20 p-2 rounded-full">
               <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
               <h3 className="font-bold text-white">Prescriptly AI</h3>
               <p className="text-medical-100 text-xs flex items-center gap-1">
                 <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                 Online
               </p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg) => (
               <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                     msg.sender === 'user' 
                     ? 'bg-medical-600 text-white rounded-br-none' 
                     : 'bg-white text-slate-700 border border-slate-200 rounded-bl-none shadow-sm'
                  }`}>
                     {msg.text}
                  </div>
               </div>
            ))}
            {isLoading && (
               <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-slate-200 shadow-sm flex items-center gap-2">
                     <Loader2 className="h-4 w-4 text-medical-600 animate-spin" />
                     <span className="text-xs text-slate-400">Thinking...</span>
                  </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-100 relative">
             {/* Speech Error Feedback Toast */}
             {speechError && (
                 <div className="absolute top-0 left-0 right-0 -mt-12 px-4 flex justify-center pointer-events-none">
                    <div className="bg-slate-900/90 backdrop-blur text-white text-xs py-1.5 px-3 rounded-full shadow-lg flex items-center gap-2 animate-fade-in-up">
                        <span>{speechError}</span>
                    </div>
                 </div>
             )}

             <div className="flex items-center gap-2">
                <div className={`flex-1 flex items-center gap-2 bg-slate-50 border transition-all duration-200 rounded-xl px-3 py-2 ${isListening ? 'border-red-400 ring-2 ring-red-500/10' : 'border-slate-200 focus-within:border-medical-500 focus-within:ring-2 focus-within:ring-medical-500/20'}`}>
                    <input
                        type="text"
                        placeholder={isListening ? "Listening..." : (currentUser ? "Ask anything..." : "Log in to chat...")}
                        className="flex-1 bg-transparent border-none focus:outline-none text-sm placeholder:text-slate-400"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        disabled={isLoading || isListening}
                    />
                    
                    {/* Mic Button */}
                    <button 
                        onClick={toggleListening}
                        className={`p-1.5 rounded-lg transition-all duration-200 ${
                            isListening 
                            ? 'bg-red-500 text-white animate-pulse shadow-md' 
                            : 'text-slate-400 hover:bg-slate-200 hover:text-slate-600'
                        }`}
                        title="Voice Input"
                        aria-label="Voice input"
                    >
                        <Mic className="h-4 w-4" />
                    </button>
                </div>

                <Button 
                    size="sm" 
                    className={`h-[42px] w-[42px] p-0 rounded-xl flex items-center justify-center ${!input.trim() && !isListening ? 'opacity-50' : ''}`}
                    onClick={() => handleSend()}
                    disabled={(!input.trim() && !isListening) || isLoading}
                >
                    <Send className="h-4 w-4" />
                </Button>
             </div>
             
             {/* Listening Visual Indicator */}
             {isListening && (
                 <div className="absolute bottom-1 left-4">
                     <span className="text-[10px] text-red-500 font-bold tracking-wide animate-pulse">● LISTENING</span>
                 </div>
             )}
          </div>
        </div>
      )}
    </>
  );
};