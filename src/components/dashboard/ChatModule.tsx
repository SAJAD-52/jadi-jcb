import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useDatabase } from '../../context/DatabaseContext';
import { useAuth } from '../../context/AuthContext';
import { Send, Phone, MessageSquare, User, Check, CheckCheck, Clock } from 'lucide-react';

interface ChatModuleProps {
  activeConversationId?: string;
}

export const ChatModule: React.FC<ChatModuleProps> = ({ activeConversationId }) => {
  const { t, isRtl } = useLanguage();
  const { user } = useAuth();
  const { conversations, messages, sendMessage } = useDatabase();

  const [selectedConvId, setSelectedConvId] = useState<string>(() => {
    return activeConversationId || (conversations.length > 0 ? conversations[0].id : '');
  });

  const [inputText, setInputText] = useState('');

  const currentConv = conversations.find((c) => c.id === selectedConvId);
  const convMessages = messages.filter((m) => m.conversationId === selectedConvId);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !selectedConvId || !user) return;

    sendMessage(selectedConvId, inputText.trim(), user.id, user.fullName);
    setInputText('');
  };

  const handleQuickResponse = (text: string) => {
    if (!selectedConvId || !user) return;
    sendMessage(selectedConvId, text, user.id, user.fullName);
  };

  const handleWhatsAppRedirect = () => {
    if (!currentConv) return;
    const recipientName = currentConv.participantOneId === user?.id ? currentConv.participantTwoName : currentConv.participantOneName;
    const text = encodeURIComponent(
      `السلام عليكم، أتواصل معك من منصة JADIJCB بخصوص استفسار كراء آلة: ${currentConv.machineTitle || ''}`
    );
    window.open(`https://wa.me/212661482910?text=${text}`, '_blank');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden min-h-[550px]">
      
      {/* Conversations List (4 cols) */}
      <div className="md:col-span-4 border-e border-slate-800 p-4 space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-amber-500" />
            <span>{t('tabMessages')}</span>
          </h3>
          <span className="text-[11px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-400 font-bold tabular-nums">
            {conversations.length}
          </span>
        </div>

        <div className="space-y-2">
          {conversations.map((conv) => {
            const isSelected = conv.id === selectedConvId;
            const otherParticipant =
              conv.participantOneId === user?.id
                ? conv.participantTwoName
                : conv.participantOneName;

            return (
              <button
                key={conv.id}
                onClick={() => setSelectedConvId(conv.id)}
                className={`w-full text-start rtl:text-right p-3 rounded-2xl transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-500/40 text-white'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-white truncate">
                    {otherParticipant}
                  </span>
                  <span className="text-[10px] text-slate-500">{conv.lastMessageAt}</span>
                </div>
                {conv.machineTitle && (
                  <div className="text-[10px] text-amber-400/90 font-medium truncate mb-1">
                    {conv.machineTitle}
                  </div>
                )}
                <div className="text-xs text-slate-400 truncate">
                  {conv.lastMessage}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Chat Conversation (8 cols) */}
      <div className="md:col-span-8 flex flex-col justify-between p-4 sm:p-6 bg-slate-950/40">
        {currentConv ? (
          <>
            {/* Chat Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold text-sm">
                  <User className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">
                    {currentConv.participantOneId === user?.id
                      ? currentConv.participantTwoName
                      : currentConv.participantOneName}
                  </h4>
                  {currentConv.machineTitle && (
                    <p className="text-xs text-amber-400">
                      {isRtl ? 'بخصوص آلة:' : 'À propos de :'} {currentConv.machineTitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Transition to WhatsApp direct button */}
              <button
                onClick={handleWhatsAppRedirect}
                className="py-1.5 px-3 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white border border-emerald-500/30 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{t('openWhatsAppDirect')}</span>
                <span className="sm:hidden">WhatsApp</span>
              </button>
            </div>

            {/* Messages Thread */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3 max-h-[350px]">
              {convMessages.map((msg) => {
                const isMine = msg.senderId === user?.id;

                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs sm:text-sm leading-relaxed ${
                        isMine
                          ? 'bg-amber-500 text-slate-950 font-medium rounded-ee-none'
                          : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-es-none'
                      }`}
                    >
                      <p>{msg.content}</p>
                    </div>
                    <span className="text-[10px] text-slate-500 mt-1 px-1">
                      {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Moroccan Construction Quick Reply Shortcuts */}
            <div className="pt-2 border-t border-slate-800/80 mb-3">
              <span className="text-[10px] text-slate-500 block mb-1">
                {t('quickResponses')}
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                <button
                  type="button"
                  onClick={() => handleQuickResponse(t('quickResp1'))}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-[11px] whitespace-nowrap cursor-pointer"
                >
                  {isRtl ? 'الآلة متوفرة مع السائق' : 'Disponible avec chauffeur'}
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickResponse(t('quickResp2'))}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-[11px] whitespace-nowrap cursor-pointer"
                >
                  {isRtl ? '1900 درهم باليوم شامل السائق' : '1900 DH / jour avec chauffeur'}
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickResponse(t('quickResp3'))}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 text-[11px] whitespace-nowrap cursor-pointer"
                >
                  {isRtl ? 'المعاينة غداً بالورش' : 'Visite sur chantier'}
                </button>
              </div>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="flex items-center gap-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={t('chatPlaceholder')}
                className="flex-1 py-2.5 px-4 bg-slate-900 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                className="p-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4 rtl:rotate-180" />
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-slate-500 text-xs">
            <MessageSquare className="w-8 h-8 text-slate-700 mb-2" />
            <p>{isRtl ? 'اختر محادثة لعرض التفاصيل' : 'Sélectionnez une conversation'}</p>
          </div>
        )}
      </div>

    </div>
  );
};
