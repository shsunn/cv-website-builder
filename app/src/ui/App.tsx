import React, { useEffect, useRef, useState } from 'react';
import { downloadPdfFromElement } from '../utils/pdf';
import { CvData } from '../utils/schema';

export const App: React.FC = () => {
  const [data, setData] = useState<CvData | null>(null);
  const cvRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = async () => {
      const res = await fetch('/data/sample.json', { cache: 'no-store' });
      const json = await res.json();
      setData(json);
    };
    load().catch(() => setData(null));
  }, []);

  if (!data) {
    return (
      <div className="container">
        <div className="toolbar"><h1>CV Preview</h1></div>
        <div style={{padding: 16, color: '#666'}}>Loading data...</div>
      </div>
    );
  }

  const isContest = (p: CvData['projects'][number]) => /競賽|Contest/i.test(p.title);
  const isEmc = (p: CvData['projects'][number]) => /EMC|Signal Integrity/i.test(p.title) || (p.tags || []).includes('EMC');
  const isEda = (p: CvData['projects'][number]) => !isContest(p) && !isEmc(p);

  const contestList = (data.projects || []).filter(isContest);
  const edaList = (data.projects || []).filter(isEda);
  const emcList = (data.projects || []).filter(isEmc);

  return (
    <div className="container">
      <div className="toolbar">
        <h1>CV Preview</h1>
        <div className="spacer" />
        <button onClick={() => cvRef.current && downloadPdfFromElement(cvRef.current, 'cv.pdf')}>Download PDF</button>
      </div>
      <div className="page" ref={cvRef}>
        <Header data={data} />
        {data.overview?.length ? (
          <Section title="概述">
            <ul>
              {data.overview.map((l, i) => (<li key={i}>{l}</li>))}
            </ul>
          </Section>
        ) : null}
        {data.timeline?.length ? (
          <Section title="學習脈絡與展望">
            <div className="timeline">
              {data.timeline.map((t, i) => (
                <div className="tl-item" key={i}>
                  <div className="tl-dot" />
                  <span className="tl-term">{t.term}</span>
                  <span className="tl-desc">{t.desc}</span>
                </div>
              ))}
            </div>
          </Section>
        ) : null}
        <div className="row">
          <div className="col-7">
            <Section title="專題與競賽">
              {contestList.length ? (
                <div>
                  <h3>競賽</h3>
                  {contestList.map((p, i) => (
                    <ProjectItem p={p} key={`contest-${i}`} />
                  ))}
                </div>
              ) : null}
              {edaList.length ? (
                <div>
                  <h3>EDA</h3>
                  {edaList.map((p, i) => (
                    <ProjectItem p={p} key={`eda-${i}`} />
                  ))}
                </div>
              ) : null}
              {emcList.length ? (
                <div>
                  <h3>EMC</h3>
                  {emcList.map((p, i) => (
                    <ProjectItem p={p} key={`emc-${i}`} />
                  ))}
                </div>
              ) : null}
            </Section>
          </div>
          <div className="col-5">
            <Section title="學歷">
              <ul>
                {data.education.map((e, i) => (
                  <li key={i}>
                    <strong>{e.school}</strong>，{e.program}（{e.start}—{e.end}）<br/>
                    <span className="small">{e.desc}</span>
                  </li>
                ))}
              </ul>
            </Section>
            <Section title="技術與工具">
              <ul>
                {data.skills.map((s, i) => (
                  <li key={i}><strong>{s.category}：</strong>{s.items.join(', ')}</li>
                ))}
              </ul>
            </Section>
            {data.clubs?.length ? (
              <Section title="社團參與">
                <ul>
                  {data.clubs.map((c, i) => (
                    <li key={i}>
                      <strong>{c.name}</strong>{c.role ? `（${c.role}）` : ''}
                      {c.desc ? <><br/><span className="small">{c.desc}</span></> : ''}
                    </li>
                  ))}
                </ul>
              </Section>
            ) : null}
            {data.sports?.length ? (
              <Section title="運動習慣">
                <ul className="small">
                  {data.sports.map((s, i) => (<li key={i}>{s}</li>))}
                </ul>
              </Section>
            ) : null}
          </div>
        </div>
        <div style={{ textAlign: 'center', fontSize: '10px', color: '#888', marginTop: '20px', paddingTop: '10px', borderTop: '1px solid #eee' }}>
          Built with React + TypeScript
        </div>
      </div>
    </div>
  );
};

const ProjectItem: React.FC<{ p: CvData['projects'][number] }> = ({ p }) => (
  <div>
    <div className="item-head">
      <h3>{p.title}</h3>
      <div className="item-sub">{p.start} — {p.end}</div>
    </div>
    <div className="item-sub">{p.advisor}{p.org ? `｜${p.org}` : ''}</div>
    {p.tags?.length ? (
      <div>{p.tags.map((t, j) => (<span className="tag" key={j}>{t}</span>))}</div>
    ) : null}
    <ul className="bullet">
      {p.bullets.map((b, j) => (<li key={j}>{b}</li>))}
    </ul>
  </div>
);

const Header: React.FC<{ data: CvData }> = ({ data }) => (
  <header className="header">
    <div>
      <div className="name">{data.name}（{data.englishName}）</div>
      
    </div>
    <div className="meta">
      <div>{data.email}</div>
      {data.github ? (<div><a href={data.github} target="_blank" rel="noopener noreferrer">{data.github}</a></div>) : null}
      {data.phone ? (<div>{data.phone}</div>) : null}
      {data.links?.length ? (
        <div>{data.links.map((l, i) => (<span className="pill" key={i}>{l}</span>))}</div>
      ) : null}
    </div>
  </header>
);

const Section: React.FC<React.PropsWithChildren<{ title: string }>> = ({ title, children }) => (
  <section>
    <h2>{title}</h2>
    {children}
  </section>
);

