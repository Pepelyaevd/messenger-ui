import React, { useState } from 'react';
import { 
  Search, Menu as MenuIcon, ChevronLeft, Phone, Video, Paperclip, Send, Smile, 
  Check, CheckCheck, MessageSquare, Users, User, Plus, X, Briefcase, Bell, 
  Shield, HelpCircle, LogOut, Building2, Mail, ChevronRight, Edit,
  Settings, Moon, Globe, Server, CircleDot, FileText, Link, BellOff, UserPlus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Mock Data ---
const CHATS = [
  { id: 1, name: 'Alexey Ivanov', avatar: 'https://picsum.photos/seed/alexey/100/100', lastMessage: 'The Q3 report is ready for review.', time: '10:42 AM', unread: 2, online: true },
  { id: 2, name: 'Design Team', avatar: 'https://picsum.photos/seed/design/100/100', lastMessage: 'Maria: I updated the Figma file.', time: '09:15 AM', unread: 0, online: false, isGroup: true },
  { id: 3, name: 'Elena Smirnova', avatar: 'https://picsum.photos/seed/elena/100/100', lastMessage: 'Can we reschedule our 1:1?', time: 'Yesterday', unread: 0, online: true },
  { id: 4, name: 'Engineering Sync', avatar: 'https://picsum.photos/seed/eng/100/100', lastMessage: 'Deployment successful.', time: 'Yesterday', unread: 5, online: false, isGroup: true },
  { id: 5, name: 'David Chen', avatar: 'https://picsum.photos/seed/david/100/100', lastMessage: 'Thanks!', time: 'Tuesday', unread: 0, online: false },
  { id: 6, name: 'Sarah Jenkins', avatar: 'https://picsum.photos/seed/sarah/100/100', lastMessage: 'Please approve the new budget.', time: 'Monday', unread: 0, online: true },
];

const CONTACTS = [
  { id: 1, name: 'Alexey Ivanov', role: 'Engineering Manager', department: 'Engineering', avatar: 'https://picsum.photos/seed/alexey/100/100', online: true },
  { id: 3, name: 'Elena Smirnova', role: 'Product Manager', department: 'Product', avatar: 'https://picsum.photos/seed/elena/100/100', online: true },
  { id: 5, name: 'David Chen', role: 'Frontend Developer', department: 'Engineering', avatar: 'https://picsum.photos/seed/david/100/100', online: false },
  { id: 6, name: 'Sarah Jenkins', role: 'Finance Director', department: 'Finance', avatar: 'https://picsum.photos/seed/sarah/100/100', online: true },
  { id: 7, name: 'Michael Scott', role: 'Regional Manager', department: 'Sales', avatar: 'https://picsum.photos/seed/michael/100/100', online: true },
  { id: 8, name: 'Dwight Schrute', role: 'Assistant to the Regional Manager', department: 'Sales', avatar: 'https://picsum.photos/seed/dwight/100/100', online: false },
];

const MESSAGES = [
  { id: 1, sender: 'Alexey Ivanov', text: 'Hi, did you get a chance to look at the Q3 report?', time: '10:30 AM', isMe: false },
  { id: 2, sender: 'Me', text: 'Not yet, I was in a meeting. I will check it in 10 minutes.', time: '10:35 AM', isMe: true, status: 'read' },
  { id: 3, sender: 'Alexey Ivanov', text: 'No problem. Let me know if you need any clarifications.', time: '10:38 AM', isMe: false },
  { id: 4, sender: 'Alexey Ivanov', text: 'The Q3 report is ready for review.', time: '10:42 AM', isMe: false },
];

type Screen = 'chats' | 'contacts' | 'settings';

// --- Components ---

function ChatList({ onSelectChat, onCompose }: { onSelectChat: (id: number) => void, onCompose: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
      className="flex flex-col h-full bg-white relative"
    >
      <div className="px-6 pt-12 pb-4 flex items-center justify-between bg-white sticky top-0 z-10">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Messages</h1>
        <div className="flex items-center gap-4 text-gray-600">
          <button onClick={onCompose} className="hover:text-emerald-600 transition-colors"><Edit size={22} /></button>
        </div>
      </div>

      <div className="px-6 pb-4">
        <div className="bg-gray-100 rounded-2xl flex items-center px-4 py-2.5">
          <Search size={18} className="text-gray-400 mr-3" />
          <input type="text" placeholder="Search messages..." className="bg-transparent border-none outline-none w-full text-sm placeholder:text-gray-400" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-28 scrollbar-hide">
        {CHATS.map(chat => (
          <div key={chat.id} onClick={() => onSelectChat(chat.id)} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="relative shrink-0">
              <img src={chat.avatar} alt={chat.name} className="w-14 h-14 rounded-full object-cover" referrerPolicy="no-referrer" />
              {chat.online && <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></div>}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-medium text-gray-900 truncate">{chat.name}</h3>
                <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{chat.time}</span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500 truncate pr-2">{chat.lastMessage}</p>
                {chat.unread > 0 && (
                  <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center shrink-0">
                    {chat.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ContactsView({ onSelectContact }: { onSelectContact: (id: number) => void }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col h-full bg-white">
      <div className="px-6 pt-12 pb-4 bg-white sticky top-0 z-10">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Directory</h1>
      </div>
      <div className="px-6 pb-4">
        <div className="bg-gray-100 rounded-2xl flex items-center px-4 py-2.5">
          <Search size={18} className="text-gray-400 mr-3" />
          <input type="text" placeholder="Search employees..." className="bg-transparent border-none outline-none w-full text-sm placeholder:text-gray-400" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4 pb-28 scrollbar-hide">
        {CONTACTS.map(c => (
          <div key={c.id} onClick={() => onSelectContact(c.id)} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 cursor-pointer transition-colors">
            <div className="relative shrink-0">
              <img src={c.avatar} className="w-12 h-12 rounded-full object-cover" referrerPolicy="no-referrer" />
              {c.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full"></div>}
            </div>
            <div className="flex-1 min-w-0 border-b border-gray-50 pb-3 pt-1">
              <h3 className="font-medium text-gray-900 truncate">{c.name}</h3>
              <p className="text-xs text-gray-500 truncate mt-0.5">{c.role} • {c.department}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function SettingsView() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col h-full bg-gray-50">
      <div className="px-6 pt-12 pb-6 bg-white border-b border-gray-100">
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900 mb-6">Settings</h1>
        <div className="flex items-center gap-5">
          <div className="relative">
            <img src="https://picsum.photos/seed/me/150/150" className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-sm" referrerPolicy="no-referrer" />
            <div className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Mark Johnson</h2>
            <p className="text-sm text-emerald-600 font-medium">Senior Product Designer</p>
            <p className="text-xs text-gray-500 mt-1">Design Department</p>
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-28">
        
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">Preferences</h3>
          <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100">
            <SettingItem icon={<CircleDot size={20} className="text-emerald-500" />} label="Status" value="Online" />
            <SettingItem icon={<Moon size={20} />} label="Theme" value="System" />
            <SettingItem icon={<Globe size={20} />} label="Language" value="English" />
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">Connection</h3>
          <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100">
            <SettingItem icon={<Server size={20} />} label="Server" value="nexus.corp.local" />
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">Workspace</h3>
          <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100">
            <SettingItem icon={<Building2 size={20} />} label="Company News" />
            <SettingItem icon={<Shield size={20} />} label="IT Support" />
          </div>
        </div>

        <div>
          <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100">
            <SettingItem icon={<LogOut size={20} />} label="Log Out" color="text-red-600" hideArrow />
          </div>
        </div>

      </div>
    </motion.div>
  );
}

function ComposeView({ onClose, onSelect }: { onClose: () => void, onSelect: (id: number) => void }) {
  return (
    <motion.div 
      initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }} 
      transition={{ type: 'spring', damping: 25, stiffness: 200 }} 
      className="absolute inset-0 bg-white z-50 flex flex-col rounded-[2.5rem] overflow-hidden"
    >
      <div className="px-4 pt-12 pb-4 flex items-center justify-between border-b border-gray-100">
        <button onClick={onClose} className="p-2 -ml-2 text-gray-600 hover:text-emerald-600 transition-colors rounded-full hover:bg-gray-50">
          <X size={24} />
        </button>
        <h2 className="font-semibold text-gray-900">New Message</h2>
        <div className="w-10" /> {/* Spacer for centering */}
      </div>
      <div className="p-4">
        <div className="bg-gray-100 rounded-2xl flex items-center px-4 py-2.5">
          <Search size={18} className="text-gray-400 mr-3" />
          <input type="text" placeholder="Search contacts..." autoFocus className="bg-transparent border-none outline-none w-full text-sm placeholder:text-gray-400" />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto px-4">
        <div className="flex items-center gap-4 p-3 mt-2 rounded-2xl hover:bg-gray-50 cursor-pointer transition-colors text-emerald-600">
          <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
            <Users size={20} />
          </div>
          <div className="font-medium text-sm">Create Group Chat</div>
        </div>

        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 mt-4 px-2">Suggested</div>
        {CONTACTS.map(c => (
          <div key={c.id} onClick={() => onSelect(c.id)} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 cursor-pointer transition-colors">
            <img src={c.avatar} className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
            <div>
              <div className="font-medium text-gray-900 text-sm">{c.name}</div>
              <div className="text-xs text-gray-500 mt-0.5">{c.role}</div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function ActionButton({ icon, label, onClick }: any) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1.5 text-emerald-600">
      <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center hover:bg-emerald-100 transition-colors">
        {icon}
      </div>
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}

function ContactProfileView({ chatId, onClose }: { chatId: number, onClose: () => void }) {
  const chat = CHATS.find(c => c.id === chatId);
  const contact = CONTACTS.find(c => c.id === chatId) || chat;
  const isGroup = chat?.isGroup;
  const role = contact?.role || 'Employee';
  const dept = contact?.department || 'General';

  return (
    <motion.div 
      initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} 
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="absolute inset-0 bg-gray-50 z-50 flex flex-col rounded-[2.5rem] overflow-hidden"
    >
      <div className="px-4 pt-12 pb-4 flex items-center bg-white border-b border-gray-100 sticky top-0 z-10">
        <button onClick={onClose} className="p-2 -ml-2 text-gray-600 hover:text-emerald-600 transition-colors rounded-full hover:bg-gray-50">
          <ChevronLeft size={24} />
        </button>
        <h2 className="font-semibold text-gray-900 ml-2">{isGroup ? 'Group Info' : 'Contact Info'}</h2>
      </div>

      <div className="flex-1 overflow-y-auto pb-8">
        <div className="bg-white px-4 py-8 flex flex-col items-center border-b border-gray-100">
          <img src={contact?.avatar} className="w-24 h-24 rounded-full object-cover mb-4 shadow-sm" referrerPolicy="no-referrer" />
          <h2 className="text-xl font-semibold text-gray-900">{contact?.name}</h2>
          {!isGroup && <p className="text-sm text-gray-500 mt-1">{role} • {dept}</p>}
          {isGroup && <p className="text-sm text-gray-500 mt-1">12 Participants</p>}
          
          <div className="flex gap-6 mt-6">
            {!isGroup && <ActionButton icon={<MessageSquare size={20} />} label="Message" onClick={onClose} />}
            {!isGroup && <ActionButton icon={<Phone size={20} />} label="Call" />}
            {!isGroup && <ActionButton icon={<Video size={20} />} label="Video" />}
            {isGroup && <ActionButton icon={<UserPlus size={20} />} label="Add" />}
            <ActionButton icon={<Search size={20} />} label="Search" />
            <ActionButton icon={<BellOff size={20} />} label="Mute" />
          </div>
        </div>

        {isGroup && (
          <div className="mt-4 bg-white border-y border-gray-100">
            <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-sm font-semibold text-gray-900">Participants</h3>
              <span className="text-xs text-emerald-600 font-medium cursor-pointer">See All</span>
            </div>
            {CONTACTS.slice(0, 3).map(c => (
              <div key={c.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer transition-colors">
                <img src={c.avatar} className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
                <div className="flex-1">
                  <h4 className="text-sm font-medium text-gray-900">{c.name}</h4>
                  <p className="text-xs text-gray-500">{c.role}</p>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer transition-colors text-emerald-600">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                <UserPlus size={20} />
              </div>
              <div className="font-medium text-sm">Add Participant</div>
            </div>
          </div>
        )}

        <div className="mt-4 bg-white border-y border-gray-100 p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-semibold text-gray-900">Shared Media</h3>
            <span className="text-xs text-emerald-600 font-medium cursor-pointer">See All</span>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {[1,2,3,4].map(i => (
              <img key={i} src={`https://picsum.photos/seed/${contact?.name?.replace(/\s/g, '')}${i}/100/100`} className="w-full aspect-square rounded-lg object-cover" referrerPolicy="no-referrer" />
            ))}
          </div>
        </div>

        <div className="mt-4 bg-white border-y border-gray-100">
          <SettingItem icon={<FileText size={20} />} label="Files & Documents" value="12" />
          <SettingItem icon={<Link size={20} />} label="Shared Links" value="5" />
        </div>
      </div>
    </motion.div>
  );
}

function ChatView({ chatId, onBack }: { chatId: number, onBack: () => void }) {
  const chat = CHATS.find(c => c.id === chatId) || CONTACTS.find(c => c.id === chatId);
  const [messageText, setMessageText] = useState('');
  const [showProfile, setShowProfile] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.2 }}
      className="absolute inset-0 z-40 flex flex-col bg-gray-50 rounded-[2.5rem] overflow-hidden"
    >
      <div className="px-4 pt-12 pb-4 flex items-center justify-between bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 -ml-2 text-gray-600 hover:text-emerald-600 transition-colors rounded-full hover:bg-gray-50">
            <ChevronLeft size={24} />
          </button>
          <div 
            className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={() => setShowProfile(true)}
          >
            <div className="relative">
              <img src={chat?.avatar} alt={chat?.name} className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
              {chat?.online && <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full"></div>}
            </div>
            <div>
              <h2 className="font-medium text-gray-900 text-sm">{chat?.name}</h2>
              <p className="text-xs text-emerald-600 font-medium">{chat?.online ? 'Online' : 'Offline'}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 text-gray-600">
          <button className="p-2 hover:text-emerald-600 transition-colors rounded-full hover:bg-gray-50"><Phone size={20} /></button>
          <button className="p-2 hover:text-emerald-600 transition-colors rounded-full hover:bg-gray-50"><Video size={20} /></button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
        <div className="text-center text-xs text-gray-400 my-2 font-medium">Today</div>
        {MESSAGES.map(msg => (
          <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${msg.isMe ? 'bg-emerald-600 text-white rounded-tr-sm' : 'bg-white text-gray-900 shadow-sm rounded-tl-sm border border-gray-100'}`}>
              <p className="text-[15px] leading-relaxed">{msg.text}</p>
              <div className={`flex items-center justify-end gap-1 mt-1 ${msg.isMe ? 'text-emerald-100' : 'text-gray-400'}`}>
                <span className="text-[10px]">{msg.time}</span>
                {msg.isMe && (msg.status === 'read' ? <CheckCheck size={14} /> : <Check size={14} />)}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-white border-t border-gray-100 pb-8">
        <div className="flex items-end gap-2">
          <button className="p-3 text-gray-400 hover:text-emerald-600 transition-colors rounded-full hover:bg-gray-50 shrink-0">
            <Paperclip size={22} />
          </button>
          <div className="flex-1 bg-gray-100 rounded-3xl flex items-end px-4 py-1 min-h-[48px]">
            <input 
              type="text" value={messageText} onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type a message..." 
              className="bg-transparent border-none outline-none w-full text-[15px] py-3 placeholder:text-gray-400"
            />
            <button className="p-3 -mr-2 text-gray-400 hover:text-emerald-600 transition-colors shrink-0">
              <Smile size={22} />
            </button>
          </div>
          {messageText.trim() ? (
            <button className="p-3 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition-colors shrink-0 shadow-sm">
              <Send size={20} className="ml-0.5" />
            </button>
          ) : (
            <button className="p-3 bg-gray-100 text-gray-400 rounded-full shrink-0 transition-colors">
              <Send size={20} className="ml-0.5" />
            </button>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showProfile && <ContactProfileView chatId={chatId} onClose={() => setShowProfile(false)} />}
      </AnimatePresence>
    </motion.div>
  );
}

// --- Helper Components ---

function SettingItem({ icon, label, value, color = "text-gray-700", hideArrow = false }: any) {
  return (
    <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-colors">
      <div className={`flex items-center gap-3 ${color}`}>
        {icon}
        <span className="font-medium text-sm">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        {value && <span className="text-sm text-gray-500">{value}</span>}
        {!hideArrow && <ChevronRight size={18} className="text-gray-400" />}
      </div>
    </div>
  );
}

function BottomNav({ current, onChange }: { current: Screen, onChange: (s: Screen) => void }) {
  return (
    <div className="absolute bottom-0 inset-x-0 bg-white/90 backdrop-blur-md border-t border-gray-100 pb-6 pt-3 px-10 flex justify-between z-30">
      <NavItem icon={<MessageSquare size={24} />} label="Chats" isActive={current === 'chats'} onClick={() => onChange('chats')} />
      <NavItem icon={<Users size={24} />} label="Contacts" isActive={current === 'contacts'} onClick={() => onChange('contacts')} />
      <NavItem icon={<Settings size={24} />} label="Settings" isActive={current === 'settings'} onClick={() => onChange('settings')} />
    </div>
  );
}

function NavItem({ icon, label, isActive, onClick }: any) {
  return (
    <button onClick={onClick} className={`flex flex-col items-center gap-1 min-w-[60px] transition-colors ${isActive ? 'text-emerald-600' : 'text-gray-400 hover:text-gray-600'}`}>
      <div className={`p-1.5 rounded-xl transition-colors ${isActive ? 'bg-emerald-50' : 'bg-transparent'}`}>
        {icon}
      </div>
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}

// --- Main App ---

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('chats');
  const [activeChat, setActiveChat] = useState<number | null>(null);
  const [isComposing, setIsComposing] = useState(false);

  const handleSelectChat = (id: number) => {
    setActiveChat(id);
    setIsComposing(false);
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center p-4 font-sans text-gray-900">
      <div className="w-full max-w-md h-[850px] max-h-[90vh] bg-white rounded-[2.5rem] shadow-2xl overflow-hidden relative border-[8px] border-gray-900 flex flex-col">
        {/* iOS Notch */}
        <div className="absolute top-0 inset-x-0 h-7 flex justify-center z-50 pointer-events-none">
          <div className="w-32 h-6 bg-gray-900 rounded-b-3xl"></div>
        </div>
        
        <div className="flex-1 relative overflow-hidden flex flex-col">
          <AnimatePresence mode="wait">
            <motion.div key={currentScreen} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="absolute inset-0">
              {currentScreen === 'chats' && <ChatList onSelectChat={handleSelectChat} onCompose={() => setIsComposing(true)} />}
              {currentScreen === 'contacts' && <ContactsView onSelectContact={handleSelectChat} />}
              {currentScreen === 'settings' && <SettingsView />}
            </motion.div>
          </AnimatePresence>

          <BottomNav current={currentScreen} onChange={setCurrentScreen} />

          <AnimatePresence>
            {activeChat !== null && (
              <ChatView key="chat" chatId={activeChat} onBack={() => setActiveChat(null)} />
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isComposing && (
              <ComposeView onClose={() => setIsComposing(false)} onSelect={handleSelectChat} />
            )}
          </AnimatePresence>
        </div>
        
        {/* iOS Home Indicator */}
        <div className="absolute bottom-2 inset-x-0 flex justify-center z-50 pointer-events-none">
          <div className="w-32 h-1 bg-gray-300 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
