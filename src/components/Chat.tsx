import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';

interface ChatProps {
  currentUser: any;
  selectedChat: any;
}

const MOCK_USERS = [
  {
    id: 2,
    name: 'Мария',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
    lastMessage: 'Привет! Как дела?',
    online: true
  },
  {
    id: 3,
    name: 'Александр',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
    lastMessage: 'Спасибо за совет!',
    online: false
  }
];

const EXTREME_WORDS = ['извращ', 'порн', 'секс втроем', 'групповой'];

export default function Chat({ currentUser, selectedChat }: ChatProps) {
  const [activeChat, setActiveChat] = useState(selectedChat);
  const [messages, setMessages] = useState<{ [key: number]: any[] }>({});
  const [messageText, setMessageText] = useState('');

  const checkExtremeContent = (text: string): boolean => {
    const lowerText = text.toLowerCase();
    return EXTREME_WORDS.some(word => lowerText.includes(word));
  };

  const handleSendMessage = () => {
    if (!messageText.trim() || !activeChat) return;

    if (checkExtremeContent(messageText)) {
      toast.error('Сообщение содержит неприемлемый контент. Чат будет удален.');
      setActiveChat(null);
      return;
    }

    const newMessage = {
      id: Date.now(),
      text: messageText,
      sender: currentUser.id,
      timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages({
      ...messages,
      [activeChat.id]: [...(messages[activeChat.id] || []), newMessage]
    });

    setMessageText('');
  };

  return (
    <div className="max-w-6xl mx-auto p-4 h-[calc(100vh-80px)]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
        <Card className="md:col-span-1 border-[#0EA5E9]/30 shadow-lg">
          <CardHeader>
            <h2 className="font-lilita text-xl">Чаты</h2>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-200px)]">
              {MOCK_USERS.map(user => (
                <div
                  key={user.id}
                  onClick={() => setActiveChat(user)}
                  className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    activeChat?.id === user.id ? 'bg-[#D3E4FD]' : ''
                  }`}
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback>{user.name[0]}</AvatarFallback>
                    </Avatar>
                    {user.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{user.name}</p>
                    <p className="text-sm text-gray-500 truncate">{user.lastMessage}</p>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        <Card className="md:col-span-2 border-[#0EA5E9]/30 shadow-lg flex flex-col">
          {activeChat ? (
            <>
              <CardHeader className="border-b">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={activeChat.avatar} />
                    <AvatarFallback>{activeChat.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{activeChat.name}</p>
                    <p className="text-sm text-gray-500">
                      {activeChat.online ? 'В сети' : 'Не в сети'}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {(messages[activeChat.id] || []).map(msg => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === currentUser.id ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                          msg.sender === currentUser.id
                            ? 'bg-[#0EA5E9] text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            msg.sender === currentUser.id ? 'text-white/70' : 'text-gray-500'
                          }`}
                        >
                          {msg.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                  {messages[activeChat.id]?.length === 0 || !messages[activeChat.id] ? (
                    <div className="text-center text-gray-500 py-8">
                      <Icon name="MessageCircle" size={48} className="mx-auto mb-2 opacity-50" />
                      <p>Начните разговор!</p>
                    </div>
                  ) : null}
                </div>
              </ScrollArea>

              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                    placeholder="Напишите сообщение... (Enter для отправки, Shift+Enter для новой строки)"
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    className="font-lilita bg-[#0EA5E9] hover:bg-[#0EA5E9]/90"
                  >
                    <Icon name="Send" size={20} />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  💡 Помните: обсуждение интимных тем допустимо в меру
                </p>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <Icon name="MessageCircle" size={64} className="mx-auto mb-4 opacity-50" />
                <p className="text-lg">Выберите чат для начала общения</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
