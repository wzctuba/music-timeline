import React, { useState, useEffect, useRef } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

// --- DEFAULT DATA ---
const defaultItems = [
  { id: 1, group: 1, title: 'Medieval', startYear: 500, endYear: 1400, description: 'The Medieval era of Western art music.', link: '' },
  { id: 2, group: 1, title: 'Renaissance', startYear: 1400, endYear: 1600, description: 'The Renaissance era of Western art music.', link: '' },
  { id: 3, group: 1, title: 'Baroque', startYear: 1600, endYear: 1750, description: 'The Baroque era of Western art music.', link: '' },
  { id: 4, group: 1, title: 'Classical', startYear: 1750, endYear: 1820, description: 'The Classical era of Western art music.', link: '' },
];

const defaultEvents = [
  // --- 500–1400 World Events ---
  {
    id: 5,
    group: 4,
    title: "Rule of Saint Benedict",
    startYear: 540,
    endYear: 540,
    description: "Saint Benedict authored a rule that became the foundational guidebook for Western monasticism and scholarship.",
    link: "https://en.wikipedia.org/wiki/Rule_of_Saint_Benedict",
    category: "Religion & Culture"
  },
  {
    id: 6,
    group: 4,
    title: "Charlemagne Crowned Emperor",
    startYear: 800,
    endYear: 800,
    description: "Pope Leo III crowned Charlemagne Emperor of the Romans, sparking the Carolingian Renaissance.",
    link: "https://en.wikipedia.org/wiki/Charlemagne",
    category: "Politics & Empire"
  },
  {
    id: 7,
    group: 4,
    title: "East–West Schism",
    startYear: 1054,
    endYear: 1054,
    description: "The formal division that split medieval Christendom into the Catholic and Orthodox Churches.",
    link: "https://en.wikipedia.org/wiki/East%E2%80%93West_Schism",
    category: "Religion & Culture"
  },
  {
    id: 8,
    group: 4,
    title: "Norman Conquest of England",
    startYear: 1066,
    endYear: 1066,
    description: "William of Normandy defeated King Harold at the Battle of Hastings, altering English institutions and language.",
    link: "https://en.wikipedia.org/wiki/Norman_Conquest",
    category: "War & Conquest"
  },
  {
    id: 9,
    group: 4,
    title: "Magna Carta",
    startYear: 1215,
    endYear: 1215,
    description: "King John was forced to seal a charter limiting monarchical power and establishing constitutional principles.",
    link: "https://en.wikipedia.org/wiki/Magna_Carta",
    category: "Law & Governance"
  },
  {
    id: 10,
    group: 4,
    title: "Hundred Years' War",
    startYear: 1337,
    endYear: 1453,
    description: "A conflict between England and France that transformed European warfare and national identity.",
    link: "https://en.wikipedia.org/wiki/Hundred_Years%27_War",
    category: "War & Conquest"
  },
  {
    id: 11,
    group: 4,
    title: "The Black Death",
    startYear: 1346,
    endYear: 1353,
    description: "A catastrophic pandemic that swept across western Europe, wiping out roughly 30 to 60 percent of the population.",
    link: "https://en.wikipedia.org/wiki/Black_Death",
    category: "Society & Plague"
  },

  // --- 1400–1600 World Events ---
  {
    id: 12,
    group: 4,
    title: "Gutenberg Printing Press",
    startYear: 1440,
    endYear: 1440,
    description: "Johannes Gutenberg invented movable-type printing in Europe, revolutionizing the spread of literature and literacy.",
    link: "https://en.wikipedia.org/wiki/Printing_press",
    category: "Science & Innovation"
  },
  {
    id: 13,
    group: 4,
    title: "Fall of Constantinople",
    startYear: 1453,
    endYear: 1453,
    description: "The Ottoman Empire captured Constantinople, ending the Byzantine Empire and driving Greek scholars west.",
    link: "https://en.wikipedia.org/wiki/Fall_of_Constantinople",
    category: "War & Conquest"
  },
  {
    id: 14,
    group: 4,
    title: "Columbus Reaches the Americas",
    startYear: 1492,
    endYear: 1492,
    description: "Christopher Columbus landed in the Caribbean, initiating widespread European exploration and colonization.",
    link: "https://en.wikipedia.org/wiki/Voyages_of_Christopher_Columbus",
    category: "Exploration"
  },
  {
    id: 15,
    group: 4,
    title: "da Vinci Paints Mona Lisa",
    startYear: 1503,
    endYear: 1519,
    description: "Leonardo da Vinci created his iconic portrait during the High Renaissance in Florence.",
    link: "https://en.wikipedia.org/wiki/Mona_Lisa",
    category: "Arts & Culture"
  },
  {
    id: 16,
    group: 4,
    title: "Sistine Chapel Ceiling",
    startYear: 1508,
    endYear: 1512,
    description: "Michelangelo painted the frescoes on the vault of the Sistine Chapel in Rome.",
    link: "https://en.wikipedia.org/wiki/Sistine_Chapel_ceiling",
    category: "Arts & Culture"
  },
  {
    id: 17,
    group: 4,
    title: "Protestant Reformation",
    startYear: 1517,
    endYear: 1517,
    description: "Martin Luther published his 95 Theses, sparking the religious schism across Western Europe.",
    link: "https://en.wikipedia.org/wiki/Protestant_Reformation",
    category: "Religion & Culture"
  },
  {
    id: 18,
    group: 4,
    title: "First Circumnavigation of Globe",
    startYear: 1519,
    endYear: 1522,
    description: "The Magellan-Elcano expedition completed the first documented voyage across all meridians around the Earth.",
    link: "https://en.wikipedia.org/wiki/Magellan_expedition",
    category: "Exploration"
  },
  {
    id: 19,
    group: 4,
    title: "Copernican Heliocentrism",
    startYear: 1543,
    endYear: 1543,
    description: "Nicolaus Copernicus published his theory that the Earth and planets revolve around the Sun.",
    link: "https://en.wikipedia.org/wiki/De_revolutionibus_orbium_coelestium",
    category: "Science & Innovation"
  },

  // --- 1600–1750 World Events ---
  {
    id: 20,
    group: 4,
    title: "Founding of Jamestown",
    startYear: 1607,
    endYear: 1607,
    description: "The first permanent English settlement in North America was established in Virginia.",
    link: "https://en.wikipedia.org/wiki/Jamestown,_Virginia",
    category: "Exploration & Colonization"
  },
  {
    id: 21,
    group: 4,
    title: "Kepler's Planetary Laws",
    startYear: 1609,
    endYear: 1609,
    description: "Johannes Kepler published Astronomia Nova, detailing his first two laws of planetary motion.",
    link: "https://en.wikipedia.org/wiki/Kepler%27s_laws_of_planetary_motion",
    category: "Science & Innovation"
  },
  {
    id: 22,
    group: 4,
    title: "King James Bible Published",
    startYear: 1611,
    endYear: 1611,
    description: "An English translation of the Bible was published, profoundly shaping the English language and literature.",
    link: "https://en.wikipedia.org/wiki/Authorized_King_James_Version",
    category: "Religion & Culture"
  },
  {
    id: 23,
    group: 4,
    title: "Thirty Years' War",
    startYear: 1618,
    endYear: 1648,
    description: "A devastating war across Central Europe originating as a Catholic-Protestant conflict that reshaped geopolitical borders.",
    link: "https://en.wikipedia.org/wiki/Thirty_Years%27_War",
    category: "War & Conquest"
  },
  {
    id: 24,
    group: 4,
    title: "English Civil War",
    startYear: 1642,
    endYear: 1651,
    description: "A series of armed conflicts between Parliamentarians and Royalists over the governance of England.",
    link: "https://en.wikipedia.org/wiki/English_Civil_War",
    category: "War & Conquest"
  },
  {
    id: 25,
    group: 4,
    title: "Newton's Principia",
    startYear: 1687,
    endYear: 1687,
    description: "Isaac Newton published Principia Mathematica, establishing the laws of motion and universal gravitation.",
    link: "https://en.wikipedia.org/wiki/Philosophi%C3%A6_Naturalis_Principia_Mathematica",
    category: "Science & Innovation"
  },

  // --- 1750–1820 World Events ---
  {
    id: 26,
    group: 4,
    title: "Seven Years' War",
    startYear: 1756,
    endYear: 1763,
    description: "A global conflict involving most European great powers, fought across Europe, the Americas, and India.",
    link: "https://en.wikipedia.org/wiki/Seven_Years%27_War",
    category: "War & Conquest"
  },
  {
    id: 27,
    group: 4,
    title: "Declaration of Independence",
    startYear: 1776,
    endYear: 1776,
    description: "The thirteen American colonies declared independence from British rule, establishing the United States.",
    link: "https://en.wikipedia.org/wiki/United_States_Declaration_of_Independence",
    category: "Law & Governance"
  },
  {
    id: 28,
    group: 4,
    title: "US Constitution Signed",
    startYear: 1787,
    endYear: 1787,
    description: "The Constitutional Convention in Philadelphia drafted and signed the foundational law of the United States federal government.",
    link: "https://en.wikipedia.org/wiki/United_States_Constitution",
    category: "Law & Governance"
  },
  {
    id: 29,
    group: 4,
    title: "French Revolution",
    startYear: 1789,
    endYear: 1799,
    description: "A period of radical political and societal transformation in France that abolished absolute monarchy and feudal privileges.",
    link: "https://en.wikipedia.org/wiki/French_Revolution",
    category: "Politics & Revolution"
  },
  {
    id: 30,
    group: 4,
    title: "Napoleonic Wars",
    startYear: 1803,
    endYear: 1815,
    description: "A series of major global conflicts led by Napoleon I against fluctuating European coalitions.",
    link: "https://en.wikipedia.org/wiki/Napoleonic_Wars",
    category: "War & Conquest"
  },
  {
    id: 31,
    group: 4,
    title: "Battle of Waterloo",
    startYear: 1815,
    endYear: 1815,
    description: "The Seventh Coalition defeated Napoleon's French army, ending the Napoleonic Wars and his imperial reign.",
    link: "https://en.wikipedia.org/wiki/Battle_of_Waterloo",
    category: "War & Conquest"
  },

  // --- Influential People (Group 6) ---
  {
    id: 32,
    group: 6,
    title: "Charlemagne",
    startYear: 742,
    endYear: 814,
    description: "King of the Franks and Lombards who united much of Western Europe and was crowned Holy Roman Emperor.",
    link: "https://en.wikipedia.org/wiki/Charlemagne",
    category: "Influential People"
  },
  {
    id: 33,
    group: 6,
    title: "William the Conqueror",
    startYear: 1028,
    endYear: 1087,
    description: "Duke of Normandy who invaded England in 1066, permanently altering its language, culture, and government.",
    link: "https://en.wikipedia.org/wiki/William_the_Conqueror",
    category: "Influential People"
  },
  {
    id: 34,
    group: 6,
    title: "Marco Polo",
    startYear: 1254,
    endYear: 1324,
    description: "Venetian merchant and explorer whose travel accounts introduced Europeans to Central Asia and China.",
    link: "https://en.wikipedia.org/wiki/Marco_Polo",
    category: "Influential People"
  },
  {
    id: 35,
    group: 6,
    title: "Geoffrey Chaucer",
    startYear: 1340,
    endYear: 1400,
    description: "English poet and author of The Canterbury Tales, celebrated as the father of English literature.",
    link: "https://en.wikipedia.org/wiki/Geoffrey_Chaucer",
    category: "Influential People"
  },
  {
    id: 36,
    group: 6,
    title: "Joan of Arc",
    startYear: 1412,
    endYear: 1431,
    description: "Military leader and national heroine of France who rallied French forces during the Hundred Years' War.",
    link: "https://en.wikipedia.org/wiki/Joan_of_Arc",
    category: "Influential People"
  },
  {
    id: 37,
    group: 6,
    title: "Johannes Gutenberg",
    startYear: 1400,
    endYear: 1468,
    description: "German craftsman who invented the movable-type printing press, sparking the print revolution.",
    link: "https://en.wikipedia.org/wiki/Johannes_Gutenberg",
    category: "Influential People"
  },
  {
    id: 38,
    group: 6,
    title: "Leonardo da Vinci",
    startYear: 1452,
    endYear: 1519,
    description: "Italian polymath of the High Renaissance, renowned as a painter, inventor, scientist, and anatomist.",
    link: "https://en.wikipedia.org/wiki/Leonardo_da_Vinci",
    category: "Influential People"
  },
  {
    id: 39,
    group: 6,
    title: "Christopher Columbus",
    startYear: 1451,
    endYear: 1506,
    description: "Genoese explorer whose 1492 voyage initiated sustained European contact with the Americas.",
    link: "https://en.wikipedia.org/wiki/Christopher_Columbus",
    category: "Influential People"
  },
  {
    id: 40,
    group: 6,
    title: "Niccolò Machiavelli",
    startYear: 1469,
    endYear: 1527,
    description: "Italian diplomat and political philosopher whose treatise The Prince laid groundwork for modern political science.",
    link: "https://en.wikipedia.org/wiki/Niccol%C3%B2_Machiavelli",
    category: "Influential People"
  },
  {
    id: 41,
    group: 6,
    title: "Nicolaus Copernicus",
    startYear: 1473,
    endYear: 1543,
    description: "Renaissance mathematician and astronomer who formulated the heliocentric model placing the Sun at the center of the universe.",
    link: "https://en.wikipedia.org/wiki/Nicolaus_Copernicus",
    category: "Influential People"
  },
  {
    id: 42,
    group: 6,
    title: "Michelangelo",
    startYear: 1475,
    endYear: 1564,
    description: "Italian sculptor, painter, and architect of the High Renaissance, celebrated for masterworks like the Sistine Chapel ceiling and David.",
    link: "https://en.wikipedia.org/wiki/Michelangelo",
    category: "Influential People"
  },
  {
    id: 43,
    group: 6,
    title: "Hernán Cortés",
    startYear: 1485,
    endYear: 1547,
    description: "Spanish conquistador who led the expedition that caused the fall of the Aztec Empire.",
    link: "https://en.wikipedia.org/wiki/Hern%C3%A1n_Cort%C3%A9s",
    category: "Influential People"
  },
  {
    id: 44,
    group: 6,
    title: "Martin Luther",
    startYear: 1483,
    endYear: 1546,
    description: "German theologian whose 95 Theses sparked the Protestant Reformation.",
    link: "https://en.wikipedia.org/wiki/Martin_Luther",
    category: "Influential People"
  },
  {
    id: 45,
    group: 6,
    title: "Elizabeth I of England",
    startYear: 1533,
    endYear: 1603,
    description: "Queen of England and Ireland whose reign marked the Golden Age of the English Renaissance.",
    link: "https://en.wikipedia.org/wiki/Elizabeth_I",
    category: "Influential People"
  },
  {
    id: 46,
    group: 6,
    title: "William Shakespeare",
    startYear: 1564,
    endYear: 1616,
    description: "English playwright, poet, and actor widely regarded as the greatest writer in the English language.",
    link: "https://en.wikipedia.org/wiki/William_Shakespeare",
    category: "Influential People"
  },
  {
    id: 47,
    group: 6,
    title: "Galileo Galilei",
    startYear: 1564,
    endYear: 1642,
    description: "Italian astronomer and physicist whose telescopic observations advanced the scientific revolution.",
    link: "https://en.wikipedia.org/wiki/Galileo_Galilei",
    category: "Influential People"
  },
  {
    id: 48,
    group: 6,
    title: "René Descartes",
    startYear: 1596,
    endYear: 1650,
    description: "French philosopher, mathematician, and writer dubbed the father of modern Western philosophy.",
    link: "https://en.wikipedia.org/wiki/Ren%C3%A9_Descartes",
    category: "Influential People"
  },
  {
    id: 49,
    group: 6,
    title: "Isaac Newton",
    startYear: 1643,
    endYear: 1727,
    description: "English mathematician and physicist who formulated the laws of motion and universal gravitation.",
    link: "https://en.wikipedia.org/wiki/Isaac_Newton",
    category: "Influential People"
  },
  {
    id: 50,
    group: 6,
    title: "Voltaire",
    startYear: 1694,
    endYear: 1778,
    description: "French Enlightenment writer and philosopher known for his wit, advocacy of freedom of speech, and criticism of religious dogma.",
    link: "https://en.wikipedia.org/wiki/Voltaire",
    category: "Influential People"
  },
  {
    id: 51,
    group: 6,
    title: "Benjamin Franklin",
    startYear: 1706,
    endYear: 1790,
    description: "American polymath, Founding Father, printer, and scientist renowned for his discoveries in electricity.",
    link: "https://en.wikipedia.org/wiki/Benjamin_Franklin",
    category: "Influential People"
  },
  {
    id: 52,
    group: 6,
    title: "George Washington",
    startYear: 1732,
    endYear: 1799,
    description: "Commander-in-Chief of the Continental Army and the first President of the United States.",
    link: "https://en.wikipedia.org/wiki/George_Washington",
    category: "Influential People"
  },
  {
    id: 53,
    group: 6,
    title: "Napoleon Bonaparte",
    startYear: 1769,
    endYear: 1821,
    description: "French military commander and emperor who conquered much of Europe in the early 19th century.",
    link: "https://en.wikipedia.org/wiki/Napoleon",
    category: "Influential People"
  },
  {
    id: 54,
    group: 6,
    title: "Abraham Lincoln",
    startYear: 1809,
    endYear: 1865,
    description: "16th President of the United States who led the nation through the American Civil War and abolished slavery.",
    link: "https://en.wikipedia.org/wiki/Abraham_Lincoln",
    category: "Influential People"
  }
];

export default function MusicHistoryTimeline() {
  // --- STATE ---
  const [bounds, setBounds] = useState({ startYear: 400, endYear: 2000 });
  const [visibleStart, setVisibleStart] = useState(500);
  const [visibleEnd, setVisibleEnd] = useState(1900);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showControls, setShowControls] = useState(false);
  
  // Timeline Ref for swipe-to-pan calculation
  const timelineRef = useRef(null);
  const [touchStartX, setTouchStartX] = useState(null);
  const [initialStart, setInitialStart] = useState(0);

  // Wikipedia integration state (Now an array to hold multiple suggestions)
  const [wikiSuggestions, setWikiSuggestions] = useState([]);
  const [isSearchingWiki, setIsSearchingWiki] = useState(false);
  
  const [groupColors, setGroupColors] = useState({
    1: '#6c757d', // Eras 
    2: '#007bff', // Musicians 
    3: '#28a745', // Musical Events 
    4: '#dc3545', // World Events 
    5: '#17a2b8', // Other 
    6: '#6f42c1'  // Influential People
  });

  const [hiddenGroups, setHiddenGroups] = useState([]);
  const [expandedGroups, setExpandedGroups] = useState([]); 

  const groups = [
    { id: 1, title: 'Eras' },
    { id: 2, title: 'Musicians' },
    { id: 3, title: 'Musical Events' },
    { id: 4, title: 'World Events' },
    { id: 6, title: 'Influential People' },
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
    return [...defaultItems, ...defaultEvents];
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
    setHasUnsavedChanges(false);
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
    e.target.value = '';
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset your timeline? This will erase any of your custom events and restore the default timeline.")) {
      localStorage.removeItem('music_timeline_data');
      setItems([...defaultItems, ...defaultEvents]);
      setHasUnsavedChanges(false);
    }
  };

  // --- WIKIPEDIA SEARCH HELPER ---
  const handleSearchWikipedia = async () => {
    if (!formData.title.trim()) {
      alert("Please enter an event or person title first!");
      return;
    }
    setIsSearchingWiki(true);
    setWikiSuggestions([]);

    try {
      const query = encodeURIComponent(formData.title.trim());
      const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${query}&format=json&origin=*`);
      const data = await response.json();

      if (data.query && data.query.search && data.query.search.length > 0) {
        // Grab up to the top 4 results for disambiguation
        const topResults = data.query.search.slice(0, 4).map(res => ({
          title: res.title,
          url: `https://en.wikipedia.org/wiki/${encodeURIComponent(res.title.replace(/ /g, '_'))}`,
          snippet: res.snippet.replace(/<\/?[^>]+(>|$)/g, "")
        }));
        
        setWikiSuggestions(topResults);
      } else {
        alert("No matching Wikipedia article found.");
      }
    } catch (error) {
      console.error("Failed to query Wikipedia:", error);
      alert("Could not connect to Wikipedia search.");
    } finally {
      setIsSearchingWiki(false);
    }
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

  // --- SWIPE TO PAN LOGIC ---
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
    setInitialStart(visibleStart);
  };

  const handleTouchMove = (e) => {
    if (touchStartX === null || !timelineRef.current) return;
    const currentX = e.touches[0].clientX;
    const diffX = touchStartX - currentX; // positive = swiping left (forward in time)
    
    const containerWidth = timelineRef.current.offsetWidth;
    const yearsDiff = (diffX / containerWidth) * windowSize;
    
    let newStart = initialStart + yearsDiff;
    const maxStart = bounds.endYear - windowSize;
    
    // Enforce bounds smoothly while swiping
    if (newStart < bounds.startYear) newStart = bounds.startYear;
    if (newStart > maxStart) newStart = maxStart;

    setVisibleStart(newStart);
    setVisibleEnd(newStart + windowSize);
  };

  const handleTouchEnd = () => {
    setTouchStartX(null);
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

    // MODIFIED FOR MOBILE: Characters take up more visual width on smaller screens, 
    // so we multiply the length to force items into new lanes instead of overlapping.
    const charMultiplier = isMobile ? 2.5 : 0.9;

    sorted.forEach(item => {
      const isEra = item.group === 1;

      const textWidthPercent = (item.title?.length || 0) * charMultiplier;
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
    setWikiSuggestions([]); // Clear suggestions on submit
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
        <div style={{ backgroundColor: '#fff', border: '2px solid #007bff', borderRadius: '6px', padding: '15px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', order: 1 }}>
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
          
          <button 
            onClick={handleReset} 
            style={{ width: '100%', padding: '10px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '13px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '10px' }}
          >
            ⚠️ Reset to Defaults
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
            style={{ width: '100%', padding: '10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', order: 2 }}
          >
            {showControls ? '▲ Hide Navigation & Filters' : '▼ Show Navigation & Filters'}
          </button>
        )}

        {/* --- CONTROLS (Hidden on Mobile unless toggled) --- */}
        {(!isMobile || showControls) && (
          <>
            {/* Timelines: On Mobile it's below the toggle (order 3). On Desktop it's at the bottom (order 4) */}
            <div style={{ backgroundColor: '#f8f9fa', border: '1px solid #ddd', borderRadius: '6px', padding: '15px', order: isMobile ? 3 : 4 }}>
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

            {/* Navigator: On Mobile it's at the bottom (order 4). On Desktop it's above Timelines (order 3) */}
            <div style={{ backgroundColor: '#f8f9fa', border: '1px solid #ddd', borderRadius: '6px', padding: '15px', order: isMobile ? 4 : 3 }}>
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
          </>
        )}
      </div>

      {/* =========================================
          MAIN CONTENT (Full width on Mobile)
      ========================================= */}
      <div style={{ width: '100%', flex: '1 1 0%', minWidth: 0, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* --- THE CUSTOM TIMELINE --- */}
        <div 
          ref={timelineRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ border: '2px solid #aaa', borderRadius: '4px', backgroundColor: '#fff', position: 'relative', touchAction: 'pan-y' }}
        >
          
          {/* Years Header Grid */}
          <div style={{ display: 'flex', height: '30px', borderBottom: '2px solid #aaa', backgroundColor: '#343a40', color: 'white' }}>
            <div style={{...headerColumnStyle, flexDirection: 'row', alignItems: 'center', backgroundColor: '#343a40', borderRight: '2px solid #555', color: 'white', cursor: 'default'}}>Year</div>
            <div style={canvasStyle}>
              {getGridMarkers().map(year => {
                const leftPercent = ((year - visibleStart) / windowSize) * 100;
                return (
                  <div key={year} style={{ position: 'absolute', left: `${leftPercent}%`, top: 0, bottom: 0, borderLeft: '1px solid #666', paddingLeft: '4px', fontSize: '12px', paddingTop: '6px', pointerEvents: 'none' }}>
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
                    <div key={year} style={{ position: 'absolute', left: `${((year - visibleStart) / windowSize) * 100}%`, top: 0, bottom: 0, borderLeft: '1px solid #f0f0f0', zIndex: 0, pointerEvents: 'none' }} />
                  ))}

                  {/* Event Blocks */}
                  {stackedItems.map(item => {
                    // Hide items if they fall outside the 4-lane limit while collapsed
                    if (!isExpanded && item.lane >= 4) return null;

                    const isPoint = item.startYear === item.endYear;
                    const leftPercent = ((item.startYear - visibleStart) / windowSize) * 100;
                    const widthPercent = ((item.endYear - item.startYear) / windowSize) * 100;

                    if (item.endYear < visibleStart || item.startYear > visibleEnd) return null;

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

        {/* --- INPUT FORM WITH WIKIPEDIA INTEGRATION --- */}
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: isMobile ? '100%' : '500px', backgroundColor: '#fdfdfd' }}>
          <h3>Add Timeline Event</h3>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            
            {/* Title & Wikipedia Search Button Row */}
            <div style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="text" 
                name="title" 
                placeholder="Event Title (Required)" 
                required 
                value={formData.title} 
                onChange={handleInputChange} 
                style={{ padding: '8px', flexGrow: 1 }} 
              />
              <button 
                type="button" 
                onClick={handleSearchWikipedia}
                disabled={isSearchingWiki}
                style={{ padding: '8px 12px', backgroundColor: '#17a2b8', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold', whiteSpace: 'nowrap' }}
              >
                {isSearchingWiki ? 'Searching...' : '🔍 Search Wiki'}
              </button>
            </div>

            {/* Wikipedia Suggestion Prompt Box (Multiple Results) */}
            {wikiSuggestions && wikiSuggestions.length > 0 && (
              <div style={{ backgroundColor: '#e7f3ff', border: '1px solid #b3d7ff', padding: '12px', borderRadius: '6px', fontSize: '12px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ fontWeight: 'bold', marginBottom: '-5px', color: '#0056b3' }}>
                  Found Wikipedia matches. Choose one:
                </div>
                
                {wikiSuggestions.map((suggestion, index) => (
                  <div key={index} style={{ borderBottom: index < wikiSuggestions.length - 1 ? '1px solid #b3d7ff' : 'none', paddingBottom: index < wikiSuggestions.length - 1 ? '10px' : '0' }}>
                    <div style={{ fontSize: '14px', marginBottom: '4px' }}>
                      <strong>{suggestion.title}</strong>
                    </div>
                    <div style={{ color: '#444', lineHeight: '1.4', marginBottom: '8px' }}>
                      {suggestion.snippet}...
                    </div>
                    <button 
                      type="button" 
                      onClick={() => {
                        setFormData(prev => ({
                          ...prev,
                          link: suggestion.url,
                          description: prev.description ? prev.description : suggestion.snippet
                        }));
                        setWikiSuggestions([]);
                      }}
                      style={{ padding: '5px 10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      ✓ Use This Link & Summary
                    </button>
                  </div>
                ))}
                
                <button 
                  type="button" 
                  onClick={() => setWikiSuggestions([])}
                  style={{ padding: '6px 10px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', alignSelf: 'flex-start', marginTop: '4px' }}
                >
                  Dismiss All
                </button>
              </div>
            )}
            
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