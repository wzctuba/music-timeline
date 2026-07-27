import React, { useState, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

// --- DEFAULT DATA ---
const defaultItems = [
  { id: 1, group: 1, title: 'Medieval', startYear: 500, endYear: 1400, description: 'The Medieval era of Western art music.', link: '' },
  { id: 2, group: 1, title: 'Renaissance', startYear: 1400, endYear: 1600, description: 'The Renaissance era of Western art music.', link: '' },
  { id: 3, group: 1, title: 'Baroque', startYear: 1600, endYear: 1750, description: 'The Baroque era of Western art music.', link: '' },
  { id: 4, group: 1, title: 'Classical', startYear: 1750, endYear: 1820, description: 'The Classical era of Western art music.', link: '' },
  { id: 5, group: 2, title: 'Guido of Arezzo', startYear: 990, endYear: 1050, description: 'Music theorist.', link: '' },
  { id: 6, group: 2, title: 'Hildegard of Bingen', startYear: 1098, endYear: 1179, description: 'Abbess, writer, and composer.', link: '' },
  { id: 7, group: 2, title: 'Pérotin', startYear: 1160, endYear: 1230, description: 'Composer associated with the Notre Dame school.', link: '' },
  { id: 8, group: 3, title: 'Gregorian Chant Codified', startYear: 800, endYear: 800, description: 'Standardization under Charlemagne.', link: '' },
  { id: 9, group: 3, title: 'Micrologus Written', startYear: 1026, endYear: 1026, description: 'Treatise by Guido of Arezzo.', link: '' },
  { id: 10, group: 3, title: 'Magnus Liber Organi', startYear: 1170, endYear: 1170, description: 'Compilation of organum.', link: '' },
  { id: 11, group: 4, title: 'Charlemagne Crowned', startYear: 800, endYear: 800, description: 'Crowned Holy Roman Emperor.', link: '' },
  { id: 12, group: 4, title: 'Norman Conquest', startYear: 1066, endYear: 1066, description: 'William the Conqueror invades England.', link: '' },
  { id: 13, group: 4, title: 'Black Death', startYear: 1347, endYear: 1351, description: 'Pandemic ravages Europe.', link: '' },
  { id: 14, group: 5, title: 'University of Bologna', startYear: 1088, endYear: 1088, description: 'First university established.', link: '' },
  { id: 15, group: 5, title: 'Notre Dame Construction', startYear: 1163, endYear: 1345, description: 'Cathedral built in Paris.', link: '' },
  { id: 16, group: 5, title: 'Marco Polo Travels', startYear: 1271, endYear: 1295, description: 'Exploration of Asia.', link: '' },
  { id: 17, group: 2, title: 'Josquin des Prez', startYear: 1450, endYear: 1521, description: 'Franco-Flemish composer.', link: '' },
  { id: 18, group: 2, title: 'Giovanni Pierluigi da Palestrina', startYear: 1525, endYear: 1594, description: 'Italian Renaissance composer.', link: '' },
  { id: 19, group: 2, title: 'Giovanni Gabrieli', startYear: 1557, endYear: 1612, description: 'Venetian school composer.', link: '' },
  { id: 20, group: 3, title: 'Harmonice Musices Odhecaton', startYear: 1501, endYear: 1501, description: 'First printed anthology of polyphonic music.', link: '' },
  { id: 21, group: 3, title: 'Council of Trent', startYear: 1545, endYear: 1563, description: 'Impacted sacred music polyphony.', link: '' },
  { id: 22, group: 3, title: 'First Opera (Dafne)', startYear: 1597, endYear: 1597, description: 'Composed by Jacopo Peri.', link: '' },
  { id: 23, group: 4, title: 'Gutenberg Press', startYear: 1440, endYear: 1440, description: 'Invention of the movable type printing press.', link: '' },
  { id: 24, group: 4, title: 'Columbus Voyage', startYear: 1492, endYear: 1492, description: 'Christopher Columbus reaches the Americas.', link: '' },
  { id: 25, group: 4, title: 'Martin Luther 95 Theses', startYear: 1517, endYear: 1517, description: 'Start of the Protestant Reformation.', link: '' },
  { id: 26, group: 5, title: 'Mona Lisa Painted', startYear: 1503, endYear: 1506, description: 'Leonardo da Vinci masterpiece.', link: '' },
  { id: 27, group: 5, title: 'Copernicus Heliocentric Theory', startYear: 1543, endYear: 1543, description: 'On the Revolutions of the Heavenly Spheres.', link: '' },
  { id: 28, group: 5, title: 'Globe Theatre Built', startYear: 1599, endYear: 1599, description: 'Shakespeare\'s theatre opens.', link: '' },
  { id: 29, group: 2, title: 'Antonio Vivaldi', startYear: 1678, endYear: 1741, description: 'Italian Baroque composer.', link: '' },
  { id: 30, group: 2, title: 'Johann Sebastian Bach', startYear: 1685, endYear: 1750, description: 'German Baroque composer.', link: '' },
  { id: 31, group: 2, title: 'George Frideric Handel', startYear: 1685, endYear: 1759, description: 'German-British Baroque composer.', link: '' },
  { id: 32, group: 3, title: 'Orfeo Premiered', startYear: 1607, endYear: 1607, description: 'Monteverdi\'s groundbreaking opera.', link: '' },
  { id: 33, group: 3, title: 'Well-Tempered Clavier', startYear: 1722, endYear: 1722, description: 'Bach\'s collection of preludes and fugues.', link: '' },
  { id: 34, group: 3, title: 'Messiah Premiered', startYear: 1742, endYear: 1742, description: 'Handel\'s famous oratorio debuts in Dublin.', link: '' },
  { id: 35, group: 4, title: 'Thirty Years War', startYear: 1618, endYear: 1648, description: 'Major European conflict.', link: '' },
  { id: 36, group: 4, title: 'English Civil War', startYear: 1642, endYear: 1651, description: 'Conflict between Parliamentarians and Royalists.', link: '' },
  { id: 37, group: 4, title: 'Reign of Louis XIV', startYear: 1643, endYear: 1715, description: 'The Sun King rules France.', link: '' },
  { id: 38, group: 5, title: 'King James Bible', startYear: 1611, endYear: 1611, description: 'Published in England.', link: '' },
  { id: 39, group: 5, title: 'Newton Principia', startYear: 1687, endYear: 1687, description: 'Foundation of classical mechanics.', link: '' },
  { id: 40, group: 5, title: 'Salem Witch Trials', startYear: 1692, endYear: 1692, description: 'Events in colonial Massachusetts.', link: '' },
  { id: 41, group: 2, title: 'Joseph Haydn', startYear: 1732, endYear: 1809, description: 'Austrian composer.', link: '' },
  { id: 42, group: 2, title: 'Wolfgang Amadeus Mozart', startYear: 1756, endYear: 1791, description: 'Prolific Classical composer.', link: '' },
  { id: 43, group: 2, title: 'Ludwig van Beethoven', startYear: 1770, endYear: 1827, description: 'Crucial figure in the transition to Romanticism.', link: '' },
  { id: 44, group: 3, title: 'Symphony No. 40', startYear: 1788, endYear: 1788, description: 'Mozart\'s Great G minor symphony.', link: '' },
  { id: 45, group: 3, title: 'The Creation', startYear: 1798, endYear: 1798, description: 'Haydn\'s great oratorio.', link: '' },
  { id: 46, group: 3, title: 'Eroica Symphony', startYear: 1804, endYear: 1804, description: 'Beethoven\'s Symphony No. 3.', link: '' },
  { id: 47, group: 4, title: 'American Revolution', startYear: 1775, endYear: 1783, description: 'War of Independence.', link: '' },
  { id: 48, group: 4, title: 'French Revolution', startYear: 1789, endYear: 1799, description: 'Period of radical social and political upheaval.', link: '' },
  { id: 49, group: 4, title: 'Napoleon Crowned', startYear: 1804, endYear: 1804, description: 'Napoleon becomes Emperor of the French.', link: '' },
  { id: 50, group: 5, title: 'Watt Steam Engine', startYear: 1776, endYear: 1776, description: 'Commercialization of the steam engine.', link: '' },
  { id: 51, group: 5, title: 'Critique of Pure Reason', startYear: 1781, endYear: 1781, description: 'Immanuel Kant philosophical work.', link: '' },
  { id: 52, group: 5, title: 'Rosetta Stone Found', startYear: 1799, endYear: 1799, description: 'Key to deciphering Egyptian hieroglyphs.', link: '' }
];

export default function MusicHistoryTimeline() {
  // --- STATE ---
  const [bounds, setBounds] = useState({ startYear: 400, endYear: 2000 });
  const [visibleStart, setVisibleStart] = useState(500);
  const [visibleEnd, setVisibleEnd] = useState(1900);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showControls, setShowControls] = useState(false);
  
  const [groupColors, setGroupColors] = useState({
    1: '#6c757d', // Eras 
    2: '#007bff', // People 
    3: '#28a745', // Musical Events 
    4: '#dc3545', // World Events 
    5: '#17a2b8'  // Other 
  });

  const [hiddenGroups, setHiddenGroups] = useState([]);
  const [expandedGroups, setExpandedGroups] = useState([]); 

  const groups = [
    { id: 1, title: 'Eras' },
    { id: 2, title: 'People' },
    { id: 3, title: 'Musical Events' },
    { id: 4, title: 'World Events' },
    { id: 5, title: 'Other' }
  ];

  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editFormData, setEditFormData] = useState(null);
  const [formData, setFormData] = useState({ title: '', startYear: '', endYear: '', description: '', link: '', group: '2' });

  // --- RESPONSIVE LISTENER ---
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize(); // Check on initial mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // --- LOCAL STORAGE INITIALIZATION ---
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('music_timeline_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved timeline data.");
      }
    }
    return defaultItems;
  });

  // --- AUTO-SAVE TO LOCAL STORAGE ---
  useEffect(() => {
    localStorage.setItem('music_timeline_data', JSON.stringify(items));
  }, [items]);

  // --- PREVENT ACCIDENTAL CLOSING ---
  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const windowSize = visibleEnd - visibleStart;

  // --- STUDENT DATA MANAGEMENT ---
  const handleExport = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(items, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "My-Music-Timeline.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    setHasUnsavedChanges(false); // Clear the warning after successful download
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const uploadedItems = JSON.parse(event.target.result);
        if (Array.isArray(uploadedItems)) {
          setItems(uploadedItems);
          setHasUnsavedChanges(false);
          alert("Timeline loaded successfully!");
        }
      } catch (error) {
        alert("Invalid file format. Please upload a valid JSON timeline file.");
      }
    };
    reader.readAsText(file);
    e.target.value = ''; // Reset input so the same file can be uploaded again if needed
  };

  // --- LOGIC & MATH ---
  const handlePan = (val) => {
    setVisibleStart(val);
    setVisibleEnd(val + windowSize);
  };

  const handleZoom = (newWindowSize) => {
    const center = visibleStart + (windowSize / 2);
    const half = newWindowSize / 2;
    setVisibleStart(Math.max(bounds.startYear, center - half));
    setVisibleEnd(Math.min(bounds.endYear, center + half));
  };

  const toggleGroupVisibility = (groupId) => {
    if (hiddenGroups.includes(groupId)) setHiddenGroups(hiddenGroups.filter(id => id !== groupId));
    else setHiddenGroups([...hiddenGroups, groupId]);
  };

  const toggleExpandGroup = (groupId) => {
    if (expandedGroups.includes(groupId)) setExpandedGroups(expandedGroups.filter(id => id !== groupId));
    else setExpandedGroups([...expandedGroups, groupId]);
  };

  const getGridMarkers = () => {
    let step = 100;
    if (windowSize <= 50) step = 5;
    else if (windowSize <= 100) step = 10;
    else if (windowSize <= 300) step = 25;
    else if (windowSize <= 600) step = 50;

    const markers = [];
    const firstMarker = Math.ceil(visibleStart / step) * step;
    for (let i = firstMarker; i <= visibleEnd; i += step) {
      markers.push(i);
    }
    return markers;
  };

  const calculateLanes = (itemsInGroup) => {
    const sorted = [...itemsInGroup].sort((a, b) => a.startYear - b.startYear);
    const lanes = [];
    const stackedItems = [];

    sorted.forEach(item => {
      const isEra = item.group === 1;

      const textWidthPercent = (item.title?.length || 0) * 0.9;
      const textWidthYears = (textWidthPercent / 100) * windowSize;
      
      const visualEndYear = Math.max(item.endYear, item.startYear + textWidthYears);

      const s = item.startYear;
      const e = isEra ? item.endYear : visualEndYear + (windowSize * 0.02);

      let placed = false;
      for (let i = 0; i < lanes.length; i++) {
        if (lanes[i] <= s) {
          lanes[i] = e;
          stackedItems.push({ ...item, lane: i });
          placed = true;
          break;
        }
      }
      if (!placed) {
        stackedItems.push({ ...item, lane: lanes.length });
        lanes.push(e);
      }
    });

    return { stackedItems, numLanes: lanes.length || 1 };
  };

  // --- FORM HANDLERS ---
  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleEditInputChange = (e) => setEditFormData({ ...editFormData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault(); 
    const start = parseInt(formData.startYear, 10);
    const end = formData.endYear ? parseInt(formData.endYear, 10) : start;

    const newItem = {
      id: items.length + 1, group: parseInt(formData.group, 10),
      title: formData.title, startYear: start, endYear: end,
      description: formData.description, link: formData.link
    };
    setItems([...items, newItem]);
    setHasUnsavedChanges(true);
    setFormData({ title: '', startYear: '', endYear: '', description: '', link: '', group: '2' });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const start = parseInt(editFormData.startYear, 10);
    const end = editFormData.endYear ? parseInt(editFormData.endYear, 10) : start;
    const updatedItems = items.map(item => {
      if (item.id === editFormData.id) {
        return { ...item, title: editFormData.title, group: parseInt(editFormData.group, 10), startYear: start, endYear: end, description: editFormData.description, link: editFormData.link };
      }
      return item;
    });
    setItems(updatedItems);
    setHasUnsavedChanges(true);
    setSelectedEvent(updatedItems.find(i => i.id === editFormData.id));
    setEditFormData(null); 
  };

  // --- STRICT STYLES ---
  // Headers shrink slightly on mobile to allow more canvas space
  const headerColumnStyle = {
    width: isMobile ? '80px' : '120px', 
    minWidth: isMobile ? '80px' : '120px', 
    flexShrink: 0,
    backgroundColor: '#f8f9fa', borderRight: '2px solid #ccc',
    display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', paddingLeft: isMobile ? '5px' : '10px',
    fontWeight: 'bold', fontSize: isMobile ? '11px' : '12px', cursor: 'pointer', boxSizing: 'border-box'
  };

  const canvasStyle = {
    position: 'relative', flexGrow: 1, 
    overflow: 'hidden', boxSizing: 'border-box'
  };

  return (
    <div className="timeline-container" style={{ padding: isMobile ? '10px' : '20px', fontFamily: 'sans-serif', display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '20px', alignItems: 'flex-start' }}>
      
      {/* =========================================
          SIDEBAR CONTROLS (Fluid on Mobile, Fixed on Desktop)
      ========================================= */}
      <div style={{ flex: isMobile ? '1 1 auto' : '0 0 250px', width: isMobile ? '100%' : 'auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        {/* --- STUDENT TOOLS: Load & Save (Always visible) --- */}
        <div style={{ backgroundColor: '#fff', border: '2px solid #007bff', borderRadius: '6px', padding: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
          <h4 style={{ margin: '0 0 15px 0', borderBottom: '1px solid #ddd', paddingBottom: '5px', color: '#007bff' }}>Student Dashboard</h4>
          
          <label style={{ display: 'block', padding: '15px', border: '2px dashed #ccc', borderRadius: '6px', textAlign: 'center', cursor: 'pointer', backgroundColor: '#f8f9fa', marginBottom: '15px', transition: 'background-color 0.2s' }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#e9ecef'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}>
            <span style={{ fontWeight: 'bold', color: '#333', display: 'block', marginBottom: '4px' }}>📂 Load Your Work</span>
            <span style={{ fontSize: '11px', color: '#666' }}>
              {isMobile ? 'Tap to open your saved .json file.' : 'Drop your timeline .json file here to pick up where you left off.'}
            </span>
            <input type="file" accept=".json" onChange={handleFileUpload} style={{ display: 'none' }} />
          </label>

          <button onClick={handleExport} style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
            💾 Save & Download File
          </button>
          
          {hasUnsavedChanges && (
            <div style={{ fontSize: '11px', color: '#dc3545', textAlign: 'center', marginTop: '8px', fontWeight: 'bold' }}>
              ⚠️ You have unsaved changes!
            </div>
          )}
        </div>

        {/* --- MOBILE TOGGLE BUTTON --- */}
        {isMobile && (
          <button 
            onClick={() => setShowControls(!showControls)}
            style={{ width: '100%', padding: '10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {showControls ? '▲ Hide Navigation & Filters' : '▼ Show Navigation & Filters'}
          </button>
        )}

        {/* --- CONTROLS (Hidden on Mobile unless toggled) --- */}
        {(!isMobile || showControls) && (
          <>
            {/* Bounds & Navigation Panel */}
            <div style={{ backgroundColor: '#f8f9fa', border: '1px solid #ddd', borderRadius: '6px', padding: '15px' }}>
              <h4 style={{ margin: '0 0 15px 0', borderBottom: '1px solid #ddd', paddingBottom: '5px' }}>Navigator</h4>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px' }}>Start Year:</span>
                  <input 
                    type="text" 
                    value={bounds.startYear} 
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      setBounds({...bounds, startYear: val === '' ? '' : parseInt(val, 10)});
                    }} 
                    style={{ width: '60px', padding: '3px' }} 
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px' }}>End Year:</span>
                  <input 
                    type="text" 
                    value={bounds.endYear} 
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      setBounds({...bounds, endYear: val === '' ? '' : parseInt(val, 10)});
                    }} 
                    style={{ width: '60px', padding: '3px' }} 
                  />
                </div>
                <button 
                  onClick={() => { 
                    setVisibleStart(Number(bounds.startYear) || 0); 
                    setVisibleEnd(Number(bounds.endYear) || 0); 
                  }} 
                  style={{ padding: '6px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '13px' }}
                >
                  Apply Bounds
                </button>
              </div>

              {/* Pan / Zoom Sliders */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#555', display: 'block', marginBottom: '8px' }}>Pan (Left/Right)</span>
                  <Slider min={Number(bounds.startYear) || 0} max={(Number(bounds.endYear) || 0) - windowSize} value={visibleStart} onChange={handlePan} />
                </div>
                <div>
                  <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#555', display: 'block', marginBottom: '8px' }}>Zoom (In/Out)</span>
                  <Slider min={10} max={(Number(bounds.endYear) || 0) - (Number(bounds.startYear) || 0)} value={windowSize} onChange={handleZoom} reverse />
                </div>
              </div>
            </div>

            {/* Timelines (Visibility & Color Settings) */}
            <div style={{ backgroundColor: '#f8f9fa', border: '1px solid #ddd', borderRadius: '6px', padding: '15px' }}>
              <h4 style={{ margin: '0 0 15px 0', borderBottom: '1px solid #ddd', paddingBottom: '5px' }}>Timelines</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {groups.map(g => (
                  <div key={g.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', flexGrow: 1 }}>
                      <input type="checkbox" checked={!hiddenGroups.includes(g.id)} onChange={() => toggleGroupVisibility(g.id)} />
                      {g.title}
                    </label>
                    <input type="color" value={groupColors[g.id]} onChange={(e) => setGroupColors({ ...groupColors, [g.id]: e.target.value })} style={{ cursor: 'pointer', border: 'none', padding: 0, width: '22px', height: '22px', borderRadius: '3px' }} />
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {/* =========================================
          MAIN CONTENT (Full width on Mobile)
      ========================================= */}
      <div style={{ width: '100%', flex: '1 1 0%', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* --- THE CUSTOM TIMELINE --- */}
        <div style={{ border: '2px solid #aaa', borderRadius: '4px', backgroundColor: '#fff', position: 'relative' }}>
          
          {/* Years Header Grid */}
          <div style={{ display: 'flex', height: '30px', borderBottom: '2px solid #aaa', backgroundColor: '#343a40', color: 'white' }}>
            <div style={{...headerColumnStyle, flexDirection: 'row', alignItems: 'center', backgroundColor: '#343a40', borderRight: '2px solid #555', color: 'white', cursor: 'default'}}>Year</div>
            <div style={canvasStyle}>
              {getGridMarkers().map(year => {
                const leftPercent = ((year - visibleStart) / windowSize) * 100;
                return (
                  <div key={year} style={{ position: 'absolute', left: `${leftPercent}%`, top: 0, bottom: 0, borderLeft: '1px solid #666', paddingLeft: '4px', fontSize: '12px', paddingTop: '6px' }}>
                    {year}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Rows */}
          {groups.filter(g => !hiddenGroups.includes(g.id)).map(group => {
            
            const { stackedItems, numLanes } = calculateLanes(items.filter(i => i.group === group.id));
            
            // Limit lanes to 4 unless expanded
            const isExpanded = expandedGroups.includes(group.id);
            const displayLanes = isExpanded ? numLanes : Math.min(numLanes, 4);
            const rowHeight = Math.max(50, displayLanes * 26 + 16); 

            return (
              <div key={group.id} style={{ display: 'flex', position: 'relative', height: `${rowHeight}px`, borderBottom: '1px solid #ddd', backgroundColor: '#fff' }}>
                
                {/* Row Header */}
                <div style={headerColumnStyle} onClick={() => setSelectedGroup(group.id === selectedGroup ? null : group.id)}>
                  <div>{group.title} {selectedGroup === group.id ? '▼' : '▶'}</div>
                  
                  {/* Expander Button if > 4 lanes */}
                  {numLanes > 4 && (
                    <div 
                      onClick={(e) => { e.stopPropagation(); toggleExpandGroup(group.id); }}
                      style={{ color: '#007bff', fontSize: '10px', marginTop: '4px', cursor: 'pointer', padding: '2px 0' }}
                    >
                      {isExpanded ? '▲ View Less' : `▼ +${numLanes - 4} More`}
                    </div>
                  )}
                </div>
                
                {/* Canvas */}
                <div style={canvasStyle}>
                  
                  {/* Background vertical grid lines */}
                  {getGridMarkers().map(year => (
                    <div key={year} style={{ position: 'absolute', left: `${((year - visibleStart) / windowSize) * 100}%`, top: 0, bottom: 0, borderLeft: '1px solid #f0f0f0', zIndex: 0 }} />
                  ))}

                  {/* Event Blocks */}
                  {stackedItems.map(item => {
                    // Hide items if they fall outside the 4-lane limit while collapsed
                    if (!isExpanded && item.lane >= 4) return null;

                    const isPoint = item.startYear === item.endYear;
                    const leftPercent = ((item.startYear - visibleStart) / windowSize) * 100;
                    const widthPercent = ((item.endYear - item.startYear) / windowSize) * 100;

                    if (item.endYear < visibleStart || item.startYear > visibleEnd) return null;

                    // DYNAMIC TEXT LOGIC: If a block takes up less than the threshold of the visible screen, the text pops outside
                    // Mobile screens are smaller, so they need a larger percentage threshold (15%) than desktop (8%) before text overflows
                    const textThreshold = isMobile ? 15 : 8;
                    const isNarrow = isPoint || widthPercent < textThreshold;

                    return (
                      <div 
                        key={item.id} 
                        onClick={() => { setSelectedEvent(item); setEditFormData(null); }}
                        style={{
                          position: 'absolute',
                          left: `${leftPercent}%`,
                          width: isPoint ? '10px' : `${widthPercent}%`,
                          marginLeft: isPoint ? '-5px' : '0', 
                          top: isPoint ? `${item.lane * 26 + 14}px` : `${item.lane * 26 + 8}px`, 
                          height: isPoint ? '10px' : '22px', 
                          backgroundColor: groupColors[group.id],
                          borderRadius: isPoint ? '50%' : '4px',
                          display: 'flex', alignItems: 'center', padding: isPoint ? '0' : '0 6px',
                          color: 'white', fontSize: '11px', fontWeight: 'bold', whiteSpace: 'nowrap',
                          overflow: isNarrow ? 'visible' : 'hidden', 
                          textOverflow: 'ellipsis', cursor: 'pointer',
                          border: '1px solid rgba(255, 255, 255, 0.8)',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.2)', boxSizing: 'border-box', zIndex: 5
                        }}
                      >
                        {!isNarrow && item.title}
                        
                        {/* Attached dynamic label for points OR narrow blocks */}
                        {isNarrow && (
                          <span style={{ 
                            position: 'absolute', 
                            left: isPoint ? '14px' : '4px', 
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: '#333', 
                            background: 'none', 
                            padding: '0', 
                            border: 'none', 
                            pointerEvents: 'none', zIndex: 10
                          }}>
                            {item.title}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* --- ROW LIST VIEW --- */}
        {selectedGroup && (
          <div style={{ padding: '20px', border: '2px solid #6c757d', borderRadius: '8px', backgroundColor: '#fff' }}>
            <h3 style={{ margin: '0 0 15px 0' }}>{groups.find(g => g.id === selectedGroup).title} Events</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '10px' }}>
              {items
                .filter(i => i.group === selectedGroup)
                .sort((a, b) => a.startYear - b.startYear)
                .map(item => (
                  <div key={item.id} style={{ padding: '10px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6', borderRadius: '4px', cursor: 'pointer' }} onClick={() => { setSelectedEvent(item); setEditFormData(null); }}>
                    <strong>{item.startYear}{item.startYear !== item.endYear ? ` - ${item.endYear}` : ''}</strong>: {item.title}
                  </div>
              ))}
            </div>
          </div>
        )}

        {/* --- EVENT DETAILS / EDIT BOX --- */}
        {selectedEvent && (
          <div style={{ padding: '20px', border: `2px solid ${groupColors[selectedEvent.group]}`, borderRadius: '8px', backgroundColor: '#f8f9fa', position: 'relative' }}>
            <button onClick={() => { setSelectedEvent(null); setEditFormData(null); }} style={{ position: 'absolute', top: '10px', right: '15px', background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', fontWeight: 'bold' }}>✕</button>
            
            {editFormData ? (
              <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <h3 style={{ marginTop: 0 }}>Edit Event</h3>
                <input type="text" name="title" required value={editFormData.title} onChange={handleEditInputChange} style={{ padding: '8px' }} />
                
                <div style={{ display: 'flex', gap: '15px', flexDirection: isMobile ? 'column' : 'row' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <label style={{ fontSize: '13px' }}>Category:</label>
                    <select name="group" required value={editFormData.group} onChange={handleEditInputChange} style={{ padding: '8px' }}>
                      {groups.map(g => <option key={g.id} value={g.id}>{g.title}</option>)}
                    </select>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <label style={{ fontSize: '13px' }}>Start Year:</label>
                    <input type="number" name="startYear" required value={editFormData.startYear} onChange={handleEditInputChange} style={{ padding: '8px' }} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                    <label style={{ fontSize: '13px' }}>End Year:</label>
                    <input type="number" name="endYear" value={editFormData.endYear} onChange={handleEditInputChange} style={{ padding: '8px' }} />
                  </div>
                </div>
                
                <textarea name="description" value={editFormData.description} onChange={handleEditInputChange} style={{ padding: '8px', minHeight: '60px' }} />
                <input type="url" name="link" value={editFormData.link} onChange={handleEditInputChange} style={{ padding: '8px' }} />
                
                <div style={{ display: 'flex', gap: '10px', flexDirection: isMobile ? 'column' : 'row' }}>
                  <button type="submit" style={{ padding: '8px 16px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Save Changes</button>
                  <button type="button" onClick={() => setEditFormData(null)} style={{ padding: '8px 16px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
                </div>
              </form>
            ) : (
              <>
                <h2 style={{ marginTop: 0 }}>{selectedEvent.title}</h2>
                <p style={{ color: '#555' }}><strong>Year(s):</strong> {selectedEvent.startYear} {selectedEvent.startYear !== selectedEvent.endYear && ` to ${selectedEvent.endYear}`}</p>
                {selectedEvent.description && <p style={{ lineHeight: '1.5' }}>{selectedEvent.description}</p>}
                {selectedEvent.link && <a href={selectedEvent.link} target="_blank" rel="noopener noreferrer" style={{ color: '#007BFF', textDecoration: 'none', fontWeight: 'bold', display: 'block', marginBottom: '15px' }}>Learn More →</a>}
                
                <button 
                  onClick={() => setEditFormData({
                    id: selectedEvent.id, title: selectedEvent.title, group: selectedEvent.group,
                    startYear: selectedEvent.startYear, endYear: selectedEvent.startYear !== selectedEvent.endYear ? selectedEvent.endYear : '',
                    description: selectedEvent.description || '', link: selectedEvent.link || ''
                  })}
                  style={{ width: isMobile ? '100%' : 'auto', padding: '10px 12px', backgroundColor: '#ffc107', color: '#212529', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                >
                  Edit Event
                </button>
              </>
            )}
          </div>
        )}

        {/* --- INPUT FORM --- */}
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: isMobile ? '100%' : '500px' }}>
          <h3>Add Timeline Event</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input type="text" name="title" placeholder="Event Title (Required)" required value={formData.title} onChange={handleInputChange} style={{ padding: '8px' }} />
            
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{ fontSize: '13px', marginBottom: '4px' }}>Category (Required):</label>
              <select name="group" required value={formData.group} onChange={handleInputChange} style={{ padding: '8px' }}>
                {groups.map(g => <option key={g.id} value={g.id}>{g.title}</option>)}
              </select>
            </div>

            <div style={{ display: 'flex', gap: '15px', flexDirection: isMobile ? 'column' : 'row' }}>
              <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <label style={{ fontSize: '13px', marginBottom: '4px' }}>Start Year (Required):</label>
                <input type="number" name="startYear" required value={formData.startYear} onChange={handleInputChange} style={{ padding: '8px' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <label style={{ fontSize: '13px', marginBottom: '4px' }}>End Year (Optional):</label>
                <input type="number" name="endYear" value={formData.endYear} onChange={handleInputChange} style={{ padding: '8px' }} />
              </div>
            </div>
            
            <textarea name="description" placeholder="Short description (Optional)" value={formData.description} onChange={handleInputChange} style={{ padding: '8px', minHeight: '60px' }} />
            <input type="url" name="link" placeholder="Link URL (Optional)" value={formData.link} onChange={handleInputChange} style={{ padding: '8px' }} />
            
            <button type="submit" style={{ padding: '10px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Add Event to Timeline</button>
          </form>
        </div>

      </div>
    </div>
  );
}