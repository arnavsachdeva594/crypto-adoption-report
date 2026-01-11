import React, { useState, useRef } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, ScatterChart, Scatter, ComposedChart, Cell } from 'recharts';
import { TrendingUp, Plus, Trash2, Edit3, Save, Database, Activity, FileText, Lightbulb, Download, ChevronRight, X, Check, RefreshCw } from 'lucide-react';

const INITIAL_CONFIG = {
  projectTitle: "Crypto as a Hedge Against Macroeconomic Instability",
  projectSubtitle: "Investigating the relationship between economic stress indicators and cryptocurrency adoption patterns across global markets",
  reportDate: "2025",
  author: "Research Team",
  institution: "Your Institution",
  researchQuestion: "Does cryptocurrency adoption increase during periods of macroeconomic instability, and can crypto serve as a hedge or alternative financial system during economic stress?",
  
  keyFindings: [
    { id: 1, metric: "Correlation Coefficient", value: "0.73", subtitle: "Inflation vs Crypto Adoption", trend: "positive" },
    { id: 2, metric: "Forecast Accuracy", value: "87.2%", subtitle: "ARIMA Model Performance", trend: "positive" },
    { id: 3, metric: "Countries Analyzed", value: "42", subtitle: "Across 6 Regions", trend: "neutral" },
    { id: 4, metric: "Time Period", value: "2019-2025", subtitle: "Monthly Data Points", trend: "neutral" },
  ],

  macroIndicators: [
    { name: "Inflation Rate (CPI)", source: "World Bank, IMF", frequency: "Monthly" },
    { name: "Currency Devaluation", source: "Central Banks", frequency: "Daily" },
    { name: "GDP Growth Rate", source: "World Bank", frequency: "Quarterly" },
    { name: "Unemployment Rate", source: "ILO, National Stats", frequency: "Monthly" },
    { name: "Interest Rates", source: "Central Banks", frequency: "Monthly" },
    { name: "Political Stability Index", source: "World Bank WGI", frequency: "Annual" },
  ],
  
  cryptoMetrics: [
    { name: "Wallet Addresses (Active)", source: "Glassnode, Chainalysis", frequency: "Daily" },
    { name: "P2P Trading Volume", source: "LocalBitcoins, Paxful", frequency: "Weekly" },
    { name: "Exchange Inflows", source: "CryptoQuant", frequency: "Daily" },
    { name: "Stablecoin Market Cap", source: "DeFiLlama", frequency: "Daily" },
    { name: "Google Trends (Crypto)", source: "Google Trends API", frequency: "Weekly" },
    { name: "Adoption Index Score", source: "Chainalysis", frequency: "Annual" },
  ],

  timeSeriesData: [
    { period: "Q1 2023", inflation: 6.2, adoption: 12.4, p2pVolume: 2.1 },
    { period: "Q2 2023", inflation: 5.8, adoption: 14.2, p2pVolume: 2.4 },
    { period: "Q3 2023", inflation: 5.1, adoption: 15.8, p2pVolume: 2.8 },
    { period: "Q4 2023", inflation: 4.8, adoption: 18.1, p2pVolume: 3.2 },
    { period: "Q1 2024", inflation: 5.4, adoption: 21.3, p2pVolume: 3.9 },
    { period: "Q2 2024", inflation: 6.1, adoption: 24.7, p2pVolume: 4.5 },
    { period: "Q3 2024", inflation: 7.2, adoption: 28.9, p2pVolume: 5.8 },
    { period: "Q4 2024", inflation: 6.8, adoption: 31.2, p2pVolume: 6.2 },
    { period: "Q1 2025", inflation: 5.9, adoption: 33.5, p2pVolume: 6.8 },
    { period: "Q2 2025", inflation: 5.2, adoption: 35.1, p2pVolume: 7.1 },
  ],

  correlationData: [
    { inflation: 2.1, adoption: 8.2, country: "Japan" },
    { inflation: 3.4, adoption: 12.5, country: "Germany" },
    { inflation: 4.2, adoption: 15.3, country: "USA" },
    { inflation: 5.8, adoption: 22.1, country: "Brazil" },
    { inflation: 7.2, adoption: 28.4, country: "India" },
    { inflation: 8.9, adoption: 31.2, country: "Nigeria" },
    { inflation: 12.4, adoption: 38.7, country: "Turkey" },
    { inflation: 18.2, adoption: 42.1, country: "Argentina" },
    { inflation: 25.6, adoption: 48.3, country: "Venezuela" },
    { inflation: 6.1, adoption: 35.2, country: "Vietnam" },
    { inflation: 4.8, adoption: 18.9, country: "UK" },
    { inflation: 9.5, adoption: 33.8, country: "Philippines" },
  ],

  regionalData: [
    { region: "Latin America", highInflation: 42.3, lowInflation: 15.2 },
    { region: "Sub-Saharan Africa", highInflation: 38.7, lowInflation: 12.8 },
    { region: "Southeast Asia", highInflation: 31.5, lowInflation: 18.4 },
    { region: "Eastern Europe", highInflation: 28.9, lowInflation: 14.1 },
    { region: "North America", highInflation: 18.2, lowInflation: 16.8 },
    { region: "Western Europe", highInflation: 14.5, lowInflation: 12.9 },
  ],

  forecastData: [
    { period: "Q3 2025", predicted: 36.8, lower: 34.2, upper: 39.4 },
    { period: "Q4 2025", predicted: 38.2, lower: 35.1, upper: 41.3 },
    { period: "Q1 2026", predicted: 39.5, lower: 35.8, upper: 43.2 },
    { period: "Q2 2026", predicted: 41.1, lower: 36.5, upper: 45.7 },
  ],
  
  modelMetrics: [
    { model: "ARIMA(2,1,2)", rmse: 1.82, mape: "4.2%" },
    { model: "VAR(3)", rmse: 2.14, mape: "5.1%" },
    { model: "LSTM Neural Net", rmse: 1.67, mape: "3.8%" },
    { model: "Prophet", rmse: 1.94, mape: "4.5%" },
  ],

  insights: [
    { id: 1, category: "Hedge Behavior", title: "Crypto as Inflation Hedge Confirmed", description: "Countries experiencing >10% annual inflation showed 2.8x higher crypto adoption rates compared to stable economies.", implication: "Crypto serves as a store of value in high-inflation environments." },
    { id: 2, category: "Currency Crisis", title: "Currency Devaluation Drives P2P Volume", description: "P2P trading volume increases by 34% on average within 30 days of significant currency devaluation events.", implication: "Crypto provides an escape valve during currency crises." },
    { id: 3, category: "Regional Patterns", title: "Emerging Markets Lead Adoption", description: "Adoption in emerging markets is 2.3x more sensitive to macroeconomic shocks compared to developed economies.", implication: "Financial inclusion gaps make crypto attractive as an alternative system." },
    { id: 4, category: "Predictive Power", title: "Macro Indicators as Leading Signals", description: "Inflation rate changes predict crypto adoption shifts with a 2-3 month lag.", implication: "Macro indicators can forecast adoption trends." },
  ],

  methodology: {
    dataCollection: "Panel data from 42 countries (2019-2025), combining macroeconomic indicators from IMF/World Bank with on-chain crypto metrics.",
    analysis: "Granger causality tests, VAR modeling, and correlation analysis. ARIMA and LSTM models for forecasting.",
    limitations: "Data availability varies by country; some adoption metrics are estimates; regulatory changes create structural breaks."
  },
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#0f0f17', border: '1px solid #1e1e2e', padding: '12px 16px', borderRadius: '4px' }}>
        <p style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '8px' }}>{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color, fontSize: '13px', fontWeight: 500, marginBottom: '4px' }}>
            {entry.name}: {typeof entry.value === 'number' ? entry.value.toFixed(1) : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const ScatterTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div style={{ background: '#0f0f17', border: '1px solid #1e1e2e', padding: '12px 16px', borderRadius: '4px' }}>
        <p style={{ color: '#e2e8f0', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>{data.country}</p>
        <p style={{ color: '#f87171', fontSize: '12px' }}>Inflation: {data.inflation}%</p>
        <p style={{ color: '#22d3ee', fontSize: '12px' }}>Adoption: {data.adoption}%</p>
      </div>
    );
  }
  return null;
};

export default function CryptoAdoptionReport() {
  const [config, setConfig] = useState(INITIAL_CONFIG);
  const [editMode, setEditMode] = useState(false);
  const [editingSection, setEditingSection] = useState(null);
  const [tempData, setTempData] = useState({});
  const [activeNav, setActiveNav] = useState('overview');
  const [notification, setNotification] = useState(null);
  const [showDownloadModal, setShowDownloadModal] = useState(false);

  // Refs for scrolling
  const overviewRef = useRef(null);
  const dataSourcesRef = useRef(null);
  const visualizationsRef = useRef(null);
  const forecastingRef = useRef(null);
  const insightsRef = useRef(null);
  const methodologyRef = useRef(null);

  const refs = {
    overview: overviewRef,
    dataSources: dataSourcesRef,
    visualizations: visualizationsRef,
    forecasting: forecastingRef,
    insights: insightsRef,
    methodology: methodologyRef,
  };

  const scrollToSection = (sectionId) => {
    setActiveNav(sectionId);
    refs[sectionId]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const updateConfig = (key, value) => setConfig(prev => ({ ...prev, [key]: value }));
  
  const startEditing = (section, data) => { 
    setEditingSection(section); 
    setTempData(JSON.parse(JSON.stringify(data))); 
  };
  
  const saveEditing = (key) => { 
    updateConfig(key, tempData); 
    setEditingSection(null); 
    setTempData({}); 
    showNotification('Changes saved successfully!');
  };
  
  const cancelEditing = () => { 
    setEditingSection(null); 
    setTempData({}); 
  };

  const resetToDefaults = () => {
    setConfig(INITIAL_CONFIG);
    showNotification('Reset to default data');
  };

  const downloadAsJSON = () => {
    const dataStr = JSON.stringify(config, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'crypto-adoption-report-data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showNotification('JSON data downloaded!');
    setShowDownloadModal(false);
  };

  const downloadAsCSV = () => {
    let csv = 'Period,Inflation,Adoption,P2P Volume\n';
    config.timeSeriesData.forEach(row => {
      csv += `${row.period},${row.inflation},${row.adoption},${row.p2pVolume}\n`;
    });
    const dataBlob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'crypto-adoption-timeseries.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showNotification('CSV data downloaded!');
    setShowDownloadModal(false);
  };

  const styles = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    .edit-btn { background: transparent; border: 1px solid #2d2d44; color: #64748b; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-size: 11px; display: flex; align-items: center; gap: 6px; transition: all 0.2s; }
    .edit-btn:hover { border-color: #22d3ee; color: #22d3ee; }
    .input-field { background: #0f0f17; border: 1px solid #1e1e2e; color: #e2e8f0; padding: 10px 14px; border-radius: 4px; font-size: 14px; width: 100%; font-family: inherit; }
    .input-field:focus { outline: none; border-color: #22d3ee; }
    .save-btn { background: #22d3ee; border: none; color: #08080c; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-weight: 600; display: flex; align-items: center; gap: 6px; font-size: 13px; transition: all 0.2s; }
    .save-btn:hover { background: #06b6d4; transform: translateY(-1px); }
    .cancel-btn { background: transparent; border: 1px solid #2d2d44; color: #64748b; padding: 8px 16px; border-radius: 4px; cursor: pointer; font-size: 13px; transition: all 0.2s; }
    .cancel-btn:hover { border-color: #64748b; }
    .card { background: #0c0c12; border: 1px solid #16161f; border-radius: 6px; padding: 24px; }
    .section-label { font-size: 10px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #22d3ee; margin-bottom: 12px; display: flex; align-items: center; gap: 8px; }
    .objective-tag { background: rgba(34, 211, 238, 0.1); color: #22d3ee; padding: 4px 10px; border-radius: 3px; font-size: 10px; font-weight: 700; letter-spacing: 1px; }
    .data-table { width: 100%; border-collapse: collapse; }
    .data-table th, .data-table td { padding: 12px; text-align: left; border-bottom: 1px solid #16161f; font-size: 13px; }
    .data-table th { color: #4a5568; font-size: 10px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
    .delete-btn { background: transparent; border: none; color: #f87171; cursor: pointer; padding: 4px; border-radius: 4px; opacity: 0.6; transition: all 0.2s; }
    .delete-btn:hover { opacity: 1; background: rgba(248, 113, 113, 0.1); }
    .add-row-btn { background: transparent; border: 1px dashed #2d2d44; color: #4a5568; padding: 12px; width: 100%; border-radius: 4px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; margin-top: 16px; font-size: 12px; transition: all 0.2s; }
    .add-row-btn:hover { border-color: #22d3ee; color: #22d3ee; }
    .stat-card { background: #0c0c12; border: 1px solid #16161f; border-radius: 6px; padding: 20px 24px; transition: all 0.3s; }
    .stat-card:hover { border-color: #22d3ee33; transform: translateY(-2px); }
    .insight-card { background: #0c0c12; border: 1px solid #16161f; border-radius: 6px; padding: 24px; position: relative; transition: all 0.3s; }
    .insight-card:hover { border-color: #22d3ee33; }
    .insight-card::before { content: ''; position: absolute; top: 0; left: 0; width: 3px; height: 100%; background: #22d3ee; border-radius: 6px 0 0 6px; }
    .nav-link { color: #4a5568; font-size: 12px; padding: 10px 16px; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 8px; border-left: 2px solid transparent; margin-left: -2px; }
    .nav-link:hover { color: #e2e8f0; background: rgba(255,255,255,0.02); }
    .nav-link.active { color: #22d3ee; border-left-color: #22d3ee; background: rgba(34, 211, 238, 0.05); }
    .footer-link { color: #4a5568; font-size: 12px; cursor: pointer; transition: all 0.2s; padding: 8px 12px; border-radius: 4px; }
    .footer-link:hover { color: #22d3ee; background: rgba(34, 211, 238, 0.1); }
    .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 1000; }
    .modal { background: #0c0c12; border: 1px solid #16161f; border-radius: 8px; padding: 32px; max-width: 400px; width: 90%; }
    .download-option { background: #0f0f17; border: 1px solid #1e1e2e; border-radius: 6px; padding: 16px 20px; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
    .download-option:hover { border-color: #22d3ee; background: rgba(34, 211, 238, 0.05); }
    .notification { position: fixed; top: 24px; right: 24px; background: #0c0c12; border: 1px solid #22d3ee; border-radius: 6px; padding: 16px 20px; display: flex; align-items: center; gap: 12px; z-index: 1001; animation: slideIn 0.3s ease; }
    @keyframes slideIn { from { transform: translateX(100px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
  `;

  return (
    <div style={{ minHeight: '100vh', background: '#08080c', color: '#e2e8f0', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <style>{styles}</style>

      {/* Notification */}
      {notification && (
        <div className="notification">
          <Check size={16} style={{ color: '#22d3ee' }} />
          <span style={{ fontSize: '13px' }}>{notification.message}</span>
        </div>
      )}

      {/* Download Modal */}
      {showDownloadModal && (
        <div className="modal-overlay" onClick={() => setShowDownloadModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 600 }}>Download Data</h3>
              <button onClick={() => setShowDownloadModal(false)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <div className="download-option" onClick={downloadAsJSON}>
              <Download size={20} style={{ color: '#22d3ee' }} />
              <div>
                <p style={{ fontWeight: 600, marginBottom: '4px' }}>Download as JSON</p>
                <p style={{ fontSize: '12px', color: '#64748b' }}>Complete dataset with all configurations</p>
              </div>
            </div>
            <div className="download-option" onClick={downloadAsCSV}>
              <FileText size={20} style={{ color: '#a78bfa' }} />
              <div>
                <p style={{ fontWeight: 600, marginBottom: '4px' }}>Download as CSV</p>
                <p style={{ fontSize: '12px', color: '#64748b' }}>Time series data for spreadsheet analysis</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar */}
      <nav style={{ position: 'fixed', left: 0, top: 0, bottom: 0, width: '220px', background: '#0a0a0f', borderRight: '1px solid #16161f', padding: '32px 0', zIndex: 100, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '0 20px', marginBottom: '40px' }}>
          <span style={{ fontWeight: 700, fontSize: '14px', color: '#22d3ee', letterSpacing: '1px' }}>MACRO/CRYPTO</span>
          <p style={{ color: '#4a5568', fontSize: '11px', marginTop: '4px' }}>Research Report</p>
        </div>
        
        <div style={{ flex: 1 }}>
          <p style={{ color: '#4a5568', fontSize: '10px', fontWeight: 600, marginBottom: '12px', letterSpacing: '1px', padding: '0 20px' }}>NAVIGATION</p>
          <div className={`nav-link ${activeNav === 'overview' ? 'active' : ''}`} onClick={() => scrollToSection('overview')}><ChevronRight size={14} />Overview</div>
          <div className={`nav-link ${activeNav === 'dataSources' ? 'active' : ''}`} onClick={() => scrollToSection('dataSources')}><ChevronRight size={14} />Data Sources</div>
          <div className={`nav-link ${activeNav === 'visualizations' ? 'active' : ''}`} onClick={() => scrollToSection('visualizations')}><ChevronRight size={14} />Visualizations</div>
          <div className={`nav-link ${activeNav === 'forecasting' ? 'active' : ''}`} onClick={() => scrollToSection('forecasting')}><ChevronRight size={14} />Forecasting</div>
          <div className={`nav-link ${activeNav === 'insights' ? 'active' : ''}`} onClick={() => scrollToSection('insights')}><ChevronRight size={14} />Insights</div>
          <div className={`nav-link ${activeNav === 'methodology' ? 'active' : ''}`} onClick={() => scrollToSection('methodology')}><ChevronRight size={14} />Methodology</div>
        </div>

        <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button className="edit-btn" onClick={() => setEditMode(!editMode)} style={{ width: '100%', justifyContent: 'center', background: editMode ? '#22d3ee' : 'transparent', color: editMode ? '#08080c' : '#64748b' }}>
            <Edit3 size={12} />{editMode ? 'Exit Edit' : 'Edit Data'}
          </button>
          {editMode && (
            <button className="edit-btn" onClick={resetToDefaults} style={{ width: '100%', justifyContent: 'center' }}>
              <RefreshCw size={12} />Reset Data
            </button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ marginLeft: '220px', minHeight: '100vh' }}>
        
        {/* Overview Section */}
        <header ref={overviewRef} style={{ padding: '80px 64px', borderBottom: '1px solid #16161f' }}>
          <div style={{ maxWidth: '900px' }}>
            <div className="section-label"><Activity size={14} />Research Study — {config.reportDate}</div>
            <h1 style={{ fontSize: '38px', fontWeight: 700, lineHeight: 1.15, marginBottom: '20px', letterSpacing: '-1px' }}>{config.projectTitle}</h1>
            <p style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.7, maxWidth: '700px' }}>{config.projectSubtitle}</p>
            <div style={{ marginTop: '32px', padding: '20px 24px', background: 'rgba(34, 211, 238, 0.03)', border: '1px solid rgba(34, 211, 238, 0.15)', borderRadius: '6px' }}>
              <p style={{ color: '#22d3ee', fontSize: '10px', fontWeight: 700, marginBottom: '8px', letterSpacing: '1px' }}>RESEARCH QUESTION</p>
              <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.6 }}>{config.researchQuestion}</p>
            </div>
          </div>
        </header>

        {/* Key Findings */}
        <section style={{ padding: '64px', borderBottom: '1px solid #16161f' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <div className="section-label"><TrendingUp size={14} />Key Findings</div>
            {editMode && <button className="edit-btn" onClick={() => startEditing('keyFindings', config.keyFindings)}><Edit3 size={12} /> Edit</button>}
          </div>
          {editMode && editingSection === 'keyFindings' ? (
            <div className="card">
              <table className="data-table"><thead><tr><th>Metric</th><th>Value</th><th>Subtitle</th><th></th></tr></thead>
                <tbody>{tempData.map((item, i) => (<tr key={item.id}><td><input className="input-field" value={item.metric} onChange={(e) => { const u = [...tempData]; u[i].metric = e.target.value; setTempData(u); }} /></td><td><input className="input-field" value={item.value} onChange={(e) => { const u = [...tempData]; u[i].value = e.target.value; setTempData(u); }} /></td><td><input className="input-field" value={item.subtitle} onChange={(e) => { const u = [...tempData]; u[i].subtitle = e.target.value; setTempData(u); }} /></td><td><button className="delete-btn" onClick={() => setTempData(tempData.filter((_, idx) => idx !== i))}><Trash2 size={14} /></button></td></tr>))}</tbody></table>
              <button className="add-row-btn" onClick={() => setTempData([...tempData, { id: Date.now(), metric: '', value: '', subtitle: '', trend: 'neutral' }])}><Plus size={14} /> Add Row</button>
              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}><button className="save-btn" onClick={() => saveEditing('keyFindings')}><Save size={14} /> Save Changes</button><button className="cancel-btn" onClick={cancelEditing}>Cancel</button></div>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
              {config.keyFindings.map((item) => (<div key={item.id} className="stat-card"><p style={{ color: '#4a5568', fontSize: '12px', marginBottom: '8px' }}>{item.metric}</p><p style={{ fontSize: '32px', fontWeight: 700, color: item.trend === 'positive' ? '#22d3ee' : '#e2e8f0' }}>{item.value}</p><p style={{ color: '#64748b', fontSize: '12px', marginTop: '6px' }}>{item.subtitle}</p></div>))}
            </div>
          )}
        </section>

        {/* Data Sources */}
        <section ref={dataSourcesRef} style={{ padding: '64px', borderBottom: '1px solid #16161f' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}><span className="objective-tag">OBJ 1 & 2</span><div className="section-label" style={{ marginBottom: 0 }}><Database size={14} />Data Sources & Integration</div></div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            <div><h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '16px', color: '#f87171' }}>Macroeconomic Indicators</h3><div className="card" style={{ padding: 0 }}><table className="data-table"><thead><tr><th>Indicator</th><th>Source</th><th>Freq.</th></tr></thead><tbody>{config.macroIndicators.map((item, i) => (<tr key={i}><td style={{ fontWeight: 500 }}>{item.name}</td><td style={{ color: '#64748b' }}>{item.source}</td><td style={{ color: '#64748b' }}>{item.frequency}</td></tr>))}</tbody></table></div></div>
            <div><h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '16px', color: '#22d3ee' }}>Crypto Adoption Metrics</h3><div className="card" style={{ padding: 0 }}><table className="data-table"><thead><tr><th>Metric</th><th>Source</th><th>Freq.</th></tr></thead><tbody>{config.cryptoMetrics.map((item, i) => (<tr key={i}><td style={{ fontWeight: 500 }}>{item.name}</td><td style={{ color: '#64748b' }}>{item.source}</td><td style={{ color: '#64748b' }}>{item.frequency}</td></tr>))}</tbody></table></div></div>
          </div>
        </section>

        {/* Visualizations */}
        <section ref={visualizationsRef} style={{ padding: '64px', borderBottom: '1px solid #16161f' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}><span className="objective-tag">OBJ 3</span><div className="section-label" style={{ marginBottom: 0 }}><Activity size={14} />Interactive Visualizations</div>{editMode && <button className="edit-btn" style={{ marginLeft: 'auto' }} onClick={() => startEditing('timeSeriesData', config.timeSeriesData)}><Edit3 size={12} /> Edit Data</button>}</div>
          {editMode && editingSection === 'timeSeriesData' ? (
            <div className="card">
              <table className="data-table"><thead><tr><th>Period</th><th>Inflation %</th><th>Adoption %</th><th>P2P Vol ($B)</th><th></th></tr></thead><tbody>{tempData.map((row, i) => (<tr key={i}><td><input className="input-field" value={row.period} onChange={(e) => { const u = [...tempData]; u[i].period = e.target.value; setTempData(u); }} /></td><td><input className="input-field" type="number" step="0.1" value={row.inflation} onChange={(e) => { const u = [...tempData]; u[i].inflation = parseFloat(e.target.value) || 0; setTempData(u); }} /></td><td><input className="input-field" type="number" step="0.1" value={row.adoption} onChange={(e) => { const u = [...tempData]; u[i].adoption = parseFloat(e.target.value) || 0; setTempData(u); }} /></td><td><input className="input-field" type="number" step="0.1" value={row.p2pVolume} onChange={(e) => { const u = [...tempData]; u[i].p2pVolume = parseFloat(e.target.value) || 0; setTempData(u); }} /></td><td><button className="delete-btn" onClick={() => setTempData(tempData.filter((_, idx) => idx !== i))}><Trash2 size={14} /></button></td></tr>))}</tbody></table>
              <button className="add-row-btn" onClick={() => setTempData([...tempData, { period: '', inflation: 0, adoption: 0, p2pVolume: 0 }])}><Plus size={14} /> Add Period</button>
              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}><button className="save-btn" onClick={() => saveEditing('timeSeriesData')}><Save size={14} /> Save Changes</button><button className="cancel-btn" onClick={cancelEditing}>Cancel</button></div>
            </div>
          ) : (
            <>
              <div className="card" style={{ marginBottom: '32px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '20px' }}>Macro Indicators vs. Crypto Adoption Over Time</h4>
                <div style={{ height: '350px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <ComposedChart data={config.timeSeriesData}><CartesianGrid strokeDasharray="3 3" stroke="#16161f" /><XAxis dataKey="period" stroke="#4a5568" tick={{ fill: '#4a5568', fontSize: 11 }} /><YAxis yAxisId="left" stroke="#4a5568" tick={{ fill: '#4a5568', fontSize: 11 }} /><YAxis yAxisId="right" orientation="right" stroke="#4a5568" tick={{ fill: '#4a5568', fontSize: 11 }} /><Tooltip content={<CustomTooltip />} /><Area yAxisId="left" type="monotone" dataKey="adoption" fill="rgba(34, 211, 238, 0.1)" stroke="#22d3ee" strokeWidth={2} name="Adoption %" /><Line yAxisId="left" type="monotone" dataKey="inflation" stroke="#f87171" strokeWidth={2} dot={{ fill: '#f87171', r: 3 }} name="Inflation %" /><Bar yAxisId="right" dataKey="p2pVolume" fill="rgba(167, 139, 250, 0.4)" name="P2P Volume ($B)" /></ComposedChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ display: 'flex', gap: '24px', marginTop: '16px', justifyContent: 'center' }}><div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '20px', height: '3px', background: '#22d3ee' }} /><span style={{ color: '#64748b', fontSize: '12px' }}>Adoption %</span></div><div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '20px', height: '3px', background: '#f87171' }} /><span style={{ color: '#64748b', fontSize: '12px' }}>Inflation %</span></div><div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '12px', height: '12px', background: 'rgba(167, 139, 250, 0.4)', borderRadius: '2px' }} /><span style={{ color: '#64748b', fontSize: '12px' }}>P2P Volume</span></div></div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                <div className="card"><h4 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '20px' }}>Inflation vs. Adoption Correlation</h4><div style={{ height: '280px' }}><ResponsiveContainer width="100%" height="100%"><ScatterChart margin={{ top: 10, right: 10, bottom: 20, left: 0 }}><CartesianGrid strokeDasharray="3 3" stroke="#16161f" /><XAxis type="number" dataKey="inflation" name="Inflation" unit="%" stroke="#4a5568" tick={{ fill: '#4a5568', fontSize: 11 }} /><YAxis type="number" dataKey="adoption" name="Adoption" unit="%" stroke="#4a5568" tick={{ fill: '#4a5568', fontSize: 11 }} /><Tooltip content={<ScatterTooltip />} /><Scatter name="Countries" data={config.correlationData} fill="#22d3ee">{config.correlationData.map((entry, index) => (<Cell key={index} fill={entry.inflation > 10 ? '#f87171' : entry.inflation > 5 ? '#fb923c' : '#22d3ee'} />))}</Scatter></ScatterChart></ResponsiveContainer></div><p style={{ color: '#64748b', fontSize: '12px', marginTop: '12px', textAlign: 'center' }}>r = 0.73 — Strong positive correlation</p></div>
                <div className="card"><h4 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '20px' }}>Regional: High vs. Low Inflation Adoption</h4><div style={{ height: '280px' }}><ResponsiveContainer width="100%" height="100%"><BarChart data={config.regionalData} layout="vertical" margin={{ left: 20 }}><CartesianGrid strokeDasharray="3 3" stroke="#16161f" horizontal={false} /><XAxis type="number" stroke="#4a5568" tick={{ fill: '#4a5568', fontSize: 11 }} /><YAxis type="category" dataKey="region" stroke="#4a5568" tick={{ fill: '#64748b', fontSize: 10 }} width={100} /><Tooltip content={<CustomTooltip />} /><Bar dataKey="highInflation" fill="#f87171" radius={[0, 3, 3, 0]} name="High Inflation" /><Bar dataKey="lowInflation" fill="#22d3ee" radius={[0, 3, 3, 0]} name="Low Inflation" /></BarChart></ResponsiveContainer></div><div style={{ display: 'flex', gap: '20px', marginTop: '12px', justifyContent: 'center' }}><div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '10px', height: '10px', background: '#f87171', borderRadius: '2px' }} /><span style={{ color: '#64748b', fontSize: '11px' }}>High Inflation</span></div><div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '10px', height: '10px', background: '#22d3ee', borderRadius: '2px' }} /><span style={{ color: '#64748b', fontSize: '11px' }}>Low Inflation</span></div></div></div>
              </div>
            </>
          )}
        </section>

        {/* Forecasting */}
        <section ref={forecastingRef} style={{ padding: '64px', borderBottom: '1px solid #16161f' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}><span className="objective-tag">OBJ 4</span><div className="section-label" style={{ marginBottom: 0 }}><TrendingUp size={14} />Time-Series Forecasting</div></div>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
            <div className="card"><h4 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '20px' }}>Adoption Forecast with Confidence Intervals</h4><div style={{ height: '300px' }}><ResponsiveContainer width="100%" height="100%"><ComposedChart data={[...config.timeSeriesData.slice(-4), ...config.forecastData]}><CartesianGrid strokeDasharray="3 3" stroke="#16161f" /><XAxis dataKey="period" stroke="#4a5568" tick={{ fill: '#4a5568', fontSize: 11 }} /><YAxis stroke="#4a5568" tick={{ fill: '#4a5568', fontSize: 11 }} domain={['dataMin - 5', 'dataMax + 5']} /><Tooltip content={<CustomTooltip />} /><Area type="monotone" dataKey="upper" fill="rgba(34, 211, 238, 0.08)" stroke="none" name="Upper CI" /><Line type="monotone" dataKey="adoption" stroke="#22d3ee" strokeWidth={2} dot={{ fill: '#22d3ee', r: 4 }} name="Actual" /><Line type="monotone" dataKey="predicted" stroke="#a78bfa" strokeWidth={2} strokeDasharray="6 4" dot={{ fill: '#a78bfa', r: 4 }} name="Forecast" /></ComposedChart></ResponsiveContainer></div><div style={{ display: 'flex', gap: '20px', marginTop: '16px', justifyContent: 'center' }}><div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '20px', height: '3px', background: '#22d3ee' }} /><span style={{ color: '#64748b', fontSize: '11px' }}>Actual</span></div><div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><div style={{ width: '20px', height: '3px', background: '#a78bfa' }} /><span style={{ color: '#64748b', fontSize: '11px' }}>Forecast</span></div></div></div>
            <div className="card" style={{ padding: 0 }}><h4 style={{ fontSize: '15px', fontWeight: 600, padding: '20px 20px 16px' }}>Model Performance</h4><table className="data-table"><thead><tr><th>Model</th><th>RMSE</th><th>MAPE</th></tr></thead><tbody>{config.modelMetrics.map((row, i) => { const isBest = row.rmse === Math.min(...config.modelMetrics.map(m => m.rmse)); return (<tr key={i}><td><span style={{ fontWeight: 500 }}>{row.model}</span>{isBest && <span style={{ background: 'rgba(34, 211, 238, 0.15)', color: '#22d3ee', padding: '2px 6px', borderRadius: '3px', fontSize: '10px', marginLeft: '8px' }}>Best</span>}</td><td style={{ color: isBest ? '#22d3ee' : '#94a3b8' }}>{row.rmse}</td><td style={{ color: '#64748b' }}>{row.mape}</td></tr>); })}</tbody></table></div>
          </div>
        </section>

        {/* Insights */}
        <section ref={insightsRef} style={{ padding: '64px', borderBottom: '1px solid #16161f' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}><span className="objective-tag">OBJ 5</span><div className="section-label" style={{ marginBottom: 0 }}><Lightbulb size={14} />Synthesis & Actionable Insights</div>{editMode && <button className="edit-btn" style={{ marginLeft: 'auto' }} onClick={() => startEditing('insights', config.insights)}><Edit3 size={12} /> Edit</button>}</div>
          {editMode && editingSection === 'insights' ? (
            <div className="card">{tempData.map((insight, i) => (<div key={insight.id} style={{ marginBottom: '20px', paddingBottom: '20px', borderBottom: '1px solid #16161f' }}><div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr auto', gap: '12px', marginBottom: '12px' }}><input className="input-field" value={insight.category} onChange={(e) => { const u = [...tempData]; u[i].category = e.target.value; setTempData(u); }} placeholder="Category" /><input className="input-field" value={insight.title} onChange={(e) => { const u = [...tempData]; u[i].title = e.target.value; setTempData(u); }} placeholder="Title" /><button className="delete-btn" onClick={() => setTempData(tempData.filter((_, idx) => idx !== i))}><Trash2 size={14} /></button></div><textarea className="input-field" value={insight.description} onChange={(e) => { const u = [...tempData]; u[i].description = e.target.value; setTempData(u); }} placeholder="Description" rows={2} style={{ marginBottom: '8px' }} /><textarea className="input-field" value={insight.implication} onChange={(e) => { const u = [...tempData]; u[i].implication = e.target.value; setTempData(u); }} placeholder="Implication" rows={2} /></div>))}<button className="add-row-btn" onClick={() => setTempData([...tempData, { id: Date.now(), category: '', title: '', description: '', implication: '' }])}><Plus size={14} /> Add Insight</button><div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}><button className="save-btn" onClick={() => saveEditing('insights')}><Save size={14} /> Save Changes</button><button className="cancel-btn" onClick={cancelEditing}>Cancel</button></div></div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>{config.insights.map((insight, idx) => (<div key={insight.id} className="insight-card" style={{ '--accent': idx === 0 ? '#22d3ee' : idx === 1 ? '#a78bfa' : idx === 2 ? '#fb923c' : '#4ade80' }}><span style={{ fontSize: '10px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>{insight.category}</span><h4 style={{ fontSize: '16px', fontWeight: 600, margin: '8px 0 12px', lineHeight: 1.3 }}>{insight.title}</h4><p style={{ color: '#94a3b8', fontSize: '13px', lineHeight: 1.6, marginBottom: '16px' }}>{insight.description}</p><div style={{ background: 'rgba(34, 211, 238, 0.05)', padding: '12px 14px', borderRadius: '4px', borderLeft: '2px solid rgba(34, 211, 238, 0.3)' }}><p style={{ color: '#22d3ee', fontSize: '10px', fontWeight: 600, marginBottom: '4px' }}>IMPLICATION</p><p style={{ color: '#94a3b8', fontSize: '12px', lineHeight: 1.5 }}>{insight.implication}</p></div></div>))}</div>
          )}
        </section>

        {/* Methodology */}
        <section ref={methodologyRef} style={{ padding: '64px', borderBottom: '1px solid #16161f' }}>
          <div className="section-label"><FileText size={14} />Methodology</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '32px', marginTop: '24px' }}>
            <div><h4 style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px', color: '#94a3b8' }}>Data Collection</h4><p style={{ color: '#64748b', fontSize: '12px', lineHeight: 1.7 }}>{config.methodology.dataCollection}</p></div>
            <div><h4 style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px', color: '#94a3b8' }}>Analysis Methods</h4><p style={{ color: '#64748b', fontSize: '12px', lineHeight: 1.7 }}>{config.methodology.analysis}</p></div>
            <div><h4 style={{ fontSize: '13px', fontWeight: 600, marginBottom: '12px', color: '#94a3b8' }}>Limitations</h4><p style={{ color: '#64748b', fontSize: '12px', lineHeight: 1.7 }}>{config.methodology.limitations}</p></div>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ padding: '48px 64px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div><span style={{ fontWeight: 700, fontSize: '14px', color: '#22d3ee' }}>MACRO/CRYPTO</span><p style={{ color: '#4a5568', fontSize: '11px', marginTop: '4px' }}>{config.projectTitle}</p></div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span className="footer-link" onClick={() => setShowDownloadModal(true)}><Download size={14} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} />Download Report</span>
              <span className="footer-link" onClick={() => scrollToSection('dataSources')}>View Data Sources</span>
              <span className="footer-link" onClick={() => scrollToSection('methodology')}>Methodology</span>
            </div>
          </div>
        </footer>
      </main>

      {/* Edit Mode Indicator */}
      {editMode && (<div style={{ position: 'fixed', bottom: '24px', right: '24px', background: '#0f0f17', border: '1px solid #22d3ee', borderRadius: '6px', padding: '16px 20px', maxWidth: '260px' }}><div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}><Edit3 size={14} style={{ color: '#22d3ee' }} /><span style={{ fontWeight: 600, fontSize: '13px' }}>Edit Mode Active</span></div><p style={{ color: '#64748b', fontSize: '11px', lineHeight: 1.5 }}>Click edit buttons to modify data. Charts update automatically.</p></div>)}
    </div>
  );
}
