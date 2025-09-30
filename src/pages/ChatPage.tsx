import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DashboardLayout } from '@/components/layout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Send, Paperclip, Smile, Phone } from 'lucide-react';
import { Conversation, ChatMessage, ChatInfo } from '@/types/chat.types';
import { cn } from '@/lib/utils';

export const ChatPage: React.FC = () => {
  const { t } = useTranslation();
  const [selectedConversation, setSelectedConversation] = useState<string>('1');
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const conversations: Conversation[] = [
    {
      id: '1',
      phoneNumber: '+573312812329',
      lastMessage: 'Hola, 22 horas',
      timestamp: '2:45 PM',
      unread: true,
      status: 'Completado'
    },
    {
      id: '2',
      phoneNumber: '+573201512142',
      lastMessage: 'Completado, Countdown, Llegó!',
      timestamp: '11:22 AM',
      unread: false,
      badges: ['Completado']
    },
    {
      id: '3',
      phoneNumber: '+573323230235',
      lastMessage: '',
      timestamp: '',
      unread: false
    },
    {
      id: '4',
      phoneNumber: '+5732632839',
      lastMessage: '',
      timestamp: '2:45 PM',
      unread: false,
      badges: ['Completado', 'Redactar']
    }
  ];

  const messages: ChatMessage[] = [
    {
      id: '1',
      content: 'Hola',
      sender: 'user',
      timestamp: new Date('2024-01-15T12:45:00')
    },
    {
      id: '2',
      content: 'Bien',
      sender: 'bot',
      timestamp: new Date('2024-01-15T12:46:00')
    },
    {
      id: '3',
      content: '8 4059',
      sender: 'bot',
      timestamp: new Date('2024-01-15T14:56:00')
    }
  ];

  const chatInfo: ChatInfo[] = [
    { key: 'mínimo', value: 'Qué más' },
    { key: 'Lorem', value: 'Bien' }
  ];

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="flex h-[calc(100vh-8rem)] gap-4">
        {/* Sidebar - Lista de conversaciones */}
        <div className="w-80 border border-border rounded-lg bg-card flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={t('chat.search_conversations')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          
          <ScrollArea className="flex-1">
            <div className="p-2">
              {filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv.id)}
                  className={cn(
                    "w-full p-3 rounded-lg text-left transition-colors hover:bg-accent",
                    selectedConversation === conv.id && "bg-primary/10 hover:bg-primary/15"
                  )}
                >
                  <div className="flex items-start justify-between mb-1">
                    <span className="font-medium text-sm text-foreground">
                      {conv.phoneNumber}
                    </span>
                    {conv.timestamp && (
                      <span className="text-xs text-muted-foreground">
                        {conv.timestamp}
                      </span>
                    )}
                  </div>
                  
                  {conv.lastMessage && (
                    <p className="text-xs text-muted-foreground mb-2">
                      {conv.lastMessage}
                    </p>
                  )}
                  
                  {conv.badges && conv.badges.length > 0 && (
                    <div className="flex gap-1 flex-wrap">
                      {conv.badges.map((badge, idx) => (
                        <Badge 
                          key={idx} 
                          variant={badge === 'Completado' ? 'default' : 'outline'}
                          className="text-xs"
                        >
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  )}
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Área de chat central */}
        <div className="flex-1 border border-border rounded-lg bg-card flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <span className="font-semibold text-foreground">
                +57 2 5 2 5 2 28
              </span>
            </div>
          </div>

          {/* Mensajes */}
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.sender === 'user' ? "justify-end" : "justify-start"
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[70%] rounded-lg p-3",
                      message.sender === 'user'
                        ? "bg-primary text-primary-foreground"
                        : "bg-accent text-accent-foreground"
                    )}
                  >
                    <p className="text-sm">{message.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString('es-ES', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Input de mensaje */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Paperclip className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Smile className="h-5 w-5" />
              </Button>
              <Input
                placeholder={t('chat.type_message')}
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} size="icon">
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Sidebar derecho - Info y acciones */}
        <div className="w-80 space-y-4">
          {/* Botones de acción */}
          <div className="border border-border rounded-lg bg-card p-4">
            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">
                <span className="relative">
                  {t('chat.assign')}
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
                </span>
              </Button>
              <Button variant="outline" className="flex-1">
                <span className="relative">
                  {t('chat.transfer')}
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </span>
              </Button>
            </div>
          </div>

          {/* Información del chat */}
          <div className="border border-border rounded-lg bg-card p-4">
            <h3 className="font-semibold text-sm mb-4 text-foreground">
              {t('chat.info')}
            </h3>
            <div className="space-y-3">
              {chatInfo.map((info, idx) => (
                <div key={idx} className="border border-border rounded-lg p-3">
                  <div className="text-xs text-muted-foreground mb-1">
                    {info.key}
                  </div>
                  <div className="text-sm text-foreground font-medium">
                    {info.value}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {idx === 0 ? '11:39' : '1:00'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
