import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight, BarChart3, BookOpen, Check, ChevronDown, ChevronRight,
  CircleUserRound, Clock3, Code2, Database, FileText, Home, Lightbulb,
  LogOut, Mail, Menu, MessageSquare, Phone, Play, Search, Send, Settings2,
  ShieldCheck, Sparkles, Target, Upload, User, X, Eye, EyeOff, Building2,
  ClipboardList, BrainCircuit, Mic, Trophy, Download, Share2, LockKeyhole
} from "lucide-react";
import { APP_DATA } from "./data";
import "./styles.css";

const COLORS = { navy:"#1A3263", blue:"#547792", cream:"#EFD2B0", yellow:"#FFC570" };

function Logo({ compact=false }) {
  return <div className={`brand ${compact ? "compact" : ""}`}>
    <div className="leaf-logo" aria-hidden="true"><span/><span/><span/></div>
    {!compact && <span>CareerSage</span>}
  </div>
}

function Glass({children, className=""}) { return <section className={`glass ${className}`}>{children}</section> }

function ProgressRing({value, label="/ 100", size=118}) {
  const safe = Number.isFinite(value) ? Math.max(0, Math.min(100, value)) : 0;
  return <div className="ring" style={{"--p":`${safe}%`, width:size, height:size}}>
    <div className="ring-inner"><strong>{value == null ? "—" : value}%</strong><span>{label}</span></div>
  </div>
}

function Sidebar({page, setPage}) {
  const items = [
    ["home","Home",Home], ["resume","Resume",FileText], ["preparation","Preparation",Target],
    ["interview","Interview",MessageSquare], ["progress","Progress",BarChart3]
  ];
  return <aside className="sidebar">
    <Logo />
    <nav>
      {items.map(([id,label,Icon]) => <button key={id} className={page===id ? "active":""} onClick={()=>setPage(id)}>
        <Icon size={21}/><span>{label}</span>
      </button>)}
    </nav>
    <div className="side-bottom">
      <button onClick={()=>setPage("profile")}><User size={20}/>Profile</button>
      <button onClick={()=>setPage("landing")}><LogOut size={20}/>Logout</button>
    </div>
  </aside>
}

function UserPill() {
  return <div className="user-pill"><CircleUserRound size={22}/><span>{APP_DATA.user.name}</span><ChevronDown size={16}/></div>
}

function AppShell({page,setPage,children}) {
  return <div className="app-shell">
    <Sidebar page={page} setPage={setPage}/>
    <main className="workspace">
      <div className="workspace-top"><UserPill/></div>
      {children}
    </main>
  </div>
}

function Landing({go}) {
  return <div className="public-page landing">
    <header className="public-nav"><Logo/><div className="nav-links"><a href="#about">About</a><a href="#features">Features</a><a href="#contact">Contact</a><button onClick={go}>Get Started <ArrowRight size={17}/></button></div></header>
    <div className="landing-orb orb-a"/><div className="landing-orb orb-b"/>
    <Glass className="landing-card">
      <Logo/>
      <h1>Know where you stand.<br/>Know what to do next.</h1>
      <p>Insights, guidance and practice —<br/>all in one place.</p>
      <button className="primary big" onClick={go}>Get Started <ArrowRight/></button>
    </Glass>
  </div>
}

function Login({go}) {
  const [form,setForm] = useState({name:"",email:"",phone:"",password:""});
  const [show,setShow]=useState(false);
  const update=(k,v)=>setForm(f=>({...f,[k]:v}));
  return <div className="public-page login-page">
    <div className="login-deco deco-1"/><div className="login-deco deco-2"/>
    <div className="login-left">
      <Logo/>
      <blockquote>“Careers aren’t a destination,<br/>they’re a journey.<br/>Let’s build yours together.”</blockquote>
      <div className="sticky">Think of us like a<br/>senior you can<br/>always ask. ♡</div>
    </div>
    <Glass className="login-card">
      <Logo/>
      <h1>Welcome to CareerSage</h1><p>Let’s get to know you before we get started.</p>
      {[
        ["name","Full Name",User,"Enter your name"],
        ["email","Email Address",Mail,"Enter your email address"],
        ["phone","Phone Number",Phone,"+91 | Enter your phone number"],
      ].map(([key,label,Icon,ph])=><label className="field" key={key}><Icon size={21}/><span><b>{label}</b><input value={form[key]} onChange={e=>update(key,e.target.value)} placeholder={ph}/></span></label>)}
      <label className="field"><LockKeyhole size={21}/><span><b>Password</b><input type={show?"text":"password"} value={form.password} onChange={e=>update("password",e.target.value)} placeholder="Create a password"/></span><button className="icon-btn" onClick={()=>setShow(!show)}>{show?<EyeOff size={20}/>:<Eye size={20}/>}</button></label>
      <button className="primary wide" onClick={go}>Continue <ArrowRight/></button>
      <small>We’ll create your account if you’re new, or log you in if you already exist.</small>
    </Glass>
  </div>
}

function ResumeUpload({setPage}) {
  const [file,setFile]=useState(null);
  const inputRef=useRef();
  const choose=e=>{const f=e.target.files?.[0]; if(f){setFile(f);}};
  const drop=e=>{e.preventDefault(); const f=e.dataTransfer.files?.[0]; if(f)setFile(f)};
  return <AppShell page="home" setPage={setPage}>
    <PageTitle title={`Good to see you, ${APP_DATA.user.name.split(" ")[0]} 👋`} subtitle="Let’s get started with your resume."/>
    <Glass className="upload-card">
      <FileText size={62} strokeWidth={1.6}/>
      <h2>Upload your resume</h2>
      <p>Drop your file here or click to browse</p>
      <div className="dropzone" onDragOver={e=>e.preventDefault()} onDrop={drop} onClick={()=>inputRef.current?.click()}>
        <input ref={inputRef} type="file" accept=".pdf,.doc,.docx" onChange={choose} hidden/>
        {file ? <><Check className="success-icon"/><b>{file.name}</b><span>{(file.size/1024/1024).toFixed(2)} MB</span></> :
        <><button className="primary">Browse Files</button><span>PDF • DOC • DOCX (Max 10MB)</span></>}
      </div>
      <div className="sample-link"><Lightbulb size={17}/> Not sure? Try a sample resume <ArrowRight size={17}/></div>
      {file && <button className="primary wide" onClick={()=>setPage("analyzing")}>Analyze Resume <ArrowRight/></button>}
    </Glass>
  </AppShell>
}

function PageTitle({title,subtitle,action}) {
  return <div className="page-title"><div><h1>{title}</h1><p>{subtitle}</p></div>{action}</div>
}

function Analyzing({setPage}) {
  const [progress,setProgress]=useState(0);
  const steps=["Reading your resume...","Understanding your experience...","Analyzing your skills...","Finding areas you can strengthen...","Preparing your personalized career dashboard..."];
  useEffect(()=>{const t=setInterval(()=>setProgress(p=>{if(p>=100){clearInterval(t);setTimeout(()=>setPage("done"),500);return 100}return p+2}),65);return()=>clearInterval(t)},[]);
  const active=Math.min(4,Math.floor(progress/21));
  return <AppShell page="resume" setPage={setPage}>
    <PageTitle title="Analyzing your resume..." subtitle="I’m going through your resume and preparing your personalized insights."/>
    <Glass className="analysis-card">
      <div className="steps">{steps.map((s,i)=><div className={i<active?"done":i===active?"current":""} key={s}><span>{i<active?<Check size={16}/>:i+1}</span><label>{s}</label></div>)}</div>
      <ProgressRing value={progress} label=""/>
    </Glass>
    <div className="time-note"><Clock3 size={20}/> This won’t take long. Good things take a little time! <Sparkles size={18}/></div>
  </AppShell>
}

function Done({setPage}) {
  return <AppShell page="resume" setPage={setPage}>
    <div className="done-wrap"><Glass className="done-card"><div className="done-check"><Check size={55}/></div><h1>Your resume is analyzed!</h1><p>I’ve gone through your resume and prepared your personalized career dashboard.</p><button className="primary big" onClick={()=>setPage("home")}>View My Dashboard <ArrowRight/></button></Glass></div>
  </AppShell>
}

function Dashboard({setPage}) {
  const d=APP_DATA.dashboard;
  return <AppShell page="home" setPage={setPage}>
    <PageTitle title={`Welcome back, ${APP_DATA.user.name.split(" ")[0]}! 👋`} subtitle="Here’s your personalized career overview." action={<div className="tip"><Lightbulb/> Small steps today,<br/>bigger opportunities tomorrow.</div>}/>
    <div className="stat-grid">
      <Glass><h3><FileText/> Resume Score</h3><ProgressRing value={APP_DATA.resume.score}/></Glass>
      <Glass><h3><BarChart3/> Skills Identified</h3><div className="big-number">{d.skillsIdentified}</div><span>key skills</span></Glass>
      <Glass><h3><Target/> Recommended Roles</h3><div className="big-number">{d.recommendedRoles}</div><span>roles</span></Glass>
      <Glass><h3><BookOpen/> Preparation Status</h3><ProgressRing value={d.preparationStatus}/></Glass>
    </div>
    <div className="two-col">
      <Glass><CardHead icon={<BarChart3/>} title="Your Skill Analysis" link="View Details" onClick={()=>setPage("resume")}/>{d.skillAnalysis.map(([n,v])=><Bar key={n} label={n} value={v}/>)}</Glass>
      <Glass><CardHead icon={<Target/>} title="Top Role Matches" link="View All"/>{d.roleMatches.map(([n,v],i)=><div className="role-row" key={n}><b>{i+1}</b><span>{n}</span><strong>{v}%</strong></div>)}</Glass>
    </div>
    <div className="three-col">
      <Glass><CardHead icon={<Sparkles/>} title="Strengths"/><Pills items={d.strengths}/></Glass>
      <Glass><CardHead icon={<BarChart3/>} title="Areas to Improve"/><Pills items={d.areasToImprove}/></Glass>
      <Glass><CardHead icon={<Check/>} title="Next Steps"/><ul className="next-list">{d.nextSteps.map(x=><li key={x}><span/> {x}</li>)}</ul></Glass>
    </div>
  </AppShell>
}

function CardHead({icon,title,link,onClick}) { return <div className="card-head"><h2>{icon}{title}</h2>{link&&<button onClick={onClick}>{link} <ArrowRight size={16}/></button>}</div> }
function Bar({label,value}) { return <div className="bar-row"><span>{label}</span><div><i style={{width:`${value}%`}}/></div><b>{value}%</b></div> }
function Pills({items}) { return <div className="pills">{items.map(x=><span key={x}>{x}</span>)}</div> }

function ResumeAnalysis({setPage}) {
  const r=APP_DATA.resume;
  return <AppShell page="resume" setPage={setPage}>
    <PageTitle title="Resume Analysis" subtitle="Here’s a detailed breakdown of your resume." action={<div className="actions"><button className="secondary"><Download/> Download Report</button><button className="secondary"><Share2/> Share</button></div>}/>
    <div className="analysis-grid">
      <Glass><CardHead icon={<FileText/>} title="Overall Resume Score"/><div className="score-panel"><ProgressRing value={r.score}/><div>{[["Content Quality",r.contentQuality],["Skill Relevance",r.skillRelevance],["Role Alignment",r.roleAlignment],["Clarity & Structure",r.clarity]].map(([n,v])=><Bar key={n} label={n} value={v}/>)}</div></div></Glass>
      <Glass><CardHead icon={<Lightbulb/>} title="Quick Insights"/>{r.insights.map((x,i)=><div className="insight" key={x}><span>{i+1}</span><p>{x}</p></div>)}</Glass>
      <Glass className="span-2"><CardHead icon={<BarChart3/>} title="Skills Analysis"/><div className="skill-cols"><SkillGroup title="Technical Skills" items={r.technicalSkills}/><SkillGroup title="Soft Skills" items={r.softSkills}/><SkillGroup title="Other Skills" items={r.otherSkills}/></div></Glass>
      <Glass><CardHead icon={<Search/>} title="Keyword Match"/><Metric label="Matched Keywords" value={r.matchedKeywords}/><Metric label="Missing Keywords" value={r.missingKeywords}/><Metric label="Suggested Keywords" value={r.suggestedKeywords}/></Glass>
      <Glass><CardHead icon={<Target/>} title="Role Alignment"/>{r.roleAlignment.map(x=><div className="role-detail" key={x.role}><b>{x.role}</b><strong>{x.score}%</strong><span>{x.skills}</span></div>)}</Glass>
      <Glass><CardHead icon={<Sparkles/>} title="Suggestions to Improve"/>{r.suggestions.map((x,i)=><div className="suggestion" key={x}><b>{i+1}</b><span>{x}</span></div>)}</Glass>
    </div>
  </AppShell>
}

function SkillGroup({title,items}) {return <div><h4>{title}</h4><div className="skill-tags">{items.map(x=><span key={x}>{x}</span>)}</div></div>}
function Metric({label,value}) {return <div className="metric"><span>{label}</span><div className="metric-tags">{value.map(x=><em key={x}>{x}</em>)}</div></div>}

function Preparation({setPage}) {
  const [tab,setTab]=useState("overview");
  const p=APP_DATA.preparation;
  if(tab==="progress") return <ProgressPage p={p} setPage={setPage} back={()=>setTab("overview")}/>;
  if(tab==="technical") return <QuestionBank title="Technical Questions" subtitle="Practice the core concepts that matter in technical rounds." items={p.categories} icon={<Code2/>} setTab={setTab}/>;
  if(tab==="company") return <QuestionBank title="Company-wise Questions" subtitle="Practice questions organized around company interview patterns." items={p.companies} icon={<Building2/>} setTab={setTab} company/>;
  if(tab==="mock") return <MockTests tests={p.mockTests} setTab={setTab}/>;
  return <AppShell page="preparation" setPage={setPage}>
    <PageTitle title="Interview Preparation" subtitle="Practice, improve and get interview ready with personalized questions." action={<div className="tip"><Lightbulb/> Focused practice today,<br/>confidence tomorrow.</div>}/>
    <div className="prep-tabs">{[
      ["technical","Technical Questions",Code2],["company","Company-wise",Building2],["mock","Mock Tests",ClipboardList],["topic","Topic-wise Practice",BookOpen],["progress","Progress",BarChart3]
    ].map(([id,label,I])=><button key={id} onClick={()=>setTab(id)}><I size={20}/>{label}</button>)}</div>
    <div className="two-col">
      <Glass><CardHead icon={<Target/>} title="Your Interview Readiness"/><div className="score-panel"><ProgressRing value={p.readiness}/><div>{[["Technical Knowledge",p.technicalKnowledge],["Problem Solving",p.problemSolving],["Communication",p.communication],["System Design",p.systemDesign]].map(([n,v])=><Bar key={n} label={n} value={v}/>)}</div></div></Glass>
      <Glass><CardHead icon={<Clock3/>} title="Upcoming Practice Plan" link="View Plan"/>{p.mockTests.map((x,i)=><div className="plan-row" key={x.name}><span><b>{x.name}</b><small>{x.meta}</small></span><button className="outline" onClick={()=>setTab("mock")}>{i===1?"View":"Start"}</button></div>)}</Glass>
    </div>
    <div className="two-col">
      <Glass><CardHead icon={<Code2/>} title="Technical Question Categories" link="View All" onClick={()=>setTab("technical")}/><div className="category-grid">{p.categories.map(x=><button key={x.name} onClick={()=>setTab("technical")}><Code2/><span><b>{x.name}</b><small>{x.count}+ questions</small></span><ChevronRight/></button>)}</div></Glass>
      <Glass><CardHead icon={<Building2/>} title="Company-wise Questions" link="View All" onClick={()=>setTab("company")}/><div className="company-grid">{p.companies.map(x=><button key={x.name} onClick={()=>setTab("company")}><span className="company-mark">{x.name[0]}</span><span><b>{x.name}</b><small>{x.count}+ questions</small></span><ChevronRight/></button>)}</div></Glass>
    </div>
    <div className="three-col">
      <Glass><CardHead icon={<Clock3/>} title="Recent Practice Activity"/><table><thead><tr><th>Topic</th><th>Difficulty</th><th>Score</th></tr></thead><tbody>{p.recentActivity.map(x=><tr key={x[0]}><td>{x[0]}</td><td><span className="difficulty">{x[1]}</span></td><td>{x[3]}</td></tr>)}</tbody></table></Glass>
      <Glass><CardHead icon={<ClipboardList/>} title="Mock Tests" link="View All" onClick={()=>setTab("mock")}/>{p.mockTests.map(x=><div className="mock-row" key={x.name}><span><b>{x.name}</b><small>{x.meta}</small></span><button className="outline" onClick={()=>setTab("mock")}>Start</button></div>)}</Glass>
      <Glass><CardHead icon={<BarChart3/>} title="Progress Overview" link="View" onClick={()=>setTab("progress")}/><MiniChart data={p.progress}/></Glass>
    </div>
  </AppShell>
}

function QuestionBank({title,subtitle,items,icon,setTab,company=false}) {
  const [q,setQ]=useState("");
  return <AppShell page="preparation" setPage={()=>{}}>
    <PageTitle title={title} subtitle={subtitle} action={<button className="secondary" onClick={()=>setTab("overview")}><ArrowRight style={{transform:"rotate(180deg)"}}/> Back</button>}/>
    <Glass className="bank">
      <div className="search-row"><div className="searchbox"><Search size={19}/><input placeholder="Search questions..." value={q} onChange={e=>setQ(e.target.value)}/></div><select><option>All difficulties</option><option>Easy</option><option>Medium</option><option>Hard</option></select></div>
      <div className="bank-grid">{items.filter(x=>x.name.toLowerCase().includes(q.toLowerCase())).map(x=><button className="bank-card" key={x.name}><div className="bank-icon">{company?<Building2/>:icon}</div><div><h3>{x.name}</h3><p>{x.count}+ questions</p></div><ArrowRight/></button>)}</div>
    </Glass>
  </AppShell>
}

function MockTests({tests,setTab}) {
  return <AppShell page="preparation" setPage={()=>{}}>
    <PageTitle title="Mock Tests" subtitle="Test yourself under realistic interview conditions." action={<button className="secondary" onClick={()=>setTab("overview")}><ArrowRight style={{transform:"rotate(180deg)"}}/> Back</button>}/>
    <div className="mock-grid">{tests.map((x,i)=><Glass key={x.name}><div className="mock-icon"><ClipboardList/></div><h2>{x.name}</h2><p>{x.meta}</p><button className="primary wide" onClick={()=>alert("Mock test ready. Connect this action to the backend test session.")}>Start Mock Test <Play size={18}/></button></Glass>)}</div>
  </AppShell>
}

function ProgressPage({p,setPage,back}) {
  return <AppShell page="progress" setPage={setPage}>
    <PageTitle title="Your Progress" subtitle="See how your preparation is improving over time." action={<button className="secondary" onClick={back}><ArrowRight style={{transform:"rotate(180deg)"}}/> Back to Preparation</button>}/>
    <div className="progress-grid">
      <Glass className="span-2"><CardHead icon={<BarChart3/>} title="Progress Overview"/><BigChart data={p.progress}/></Glass>
      <Glass><CardHead icon={<Trophy/>} title="Practice Summary"/><div className="summary-list"><div><b>91</b><span>Questions attempted</span></div><div><b>78%</b><span>Latest accuracy</span></div><div><b>11 min</b><span>Avg. time / question</span></div></div></Glass>
    </div>
  </AppShell>
}

function MiniChart({data}) { return <div className="mini-chart">{data.map(x=><div key={x.week}><div className="dot" style={{bottom:`${x.accuracy}%`}}/><div className="chart-line" style={{height:`${x.accuracy}%`}}/><span>{x.week.replace("Week ","W")}</span></div>)}</div> }
function BigChart({data}) {
  return <div className="big-chart"><div className="y-labels"><span>100</span><span>75</span><span>50</span><span>25</span><span>0</span></div><div className="chart-area">{data.map((x,i)=><div className="chart-col" key={x.week}><div className="chart-point" style={{bottom:`${x.accuracy}%`}}/><div className="chart-stem" style={{height:`${x.accuracy}%`}}/><span>{x.week}</span></div>)}</div></div>
}

function Interview({setPage}) {
  const [answer,setAnswer]=useState("");
  const [started,setStarted]=useState(false);
  const [question,setQuestion]=useState(APP_DATA.interview.question);
  const [count,setCount]=useState(0);
  const send=()=>{if(!answer.trim())return; setCount(c=>c+1);setAnswer("");setQuestion("Thanks. Let’s go one level deeper. What technical decision did you make in that project, and why?");};
  return <AppShell page="interview" setPage={setPage}>
    <PageTitle title="Practice Interview" subtitle="A realistic interview experience, tailored for you."/>
    <div className="interview-layout">
      <Glass className="chat-panel">
        <div className="chat-head"><h2><MessageSquare/> Interview Session</h2><div><span className="timer"><Clock3/> 00:00:00</span><button className="danger">End Session</button></div></div>
        <div className="chat">
          <div className="bubble ai"><div className="avatar">AI</div><div><b>Hello!</b><p>Let’s start your practice interview. I’ll ask questions based on your resume and the selected role. Take your time and answer naturally.</p></div></div>
          <div className="bubble ai"><div className="avatar">AI</div><div><b>Here’s your next question.</b><p>{question}</p></div></div>
          {count>0 && <div className="bubble user"><div className="avatar user-avatar">You</div><div><b>Your answer</b><p>Answer submitted for review.</p></div></div>}
        </div>
        <div className="answer-box"><div className="answer-tabs"><button className="selected"><KeyboardIcon/> Type your answer</button><button><Mic/> Record Answer</button></div><div className="answer-row"><textarea value={answer} onChange={e=>setAnswer(e.target.value)} placeholder="Type your response here..."/><button className="send" onClick={send}><Send/></button></div></div>
      </Glass>
      <div className="interview-side">
        <Glass><CardHead icon={<FileText/>} title="Question Details"/><dl><dt>Category</dt><dd>{APP_DATA.interview.category}</dd><dt>Difficulty</dt><dd>{APP_DATA.interview.difficulty}</dd><dt>Topic</dt><dd>{APP_DATA.interview.topic}</dd></dl></Glass>
        <Glass><CardHead icon={<BarChart3/>} title="Interview Progress"/><div className="score-panel compact"><ProgressRing value={Math.min(100,count*10)}/><div><p>Questions Attempted <b>{count}</b></p><p>Total Questions <b>{APP_DATA.interview.totalQuestions}</b></p><p>Time Spent <b>—</b></p></div></div></Glass>
        <Glass><CardHead icon={<Clock3/>} title="Previous Questions" link="View All"/>{[1,2,3,4].map(i=><div className="prev-q" key={i}><b>{i}</b><span>Previous interview question</span></div>)}</Glass>
      </div>
    </div>
  </AppShell>
}

function KeyboardIcon(){return <span style={{fontSize:16}}>⌨</span>}

function Profile({setPage}) {
  return <AppShell page="profile" setPage={setPage}><PageTitle title="Profile" subtitle="Your CareerSage account details."/><Glass className="profile-card"><Logo/><h2>{APP_DATA.user.name}</h2><p>{APP_DATA.user.email}</p><p>{APP_DATA.user.phone}</p><button className="secondary" onClick={()=>setPage("landing")}>Log out</button></Glass></AppShell>
}

function App(){
  const [page,setPage]=useState("landing");
  const goLogin=()=>setPage("login");
  if(page==="landing") return <Landing go={goLogin}/>;
  if(page==="login") return <Login go={()=>setPage("upload")}/>;
  if(page==="upload") return <ResumeUpload setPage={setPage}/>;
  if(page==="analyzing") return <Analyzing setPage={setPage}/>;
  if(page==="done") return <Done setPage={setPage}/>;
  if(page==="home") return <Dashboard setPage={setPage}/>;
  if(page==="resume") return <ResumeAnalysis setPage={setPage}/>;
  if(page==="preparation") return <Preparation setPage={setPage}/>;
  if(page==="interview") return <Interview setPage={setPage}/>;
  if(page==="progress") return <ProgressPage p={APP_DATA.preparation} setPage={setPage} back={()=>setPage("preparation")}/>;
  if(page==="profile") return <Profile setPage={setPage}/>;
  return <Landing go={goLogin}/>;
}
createRoot(document.getElementById("root")).render(<App/>);