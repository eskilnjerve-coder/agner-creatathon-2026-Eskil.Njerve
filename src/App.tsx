import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  ChefHat, 
  Utensils, 
  User as UserIcon, 
  Calendar, 
  PlusCircle, 
  Flame,
  Search,
  MapPin,
  Clock
} from 'lucide-react';
import { getStoredUser, getStoredEvents, getStoredRecipes, updateStreak } from './lib/storage';
import { UserProfile, CookingEvent, Recipe } from './types';

// Components
const Navbar = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (t: string) => void }) => (
  <nav className="fixed bottom-0 left-0 right-0 h-20 bg-emerald flex items-center justify-around z-40 border-t-2 border-coffee">
    <button onClick={() => setActiveTab('home')} className={`nav-link ${activeTab === 'home' ? 'active' : ''}`}>
      <Home size={28} />
      <span className="text-[10px] mt-1 uppercase tracking-wider">Table</span>
    </button>
    <button onClick={() => setActiveTab('planner')} className={`nav-link ${activeTab === 'planner' ? 'active' : ''}`}>
      <Calendar size={28} />
      <span className="text-[10px] mt-1 uppercase tracking-wider">Prep</span>
    </button>
    <button onClick={() => setActiveTab('cookbook')} className={`nav-link ${activeTab === 'cookbook' ? 'active' : ''}`}>
      <Utensils size={28} />
      <span className="text-[10px] mt-1 uppercase tracking-wider">Cookbook</span>
    </button>
    <button onClick={() => setActiveTab('profile')} className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}>
      <UserIcon size={28} />
      <span className="text-[10px] mt-1 uppercase tracking-wider">You</span>
    </button>
  </nav>
);

const StreakCounter = ({ streak }: { streak: number }) => (
  <motion.div 
    initial={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    className="bg-rust text-cream px-4 py-2 sketch-border flex items-center gap-2 mb-6"
  >
    <Flame className="w-5 h-5 fill-current animate-pulse" />
    <span className="font-bold text-lg">{streak}-Day Cooking Streak!</span>
  </motion.div>
);

const SectionHeader = ({ title, subtitle }: { title: string, subtitle?: string }) => (
  <div className="mb-10 mt-4 text-center lg:text-left">
    <h1 className="text-6xl md:text-7xl text-emerald mb-2 font-serif font-bold italic tracking-tighter leading-none">{title}</h1>
    {subtitle && <p className="text-coffee/60 uppercase font-sans font-black tracking-[0.2em] text-xs px-1">{subtitle}</p>}
  </div>
);

// Pages
const Dashboard = ({ user, events, recipes }: { user: UserProfile, events: CookingEvent[], recipes: Recipe[] }) => (
  <div className="pb-24 pt-8 px-6">
    <SectionHeader title="The Kitchen Table" subtitle="What's cooking on campus today?" />
    
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
      <div className="space-y-8 order-2 lg:order-1">
        <section>
          <div className="flex items-center justify-between mb-4 border-b-2 border-coffee pb-2">
            <h2 className="text-2xl uppercase tracking-tighter">Kitchen Table: Upcoming Events</h2>
            <div className="text-[10px] bg-coffee text-cream px-2 py-0.5">EST. 2024</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event, idx) => (
              <div key={event.id} className={idx % 2 === 0 ? "sketch-card" : "sketch-card rounded-[20px_8px_15px_6px]"}>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl leading-tight">{event.title}</h3>
                  <span className="text-[10px] bg-emerald text-cream px-2 py-0.5 rounded-sm font-sans uppercase font-bold tracking-widest whitespace-nowrap">
                    {event.participants.length} JOINED
                  </span>
                </div>
                <p className="text-sm opacity-80 mb-4 font-serif italic italic leading-relaxed">
                  Join {event.host} for a collaborative meal hosted at {event.location}.
                </p>
                <div className="flex justify-between items-center pt-2 border-t border-coffee/10">
                  <span className="text-[11px] font-sans font-bold opacity-60 uppercase">{event.time}</span>
                  <button className="text-xs text-emerald border-2 border-emerald px-3 py-1 rounded-full hover:bg-emerald hover:text-cream transition-colors font-sans font-bold">
                    Join & Chip In
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <aside className="space-y-6 order-1 lg:order-2">
        <StreakCounter streak={user.streak} />
        
        <section className="bg-coffee text-cream sketch-border p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-2 opacity-10">
            <Utensils size={48} />
          </div>
          <span className="text-[10px] uppercase font-sans font-black tracking-widest opacity-60 mb-2 block">Daily Special</span>
          <h2 className="text-2xl leading-tight mb-2">{recipes[0]?.title}</h2>
          <div className="bg-emerald px-3 py-1 text-xs inline-block rounded-sm font-sans font-bold mb-4 border border-cream/20">
            View Recipe
          </div>
          <p className="text-xs opacity-80 italic leading-relaxed">{recipes[0]?.description}</p>
        </section>

        <section className="border-2 border-dashed border-coffee p-5 rounded-lg">
          <h3 className="text-lg italic mb-3 font-serif">Planning a group dinner?</h3>
          <p className="text-xs mb-4 opacity-70 leading-relaxed font-sans">Gather the crew, split the bill, and share the culinary joy across campus.</p>
          <button className="sketch-button w-full text-xs py-3">
            + Prep Station
          </button>
        </section>
      </aside>
    </div>
  </div>
);

const EventPlanner = () => (
  <div className="pb-24 pt-8 px-6">
    <SectionHeader title="The Prep Station" subtitle="Gather your squad for a meal." />
    
    <div className="sketch-card bg-paper space-y-6">
      <div className="space-y-1">
        <label className="text-xs uppercase tracking-widest font-sans font-black text-emerald block">What are we making?</label>
        <input type="text" placeholder="e.g. Grandma's Gnocchi" className="sketch-input" />
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-1">
          <label className="text-xs uppercase tracking-widest font-sans font-black text-emerald block">When?</label>
          <input type="text" placeholder="Friday, 7pm" className="sketch-input" />
        </div>
        <div className="space-y-1">
          <label className="text-xs uppercase tracking-widest font-sans font-black text-emerald block">Where?</label>
          <input type="text" placeholder="Beisler Hall" className="sketch-input" />
        </div>
      </div>
      
      <div className="space-y-1">
        <label className="text-xs uppercase tracking-widest font-sans font-black text-emerald block">Ingredients Needed</label>
        <textarea placeholder="Flour, eggs, parmesan..." className="sketch-input h-24 resize-none pt-4" />
      </div>
      
      <button className="sketch-button w-full text-lg py-4 mt-4">
        + Host this Meal
      </button>
    </div>
  </div>
);

const Cookbook = ({ recipes }: { recipes: Recipe[] }) => (
  <div className="pb-24 pt-8 px-6">
    <SectionHeader title="Community Cookbook" subtitle="Index of shared Wagner student recipes." />
    
    <div className="relative mb-8">
      <input type="text" placeholder="Search for recipes..." className="sketch-input pl-12 h-12" />
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee/40" />
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {recipes.map((recipe, idx) => (
        <motion.div 
          key={recipe.id} 
          whileHover={{ y: -4 }}
          className={`sketch-border bg-[#FDF5E6] p-5 shadow-[2px_2px_0px_var(--color-coffee)] flex flex-col min-h-[180px] ${idx % 3 === 1 ? 'rotate-[-1deg]' : idx % 3 === 2 ? 'rotate-[1deg]' : ''}`}
        >
          <div className="flex gap-1 mb-2">
             {recipe.tags.slice(0, 2).map(tag => (
               <span key={tag} className="text-[9px] text-emerald font-sans font-black uppercase tracking-widest">
                 {tag}
               </span>
             ))}
          </div>
          <h3 className="text-xl text-coffee mb-2 leading-tight font-serif">{recipe.title}</h3>
          <p className="text-xs text-coffee/70 mb-4 font-serif italic line-clamp-3">{recipe.description}</p>
          
          <div className="mt-auto pt-3 border-t border-coffee/10 flex justify-between items-center">
            <span className="text-[10px] uppercase font-sans font-bold opacity-60">By {recipe.author}</span>
            <Utensils size={12} className="text-emerald opacity-40" />
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

const Profile = ({ user }: { user: UserProfile }) => (
  <div className="pb-24 pt-8 px-6">
    <SectionHeader title="Your Profile" subtitle="Culinary journey at Wagner." />
    
    <div className="flex items-center gap-6 mb-12">
      <div className="w-24 h-24 bg-emerald text-cream rounded-full sketch-border flex items-center justify-center text-4xl font-serif">
        {user.name.charAt(0)}
      </div>
      <div>
        <h2 className="text-3xl font-serif">{user.name}</h2>
        <p className="text-rust italic text-sm font-serif">Member since 2024</p>
      </div>
    </div>
    
    <div className="grid grid-cols-2 gap-6 mb-12">
      <div className="sketch-card bg-emerald text-cream text-center">
        <h4 className="text-[10px] uppercase font-sans font-black tracking-widest opacity-60 mb-2 block">Streak</h4>
        <div className="text-4xl font-serif">{user.streak} Days</div>
      </div>
      <div className="sketch-card bg-paper text-emerald text-center">
        <h4 className="text-[10px] uppercase font-sans font-black tracking-widest opacity-60 mb-2 block">Meals Shared</h4>
        <div className="text-4xl font-serif">{user.hostedEvents.length + user.joinedEvents.length}</div>
      </div>
    </div>
    
    <section>
      <div className="border-b-2 border-coffee pb-2 mb-4">
        <h3 className="text-xl uppercase tracking-tighter">Recent Culinary Activity</h3>
      </div>
      <div className="space-y-4">
        {['Taco Night', 'Dorm Ramen Prep'].map((meal, index) => (
          <div key={meal} className="sketch-border bg-white p-4 flex justify-between items-center shadow-[4px_4px_0px_rgba(62,39,35,0.1)]">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-cream border-2 border-coffee flex items-center justify-center text-coffee">
                {index === 0 ? <Utensils size={18} /> : <ChefHat size={18} />}
              </div>
              <div>
                <span className="font-serif font-bold text-lg block leading-none">{meal}</span>
                <span className="text-[10px] font-sans uppercase font-black opacity-40">2 days ago</span>
              </div>
            </div>
            <span className="text-[10px] text-rust font-sans font-black uppercase tracking-widest border-2 border-rust px-2 py-1 rounded-full cursor-pointer hover:bg-rust hover:text-cream transition-colors">View Notes</span>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = React.useState('home');
  const [user, setUser] = React.useState<UserProfile | null>(null);
  const [events, setEvents] = React.useState<CookingEvent[]>([]);
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);

  React.useEffect(() => {
    updateStreak();
    setUser(getStoredUser());
    setEvents(getStoredEvents());
    setRecipes(getStoredRecipes());
  }, []);

  if (!user) return <div className="min-h-screen bg-cream flex items-center justify-center font-handwritten text-3xl">Warming up the stove...</div>;

  return (
    <div className="min-h-screen pb-20 paper-texture overflow-x-hidden">
      <header className="py-8 px-8 bg-emerald text-cream border-b-4 border-coffee flex justify-between items-center sticky top-0 z-50">
        <div onClick={() => setActiveTab('home')} className="cursor-pointer group">
          <h1 className="text-4xl text-cream tracking-tighter font-serif font-black italic group-hover:scale-105 transition-transform">
            WAGNER <span className="font-sans font-medium opacity-60 not-italic">COOKING</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:block text-[10px] uppercase font-sans font-black tracking-widest opacity-60">Campus Edition</div>
          <div className="w-10 h-10 rounded-full border-2 border-cream bg-coffee/20"></div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto min-h-[80vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'home' && <Dashboard user={user} events={events} recipes={recipes} />}
            {activeTab === 'planner' && <EventPlanner />}
            {activeTab === 'cookbook' && <Cookbook recipes={recipes} />}
            {activeTab === 'profile' && <Profile user={user} />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
