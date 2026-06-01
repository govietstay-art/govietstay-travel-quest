import React, { useMemo, useState } from "react";
import {
  Compass, MapPin, Trophy, Star, MessageCircle, Globe2, RotateCcw, Gift,
  ShieldCheck, Sparkles, Palmtree, Rocket, Users, Medal, Gamepad2, Coins,
  Lock, Unlock, BadgeCheck, Plane, Map, Crown, ScrollText, Target
} from "lucide-react";

const WHATSAPP =
  "https://wa.me/84937762607?text=Hello%20GoVietStay%2C%20I%20just%20completed%20Travel%20Quest%20and%20unlocked%20my%20Explorer%20Passport.%20Please%20help%20me%20plan%20my%20Vietnam%20trip.";

const WEBSITE = "https://govietstay8009.pinet.com/";

const quests = [
  { id: 1, place: "My Khe Beach", title: "Sunrise Start", emoji: "🌊", x: 18, y: 72, xp: 100, story: "Your journey begins by the sea. A trusted local friend is waiting to guide you through Da Nang.", question: "What should a traveler do first when arriving in Da Nang?", answers: ["Find trusted local support", "Rush without planning", "Ignore local advice"], correct: 0, reward: "Beach Explorer Badge" },
  { id: 2, place: "Son Tra Peninsula", title: "Green Mountain Path", emoji: "🐒", x: 34, y: 47, xp: 100, story: "You follow the coastal road toward Son Tra, where ocean wind, forest and mountain views meet.", question: "What is Son Tra best known for?", answers: ["Nature, viewpoints and local wildlife", "Snow mountains", "Desert safari"], correct: 0, reward: "Nature Guardian Badge" },
  { id: 3, place: "Han River", title: "City Lights Quest", emoji: "🌉", x: 50, y: 61, xp: 100, story: "The Dragon Bridge lights up the night. Travelers gather near the river for food, cruises and photos.", question: "Which Da Nang landmark is famous near the Han River?", answers: ["Dragon Bridge", "Eiffel Tower", "Sydney Opera House"], correct: 0, reward: "River Lights Badge" },
  { id: 4, place: "Hoi An Ancient Town", title: "Lantern Memory", emoji: "🏮", x: 67, y: 78, xp: 100, story: "You reach Hoi An, where lanterns, old houses and quiet streets create a timeless travel memory.", question: "What is Hoi An famous for?", answers: ["Lanterns and ancient town atmosphere", "Ice castles", "Volcano trekking"], correct: 0, reward: "Lantern Walker Badge" },
  { id: 5, place: "Ba Na Hills", title: "Golden Bridge Finale", emoji: "🌁", x: 77, y: 35, xp: 100, story: "Your final quest leads to the mountains, where the Golden Bridge feels like a path through the clouds.", question: "Which experience is strongly connected with Ba Na Hills?", answers: ["Golden Bridge", "Sahara dunes", "Northern lights"], correct: 0, reward: "Golden Explorer Badge" }
];

const allBadges = quests.map((q) => q.reward);

const hallOfFame = [
  { name: "Elena RU", country: "🇷🇺", xp: 820, level: "Level 8" },
  { name: "Thomas DE", country: "🇩🇪", xp: 760, level: "Level 7" },
  { name: "Alina KZ", country: "🇰🇿", xp: 700, level: "Level 7" },
  { name: "Minji KR", country: "🇰🇷", xp: 640, level: "Level 6" },
  { name: "Explorer VN", country: "🇻🇳", xp: 580, level: "Level 6" }
];

const happyTravelers = [
  { flag: "🇷🇺", name: "Elena", trip: "Hoi An Private Tour", note: "Lantern night, calm streets and trusted local support." },
  { flag: "🇰🇿", name: "Alina", trip: "Dong Giang Adventure", note: "A mountain escape with local guide care." },
  { flag: "🇩🇪", name: "Thomas", trip: "Da Nang Discovery", note: "Beach, city lights and flexible WhatsApp support." }
];

const levelTable = [
  { level: 1, min: 0, next: 100, title: "Beach Explorer", rank: "New Traveler" },
  { level: 2, min: 100, next: 200, title: "Nature Explorer", rank: "Curious Traveler" },
  { level: 3, min: 200, next: 300, title: "City Adventurer", rank: "Da Nang Friend" },
  { level: 4, min: 300, next: 400, title: "Local Expert", rank: "Trusted Local Guest" },
  { level: 5, min: 400, next: 500, title: "Legend Explorer", rank: "Vietnam Explorer" },
  { level: 6, min: 500, next: 700, title: "GoVietStay Master", rank: "Trusted Local Friend" },
  { level: 7, min: 700, next: 900, title: "Pioneer Traveler", rank: "Pi Friendly Explorer" },
  { level: 8, min: 900, next: 1200, title: "Vietnam Quest Hero", rank: "Global Explorer" },
  { level: 9, min: 1200, next: 1500, title: "Travel Legend", rank: "Hall of Fame Traveler" },
  { level: 10, min: 1500, next: 1500, title: "GoVietStay Champion", rank: "Legendary Pioneer" }
];

function getLevel(xp) {
  const current = [...levelTable].reverse().find((l) => xp >= l.min) || levelTable[0];
  const span = Math.max(current.next - current.min, 1);
  const gained = Math.min(Math.max(xp - current.min, 0), span);
  const percent = current.level === 10 ? 100 : Math.round((gained / span) * 100);
  return { ...current, percent, currentXp: gained, neededXp: span };
}

function LogoMark() {
  return (
    <div className="brandLogo" aria-label="GoVietStay logo">
      <Compass size={34} />
      <Palmtree size={18} className="miniPalm" />
    </div>
  );
}

function ExplorerPassport({ player, xp, badges }) {
  const level = getLevel(xp);
  return (
    <section className="passportCard">
      <div className="passportHeader">
        <div>
          <p className="eyebrow">Explorer Passport</p>
          <h3>{player || "GoVietStay Traveler"}</h3>
        </div>
        <Plane size={30} />
      </div>
      <div className="passportGrid">
        <div><span>Level</span><strong>{level.level}</strong></div>
        <div><span>XP</span><strong>{xp}</strong></div>
        <div><span>Rank</span><strong>{level.rank}</strong></div>
        <div><span>Badges</span><strong>{badges.length}/{allBadges.length}</strong></div>
      </div>
    </section>
  );
}

function BadgeVault({ badges }) {
  return (
    <section>
      <h2>Your Badge Vault</h2>
      <div className="badgeGrid">
        {allBadges.map((badge) => {
          const unlocked = badges.includes(badge);
          return (
            <div className={`badge ${unlocked ? "unlocked" : "locked"}`} key={badge}>
              {unlocked ? <Unlock size={18} /> : <Lock size={18} />}
              {badge}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function Achievements({ xp, badges }) {
  const achievements = [
    { title: "First Adventure", text: "Complete your first travel quest.", unlocked: badges.length >= 1 },
    { title: "Local Friend", text: "Complete all five GoVietStay quests.", unlocked: badges.length >= 5 },
    { title: "Level Up", text: "Reach Level 3 or higher.", unlocked: getLevel(xp).level >= 3 },
    { title: "Legend Path", text: "Reach Level 6 with 500 XP.", unlocked: getLevel(xp).level >= 6 }
  ];

  return (
    <section className="infoCard">
      <div className="sectionTitle"><BadgeCheck size={20} /><h3>Achievements</h3></div>
      <div className="achievementList">
        {achievements.map((a) => (
          <div className={`achievement ${a.unlocked ? "active" : ""}`} key={a.title}>
            {a.unlocked ? <Trophy size={18} /> : <Lock size={18} />}
            <div><b>{a.title}</b><small>{a.text}</small></div>
          </div>
        ))}
      </div>
    </section>
  );
}

function InfoPanels({ player, xp, badges }) {
  const level = getLevel(xp);
  const leaderboard = [
    { name: player || "You", country: "🌴", xp, level: `Level ${level.level}` },
    ...hallOfFame
  ].sort((a, b) => b.xp - a.xp);

  return (
    <section className="infoGrid">
      <div className="infoCard">
        <div className="sectionTitle"><Medal size={20} /><h3>Global Explorer Hall of Fame</h3></div>
        <div className="leaderboard">
          {leaderboard.map((item, index) => (
            <div className="leaderRow" key={`${item.name}-${index}`}>
              <strong>#{index + 1}</strong>
              <span>{item.country}</span>
              <div><b>{item.name}</b><small>{item.level}</small></div>
              <em>{item.xp} XP</em>
            </div>
          ))}
        </div>
      </div>

      <div className="infoCard">
        <div className="sectionTitle"><Users size={20} /><h3>Happy Travelers</h3></div>
        <div className="travelerList">
          {happyTravelers.map((t) => (
            <div className="travelerMemory" key={t.name}>
              <span>{t.flag}</span>
              <div><b>{t.name}</b><small>{t.trip}</small><p>{t.note}</p></div>
            </div>
          ))}
        </div>
      </div>

      <Achievements xp={xp} badges={badges} />

      <div className="infoCard piCard">
        <div className="sectionTitle"><Gamepad2 size={20} /><h3>Pi Friendly Roadmap</h3></div>
        <div className="roadmapItems">
          <span><Coins size={16} /> Pi SDK Login Coming Soon</span>
          <span><Trophy size={16} /> Real Online Leaderboard Next</span>
          <span><Rocket size={16} /> CiDi Games Submission Ready</span>
          <span><Target size={16} /> Daily Check-in Mission in V1.5</span>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const [started, setStarted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [xp, setXp] = useState(0);
  const [badges, setBadges] = useState([]);
  const [selected, setSelected] = useState(null);
  const [finished, setFinished] = useState(false);
  const [player, setPlayer] = useState("");

  const quest = quests[current];
  const progress = Math.round((badges.length / quests.length) * 100);
  const level = useMemo(() => getLevel(xp), [xp]);

  function answer(index) {
    if (selected !== null) return;
    setSelected(index);

    if (index === quest.correct) {
      setXp((oldXp) => oldXp + quest.xp);
      setBadges((oldBadges) => oldBadges.includes(quest.reward) ? oldBadges : [...oldBadges, quest.reward]);
    }
  }

  function nextQuest() {
    if (current < quests.length - 1) {
      setCurrent((oldCurrent) => oldCurrent + 1);
      setSelected(null);
    } else {
      setFinished(true);
    }
  }

  function resetGame() {
    setStarted(false);
    setCurrent(0);
    setXp(0);
    setBadges([]);
    setSelected(null);
    setFinished(false);
    setPlayer("");
  }

  if (!started) {
    return (
      <main className="app heroPage">
        <section className="heroCard">
          <LogoMark />
          <p className="eyebrow">Powered by GoVietStay</p>
          <h1>GoVietStay Travel Quest</h1>
          <p className="subtitle">Explore Da Nang, Hoi An and Vietnam through a travel adventure. Earn XP, unlock badges, build your Explorer Passport and connect with a trusted local friend.</p>

          <div className="startRow">
            <input className="nameInput" value={player} onChange={(event) => setPlayer(event.target.value)} placeholder="Traveler name (optional)" />
            <button className="primaryBtn" onClick={() => setStarted(true)}>Start Journey</button>
          </div>

          <div className="trustRow">
            <span>XP System</span><span>Explorer Passport</span><span>Pi Friendly</span>
          </div>

          <div className="comingSoon">
            <Sparkles size={16} /><p>Pi SDK • Daily Check-in • CiDi Games Ready</p>
          </div>
        </section>
      </main>
    );
  }

  if (finished) {
    return (
      <main className="app resultPage">
        <section className="resultCard wide">
          <LogoMark />
          <p className="eyebrow">Quest Completed</p>
          <h1>{player || "Traveler"}, your Explorer Passport is ready</h1>

          <div className="levelHero">
            <div><span>Current Level</span><strong>LEVEL {level.level}</strong><p>{level.title}</p></div>
            <div><span>Total XP</span><strong>{xp}</strong><p>{level.rank}</p></div>
          </div>

          <div className="xpText">
            {level.level >= 10 ? "Max Level Reached" : `${level.currentXp} / ${level.neededXp} XP to next level`}
          </div>
          <div className="levelBar"><div style={{ width: `${level.percent}%` }} /></div>

          <ExplorerPassport player={player} xp={xp} badges={badges} />
          <BadgeVault badges={badges} />

          <div className="rewardBox">
            <Gift size={24} />
            <p><b>Reward Voucher Unlocked:</b> show this screen to GoVietStay and receive free travel consultation, private tour ideas, local insider tips and WhatsApp support.</p>
          </div>

          <div className="ctaRow">
            <a className="primaryBtn linkBtn" href={WHATSAPP} target="_blank" rel="noreferrer">Claim on WhatsApp</a>
            <a className="secondaryBtn linkBtn" href={WEBSITE} target="_blank" rel="noreferrer">Visit Website</a>
          </div>

          <InfoPanels player={player} xp={xp} badges={badges} />

          <button className="ghostBtn" onClick={resetGame}><RotateCcw size={17} /> Play Again</button>
        </section>
      </main>
    );
  }

  return (
    <main className="app gamePage">
      <section className="topBar">
        <div><p className="eyebrow">GoVietStay Travel Quest</p><h1>{quest.title}</h1></div>
        <div className="scoreMini"><Trophy size={18} /><strong>{xp} XP</strong><small>Level {level.level}</small></div>
      </section>

      <section className="mapCard">
        <div className="mapBg">
          <div className="routeLine" />
          {quests.map((item, index) => (
            <div key={item.id} className={`pin ${index === current ? "active" : ""} ${index < current ? "done" : ""}`} style={{ left: `${item.x}%`, top: `${item.y}%` }}>
              <span>{item.emoji}</span>
            </div>
          ))}
        </div>
        <div className="progressHeader"><span>Journey Progress</span><strong>{progress}%</strong></div>
        <div className="progressLine"><div style={{ width: `${progress}%` }} /></div>
      </section>

      <section className="questCard">
        <div className="placeLine"><MapPin size={18} /><strong>{quest.place}</strong><em>+{quest.xp} XP</em></div>
        <p className="storyText">{quest.story}</p>
        <h2>{quest.question}</h2>

        <div className="answers">
          {quest.answers.map((answerText, index) => {
            const isCorrect = selected !== null && index === quest.correct;
            const isWrong = selected === index && index !== quest.correct;
            return (
              <button key={answerText} className={`answerBtn ${isCorrect ? "correct" : ""} ${isWrong ? "wrong" : ""}`} onClick={() => answer(index)}>
                {answerText}
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <div className="feedbackBox">
            <div><ShieldCheck size={20} /><span>{selected === quest.correct ? `Correct! +${quest.xp} XP and badge unlocked.` : "Not quite. Keep exploring with local support."}</span></div>
            <button className="primaryBtn smallBtn" onClick={nextQuest}>{current < quests.length - 1 ? "Next Destination" : "Finish Quest"}</button>
          </div>
        )}
      </section>

      <section className="bottomLinks">
        <a href={WHATSAPP} target="_blank" rel="noreferrer"><MessageCircle size={16} /> WhatsApp</a>
        <a href={WEBSITE} target="_blank" rel="noreferrer"><Globe2 size={16} /> Website</a>
      </section>
    </main>
  );
}
