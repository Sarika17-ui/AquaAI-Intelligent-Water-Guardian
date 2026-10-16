const mockNodes = [
  {
    id: 'JR-01',
    label: 'Upstream',
    location: 'Upstream Monitoring Zone',
    status: 'normal',
    anomalyScore: 12,
    battery: '87%',
    sensorHealth: 'Good',
    connection: 'ONLINE',
    lastSync: '12 sec ago',
    lastUpdate: '8 sec ago',
    coords: { x: 170, y: 120 },
    readings: { tds: 285, turbidity: 2.1, temperature: 25.4, ph: 7.2, do: 8.2 },
    baseline: { tds: 285, turbidity: 2.1, temperature: 25.4, ph: 7.2, do: 8.2 },
    history: [250, 271, 280, 285, 292, 285, 288],
    sensors: {
      tds: { connected: true, status: 'CONNECTED', value: 285, unit: 'ppm', previous: 268, delta: 6.3 },
      turbidity: { connected: true, status: 'CONNECTED', value: 2.1, unit: 'NTU', previous: 2.0, delta: 5.0 },
      temperature: { connected: true, status: 'CONNECTED', value: 25.4, unit: '°C', previous: 24.8, delta: 2.4 },
      ph: { connected: false, status: 'NOT CONNECTED', value: 'Not connected', unit: 'pH', previous: null, delta: null },
      do: { connected: false, status: 'NOT CONNECTED', value: 'Not connected', unit: 'mg/L', previous: null, delta: null }
    },
    activeAlert: false,
    alertState: 'RESOLVED',
    alerts: []
  },
  {
    id: 'JR-02',
    label: 'Residential Zone',
    location: 'Residential Zone',
    status: 'normal',
    anomalyScore: 24,
    battery: '74%',
    sensorHealth: 'Good',
    connection: 'ONLINE',
    lastSync: '7 sec ago',
    lastUpdate: '5 sec ago',
    coords: { x: 300, y: 200 },
    readings: { tds: 365, turbidity: 3.8, temperature: 26.5, ph: null, do: null },
    baseline: { tds: 365, turbidity: 3.8, temperature: 26.5, ph: null, do: null },
    history: [330, 348, 352, 360, 366, 362, 365],
    sensors: {
      tds: { connected: true, status: 'CONNECTED', value: 365, unit: 'ppm', previous: 341, delta: 7.0 },
      turbidity: { connected: true, status: 'CONNECTED', value: 3.8, unit: 'NTU', previous: 3.5, delta: 8.6 },
      temperature: { connected: true, status: 'CONNECTED', value: 26.5, unit: '°C', previous: 25.9, delta: 2.3 },
      ph: { connected: false, status: 'NOT CONNECTED', value: 'Not connected', unit: 'pH', previous: null, delta: null },
      do: { connected: false, status: 'NOT CONNECTED', value: 'Not connected', unit: 'mg/L', previous: null, delta: null }
    },
    activeAlert: false,
    alertState: 'RESOLVED',
    alerts: []
  },
  {
    id: 'JR-03',
    label: 'Industrial Zone',
    location: 'Industrial Zone',
    status: 'warning',
    anomalyScore: 62,
    battery: '68%',
    sensorHealth: 'Warning',
    connection: 'ONLINE',
    lastSync: '6 sec ago',
    lastUpdate: '5 sec ago',
    coords: { x: 430, y: 180 },
    readings: { tds: 612, turbidity: 8.4, temperature: 28.1, ph: null, do: null },
    baseline: { tds: 520, turbidity: 5.1, temperature: 26.2, ph: null, do: null },
    history: [500, 545, 560, 590, 600, 612, 620],
    sensors: {
      tds: { connected: true, status: 'WARNING', value: 612, unit: 'ppm', previous: 560, delta: 9.3 },
      turbidity: { connected: true, status: 'WARNING', value: 8.4, unit: 'NTU', previous: 6.1, delta: 37.7 },
      temperature: { connected: true, status: 'CONNECTED', value: 28.1, unit: '°C', previous: 27.1, delta: 3.7 },
      ph: { connected: false, status: 'NOT CONNECTED', value: 'Not connected', unit: 'pH', previous: null, delta: null },
      do: { connected: false, status: 'NOT CONNECTED', value: 'Not connected', unit: 'mg/L', previous: null, delta: null }
    },
    activeAlert: true,
    alertState: 'ACKNOWLEDGED',
    alerts: [{ level: 'WARNING', title: 'Turbidity rising above baseline', status: 'ACKNOWLEDGED', time: '5 min ago' }]
  },
  {
    id: 'JR-04',
    label: 'Downstream',
    location: 'Downstream Monitoring Zone',
    status: 'critical',
    anomalyScore: 84,
    battery: '56%',
    sensorHealth: 'Critical',
    connection: 'ONLINE',
    lastSync: '3 sec ago',
    lastUpdate: '3 sec ago',
    coords: { x: 540, y: 245 },
    readings: { tds: 940, turbidity: 18.2, temperature: 29.3, ph: null, do: null },
    baseline: { tds: 660, turbidity: 6.1, temperature: 26.6, ph: null, do: null },
    history: [660, 700, 760, 810, 870, 910, 940],
    sensors: {
      tds: { connected: true, status: 'CRITICAL', value: 940, unit: 'ppm', previous: 810, delta: 16.0 },
      turbidity: { connected: true, status: 'CRITICAL', value: 18.2, unit: 'NTU', previous: 10.8, delta: 68.5 },
      temperature: { connected: true, status: 'WARNING', value: 29.3, unit: '°C', previous: 27.5, delta: 6.5 },
      ph: { connected: false, status: 'NOT CONNECTED', value: 'Not connected', unit: 'pH', previous: null, delta: null },
      do: { connected: false, status: 'NOT CONNECTED', value: 'Not connected', unit: 'mg/L', previous: null, delta: null }
    },
    activeAlert: true,
    alertState: 'NEW',
    alerts: [{ level: 'CRITICAL', title: 'Possible water-quality anomaly', status: 'NEW', time: 'Now' }]
  },
  {
    id: 'JR-05',
    label: 'Reservoir',
    location: 'Reservoir Inlet',
    status: 'normal',
    anomalyScore: 18,
    battery: '90%',
    sensorHealth: 'Good',
    connection: 'ONLINE',
    lastSync: '14 sec ago',
    lastUpdate: '6 sec ago',
    coords: { x: 670, y: 120 },
    readings: { tds: 318, turbidity: 2.8, temperature: 24.9, ph: 7.4, do: 8.5 },
    baseline: { tds: 318, turbidity: 2.8, temperature: 24.9, ph: 7.4, do: 8.5 },
    history: [300, 305, 310, 314, 318, 320, 318],
    sensors: {
      tds: { connected: true, status: 'CONNECTED', value: 318, unit: 'ppm', previous: 314, delta: 1.3 },
      turbidity: { connected: true, status: 'CONNECTED', value: 2.8, unit: 'NTU', previous: 3.1, delta: -9.7 },
      temperature: { connected: true, status: 'CONNECTED', value: 24.9, unit: '°C', previous: 25.0, delta: -0.4 },
      ph: { connected: true, status: 'SIMULATED', value: 7.4, unit: 'pH', previous: 7.5, delta: -1.3 },
      do: { connected: true, status: 'SIMULATED', value: 8.5, unit: 'mg/L', previous: 8.8, delta: -3.4 }
    },
    activeAlert: false,
    alertState: 'RESOLVED',
    alerts: []
  }
];

const defaultSettings = {
  tdsWarning: 500,
  turbidityWarning: 6,
  temperatureWarning: 28,
  refreshInterval: 4,
  tempUnit: '°C',
  demoModeEnabled: true,
  notificationsEnabled: true,
  liveMode: 'demo',
  voiceLanguage: 'hi-IN',
  voiceRate: 0.85,
  voiceAutoIntro: false,
  voiceDetailed: false,
  voiceWelcomeSeen: false
};

const sensorCatalog = {
  tds: { label: 'TDS Sensor', icon: '💧', unit: 'ppm', reference: 'TDS calibration solution', defaultValue: 420, timeoutSeconds: 45, min: 0, max: 2000 },
  turbidity: { label: 'Turbidity Sensor', icon: '🌫️', unit: 'NTU', reference: 'Turbidity reference standard', defaultValue: 4.2, timeoutSeconds: 40, min: 0, max: 50 },
  temperature: { label: 'Temperature Sensor', icon: '🌡️', unit: '°C', reference: 'Reference temperature comparison', defaultValue: 24.5, timeoutSeconds: 50, min: -20, max: 80 },
  ph: { label: 'pH Sensor', icon: '🧪', unit: 'pH', reference: 'Buffer solution', defaultValue: 7.2, timeoutSeconds: 60, min: 0, max: 14 },
  do: { label: 'Dissolved Oxygen Sensor', icon: '🫧', unit: 'mg/L', reference: 'Dissolved oxygen calibration standard', defaultValue: 8.4, timeoutSeconds: 60, min: 0, max: 20 }
};

const voiceGuideInstructions = {
  overview: {
    en: 'This is the main Jal Raksha dashboard. Here you can view monitoring-node status, water readings, and alerts. Select a node to see more details. If an alert appears, open it to understand the reason and recommended actions.',
    hi: 'यह जल रक्षा का मुख्य डैशबोर्ड है। यहाँ आप सभी निगरानी केंद्रों की स्थिति, पानी की रीडिंग और चेतावनियाँ देख सकते हैं। किसी केंद्र की अधिक जानकारी के लिए उसे चुनें। अगर कोई चेतावनी दिखाई दे, तो उसे खोलकर कारण और सुझाए गए कदम पढ़ें।',
    detailEn: 'The overview score summarizes recent sensor changes for monitoring. It is not a laboratory result and does not certify that water is safe to drink. Use the node details and alert information to decide what needs field inspection.',
    detailHi: 'यहाँ दिखने वाला स्कोर निगरानी के लिए हाल की सेंसर रीडिंग का सार है। यह प्रयोगशाला की जाँच नहीं है और पानी के पीने योग्य होने का प्रमाण नहीं देता। जाँच की जरूरत समझने के लिए केंद्र की जानकारी और चेतावनी देखें।'
  },
  monitoring: {
    en: 'This page displays water readings. TDS is a general indicator of dissolved substances. Turbidity indicates how cloudy the water is, and temperature measures how warm or cool it is. Open a monitoring node to investigate unusual changes.',
    hi: 'इस पेज पर पानी की रीडिंग दिखाई देती हैं। TDS पानी में घुले पदार्थों का एक सामान्य संकेत देता है। गंदलेपन से पता चलता है कि पानी में कितने छोटे कण मौजूद हैं। तापमान पानी की गर्मी या ठंडक बताता है। किसी रीडिंग में असामान्य बदलाव हो, तो संबंधित केंद्र खोलकर जानकारी देखें।',
    detailEn: 'Compare values with the same node’s baseline and check the last update time. pH and dissolved oxygen may be simulated in this prototype. A sensor reading alone cannot identify every contaminant.',
    detailHi: 'रीडिंग की तुलना उसी केंद्र के पुराने सामान्य मान से करें और आखिरी अपडेट का समय देखें। इस प्रोटोटाइप में pH और घुली ऑक्सीजन की रीडिंग सिम्युलेटेड हो सकती हैं। केवल सेंसर रीडिंग से हर प्रदूषक की पहचान नहीं होती।'
  },
  map: {
    en: 'This map shows monitoring-node status. Tap a node to view its readings and alerts. Map colors indicate monitoring conditions; they do not independently prove contamination or drinking-water safety.',
    hi: 'यह नक्शा निगरानी केंद्रों की स्थिति दिखाता है। किसी केंद्र पर टैप करके उसकी रीडिंग और चेतावनियाँ देखें। नक्शे के रंग निगरानी की स्थिति बताते हैं, लेकिन केवल रंग के आधार पर पानी को प्रदूषित या पीने योग्य घोषित नहीं किया जा सकता।',
    detailEn: 'Use the status filters to focus on normal, warning, critical, or offline nodes. Time-range controls are available, but the displayed map does not replace a field visit or laboratory test.',
    detailHi: 'सामान्य, चेतावनी, गंभीर या बंद केंद्र देखने के लिए स्थिति फ़िल्टर चुनें। समय अवधि के विकल्प भी हैं। नक्शे की जानकारी स्थल की जाँच या प्रयोगशाला परीक्षण का विकल्प नहीं है।'
  },
  analysis: {
    en: 'This page explains unusual changes in water readings and their possible causes. Readings may be compared with historical baselines. These indicators do not confirm a specific chemical. Obtain laboratory testing when a serious issue is suspected.',
    hi: 'यह पेज पानी की रीडिंग में असामान्य बदलाव और उनके संभावित कारण समझाता है। तुलना पिछले सामान्य मानों से की जा सकती है। यह शुरुआती संकेत देता है, किसी खास रसायन की पुष्टि नहीं करता। गंभीर स्थिति में पानी की प्रयोगशाला में जाँच करवाएँ।',
    detailEn: 'The anomaly score is a rule-based monitoring indicator, not a probability of contamination. Review the contributing readings, data quality, and recommended action together before deciding what to do.',
    detailHi: 'असामान्यता स्कोर नियमों पर आधारित निगरानी संकेत है। यह प्रदूषण की संभावना नहीं बताता। कोई कदम तय करने से पहले रीडिंग, डेटा की गुणवत्ता और सुझाई गई कार्रवाई साथ में देखें।'
  },
  alerts: {
    en: 'This page shows water-monitoring alerts. Open an alert to review its cause and recommended actions. Mark it resolved only after the issue has been investigated. An alert alone is not definitive proof of contamination. Use Generate Report or Export CSV for the records shown by this prototype.',
    hi: 'यहाँ पानी की निगरानी से जुड़ी चेतावनियाँ दिखाई देती हैं। किसी चेतावनी को खोलकर उसका कारण और सुझाए गए कदम देखें। जाँच करने के बाद ही उसे हल हुआ दर्ज करें। चेतावनी अपने आप में प्रदूषण का अंतिम प्रमाण नहीं है। इस प्रोटोटाइप के रिकॉर्ड के लिए रिपोर्ट बनाएँ या CSV डाउनलोड करें।',
    detailEn: 'Acknowledge an alert when someone has taken responsibility for checking it. Resolve it only after investigation. Reports and CSV exports reflect available application records, which can include simulated data.',
    detailHi: 'जाँच की जिम्मेदारी लेने के बाद चेतावनी को स्वीकार करें। जाँच पूरी होने पर ही उसे हल हुआ दर्ज करें। रिपोर्ट और CSV में ऐप के उपलब्ध रिकॉर्ड होते हैं; उनमें सिम्युलेटेड डेटा भी हो सकता है।'
  },
  nodes: {
    en: 'This page lists monitoring nodes. Select a node to view its readings, connectivity, and recent alerts. If its reading is old, check its connection and last update.',
    hi: 'यहाँ सभी निगरानी केंद्रों की सूची है। किसी केंद्र को चुनकर उसकी रीडिंग, कनेक्शन की स्थिति और पिछली चेतावनियाँ देखें। अगर रीडिंग पुरानी है, तो केंद्र का कनेक्शन और आखिरी अपडेट जाँचें।',
    detailEn: 'The node list also lets an operator add a node to this prototype. Adding a record here does not install or connect physical sensor hardware.',
    detailHi: 'ऑपरेटर इस प्रोटोटाइप में नया केंद्र जोड़ सकता है। यहाँ रिकॉर्ड जोड़ने से असली सेंसर उपकरण अपने आप स्थापित या कनेक्ट नहीं होता।'
  },
  health: {
    en: 'This page shows sensor connectivity, reading freshness, and sensor health. If a sensor is disconnected, producing invalid readings, or has not updated recently, open its details and investigate.',
    hi: 'यह पेज सेंसर के कनेक्शन, रीडिंग मिलने के समय और सेंसर की स्थिति को दिखाता है। अगर सेंसर बंद है, गलत रीडिंग दे रहा है या लंबे समय से अपडेट नहीं हुआ है, तो उसकी जानकारी खोलकर जाँच करें।',
    detailEn: 'Select a node, then open a sensor card to review its diagnostics and history. A reported healthy connection does not verify the sensor against a laboratory standard.',
    detailHi: 'केंद्र चुनें और सेंसर कार्ड खोलकर उसकी जाँच और पुरानी रीडिंग देखें। कनेक्शन ठीक दिखने का अर्थ यह नहीं है कि सेंसर की प्रयोगशाला मानक से पुष्टि हो गई है।'
  },
  calibration: {
    en: 'This page records sensor checks and calibration. Use the correct reference solution or standard for the sensor. Saving information in the app does not physically calibrate the sensor.',
    hi: 'यहाँ सेंसर की जाँच और कैलिब्रेशन का रिकॉर्ड रखा जाता है। कैलिब्रेशन के लिए सेंसर के अनुसार सही रेफरेंस सॉल्यूशन या मानक का उपयोग करें। ऐप में जानकारी सेव करने से सेंसर अपने आप कैलिब्रेट नहीं होता।',
    detailEn: 'Choose the node and sensor, then follow the displayed steps using the sensor maker’s instructions and a suitable reference standard. Keep a record of the observed and reference values.',
    detailHi: 'केंद्र और सेंसर चुनें। सेंसर निर्माता के निर्देश और सही मानक का उपयोग करके दिए गए चरण पूरे करें। देखे गए मान और रेफरेंस मान का रिकॉर्ड रखें।'
  },
  demo: {
    en: 'Demo Mode lets you explore example changes in water readings and alerts. Simulated readings do not come from physical sensors. Always check whether the displayed data is real or simulated.',
    hi: 'डेमो मोड में आप पानी की रीडिंग में बदलाव और चेतावनियों का उदाहरण देख सकते हैं। डेमो में दिखाई गई सिम्युलेटेड रीडिंग वास्तविक सेंसर से नहीं आती हैं। असली और सिम्युलेटेड डेटा की पहचान हमेशा जाँचें।',
    detailEn: 'Choose a target node and a scenario to see how the dashboard reacts. Use Reset Simulation to return to the baseline. Do not use demo readings to make water-safety decisions.',
    detailHi: 'केंद्र और उदाहरण चुनकर देखें कि डैशबोर्ड कैसे प्रतिक्रिया देता है। सामान्य रीडिंग पर लौटने के लिए Reset Simulation चुनें। पानी की सुरक्षा का निर्णय डेमो रीडिंग से न लें।'
  },
  settings: {
    en: 'This page controls alert thresholds, refresh timing, temperature units, demo mode, and notification preferences. Voice language and speed are available in the Voice Guide panel. Enable automatic short page introductions only if you want them. Open Voice Guide to replay the welcome introduction.',
    hi: 'इस पेज पर चेतावनी की सीमा, अपडेट का समय, तापमान की इकाई, डेमो मोड और सूचनाओं की पसंद बदलें। आवाज़ की भाषा और गति Voice Guide पैनल में मिलती है। छोटे पेज परिचय अपने आप तभी चलाएँ जब आप चाहें। स्वागत परिचय दोबारा सुनने के लिए Voice Guide खोलें।',
    detailEn: 'Press Save Settings to store the dashboard choices in this browser. Device volume is controlled by the phone or computer. Turning off notifications does not remove recorded alerts.',
    detailHi: 'डैशबोर्ड की पसंद इसी ब्राउज़र में सेव करने के लिए Save Settings दबाएँ। आवाज़ की मात्रा फोन या कंप्यूटर से नियंत्रित होती है। सूचनाएँ बंद करने से दर्ज चेतावनियाँ नहीं मिटतीं।'
  },
  about: {
    en: 'Jal Raksha is a water-monitoring prototype. It helps teams review sensor readings, unusual changes, and possible next steps. Sensor data and prototype scores do not certify drinking-water safety. Confirm serious concerns with a qualified laboratory and the responsible water team.',
    hi: 'जल रक्षा पानी की निगरानी का एक प्रोटोटाइप है। यह टीमों को सेंसर रीडिंग, असामान्य बदलाव और अगले संभावित कदम देखने में मदद करता है। सेंसर डेटा और प्रोटोटाइप स्कोर पीने के पानी की सुरक्षा प्रमाणित नहीं करते। गंभीर चिंता होने पर योग्य प्रयोगशाला और जिम्मेदार जल टीम से पुष्टि करें।',
    detailEn: 'Some values in Demo Mode are simulated, and some sensor capabilities are not connected to physical hardware. The Voice Guide can be replayed from its header button, and its language can be changed at any time.',
    detailHi: 'डेमो मोड में कुछ मान सिम्युलेटेड हैं और कुछ सेंसर सुविधाएँ असली उपकरण से जुड़ी नहीं हैं। ऊपर दिए गए Voice Guide बटन से परिचय दोबारा सुनें और भाषा कभी भी बदलें।'
  }
};

const state = {
  activeSection: 'overview',
  selectedNodeId: 'JR-02',
  selectedHealthNodeId: 'JR-03',
  selectedCalibrationNodeId: 'JR-03',
  selectedDemoNodeId: 'JR-02',
  selectedCalibrationSensor: 'tds',
  selectedMapFilter: 'all',
  selectedTimeFilter: 'live',
  alertFilter: 'all',
  calibrationWizardStep: 1,
  calibrationWizardNodeId: null,
  calibrationWizardSensorKey: null,
  notifications: [],
  ui: {
    searchOpen: false,
    searchResults: [],
    searchActiveIndex: -1,
    reportHtml: ''
  },
  activeEvent: null,
  timeline: [],
  settings: loadSettings(),
  systemStatus: 'DEMO MODE',
  backendStatus: 'Demo Mode'
};

const voiceGuide = {
  generation: 0,
  utterance: null,
  sentences: [],
  currentSentence: -1,
  currentText: '',
  gapTimer: null,
  nextSentenceIndex: -1,
  waitingBetweenSentences: false,
  runVoice: null,
  runLanguage: 'hi',
  isPlaying: false,
  isPaused: false,
  cloudAudioUrl: null,
  cloudAbortController: null,

  language() {
    return state.settings.voiceLanguage === 'en-IN' ? 'en' : 'hi';
  },

  locale() {
    return this.language() === 'hi' ? 'hi-IN' : 'en-IN';
  },

  copy() {
    return this.language() === 'hi'
      ? {
        ready: 'तैयार। सुनने के लिए Listen दबाएँ।',
        checking: 'आवाज़ उपलब्ध है या नहीं, जाँच रहे हैं…',
        generating: 'हिंदी आवाज़ तैयार हो रही है…',
        loading: 'हिंदी ऑडियो लोड हो रहा है…',
        playing: 'आवाज़ चल रही है।',
        paused: 'आवाज़ रुकी हुई है।',
        stopped: 'आवाज़ बंद कर दी गई है।',
        complete: 'सुनना पूरा हुआ।',
        unavailable: 'इस ब्राउज़र में टेक्स्ट को आवाज़ में बदलने की सुविधा उपलब्ध नहीं है। आप नीचे दिया गया पाठ पढ़ सकते हैं।',
        missingHindi: 'इस डिवाइस में हिंदी आवाज़ उपलब्ध नहीं है। अंग्रेज़ी आवाज़ से हिंदी नहीं पढ़ी जाएगी। हिंदी पाठ नीचे उपलब्ध है।',
        missingEnglish: 'इस डिवाइस में उपयुक्त अंग्रेज़ी आवाज़ उपलब्ध नहीं है। पाठ नीचे उपलब्ध है।',
        noVoices: 'इस डिवाइस में कोई बोलने वाली आवाज़ उपलब्ध नहीं है। पाठ नीचे उपलब्ध है।',
        failed: 'आवाज़ चल नहीं सकी। डिवाइस की आवाज़ और ब्राउज़र की बोलने की सुविधा जाँचकर फिर कोशिश करें।',
        serviceFailed: 'हिंदी ऑडियो सेवा से आवाज़ तैयार नहीं हो सकी। कनेक्शन और सर्वर सेटिंग जाँचें।',
        playbackFailed: 'हिंदी ऑडियो चल नहीं सका। फिर चलाने के लिए Retry दबाएँ।',
        retry: 'फिर कोशिश करें'
      }
      : {
        ready: 'Ready. Press Listen to hear this page.',
        checking: 'Checking available voices…',
        generating: 'Generating Hindi speech…',
        loading: 'Loading Hindi audio…',
        playing: 'Speaking.',
        paused: 'Speech paused.',
        stopped: 'Speech stopped.',
        complete: 'Finished.',
        unavailable: 'Text-to-speech is not available in this browser. The transcript is still available below.',
        missingHindi: 'No Hindi voice is installed on this device. Hindi text will not be spoken with an English voice; the transcript is available below.',
        missingEnglish: 'No suitable English voice is installed on this device. The transcript is available below.',
        noVoices: 'No speech voices are available on this device. The transcript is available below.',
        failed: 'Speech could not start. Check device volume and browser speech support, then retry.',
        serviceFailed: 'Hindi audio could not be generated. Check the connection and backend configuration.',
        playbackFailed: 'Hindi audio could not be played. Press Retry to try again.',
        retry: 'Retry'
      };
  },

  splitSentences(text) {
    return String(text || '')
      .trim()
      .split(/(?<=[.!?।])\s+(?=[A-Zअ-ह])|\n+/u)
      .map((sentence) => sentence.trim())
      .filter(Boolean);
  },

  pageText(pageId = state.activeSection, short = false) {
    const instruction = voiceGuideInstructions[pageId] || voiceGuideInstructions.overview;
    const language = this.language();
    const text = instruction[language];
    if (short || !state.settings.voiceDetailed) return text;
    return `${text} ${instruction[language === 'hi' ? 'detailHi' : 'detailEn'] || ''}`.trim();
  },

  renderTranscript() {
    const host = document.getElementById('voiceTranscript');
    if (!host) return;
    host.replaceChildren();
    this.sentences.forEach((sentence, index) => {
      const span = document.createElement('span');
      span.className = `voice-transcript-sentence${index === this.currentSentence ? ' current' : ''}`;
      span.textContent = sentence;
      host.append(span);
      if (index < this.sentences.length - 1) host.append(document.createTextNode(' '));
    });
    if (!this.sentences.length) {
      host.textContent = this.language() === 'hi'
        ? 'इस पेज के निर्देश यहाँ दिखाई देंगे।'
        : 'Instructions for this page will appear here.';
    }
    const active = host.querySelector('.current');
    if (active) active.scrollIntoView({ block: 'nearest' });
  },

  setTranscript(text) {
    this.currentText = String(text || '');
    this.sentences = this.splitSentences(this.currentText);
    this.currentSentence = -1;
    this.renderTranscript();
  },

  setStatus(message, loading = false) {
    const status = document.getElementById('voicePlaybackStatus');
    status.textContent = message;
    status.setAttribute('aria-busy', String(loading));
    status.classList.toggle('is-loading', loading);
  },

  setError(message, retryable = false) {
    const error = document.getElementById('voicePlaybackError');
    error.textContent = message;
    error.classList.toggle('hidden', !message);
    document.getElementById('voiceRetryButton').classList.toggle('hidden', !message || !retryable);
  },

  refreshPreferences() {
    const language = this.locale();
    document.documentElement.lang = this.language();
    document.getElementById('voiceRateSelect').value = String(state.settings.voiceRate);
    document.getElementById('voiceDetailedToggle').checked = Boolean(state.settings.voiceDetailed);
    document.getElementById('voiceAutoIntroToggle').checked = Boolean(state.settings.voiceAutoIntro);
    document.getElementById('voiceAutoIntroSetting').checked = Boolean(state.settings.voiceAutoIntro);
    document.querySelectorAll('[data-voice-language]').forEach((button) => {
      const selected = button.dataset.voiceLanguage === language;
      button.classList.toggle('active', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    const welcome = this.language() === 'hi'
      ? {
        title: 'जल रक्षा में आपका स्वागत है',
        text: 'हिंदी या अंग्रेज़ी चुनें और छोटा परिचय सुनें। आप इसे छोड़कर भी डैशबोर्ड का उपयोग कर सकते हैं।',
        play: 'स्वागत परिचय सुनें',
        skip: 'अभी छोड़ें',
        replay: 'स्वागत परिचय फिर सुनें'
      }
      : {
        title: 'Welcome to Jal Raksha',
        text: 'Choose Hindi or English and listen to a short introduction. You can skip it and use the dashboard at any time.',
        play: 'Play welcome',
        skip: 'Skip',
        replay: 'Replay welcome'
      };
    document.getElementById('voiceWelcomeTitle').textContent = welcome.title;
    document.getElementById('voiceWelcomeText').textContent = welcome.text;
    document.getElementById('voiceWelcomePlay').textContent = welcome.play;
    document.getElementById('voiceWelcomeSkip').textContent = welcome.skip;
    document.getElementById('voiceReplayWelcome').textContent = welcome.replay;
    document.getElementById('voiceRetryButton').textContent = this.copy().retry;
    document.getElementById('voiceWelcomeCard').classList.toggle('hidden', Boolean(state.settings.voiceWelcomeSeen));
  },

  updateForRoute(pageId) {
    const panel = document.getElementById('voiceGuidePanel');
    if (panel.classList.contains('hidden')) return;
    this.setTranscript(this.pageText(pageId));
    this.refreshPreferences();
    this.setError('');
    this.setStatus(this.copy().ready);
  },

  open() {
    closeSearchPopover();
    closeNotificationPopover();
    document.getElementById('voiceGuidePanel').classList.remove('hidden');
    document.getElementById('voiceGuideButton').setAttribute('aria-expanded', 'true');
    this.refreshPreferences();
    this.setTranscript(this.pageText());
    if (!this.isPlaying && !this.isPaused) this.setStatus(this.copy().ready);
  },

  stop() {
    this.generation += 1;
    if (this.cloudAbortController) this.cloudAbortController.abort();
    this.cloudAbortController = null;
    if (this.gapTimer !== null) window.clearTimeout(this.gapTimer);
    this.gapTimer = null;
    this.nextSentenceIndex = -1;
    this.waitingBetweenSentences = false;
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    const audio = document.getElementById('voiceAudioPlayer');
    this.cloudAudioUrl = null;
    audio.pause();
    audio.removeAttribute('src');
    audio.load();
    audio.classList.add('hidden');
    this.utterance = null;
    this.isPlaying = false;
    this.isPaused = false;
    this.currentSentence = -1;
    this.renderTranscript();
    this.setStatus(this.copy().stopped);
  },

  close() {
    this.stop();
    document.getElementById('voiceGuidePanel').classList.add('hidden');
    document.getElementById('voiceGuideButton').setAttribute('aria-expanded', 'false');
  },

  async availableVoices() {
    const synthesis = window.speechSynthesis;
    const voices = synthesis.getVoices();
    if (voices.length) return voices;
    return new Promise((resolve) => {
      let settled = false;
      const finish = () => {
        if (settled) return;
        settled = true;
        synthesis.removeEventListener?.('voiceschanged', onChanged);
        window.clearTimeout(timer);
        resolve(synthesis.getVoices());
      };
      const onChanged = () => finish();
      const timer = window.setTimeout(finish, 2500);
      synthesis.addEventListener?.('voiceschanged', onChanged, { once: true });
    });
  },

  async speak(text) {
    this.open();
    this.stop();
    this.setError('');
    this.setTranscript(text);
    const language = this.language();
    const hasSpeechSynthesis = 'speechSynthesis' in window
      && typeof window.SpeechSynthesisUtterance === 'function';
    if (!hasSpeechSynthesis && language !== 'hi') {
      this.setError(this.copy().unavailable, true);
      return;
    }

    const generation = this.generation;
    let voice = null;
    if (hasSpeechSynthesis) {
      this.setStatus(this.copy().checking, true);
      let voices = [];
      try {
        voices = await this.availableVoices();
      } catch (error) {
        if (language !== 'hi') {
          this.setStatus(this.copy().ready);
          this.setError(this.copy().failed, true);
          return;
        }
      }
      if (generation !== this.generation) return;
      voice = language === 'hi'
        ? this.selectHindiVoice(voices)
        : voices.find((candidate) => candidate.lang.toLowerCase() === 'en-in')
          || voices.find((candidate) => candidate.lang.toLowerCase().startsWith('en'));
    }

    if (language === 'hi' && !voice) {
      await this.playHindiCloud(text, generation);
      return;
    }
    if (!voice) {
      this.setStatus(this.copy().ready);
      this.setError(this.copy().missingEnglish, true);
      return;
    }

    this.sentences = this.splitSentences(text);
    this.currentSentence = -1;
    this.renderTranscript();
    this.isPlaying = true;
    this.isPaused = false;
    this.runVoice = voice;
    this.runLanguage = language;
    this.speakSentence(0, generation, voice, language);
  },

  selectHindiVoice(voices) {
    return voices
      .filter((candidate) => /^hi(?:-|$)/i.test(candidate.lang || ''))
      .sort((left, right) => {
        const exactLocale = (voice) => /^hi-in$/i.test(voice.lang || '') ? 2 : 1;
        const preference = exactLocale(right) - exactLocale(left);
        if (preference) return preference;
        return Number(Boolean(right.localService)) - Number(Boolean(left.localService));
      })[0] || null;
  },

  async playHindiCloud(text, generation) {
    this.setStatus(this.copy().generating, true);
    const abortController = new AbortController();
    this.cloudAbortController = abortController;
    try {
      const response = await fetch(apiUrl('/api/voice/hindi'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          speaking_rate: Number(state.settings.voiceRate) || 0.85
        }),
        signal: abortController.signal
      });
      if (!response.ok) {
        let detail = '';
        try {
          const error = await response.json();
          detail = error.detail || '';
        } catch (error) {
          detail = '';
        }
        throw new Error(detail || `Speech service returned HTTP ${response.status}.`);
      }
      if (!response.headers.get('content-type')?.toLowerCase().includes('audio/')) {
        throw new Error('Speech service did not return an audio file.');
      }
      const audioBlob = await response.blob();
      if (!audioBlob.size) throw new Error('Speech service returned an empty audio file.');
      if (generation !== this.generation) return;

      const audio = document.getElementById('voiceAudioPlayer');
      this.cloudAbortController = null;
      this.cloudAudioUrl = URL.createObjectURL(audioBlob);
      audio.src = this.cloudAudioUrl;
      audio.classList.remove('hidden');
      audio.load();
      this.setStatus(this.copy().loading, true);
      try {
        await audio.play();
      } catch (error) {
        if (generation !== this.generation) return;
        this.isPlaying = false;
        this.isPaused = false;
        this.setStatus(this.copy().ready);
        this.setError(`${this.copy().playbackFailed} ${error.message}`, true);
      }
    } catch (error) {
      if (generation !== this.generation || error.name === 'AbortError') return;
      this.cloudAbortController = null;
      this.isPlaying = false;
      this.isPaused = false;
      this.setStatus(this.copy().ready);
      this.setError(`${this.copy().serviceFailed} ${error.message}`, true);
    }
  },

  async retry() {
    const audio = document.getElementById('voiceAudioPlayer');
    if (this.cloudAudioUrl) {
      try {
        await audio.play();
      } catch (error) {
        this.setError(`${this.copy().playbackFailed} ${error.message}`, true);
      }
      return;
    }
    await this.speak(this.currentText || this.pageText());
  },

  speakSentence(index, generation, voice, language) {
    if (generation !== this.generation) return;
    if (index >= this.sentences.length) {
      this.isPlaying = false;
      this.isPaused = false;
      this.utterance = null;
      this.currentSentence = -1;
      this.renderTranscript();
      this.setStatus(this.copy().complete);
      return;
    }
    const sentence = this.sentences[index];
    const utterance = new window.SpeechSynthesisUtterance(sentence);
    utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
    utterance.rate = Number(state.settings.voiceRate) || 1;
    if (voice) utterance.voice = voice;
    utterance.onstart = () => {
      if (generation !== this.generation) return;
      this.currentSentence = index;
      this.renderTranscript();
      this.setStatus(this.copy().playing);
    };
    utterance.onend = () => {
      if (generation !== this.generation) return;
      this.waitingBetweenSentences = true;
      this.nextSentenceIndex = index + 1;
      this.gapTimer = window.setTimeout(() => {
        this.gapTimer = null;
        if (this.isPaused) return;
        this.waitingBetweenSentences = false;
        this.speakSentence(this.nextSentenceIndex, generation, voice, language);
      }, 240);
    };
    utterance.onerror = (event) => {
      if (generation !== this.generation || event.error === 'canceled' || event.error === 'interrupted') return;
      if (language === 'hi') {
        window.speechSynthesis.cancel();
        this.playHindiCloud(this.currentText, generation);
        return;
      }
      this.isPlaying = false;
      this.isPaused = false;
      this.setError(`${this.copy().failed} (${event.error})`, true);
      this.setStatus(this.copy().ready);
    };
    this.utterance = utterance;
    try {
      window.speechSynthesis.speak(utterance);
    } catch (error) {
      if (generation !== this.generation) return;
      this.isPlaying = false;
      this.setError(this.copy().failed, true);
      this.setStatus(this.copy().ready);
    }
  },

  listenPage(short = false) {
    return this.speak(this.pageText(state.activeSection, short));
  },

  pause() {
    if (!this.isPlaying || this.isPaused) return;
    if (this.cloudAudioUrl) {
      document.getElementById('voiceAudioPlayer').pause();
      return;
    }
    if (this.gapTimer !== null) {
      window.clearTimeout(this.gapTimer);
      this.gapTimer = null;
    } else {
      window.speechSynthesis.pause();
    }
    this.isPaused = true;
    this.setStatus(this.copy().paused);
  },

  resume() {
    if (!this.isPaused) return;
    if (this.cloudAudioUrl) {
      document.getElementById('voiceAudioPlayer').play().catch((error) => {
        this.setError(`${this.copy().playbackFailed} ${error.message}`, true);
      });
      return;
    }
    this.isPaused = false;
    this.isPlaying = true;
    this.setStatus(this.copy().playing);
    if (this.waitingBetweenSentences) {
      this.waitingBetweenSentences = false;
      this.speakSentence(this.nextSentenceIndex, this.generation, this.runVoice, this.runLanguage);
    } else {
      window.speechSynthesis.resume();
    }
  },

  welcomeText() {
    return this.language() === 'hi'
      ? 'नमस्ते। यह जल रक्षा है। यहाँ आप निगरानी केंद्रों की रीडिंग और चेतावनियाँ देख सकते हैं। कोई असामान्य रीडिंग मिले, तो केंद्र और चेतावनी खोलकर जानकारी देखें। जरूरत पड़ने पर जिम्मेदार जल टीम और प्रयोगशाला से पुष्टि करें।'
      : 'Welcome to Jal Raksha. Use this dashboard to review monitoring-node readings and alerts. Open a node or alert to understand the available information. If a reading looks unusual, ask the responsible water team to investigate and confirm serious concerns with a laboratory.';
  },

  async replayWelcome() {
    state.settings.voiceWelcomeSeen = true;
    saveSettings();
    this.refreshPreferences();
    await this.speak(this.welcomeText());
  },

  async routeChanged(pageId) {
    this.stop();
    this.updateForRoute(pageId);
    if (state.settings.voiceAutoIntro) {
      this.open();
      window.setTimeout(() => this.listenPage(true), 0);
    }
  },

  async readContext(text) {
    state.settings.voiceWelcomeSeen = true;
    saveSettings();
    this.refreshPreferences();
    return this.speak(text);
  }
};

function voiceNumber(value) {
  return value === null || value === undefined || value === ''
    ? 'unavailable'
    : String(value);
}

function buildVoiceContextText(button) {
  const language = voiceGuide.language();
  const context = button.dataset.voiceContext;
  const nodeId = button.dataset.voiceNode
    || button.dataset.nodeId
    || (context === 'health' ? state.selectedHealthNodeId : state.selectedNodeId);
  const node = getNode(nodeId);
  const readings = node.readings;
  const readingSummary = language === 'hi'
    ? `केंद्र ${node.id} की TDS रीडिंग ${voiceNumber(readings.tds)} पीपीएम है। गंदलापन ${voiceNumber(readings.turbidity)} एन टी यू है। तापमान ${voiceNumber(readings.temperature)} डिग्री सेल्सियस है। pH ${voiceNumber(readings.ph)} है। घुली ऑक्सीजन ${voiceNumber(readings.do)} मिलीग्राम प्रति लीटर है और यह सिम्युलेटेड हो सकती है।`
    : `Node ${node.id}. TDS is ${voiceNumber(readings.tds)} parts per million. Turbidity is ${voiceNumber(readings.turbidity)} NTU. Temperature is ${voiceNumber(readings.temperature)} degrees Celsius. pH is ${voiceNumber(readings.ph)}. Dissolved oxygen is ${voiceNumber(readings.do)} milligrams per litre and may be simulated.`;

  if (context === 'overview-score') {
    return language === 'hi'
      ? `चुने गए केंद्र ${node.id} का निगरानी स्कोर ${node.waterQualityScore} में से 100 है। स्थिति ${node.status} है। ${readingSummary} यह स्कोर पानी की सुरक्षा का प्रमाण नहीं है।`
      : `Selected node ${node.id} has a monitoring score of ${node.waterQualityScore} out of 100 and status ${node.status}. ${readingSummary} This score does not certify water safety.`;
  }
  if (context === 'node-readings') {
    return language === 'hi'
      ? `${readingSummary} कनेक्शन की स्थिति ${node.connectionStatus} है। सेंसर स्वास्थ्य ${node.sensorHealth} है। डेटा की गुणवत्ता ${node.dataQuality} है।`
      : `${readingSummary} Connection status is ${node.connectionStatus}. Sensor health is ${node.sensorHealth}. Data quality is ${node.dataQuality}.`;
  }
  if (context === 'analysis') {
    const analysis = buildAnalysis(node);
    return language === 'hi'
      ? `केंद्र ${node.id} का नियम-आधारित असामान्यता स्कोर ${analysis.anomalyScore} में से 100 है। ${readingSummary} यह स्कोर प्रदूषण की संभावना या किसी खास रसायन की पुष्टि नहीं करता। गंभीर चिंता होने पर प्रयोगशाला से जाँच करवाएँ।`
      : `Node ${node.id} has a rule-based anomaly score of ${analysis.anomalyScore} out of 100. ${readingSummary} This score is not a probability of contamination and does not confirm a specific chemical. Obtain laboratory testing if a serious concern is suspected.`;
  }
  if (context === 'health') {
    const summary = getHealthSummary(node);
    return language === 'hi'
      ? `केंद्र ${node.id} में ${summary.total} सेंसर हैं। ${summary.healthy} ठीक हैं, ${summary.warnings} पर चेतावनी है और ${summary.disconnected} जुड़े नहीं हैं। आखिरी रीडिंग का समय ${formatRelativeTime(node.lastUpdated)} है।`
      : `Node ${node.id} has ${summary.total} sensors. ${summary.healthy} are healthy, ${summary.warnings} have warnings, and ${summary.disconnected} are disconnected. The last reading was ${formatRelativeTime(node.lastUpdated)}.`;
  }
  if (context === 'calibration') {
    const sensorKey = button.dataset.sensorKey || state.selectedCalibrationSensor || 'tds';
    const definition = getSensorDefinition(sensorKey);
    return language === 'hi'
      ? `केंद्र ${node.id} के ${definition.label} की जाँच करें। रेफरेंस मानक ${definition.reference} है। निर्माता के निर्देशों के अनुसार उचित मानक से भौतिक सेंसर कैलिब्रेट करें। ऐप में रिकॉर्ड सेव करने से सेंसर अपने आप कैलिब्रेट नहीं होता।`
      : `Check the ${definition.label} at node ${node.id}. Its reference standard is ${definition.reference}. Physically calibrate the sensor with the appropriate standard and the maker's instructions. Saving a record in this app does not calibrate the sensor.`;
  }
  if (context === 'alert') {
    const key = button.dataset.alertKey;
    const liveIndex = node.alerts.findIndex((alert, index) => getAlertKey(node, alert, index) === key);
    const notification = state.notifications.find((item) => item.alertId === key);
    const alert = liveIndex >= 0
      ? node.alerts[liveIndex]
      : notification?.alertSnapshot;
    if (alert) {
      const level = alert.level || alert.severity || 'WARNING';
      const reason = alert.reason || alert.explanation || alert.title;
      const action = alert.recommendation || alert.recommended_action || getRecommendation(node);
      return language === 'hi'
        ? `केंद्र ${node.id} की ${level} चेतावनी। ${alert.title} कारण: ${reason} वर्तमान मान ${voiceNumber(alert.currentValue ?? alert.current_value)} है। आधार मान ${voiceNumber(alert.baselineValue ?? alert.baseline_value)} है। सुझाई गई कार्रवाई: ${action} चेतावनी प्रदूषण का अंतिम प्रमाण नहीं है।`
        : `Node ${node.id}, ${level} alert. ${alert.title}. Reason: ${reason}. Current value: ${voiceNumber(alert.currentValue ?? alert.current_value)}. Baseline: ${voiceNumber(alert.baselineValue ?? alert.baseline_value)}. Recommended action: ${action}. An alert is not definitive proof of contamination.`;
    }
    return language === 'hi'
      ? `केंद्र ${node.id} की चेतावनी अब सक्रिय सूची में नहीं है। वर्तमान रीडिंग देखने के लिए केंद्र का विवरण खोलें।`
      : `The alert for node ${node.id} is no longer in the active list. Open the node details to review its current readings.`;
  }
  if (context === 'demo') {
    const active = state.activeEvent;
    return language === 'hi'
      ? `डेमो डेटा ${sensorDataProvider.getLabel()} है। ${active ? `अभी ${active.label} उदाहरण चल रहा है।` : 'अभी कोई उदाहरण नहीं चल रहा है।'} उदाहरण चलाने के लिए एक केंद्र चुनें और स्थिति का बटन दबाएँ। सिम्युलेटेड रीडिंग वास्तविक सेंसर माप नहीं हैं।`
      : `The current data mode is ${sensorDataProvider.getLabel()}. ${active ? `The ${active.label} example is active.` : 'No example is currently active.'} Select a node and a scenario to explore an example. Simulated readings are not physical sensor measurements.`;
  }
  return readingSummary;
}

const initialNodeReadings = {
  'JR-01': { tds: 420, turbidity: 2.4, temperature: 24.8, ph: 7.2, do: 8.2 },
  'JR-02': { tds: 390, turbidity: 3.5, temperature: 26.0, ph: 7.1, do: 8.0 },
  'JR-03': { tds: 450, turbidity: 4.2, temperature: 25.5, ph: 7.3, do: 7.8 },
  'JR-04': { tds: 480, turbidity: 4.5, temperature: 26.4, ph: 7.0, do: 7.6 },
  'JR-05': { tds: 330, turbidity: 2.0, temperature: 24.2, ph: 7.4, do: 8.4 }
};

const sensorDataProvider = {
  mode: 'DEMO',
  setMode(mode) {
    this.mode = mode;
  },
  getLabel() {
    return this.mode === 'DEMO' ? 'Demo Data' : 'Hardware Mode · ESP32 not connected';
  },
  ingest(node, readings, timestamp) {
    Object.entries(readings).forEach(([key, value]) => updateSensorReading(node, key, value, timestamp));
  }
};

function apiUrl(path) {
  const configured = window.JAL_RAKSHA_API_BASE_URL
    || document.querySelector('meta[name="jal-raksha-api-base"]')?.content.trim();
  const baseUrl = (configured || window.location.origin).replace(/\/+$/, '');
  return new URL(path, `${baseUrl}/`).toString();
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
    ...options
  });
  if (!response.ok) {
    const bodyText = await response.text();
    throw new Error(bodyText || `Request failed for ${url}`);
  }
  if (response.status === 204) return null;
  return response.json();
}

const thingSpeakConfig = {
  pollIntervalMs: 20000,
  chartResults: 100,
  suddenChangeThresholdAdc: 900,
  staleAfterMs: 90000,
  channelId: '3530012',
  feeds: [],
  lastSuccessAt: null,
  inFlight: false
};

function thingSpeakElements() {
  return {
    channelInput: document.getElementById('thingSpeakChannelInput'),
    connectButton: document.getElementById('thingSpeakConnectButton'),
    status: document.getElementById('thingSpeakStatus'),
    state: document.getElementById('thingSpeakState'),
    mode: document.getElementById('thingSpeakMode'),
    tds: document.getElementById('thingSpeakTdsValue'),
    tdsVoltage: document.getElementById('thingSpeakTdsVoltage'),
    turbidity: document.getElementById('thingSpeakTurbidityValue'),
    turbidityVoltage: document.getElementById('thingSpeakTurbidityVoltage'),
    timestamp: document.getElementById('thingSpeakTimestamp'),
    device: document.getElementById('thingSpeakDevice'),
    lastSuccess: document.getElementById('thingSpeakLastSuccess'),
    connection: document.getElementById('thingSpeakConnection'),
    chart: document.getElementById('thingSpeakChart'),
    chartEmpty: document.getElementById('thingSpeakChartEmpty'),
    alertList: document.getElementById('thingSpeakAlertList')
  };
}

function setThingSpeakState(kind, message) {
  const elements = thingSpeakElements();
  elements.state.textContent = message;
  elements.state.className = `thingspeak-state ${kind}`;
  elements.state.classList.remove('hidden');
  elements.status.textContent = message;
}

function getThingSpeakMode(status) {
  const normalizedStatus = String(status || '').toUpperCase();
  if (/LIVE[_ -]HARDWARE/.test(normalizedStatus)) return 'LIVE HARDWARE';
  if (normalizedStatus.includes('SIMULATION')) return 'SIMULATION';
  return 'MODE NOT TAGGED';
}

function parseThingSpeakFeed(feed) {
  if (!feed || feed.field1 === null || feed.field1 === undefined || feed.field1 === ''
      || feed.field2 === null || feed.field2 === undefined || feed.field2 === '') {
    return null;
  }
  const rawTds = Number(feed.field1);
  const rawTurbidity = Number(feed.field2);
  if (!Number.isFinite(rawTds) || !Number.isFinite(rawTurbidity)) {
    return null;
  }
  const tdsAdc = Math.round(rawTds);
  const turbidityAdc = Math.round(rawTurbidity);
  if (tdsAdc < 0 || tdsAdc > 4095 || turbidityAdc < 0 || turbidityAdc > 4095) {
    return null;
  }
  const timestamp = Date.parse(feed.created_at);
  if (!Number.isFinite(timestamp)) return null;
  const status = String(feed.status || '');
  return {
    entryId: String(feed.entry_id || ''),
    tdsAdc,
    turbidityAdc,
    createdAt: timestamp,
    status,
    mode: getThingSpeakMode(status)
  };
}

function formatThingSpeakTimestamp(timestamp) {
  if (!Number.isFinite(timestamp)) return '—';
  return new Date(timestamp).toLocaleString();
}

function estimateThingSpeakVoltage(adcCount) {
  return `${(adcCount * 3.3 / 4095).toFixed(2)} V`;
}

function renderThingSpeakChart(feeds) {
  const elements = thingSpeakElements();
  const canvas = elements.chart;
  const rect = canvas.getBoundingClientRect();
  const width = Math.max(1, rect.width);
  const height = Math.max(1, rect.height);
  const ratio = Math.max(1, window.devicePixelRatio || 1);
  canvas.width = Math.round(width * ratio);
  canvas.height = Math.round(height * ratio);
  const context = canvas.getContext('2d');
  context.setTransform(ratio, 0, 0, ratio, 0, 0);
  context.clearRect(0, 0, width, height);
  elements.chartEmpty.classList.toggle('hidden', feeds.length > 0);
  if (!feeds.length) return;

  const padding = { top: 12, right: 12, bottom: 22, left: 40 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;
  const values = feeds.flatMap((feed) => [feed.tdsAdc, feed.turbidityAdc]);
  const minValue = Math.max(0, Math.floor((Math.min(...values) - 100) / 100) * 100);
  const maxValue = Math.min(4095, Math.ceil((Math.max(...values) + 100) / 100) * 100);
  const span = Math.max(200, maxValue - minValue);

  context.font = '10px system-ui, sans-serif';
  context.textAlign = 'right';
  context.textBaseline = 'middle';
  for (let line = 0; line <= 4; line += 1) {
    const y = padding.top + chartHeight * line / 4;
    context.beginPath();
    context.moveTo(padding.left, y);
    context.lineTo(width - padding.right, y);
    context.strokeStyle = 'rgba(13, 43, 64, 0.10)';
    context.stroke();
    context.fillStyle = 'rgba(13, 43, 64, 0.62)';
    context.fillText(String(Math.round(maxValue - span * line / 4)), padding.left - 6, y);
  }

  const series = [
    { key: 'tdsAdc', color: '#0aa2c3' },
    { key: 'turbidityAdc', color: '#e08b3e' }
  ];
  series.forEach(({ key, color }) => {
    context.beginPath();
    feeds.forEach((feed, index) => {
      const x = padding.left + (feeds.length === 1 ? chartWidth / 2 : chartWidth * index / (feeds.length - 1));
      const y = padding.top + chartHeight * (maxValue - feed[key]) / span;
      if (index === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    });
    context.strokeStyle = color;
    context.lineWidth = 2.5;
    context.lineJoin = 'round';
    context.lineCap = 'round';
    context.stroke();
  });

  context.textAlign = 'left';
  context.textBaseline = 'top';
  context.font = '9px system-ui, sans-serif';
  context.fillStyle = 'rgba(13, 43, 64, 0.62)';
  context.fillText(formatThingSpeakTimestamp(feeds[0].createdAt), padding.left, height - 14);
  context.textAlign = 'right';
  context.fillText(formatThingSpeakTimestamp(feeds[feeds.length - 1].createdAt), width - padding.right, height - 14);
}

function renderThingSpeakAlerts(feeds) {
  const elements = thingSpeakElements();
  const events = [];
  for (let index = 1; index < feeds.length; index += 1) {
    const previous = feeds[index - 1];
    const current = feeds[index];
    const tdsDelta = Math.abs(current.tdsAdc - previous.tdsAdc);
    const turbidityDelta = Math.abs(current.turbidityAdc - previous.turbidityAdc);
    if (tdsDelta >= thingSpeakConfig.suddenChangeThresholdAdc) {
      events.push(`TDS input changed by ${tdsDelta} ADC counts at ${formatThingSpeakTimestamp(current.createdAt)}.`);
    }
    if (turbidityDelta >= thingSpeakConfig.suddenChangeThresholdAdc) {
      events.push(`Turbidity input changed by ${turbidityDelta} ADC counts at ${formatThingSpeakTimestamp(current.createdAt)}.`);
    }
  }
  elements.alertList.textContent = events.length
    ? events.slice(-5).reverse().join(' ')
    : feeds.length > 1
      ? `No consecutive reading changes reached ${thingSpeakConfig.suddenChangeThresholdAdc} ADC counts.`
      : 'More than one channel reading is needed to check for sudden changes.';
}

function renderThingSpeakFeeds(feeds) {
  const elements = thingSpeakElements();
  const latestFeed = feeds.at(-1);
  const mode = latestFeed.mode;
  const currentModeFeeds = feeds.filter((feed) => feed.mode === mode);
  elements.mode.textContent = `${mode} · THINGSPEAK`;
  elements.mode.classList.toggle('simulation', mode === 'SIMULATION');
  elements.mode.classList.toggle('live', mode === 'LIVE HARDWARE');
  elements.mode.classList.toggle('untagged', mode === 'MODE NOT TAGGED');
  elements.tds.textContent = String(latestFeed.tdsAdc);
  elements.tdsVoltage.textContent = estimateThingSpeakVoltage(latestFeed.tdsAdc);
  elements.turbidity.textContent = String(latestFeed.turbidityAdc);
  elements.turbidityVoltage.textContent = estimateThingSpeakVoltage(latestFeed.turbidityAdc);
  elements.timestamp.textContent = formatThingSpeakTimestamp(latestFeed.createdAt);
  const deviceAndMode = latestFeed.status.split(/[|;]/).map((part) => part.trim()).filter(Boolean);
  elements.device.textContent = deviceAndMode.length
    ? deviceAndMode.join(' · ')
    : `Channel ${thingSpeakConfig.channelId} · ${mode}`;

  const stale = Date.now() - latestFeed.createdAt > thingSpeakConfig.staleAfterMs;
  elements.connection.textContent = stale ? 'Channel reachable · device data is stale' : 'Public channel reachable · receiving updates';
  elements.connection.classList.toggle('thingspeak-stale', stale);
  document.getElementById('thingSpeakNotice').textContent = mode === 'SIMULATION'
    ? 'Simulation readings are raw ADC inputs, not calibrated water-quality measurements.'
    : 'Values are raw ADC readings. Do not interpret them as ppm or NTU without the correct sensor conversion and calibration.';
  renderThingSpeakChart(currentModeFeeds);
  renderThingSpeakAlerts(currentModeFeeds);
}

async function refreshThingSpeak(force = false) {
  const elements = thingSpeakElements();
  if (!thingSpeakConfig.channelId || thingSpeakConfig.inFlight) return;
  if (!force && state.activeSection !== 'monitoring') return;
  thingSpeakConfig.inFlight = true;
  elements.connectButton.disabled = true;
  setThingSpeakState('loading', 'Loading ThingSpeak feed…');
  try {
    let payload = null;
    let viaProxy = false;

    // 1. Direct fetch from ThingSpeak public API
    try {
      const url = new URL(
        `https://api.thingspeak.com/channels/${encodeURIComponent(thingSpeakConfig.channelId)}/feeds.json`
      );
      url.searchParams.set('results', String(thingSpeakConfig.chartResults));
      const response = await fetch(url, { method: 'GET', mode: 'cors', cache: 'no-store' });
      if (response.ok) {
        payload = await response.json();
      }
    } catch (_err) {
      // Direct CORS or network error; will try backend proxy fallback if running
    }

    // 2. Fallback to local backend proxy if direct fetch returned null and backend is available
    if (!payload && window.location.protocol.startsWith('http')) {
      try {
        const proxyUrl = new URL(`${window.location.origin}/api/thingspeak/feeds`);
        proxyUrl.searchParams.set('channel_id', thingSpeakConfig.channelId);
        proxyUrl.searchParams.set('results', String(thingSpeakConfig.chartResults));
        const proxyResponse = await fetch(proxyUrl, { method: 'GET', cache: 'no-store' });
        if (proxyResponse.ok) {
          payload = await proxyResponse.json();
          viaProxy = true;
        }
      } catch (_proxyErr) {
        // Backend proxy not available (e.g. running basic python -m http.server)
      }
    }

    if (!payload || !Array.isArray(payload.feeds)) {
      throw new Error(
        'Could not load channel feed. Verify that the Channel ID is correct and Public View is enabled in ThingSpeak (or configure THINGSPEAK_READ_API_KEY in the backend .env for private channels).'
      );
    }

    const feeds = payload.feeds.map(parseThingSpeakFeed).filter(Boolean);
    thingSpeakConfig.feeds = feeds;
    thingSpeakConfig.lastSuccessAt = Date.now();
    elements.lastSuccess.textContent = new Date(thingSpeakConfig.lastSuccessAt).toLocaleTimeString();
    elements.state.classList.add('hidden');
    if (!feeds.length) {
      elements.mode.textContent = 'MODE NOT TAGGED · NO DATA';
      elements.mode.classList.add('untagged');
      elements.mode.classList.remove('live', 'simulation');
      elements.tds.textContent = '—';
      elements.tdsVoltage.textContent = '—';
      elements.turbidity.textContent = '—';
      elements.turbidityVoltage.textContent = '—';
      elements.timestamp.textContent = '—';
      elements.device.textContent = `Channel ${thingSpeakConfig.channelId} has no readings yet`;
      elements.connection.textContent = viaProxy
        ? 'ThingSpeak proxy connected · waiting for first reading'
        : 'ThingSpeak connected · waiting for first reading';
      elements.connection.classList.remove('thingspeak-stale');
      elements.alertList.textContent = 'No channel data to inspect.';
      renderThingSpeakChart([]);
      setThingSpeakState('empty', 'Channel connected; no readings have been uploaded yet.');
      return;
    }

    renderThingSpeakFeeds(feeds);
    elements.status.textContent = viaProxy
      ? `Channel ${thingSpeakConfig.channelId} connected (via secure proxy) · ${feeds.length} readings loaded.`
      : `Public channel ${thingSpeakConfig.channelId} connected · ${feeds.length} readings loaded.`;
  } catch (error) {
    console.error('ThingSpeak channel read failed:', error);
    elements.mode.textContent = 'MODE NOT TAGGED · OFFLINE';
    elements.mode.classList.add('untagged');
    elements.mode.classList.remove('live', 'simulation');
    setThingSpeakState('error', error.message || 'Could not read ThingSpeak feed.');
    elements.connection.textContent = 'Feed unavailable';
    elements.connection.classList.add('thingspeak-stale');
  } finally {
    thingSpeakConfig.inFlight = false;
    elements.connectButton.disabled = false;
  }
}

function initializeThingSpeak() {
  const elements = thingSpeakElements();
  const storedChannelId = localStorage.getItem('aquaAiThingSpeakPublicChannelId') || '3530012';
  if (/^\d{1,20}$/.test(storedChannelId)) {
    thingSpeakConfig.channelId = storedChannelId;
    elements.channelInput.value = storedChannelId;
    elements.status.textContent = `Channel ${storedChannelId} configured. Open Live Monitoring or press Refresh to load readings.`;
  }
  document.getElementById('thingSpeakChannelForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const channelId = elements.channelInput.value.trim();
    if (!/^\d{1,20}$/.test(channelId)) {
      setThingSpeakState('error', 'Enter a numeric public ThingSpeak Channel ID.');
      elements.channelInput.focus();
      return;
    }
    thingSpeakConfig.channelId = channelId;
    thingSpeakConfig.feeds = [];
    localStorage.setItem('aquaAiThingSpeakPublicChannelId', channelId);
    refreshThingSpeak(true);
  });
  document.getElementById('thingSpeakRefreshButton').addEventListener('click', () => refreshThingSpeak(true));
  window.setInterval(() => {
    if (!document.hidden && state.activeSection === 'monitoring') refreshThingSpeak();
  }, thingSpeakConfig.pollIntervalMs);
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && state.activeSection === 'monitoring') refreshThingSpeak(true);
  });
}

async function syncMockNodesFromBackend() {
  try {
    const nodes = await fetchJson(`${window.location.origin}/api/nodes`);
    if (!Array.isArray(nodes) || !nodes.length) {
      return false;
    }

    const backendNodes = nodes.map((node) => {
      const latest = node.last_reading || {};
      const baseline = {
        tds: Number(latest.tds ?? 300),
        turbidity: Number(latest.turbidity ?? 3),
        temperature: Number(latest.temperature ?? 25),
        ph: Number(latest.ph ?? 7.2),
        do: Number(latest.do ?? 8.1)
      };
      const readings = {
        tds: Number(latest.tds ?? baseline.tds),
        turbidity: Number(latest.turbidity ?? baseline.turbidity),
        temperature: Number(latest.temperature ?? baseline.temperature),
        ph: Number(latest.ph ?? baseline.ph),
        do: Number(latest.do ?? baseline.do)
      };
      const sensorEntries = Object.fromEntries(Object.keys(sensorCatalog).map((key) => {
        const value = readings[key];
        const history = Array.isArray(node.history)
          ? node.history.map((entry) => Number(entry[key] ?? entry.value ?? entry)).filter((item) => Number.isFinite(item))
          : [value];
        return [key, {
          connected: value !== null && value !== undefined,
          status: value !== null && value !== undefined ? 'CONNECTED' : 'NOT CONNECTED',
          value,
          unit: sensorCatalog[key].unit,
          previous: value,
          delta: 0,
          history: history.length ? history : [value],
          lastReadingAt: Date.now(),
          lastCommunicationAt: Date.now()
        }];
      }));
      const normalizedAlerts = (node.alerts || []).map((alert) => ({
        id: alert.id || `${node.id}-${Date.now()}-${Math.random()}`,
        level: (alert.severity || 'WARNING').toUpperCase(),
        title: alert.explanation || 'Water-quality alert',
        status: (alert.status || 'NEW').toUpperCase(),
        time: alert.created_at ? new Date(alert.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Now',
        parameter: alert.parameter || 'Water quality',
        currentValue: alert.current_value,
        baselineValue: alert.baseline_value,
        reason: alert.explanation,
        recommendation: alert.recommended_action
      }));
      return {
        id: node.id,
        label: node.label || node.id,
        location: node.location || node.label || node.id,
        latitude: node.latitude ?? 19.0,
        longitude: node.longitude ?? 72.0,
        status: (node.status || 'normal').toLowerCase(),
        anomalyScore: Number(node.anomaly_score ?? 0),
        waterQualityScore: Number(node.water_quality_score ?? 100),
        battery: node.battery || '87%',
        connection: node.health === 'online' ? 'ONLINE' : 'OFFLINE',
        dataQuality: node.last_reading ? 'GOOD' : 'POOR',
        sensorHealth: node.health === 'online' ? 'Good' : 'Fault',
        readings,
        baseline,
        history: Array.isArray(node.history) && node.history.length ? node.history.map((entry) => Number(entry.tds ?? entry.value ?? entry)).filter((item) => Number.isFinite(item)) : [readings.tds],
        alerts: normalizedAlerts,
        lastReadingAt: Date.now(),
        lastUpdated: Date.now(),
        lastUpdate: 'Just now',
        coords: { x: 180 + (Math.random() * 240), y: 100 + (Math.random() * 220) },
        sensors: sensorEntries,
        activeAlert: normalizedAlerts.some((alert) => alert.status !== 'RESOLVED'),
        alertState: normalizedAlerts.some((alert) => alert.status === 'NEW') ? 'NEW' : 'RESOLVED',
        activeAlerts: normalizedAlerts.filter((alert) => alert.status !== 'RESOLVED'),
        failureMode: null,
        dataQuality: 'GOOD',
        trend: 'Stable',
        nodeId: node.id,
        nodeName: node.label || node.id
      };
    });

    if (backendNodes.length) {
      mockNodes.splice(0, mockNodes.length, ...backendNodes);
      state.backendStatus = 'Live API';
      state.systemStatus = 'LIVE MODE';
      return true;
    }
    return false;
  } catch (error) {
    console.warn('Backend unavailable; using demo dataset.', error);
    state.backendStatus = 'Demo Mode';
    state.systemStatus = 'DEMO MODE';
    return false;
  }
}

function addTimelineEvent(node, message, severity = 'info') {
  state.timeline.unshift({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    nodeId: node ? node.id : 'SYSTEM',
    time: Date.now(),
    message,
    severity
  });
  state.timeline = state.timeline.slice(0, 60);
}

function getQualityLabel(score) {
  if (score >= 90) return 'Excellent';
  if (score >= 75) return 'Good';
  if (score >= 50) return 'Watch';
  if (score >= 30) return 'Warning';
  return 'Critical';
}

function getAbnormalParameters(node) {
  const parameters = [];
  if (node.readings.tds > state.settings.tdsWarning) parameters.push(['TDS', 'tds', 'ppm']);
  if (node.readings.turbidity > state.settings.turbidityWarning) parameters.push(['Turbidity', 'turbidity', 'NTU']);
  if (node.readings.temperature > state.settings.temperatureWarning) parameters.push(['Temperature', 'temperature', '°C']);
  if (node.readings.ph < 6.5 || node.readings.ph > 8.5) parameters.push(['pH', 'ph', '']);
  if (node.readings.do < 5) parameters.push(['Simulated DO', 'do', 'mg/L']);
  return parameters;
}

function getRecommendation(node) {
  if (node.connection !== 'ONLINE' || node.dataQuality === 'POOR') {
    return 'Check sensor connection, power supply and probe condition before interpreting this reading.';
  }
  if (getAbnormalParameters(node).length > 1) {
    return 'Prioritize field inspection and laboratory sampling.';
  }
  if (node.readings.turbidity > state.settings.turbidityWarning) {
    return 'Inspect for sediment, runoff, discharge or disturbance near the monitoring location.';
  }
  if (node.readings.do < 5) {
    return 'Review the simulated dissolved-oxygen signal and prioritize field measurement and laboratory confirmation.';
  }
  if (node.readings.tds > state.settings.tdsWarning) {
    return 'Inspect the affected monitoring zone and collect a water sample for laboratory confirmation.';
  }
  if (node.anomalyScore >= 30) {
    return 'Prioritize field inspection and laboratory sampling; an abnormal downstream change requires further inspection.';
  }
  return 'Continue routine monitoring and compare readings with nearby nodes.';
}

function calculateWaterQualityScore(node) {
  const readings = node.readings;
  let penalty = 0;
  penalty += Math.max(0, (readings.tds - 450) / 9) * 0.55;
  penalty += Math.max(0, (readings.turbidity - 4) * 3.2);
  penalty += Math.max(0, (readings.temperature - 27) * 2.2);
  if (Number.isFinite(readings.ph)) penalty += Math.max(0, Math.abs(readings.ph - 7.2) - 0.5) * 8;
  if (Number.isFinite(readings.do)) penalty += Math.max(0, 6 - readings.do) * 5;
  if (node.connection !== 'ONLINE' || node.dataQuality === 'POOR') penalty += 24;
  return Math.max(0, Math.min(100, Math.round(100 - penalty)));
}

function calculateAnomalyScore(node) {
  const keys = ['tds', 'turbidity', 'temperature', 'ph', 'do'];
  const weights = { tds: 0.45, turbidity: 0.28, temperature: 0.14, ph: 0.06, do: 0.07 };
  let weightedChange = 0;
  let totalWeight = 0;
  keys.forEach((key) => {
    const current = Number(node.readings[key]);
    const baseline = Number(node.baseline[key]);
    if (!Number.isFinite(current) || !Number.isFinite(baseline) || baseline === 0) return;
    const change = Math.abs(metricDelta(current, baseline));
    weightedChange += Math.min(change, 200) * weights[key];
    totalWeight += weights[key];
  });
  let score = totalWeight ? Math.round((weightedChange / totalWeight) * 1.5) : 0;
  if (Number.isFinite(node.readings.do) && node.readings.do < 5) score = Math.max(score, Math.round(60 + (5 - node.readings.do) * 5));
  if (node.connection !== 'ONLINE' || node.dataQuality === 'POOR') score = Math.max(score, 72);
  else if (node.dataQuality === 'FAIR') score = Math.max(score, 32);
  return Math.max(0, Math.min(100, score));
}

function syncNodeFields(node) {
  node.nodeId = node.id;
  node.nodeName = node.label || node.location;
  node.connectionStatus = node.connection === 'ONLINE' ? 'ONLINE' : 'OFFLINE';
  node.lastUpdated = node.lastReadingAt || Date.now();
  node.tds = node.readings.tds;
  node.turbidity = node.readings.turbidity;
  node.temperature = node.readings.temperature;
  node.ph = node.readings.ph;
  node.dissolvedOxygen = node.readings.do;
  const nextWaterQualityScore = calculateWaterQualityScore(node);
  node.previousWaterQualityScore = Number.isFinite(node.waterQualityScore) ? node.waterQualityScore : nextWaterQualityScore;
  node.waterQualityScore = nextWaterQualityScore;
  node.anomalyScore = calculateAnomalyScore(node);
  node.status = node.connectionStatus === 'OFFLINE' ? 'offline' : node.anomalyScore >= 80 ? 'critical' : node.anomalyScore >= 60 ? 'warning' : node.anomalyScore >= 30 ? 'watch' : 'normal';
  node.trend = node.history.length < 4 ? 'Collecting data' : node.history.at(-1) - node.history.at(-4) > 4 ? 'Increasing' : node.history.at(-1) - node.history.at(-4) < -4 ? 'Decreasing' : 'Stable';
  node.sensorHealth = node.dataQuality === 'POOR' ? 'Fault' : node.dataQuality === 'FAIR' ? 'Warning' : 'Good';
  node.activeAlerts = node.alerts.filter((alert) => alert.status !== 'RESOLVED');
  node.activeAlert = node.activeAlerts.length > 0;
}

function syncActiveAlertFields(node) {
  node.activeAlerts = node.alerts.filter((alert) => alert.status !== 'RESOLVED');
  node.activeAlert = node.activeAlerts.length > 0;
}

function makeRecentHistory(value, key) {
  const stepSize = key === 'tds' ? Math.max(Math.abs(value) * 0.001, 0.1) : Math.max(Math.abs(value) * 0.001, 0.01);
  return Array.from({ length: 8 }, (_, index) => Number((value + (index - 7) * stepSize).toFixed(key === 'tds' ? 0 : 2)));
}

function persistSensorState() {
  localStorage.setItem('jalRakshaSensorState', JSON.stringify({
    nodes: mockNodes,
    selectedNodeId: state.selectedNodeId,
    selectedHealthNodeId: state.selectedHealthNodeId,
    selectedCalibrationNodeId: state.selectedCalibrationNodeId,
    selectedDemoNodeId: state.selectedDemoNodeId,
    activeEvent: state.activeEvent,
    timeline: state.timeline
  }));
}

async function initializeSensorEngine() {
  const backendLoaded = await syncMockNodesFromBackend();
  const now = Date.now();
  mockNodes.forEach((node, index) => {
    const values = initialNodeReadings[node.id] || initialNodeReadings['JR-01'];
    node.label = ['River Intake', 'Industrial Downstream', 'Community Tank', 'Agricultural Zone', 'Treatment Outlet'][index] || node.location;
    node.location = node.label;
    node.latitude = 19.076 + index * 0.013;
    node.longitude = 72.877 + index * 0.017;
    node.baseline = { ...values };
    node.readings = { ...values };
    node.history = makeRecentHistory(values.tds, 'tds');
    node.alerts = [];
    node.alertState = 'RESOLVED';
    node.lastReadingAt = now;
    node.failureMode = null;
    node.dataQuality = 'GOOD';
    node.connection = 'ONLINE';
    if (!node.sensors || Object.keys(node.sensors).length === 0) {
      node.sensors = Object.fromEntries(Object.keys(sensorCatalog).map((key) => [key, {
        ...(node.sensors && node.sensors[key] ? node.sensors[key] : {}),
        connected: true,
        status: key === 'ph' || key === 'do' ? 'SIMULATED' : 'CONNECTED',
        value: values[key],
        unit: sensorCatalog[key].unit,
        previous: values[key],
        delta: 0,
        history: makeRecentHistory(values[key], key),
        lastReadingAt: now,
        lastCommunicationAt: now
      }]));
    }
    syncNodeFields(node);
  });

  if (!backendLoaded) {
    try {
      const saved = JSON.parse(localStorage.getItem('jalRakshaSensorState') || 'null');
      if (saved && Array.isArray(saved.nodes)) {
        saved.nodes.forEach((stored) => {
          let node = mockNodes.find((item) => item.id === stored.id);
          if (!node && stored.readings && stored.sensors) {
            node = stored;
            mockNodes.push(node);
          } else if (node && stored.readings) {
            Object.assign(node, stored);
          }
        });
        state.selectedNodeId = mockNodes.some((node) => node.id === saved.selectedNodeId) ? saved.selectedNodeId : 'JR-02';
        state.selectedHealthNodeId = saved.selectedHealthNodeId || state.selectedNodeId;
        state.selectedCalibrationNodeId = saved.selectedCalibrationNodeId || state.selectedNodeId;
        state.selectedDemoNodeId = saved.selectedDemoNodeId || state.selectedNodeId;
        state.activeEvent = saved.activeEvent || null;
        state.timeline = Array.isArray(saved.timeline) ? saved.timeline : [];
      } else {
        addTimelineEvent(null, 'Demo monitoring session started');
        mockNodes.forEach((node) => addTimelineEvent(node, 'Demo sensor stream connected', 'success'));
      }
    } catch (error) {
      console.warn('Could not restore saved sensor state; starting with baseline demo readings.', error);
      addTimelineEvent(null, 'Saved sensor state could not be restored; baseline demo readings loaded', 'warning');
    }
  }
  mockNodes.forEach(syncNodeFields);
}

function updateSensorReading(node, key, value, now) {
  const sensor = node.sensors[key];
  sensor.previous = sensor.value;
  sensor.value = value;
  sensor.delta = metricDelta(value, node.baseline[key]);
  if (node.failureMode !== 'stale') {
    sensor.lastReadingAt = now;
    sensor.lastCommunicationAt = now;
  }
  if (!Array.isArray(sensor.history)) sensor.history = [];
  sensor.history.push(value);
  sensor.history = sensor.history.slice(-24);
  node.readings[key] = value;
}

function updateAlertForNode(node) {
  const abnormalParameters = getAbnormalParameters(node);
  const parameter = node.failureMode
    ? 'sensor'
    : abnormalParameters.length > 1
      ? 'Multiple parameters'
      : abnormalParameters[0]?.[0] || 'Water quality';
  const parameterValues = node.failureMode
    ? { current: node.sensors.tds.value, baseline: node.baseline.tds }
    : parameter === 'Multiple parameters'
      ? {
        current: abnormalParameters.map(([label, key, unit]) => `${label} ${node.readings[key]} ${unit}`).join('; '),
        baseline: abnormalParameters.map(([label, key, unit]) => `${label} ${node.baseline[key]} ${unit}`).join('; ')
      }
      : { current: abnormalParameters[0] ? node.readings[abnormalParameters[0][1]] : node.anomalyScore, baseline: abnormalParameters[0] ? node.baseline[abnormalParameters[0][1]] : 'baseline' };
  const level = node.anomalyScore >= 80 ? 'CRITICAL' : node.anomalyScore >= 60 ? 'WARNING' : 'WATCH';
  const active = node.alerts.find((alert) => alert.status !== 'RESOLVED');
  if (node.anomalyScore < 30 && !node.failureMode) {
    node.alertSuppressed = false;
    if (active) {
      active.status = 'RESOLVED';
      active.resolvedAt = Date.now();
      addTimelineEvent(node, `${active.title} resolved as readings returned to normal`, 'success');
    }
    node.alertState = 'RESOLVED';
    syncActiveAlertFields(node);
    return;
  }
  if (node.alertSuppressed) {
    syncActiveAlertFields(node);
    return;
  }

  const title = node.failureMode
    ? `Sensor ${node.failureMode} at ${node.id}`
    : node.anomalyScore >= 80
      ? `${node.id} shows a significant ${parameter} increase.`
      : `${parameter} change detected at ${node.id}`;
  if (active) {
    active.level = level;
    active.currentValue = parameterValues.current;
    active.baselineValue = parameterValues.baseline;
    active.parameter = parameter;
    active.title = title;
    active.updatedAt = Date.now();
    active.reason = `${parameter} changed from its node baseline; anomaly score ${node.anomalyScore}/100.`;
    active.recommendation = getRecommendation(node);
    node.alertState = active.status;
    syncActiveAlertFields(node);
    return;
  }

  const alert = {
    id: `${node.id}-${Date.now()}`,
    level,
    title,
    status: 'NEW',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    parameter,
    currentValue: parameterValues.current,
    baselineValue: parameterValues.baseline,
    reason: `${parameter} changed from its node baseline; anomaly score ${node.anomalyScore}/100.`,
    recommendation: getRecommendation(node),
    createdAt: Date.now()
  };
  node.alerts.unshift(alert);
  node.alertState = 'NEW';
  syncActiveAlertFields(node);
  addTimelineEvent(node, `${level} alert generated: ${title}`, level === 'CRITICAL' ? 'critical' : 'warning');
  if (state.settings.notificationsEnabled) {
    state.notifications.unshift({
      id: `alert-${alert.id}`,
      alertId: String(alert.id),
      nodeId: node.id,
      level: level.toLowerCase(),
      title,
      detail: `${node.id} · ${parameter}`,
      read: false
    });
  }
}

function advanceSensorEngine() {
  if (!state.settings.demoModeEnabled) return;
  const now = Date.now();
  mockNodes.forEach((node, nodeIndex) => {
    const activeEvent = state.activeEvent && state.activeEvent.nodeId === node.id ? state.activeEvent : null;
    const oldStatus = node.status;
    const oldTrend = node.trend;
    const oldAnomalyScore = node.anomalyScore;
    const oldTdsChange = Math.abs(metricDelta(node.readings.tds, node.baseline.tds));
    const oldTurbidityChange = Math.abs(metricDelta(node.readings.turbidity, node.baseline.turbidity));
    const changes = { ...node.readings };
    if (activeEvent) {
      activeEvent.progress = Math.min(1, activeEvent.progress + 0.14);
      const progress = activeEvent.progress;
      const base = node.baseline;
      const interpolate = (key, target) => Number((base[key] + (target - base[key]) * progress).toFixed(key === 'tds' ? 0 : 1));
      if (activeEvent.type === 'tds') changes.tds = interpolate('tds', base.tds * 1.95);
      if (activeEvent.type === 'sediment') changes.turbidity = interpolate('turbidity', Math.max(base.turbidity * 3.5, 12));
      if (activeEvent.type === 'multi') {
        changes.tds = interpolate('tds', base.tds * 1.9);
        changes.turbidity = interpolate('turbidity', Math.max(base.turbidity * 3.4, 14));
        changes.temperature = interpolate('temperature', base.temperature + 4);
        changes.ph = interpolate('ph', 6.3);
      }
      if (activeEvent.type === 'oxygen') changes.do = interpolate('do', 3.1);
      if (activeEvent.type.startsWith('failure-')) {
        node.failureMode = activeEvent.type.slice('failure-'.length);
        if (node.failureMode === 'disconnected') node.sensors.tds.connected = false;
        if (node.failureMode === 'stale') node.sensors.tds.lastCommunicationAt = now - 60000;
        if (node.failureMode === 'constant') {
          changes.tds = node.baseline.tds;
          node.sensors.tds.history = Array(8).fill(node.baseline.tds);
          node.dataQuality = 'FAIR';
        }
        if (node.failureMode === 'invalid') changes.tds = 2200;
      }
    } else {
      Object.keys(changes).forEach((key) => {
        if (Number.isFinite(changes[key])) {
          const variation = Math.sin(now / 18000 + nodeIndex * 1.7 + key.length) * Math.max(Math.abs(node.baseline[key]) * 0.003, key === 'turbidity' ? 0.015 : 0.01);
          changes[key] = Number((node.baseline[key] + variation).toFixed(key === 'tds' ? 0 : 1));
        }
      });
      node.failureMode = null;
      node.sensors.tds.connected = true;
      node.dataQuality = 'GOOD';
    }

    if (node.failureMode !== 'disconnected' && node.failureMode !== 'stale') sensorDataProvider.ingest(node, changes, now);
    if (node.failureMode === 'disconnected') node.connection = 'OFFLINE';
    else if (node.failureMode === 'stale') node.sensors.tds.lastCommunicationAt = now - 60000;
    else node.connection = 'ONLINE';

    if (node.failureMode === 'invalid') node.dataQuality = 'POOR';
    else if (node.failureMode === 'disconnected' || node.failureMode === 'stale') node.dataQuality = 'POOR';
    else if (node.failureMode === 'constant') node.dataQuality = 'FAIR';
    else node.dataQuality = 'GOOD';

    node.history.push(node.readings.tds);
    node.history = node.history.slice(-24);
    node.lastReadingAt = node.failureMode === 'stale' ? node.lastReadingAt : now;
    node.connectionStatus = node.connection;
    syncNodeFields(node);
    if (oldTdsChange < 10 && Math.abs(metricDelta(node.readings.tds, node.baseline.tds)) >= 10) {
      addTimelineEvent(node, `TDS increased to ${node.readings.tds} ppm`, 'warning');
    }
    if (oldTurbidityChange < 10 && Math.abs(metricDelta(node.readings.turbidity, node.baseline.turbidity)) >= 10) {
      addTimelineEvent(node, `Turbidity increased to ${node.readings.turbidity} NTU`, 'warning');
    }
    if (oldAnomalyScore < 30 && node.anomalyScore >= 30) addTimelineEvent(node, `Anomaly detected · score ${node.anomalyScore}/100`, 'warning');
    updateAlertForNode(node);
    if (node.status !== oldStatus) addTimelineEvent(node, `Status changed to ${node.status.toUpperCase()}`, node.status === 'critical' ? 'critical' : 'warning');
    if (node.trend !== oldTrend && node.trend !== 'Stable') addTimelineEvent(node, `Trend changed to ${node.trend}`, 'info');
    if (activeEvent && !activeEvent.recommendationLogged && node.anomalyScore >= 30) {
      activeEvent.recommendationLogged = true;
      addTimelineEvent(node, `Inspection recommended: ${getRecommendation(node)}`, 'info');
    }
    if (activeEvent && activeEvent.progress >= 1 && !activeEvent.completed) {
      activeEvent.completed = true;
      addTimelineEvent(node, `${activeEvent.label} scenario reached its target`, 'info');
    }
  });
  persistSensorState();
  renderAll();
}

function getSensorDefinition(sensorKey) {
  return sensorCatalog[sensorKey] || sensorCatalog.tds;
}

function formatRelativeTime(timestamp) {
  const ms = Math.max(0, Date.now() - timestamp);
  const seconds = Math.floor(ms / 1000);
  if (seconds < 60) return `${seconds} sec ago`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours} hr ago`;
}

function getSensorHistoryValues(sensor, fallbackValue) {
  if (Array.isArray(sensor.history) && sensor.history.length) {
    return sensor.history.map((item) => Number(item)).filter((item) => Number.isFinite(item));
  }
  const value = Number(sensor.value);
  return Array.from({ length: 6 }, (_, index) => {
    const delta = ((index % 3) - 1) * (Math.abs(value) * 0.02 || 1);
    return Number((value + delta).toFixed(2));
  });
}

function isInvalidReading(value, sensorKey) {
  const def = getSensorDefinition(sensorKey);
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return true;
  if (def.min !== undefined && numeric < def.min) return true;
  if (def.max !== undefined && numeric > def.max) return true;
  return false;
}

function getCalibrationStatus(sensor) {
  if (!sensor || !sensor.calibration) {
    return 'NOT CALIBRATED';
  }
  const { nextCalibration } = sensor.calibration;
  if (!nextCalibration) return 'NOT CALIBRATED';
  const nextDate = new Date(nextCalibration);
  const diffDays = Math.ceil((nextDate - new Date()) / 86400000);
  if (diffDays <= 0) return 'DUE';
  if (diffDays <= 14) return 'DUE';
  return 'VALID';
}

function getSensorHealthProfile(node, sensorKey) {
  const sensor = node.sensors[sensorKey];
  const def = getSensorDefinition(sensorKey);
  if (!sensor) {
    return {
      key: sensorKey,
      connection: 'DISCONNECTED',
      health: 'FAULT',
      calibration: 'NOT CALIBRATED',
      dataQuality: 'POOR',
      lastReading: 'Not connected',
      lastUpdate: 'No reading',
      lastCommunication: 'No communication',
      statusText: 'DISCONNECTED',
      message: 'No sensor is configured for this node.',
      value: null,
      unit: def.unit,
      isPhysical: true,
      readOnly: false
    };
  }

  const lastReadingAt = sensor.lastReadingAt || Date.now() - 20000;
  const lastCommunicationAt = sensor.lastCommunicationAt || Date.now() - 20000;
  const history = getSensorHistoryValues(sensor, def.defaultValue);
  const lastReading = sensor.value;
  const looksUnchanged = history.length >= 5 && new Set(history.map((item) => Number(item.toFixed(2)))).size <= 1;

  let connection = 'CONNECTED';
  let health = 'GOOD';
  let calibration = getCalibrationStatus(sensor);
  let dataQuality = 'GOOD';
  let message = 'Receiving data';

  if (sensor.connected === false || sensor.status === 'NOT CONNECTED') {
    connection = 'DISCONNECTED';
    health = 'FAULT';
    calibration = 'NOT CALIBRATED';
    dataQuality = 'POOR';
    message = 'Sensor is disconnected.';
  } else if (Date.now() - lastCommunicationAt > (def.timeoutSeconds || 40) * 1000) {
    connection = 'TIMEOUT';
    health = 'FAULT';
    dataQuality = 'POOR';
    message = 'No reading received for the configured period.';
  } else if (sensor.status === 'SIMULATED') {
    connection = 'CONNECTED';
    health = 'GOOD';
    dataQuality = 'GOOD';
    message = 'Simulated reading received.';
  } else if (isInvalidReading(lastReading, sensorKey)) {
    connection = 'CONNECTED';
    health = 'FAULT';
    dataQuality = 'POOR';
    message = 'INVALID READING. Value is outside configured range.';
  } else if (looksUnchanged) {
    connection = 'CONNECTED';
    health = 'WARNING';
    dataQuality = 'FAIR';
    message = 'Sensor reading has remained unchanged. Check probe and connection.';
  } else if (sensor.status === 'WARNING' || sensor.delta !== undefined && Math.abs(Number(sensor.delta || 0)) > 25) {
    connection = 'CONNECTED';
    health = 'WARNING';
    dataQuality = 'FAIR';
    message = 'Reading pattern appears suspicious.';
  }

  if (calibration === 'DUE' && health === 'GOOD') {
    health = 'WARNING';
    message = 'Calibration is due soon and should be reviewed.';
  }

  const qualityPct = connection === 'DISCONNECTED' ? 15 : connection === 'TIMEOUT' ? 25 : health === 'FAULT' ? 30 : health === 'WARNING' ? 70 : 92;

  return {
    key: sensorKey,
    label: def.label,
    icon: def.icon,
    connection,
    health,
    calibration,
    dataQuality,
    lastReading: sensor.connected === false || sensor.status === 'NOT CONNECTED' ? 'Not connected' : lastReading,
    lastUpdate: formatRelativeTime(lastReadingAt),
    lastCommunication: formatRelativeTime(lastCommunicationAt),
    statusText: sensor.status || connection,
    message,
    value: sensor.connected === false || sensor.status === 'NOT CONNECTED' ? null : lastReading,
    unit: def.unit,
    qualityPct,
    reference: def.reference,
    isPhysical: ['tds', 'turbidity', 'temperature'].includes(sensorKey),
    calibrationReference: sensor.calibration && sensor.calibration.reference ? sensor.calibration.reference : def.reference,
    rawSensor: sensor
  };
}

function getSensorKeysForNode(node) {
  const keys = Object.keys(node.sensors || {});
  return keys.length ? keys : ['tds', 'turbidity', 'temperature', 'ph', 'do'];
}

function getHealthSummary(node) {
  const sensors = getSensorKeysForNode(node).map((key) => getSensorHealthProfile(node, key));
  const healthy = sensors.filter((sensor) => sensor.health === 'GOOD').length;
  const warnings = sensors.filter((sensor) => sensor.health === 'WARNING').length;
  const disconnected = sensors.filter((sensor) => sensor.connection === 'DISCONNECTED' || sensor.connection === 'TIMEOUT').length;
  const calibrationDue = sensors.filter((sensor) => sensor.calibration === 'DUE').length;
  return { healthy, warnings, disconnected, calibrationDue, total: sensors.length };
}

function getRecentSensorEvents(node) {
  const events = [];
  getSensorKeysForNode(node).forEach((key, index) => {
    const sensor = getSensorHealthProfile(node, key);
    events.push({
      time: `09:${String(40 + index * 6).padStart(2, '0')}:1${index}`,
      title: `${sensor.label} ${sensor.connection === 'CONNECTED' ? 'reading received' : sensor.connection.toLowerCase()}`,
      severity: sensor.health === 'FAULT' ? 'critical' : sensor.health === 'WARNING' ? 'warning' : 'success'
    });
  });
  return events.slice(0, 6);
}

function openSensorDrawer(nodeId, sensorKey) {
  const node = getNode(nodeId);
  const profile = getSensorHealthProfile(node, sensorKey);
  const drawer = document.getElementById('sensorDrawer');
  const content = document.getElementById('sensorDrawerContent');
  document.getElementById('sensorDrawerTitle').textContent = `${profile.label}`;
  content.innerHTML = `
    <div class="sensor-drawer-top">
      <div class="status-hero ${profile.health.toLowerCase()}">
        <span class="sensor-icon">${profile.icon}</span>
        <div>
          <strong>${profile.label}</strong>
          <small>${node.id}</small>
        </div>
      </div>
      <span class="status-chip ${profile.health.toLowerCase()}">${profile.health}</span>
    </div>
    <div class="sensor-drawer-grid">
      <div class="metric-box"><span>Current</span><strong>${profile.lastReading === 'Not connected' ? 'Not connected' : `${profile.lastReading} ${profile.unit}`}</strong></div>
      <div class="metric-box"><span>Connection</span><strong>${profile.connection}</strong></div>
      <div class="metric-box"><span>Last update</span><strong>${profile.lastUpdate}</strong></div>
      <div class="metric-box"><span>Calibration</span><strong>${profile.calibration}</strong></div>
      <div class="metric-box"><span>Data quality</span><strong>${profile.dataQuality}</strong></div>
      <div class="metric-box"><span>Last communication</span><strong>${profile.lastCommunication}</strong></div>
    </div>
    <div class="drawer-section">
      <h4>Diagnostics</h4>
      <ul class="diagnostic-list">
        <li>${profile.connection === 'CONNECTED' ? '✓' : '⚠'} Receiving data</li>
        <li>${profile.connection === 'TIMEOUT' || profile.connection === 'DISCONNECTED' ? '⚠' : '✓'} Valid range</li>
        <li>${profile.connection === 'CONNECTED' ? '✓' : '⚠'} Stable communication</li>
        <li>${profile.calibration === 'VALID' ? '✓' : '⚠'} Calibration review status</li>
      </ul>
      <p class="drawer-notes">${profile.message}</p>
    </div>
    <div class="drawer-section">
      <h4>Recent readings</h4>
      <div class="sparkline-wrap">
        <svg viewBox="0 0 260 80" class="mini-sparkline" aria-label="Recent sensor readings">
          ${buildSparkline(getSensorHistoryValues(profile.rawSensor, profile.value || 0))}
        </svg>
      </div>
    </div>
    <div class="drawer-actions">
      <button class="primary-button" data-open-calibration="${sensorKey}" data-node-id="${node.id}">Open Calibration</button>
    </div>
  `;
  drawer.classList.remove('hidden');
  drawer.setAttribute('aria-hidden', 'false');
  const openCalibrationButton = content.querySelector('[data-open-calibration]');
  if (openCalibrationButton) {
    openCalibrationButton.addEventListener('click', () => {
      state.selectedCalibrationNodeId = openCalibrationButton.dataset.nodeId;
      state.selectedCalibrationSensor = openCalibrationButton.dataset.openCalibration;
      renderCalibration();
      closeSensorDrawer();
      setActivePage('calibration');
    });
  }
}

function closeSensorDrawer() {
  const drawer = document.getElementById('sensorDrawer');
  drawer.classList.add('hidden');
  drawer.setAttribute('aria-hidden', 'true');
}

function buildSparkline(values) {
  const safeValues = values.filter((value) => Number.isFinite(value));
  if (!safeValues.length) return '';
  const min = Math.min(...safeValues);
  const max = Math.max(...safeValues);
  const range = max - min || 1;
  const points = safeValues.map((value, index) => {
    const x = 12 + (index / Math.max(safeValues.length - 1, 1)) * 236;
    const y = 62 - ((value - min) / range) * 40;
    return `${x},${y}`;
  }).join(' ');
  return `<polyline points="${points}" fill="none" stroke="#0aa2c3" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />`;
}

function getCalibrationHistory(node, sensorKey) {
  const sensor = node.sensors[sensorKey];
  if (Array.isArray(sensor.calibrationHistory) && sensor.calibrationHistory.length) return sensor.calibrationHistory;
  if (sensor.calibration && Array.isArray(sensor.calibration.history)) {
    return sensor.calibration.history.map((entry) => ({
      ...entry,
      sensor: getSensorDefinition(sensorKey).label,
      node: node.id
    }));
  }
  return [];
}

function openCalibrationWizard(nodeId, sensorKey) {
  const node = getNode(nodeId);
  const sensor = node.sensors[sensorKey];
  state.calibrationWizardNodeId = nodeId;
  state.calibrationWizardSensorKey = sensorKey;
  state.calibrationWizardStep = 1;
  const wizard = document.getElementById('calibrationWizard');
  const content = document.getElementById('wizardContent');
  renderCalibrationWizard(content, node, sensor, sensorKey, 1);
  wizard.classList.remove('hidden');
  wizard.setAttribute('aria-hidden', 'false');
}

function renderCalibrationWizard(content, node, sensor, sensorKey, step) {
  const def = getSensorDefinition(sensorKey);
  const reference = sensor.calibration && sensor.calibration.reference ? Number(sensor.calibration.reference) : def.defaultValue;
  const measured = typeof sensor.value === 'number' ? sensor.value : reference;
  const difference = Number(((measured - reference) / (reference || 1)) * 100);
  const stable = step >= 2;

  if (step === 1) {
    content.innerHTML = `
      <div class="wizard-step">
        <h4>Step 1 — Prepare</h4>
        <p>Prepare the appropriate calibration or reference solution for this sensor before continuing.</p>
        <ol class="wizard-list">
          <li>Prepare reference</li>
          <li>Place sensor</li>
          <li>Wait for stable reading</li>
          <li>Record value</li>
          <li>Save calibration</li>
        </ol>
        <div class="wizard-note">Jal Raksha records calibration information and guides the process. Physical calibration must be performed using the appropriate reference standard.</div>
        <button class="primary-button" data-wizard-next="2">Continue</button>
      </div>
    `;
  } else if (step === 2) {
    content.innerHTML = `
      <div class="wizard-step">
        <h4>Step 2 — Waiting for stable reading</h4>
        <div class="calibration-reference-box">
          <span>Reference</span>
          <strong>${reference.toFixed(1)} ${def.unit}</strong>
        </div>
        <div class="calibration-reference-box">
          <span>Sensor</span>
          <strong>${measured.toFixed(1)} ${def.unit}</strong>
        </div>
        <div class="stability-indicator"><span style="width:${stable ? 100 : 64}%"></span></div>
        <p class="wizard-status">${stable ? 'READY' : 'Stabilizing...'}</p>
        <button class="primary-button" data-wizard-next="3" ${stable ? '' : 'disabled'}>Continue</button>
      </div>
    `;
    if (!stable) {
      setTimeout(() => {
        state.calibrationWizardStep = 2;
        renderCalibrationWizard(content, node, sensor, sensorKey, 2);
      }, 1200);
    }
  } else if (step === 3) {
    content.innerHTML = `
      <div class="wizard-step">
        <h4>Step 3 — Reference value</h4>
        <div class="comparison-grid">
          <div class="comparison-box">
            <span>Reference</span>
            <strong>${reference.toFixed(1)} ${def.unit}</strong>
          </div>
          <div class="comparison-box">
            <span>Measured</span>
            <strong>${measured.toFixed(1)} ${def.unit}</strong>
          </div>
        </div>
        <div class="difference-box ${Math.abs(difference) <= 5 ? 'good' : 'warning'}">
          <span>Difference</span>
          <strong>${Math.abs(difference).toFixed(1)}%</strong>
          <small>${Math.abs(difference) <= 5 ? '✓ Within tolerance' : '⚠ Calibration adjustment recommended'}</small>
        </div>
        <button class="primary-button" data-wizard-next="4">Continue</button>
      </div>
    `;
  } else {
    content.innerHTML = `
      <div class="wizard-step">
        <h4>Step 4 — Save calibration</h4>
        <div class="summary-list">
          <div><span>Sensor</span><strong>${def.label}</strong></div>
          <div><span>Node</span><strong>${node.id}</strong></div>
          <div><span>Reference</span><strong>${reference.toFixed(1)} ${def.unit}</strong></div>
          <div><span>Measured</span><strong>${measured.toFixed(1)} ${def.unit}</strong></div>
          <div><span>Difference</span><strong>${Math.abs(difference).toFixed(1)}%</strong></div>
          <div><span>Result</span><strong>CALIBRATION RECORDED</strong></div>
        </div>
        <button class="primary-button" data-wizard-save="true">Save Calibration</button>
      </div>
    `;
  }

  content.querySelectorAll('[data-wizard-next]').forEach((button) => {
    button.addEventListener('click', () => {
      const nextStep = Number(button.dataset.wizardNext);
      state.calibrationWizardStep = nextStep;
      renderCalibrationWizard(content, node, sensor, sensorKey, nextStep);
    });
  });

  content.querySelectorAll('[data-wizard-save]').forEach((button) => {
    button.addEventListener('click', () => {
      const calibrationDate = new Date().toISOString().slice(0, 10);
      sensor.calibration = {
        status: 'VALID',
        lastCalibrated: calibrationDate,
        nextCalibration: new Date(Date.now() + 120 * 86400000).toISOString().slice(0, 10),
        reference: `${reference.toFixed(1)} ${def.unit}`,
        history: [{ date: calibrationDate, reference: reference.toFixed(1), difference: Math.abs(difference).toFixed(1), result: 'VALID' }]
      };
      if (!sensor.calibrationHistory) sensor.calibrationHistory = [];
      sensor.calibrationHistory.unshift({
        date: calibrationDate,
        sensor: def.label,
        node: node.id,
        reference: Number(reference.toFixed(1)),
        difference: Number(Math.abs(difference).toFixed(1)),
        result: 'VALID'
      });
      persistSensorState();
      closeCalibrationWizard();
      renderAll();
      state.notifications.unshift({
        id: `calibration-${node.id}-${sensorKey}-${Date.now()}`,
        nodeId: node.id,
        level: 'success',
        title: `${node.id} ${def.label} calibration recorded`,
        detail: `${node.id} · Calibration`,
        read: false
      });
      renderNotifications();
    });
  });
}

function closeCalibrationWizard() {
  const wizard = document.getElementById('calibrationWizard');
  wizard.classList.add('hidden');
  wizard.setAttribute('aria-hidden', 'true');
}

function loadSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem('jalRakshaSettings') || '{}');
    return { ...defaultSettings, ...saved };
  } catch (error) {
    return { ...defaultSettings };
  }
}

function saveSettings() {
  localStorage.setItem('jalRakshaSettings', JSON.stringify(state.settings));
}

function getStatusClass(status) {
  if (status === 'critical') return 'critical';
  if (status === 'warning' || status === 'watch') return 'warning';
  if (status === 'offline') return 'neutral';
  return 'normal';
}

function getNode(nodeId) {
  return mockNodes.find((node) => node.id === nodeId) || mockNodes[0];
}

function getCounts() {
  const normal = mockNodes.filter((node) => node.status === 'normal').length;
  const warning = mockNodes.filter((node) => node.status === 'warning' || node.status === 'watch').length;
  const critical = mockNodes.filter((node) => node.status === 'critical').length;
  const offline = mockNodes.filter((node) => node.connection !== 'ONLINE').length;
  return { normal, warning, critical, offline, total: mockNodes.length };
}

function metricDelta(current, previous) {
  if (previous === null || previous === undefined || previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

function getNodeWqi(node) {
  return node.waterQualityScore;
}

function getCurrentSystemState() {
  const counts = getCounts();
  if (counts.critical > 0) return 'Attention required';
  if (counts.warning > 0) return 'Needs review';
  return 'Stable';
}

function renderOverview() {
  const counts = getCounts();
  const selectedNode = getNode(state.selectedNodeId);
  const overallStatus = getCurrentSystemState();
  const qualityIndex = getNodeWqi(selectedNode);
  const label = getQualityLabel(qualityIndex);

  document.getElementById('metricNodes').textContent = String(mockNodes.length);
  document.getElementById('metricNormal').textContent = String(counts.normal);
  document.getElementById('metricWarning').textContent = String(counts.warning);
  document.getElementById('metricCritical').textContent = String(counts.critical);
  document.getElementById('activeNodesValue').textContent = String(mockNodes.filter((node) => node.connection === 'ONLINE').length);
  document.getElementById('normalNodesValue').textContent = String(counts.normal);
  document.getElementById('warningNodesValue').textContent = String(counts.warning);
  document.getElementById('criticalNodesValue').textContent = String(counts.critical);
  document.getElementById('overallStatusText').textContent = overallStatus;
  document.getElementById('latestAnomalyLevel').textContent = selectedNode.status === 'critical' ? 'High anomaly' : selectedNode.status === 'warning' ? 'Moderate anomaly' : 'Normal';
  document.getElementById('latestAnomalyNode').textContent = `Node ${selectedNode.id}`;
  document.getElementById('systemHealthValue').textContent = `${98 - counts.critical * 2}%`;
  document.getElementById('lastDataUpdate').textContent = formatRelativeTime(selectedNode.lastUpdated);
  document.getElementById('waterQualityValue').textContent = String(qualityIndex);
  document.getElementById('waterQualityLabel').textContent = label;
  document.getElementById('overviewModeBadge').textContent = state.systemStatus;
  const note = document.querySelector('.note-box p');
  note.textContent = selectedNode.anomalyScore >= 30
    ? `${selectedNode.id}: ${buildAnalysis(selectedNode).narrative} Recommended action: ${getRecommendation(selectedNode)}`
    : `${selectedNode.id} is stable against its recent baseline. Data quality is ${selectedNode.dataQuality}; prototype scores support monitoring only and are not a certified water-safety assessment.`;
  const scoreDelta = qualityIndex - selectedNode.previousWaterQualityScore;
  document.querySelector('.quality-meta p').textContent = `Previous ${selectedNode.previousWaterQualityScore}/100 · ${scoreDelta > 0 ? '↑' : scoreDelta < 0 ? '↓' : '—'} ${Math.abs(scoreDelta)} points. Monitoring score only; not certified drinking-water safety.`;

  const qualityRing = document.getElementById('waterQualityRing');
  const percent = qualityIndex;
  qualityRing.style.background = `conic-gradient(var(--aqua) 0 ${percent}%, rgba(13,43,64,0.08) ${percent}% 100%)`;

  const parameterList = document.getElementById('overviewParameterList');
  const paramEntries = [
    { name: 'TDS', value: selectedNode.readings.tds, max: 1000, unit: 'ppm', type: selectedNode.readings.tds > 700 ? 'critical' : selectedNode.readings.tds > 500 ? 'warning' : '' },
    { name: 'Turbidity', value: selectedNode.readings.turbidity, max: 20, unit: 'NTU', type: selectedNode.readings.turbidity > 12 ? 'critical' : selectedNode.readings.turbidity > 7 ? 'warning' : '' },
    { name: 'Temperature', value: selectedNode.readings.temperature, max: 35, unit: '°C', type: selectedNode.readings.temperature > 29 ? 'critical' : selectedNode.readings.temperature > 27 ? 'warning' : '' },
    { name: 'pH', value: selectedNode.readings.ph, max: 14, unit: 'pH', type: '', special: null },
    { name: 'Simulated DO', value: selectedNode.readings.do, max: 14, unit: 'mg/L', type: '', special: 'Simulated DO' }
  ];

  parameterList.innerHTML = paramEntries.map((item) => {
    const displayValue = item.special && item.name !== 'Simulated DO' ? item.special : `${Number(item.value).toFixed(item.name === 'TDS' || item.name === 'Temperature' ? 0 : 1)} ${item.unit}${item.name === 'Simulated DO' ? ' · Simulated' : ''}`;
    const percentValue = Math.min((Number(item.value) / item.max) * 100, 100);
    return `
      <div class="parameter-item">
        <div class="parameter-top">
          <strong>${item.name}</strong>
          <span>${displayValue}</span>
        </div>
        <div class="parameter-bar"><span class="parameter-fill ${item.type}" style="width: ${percentValue}%"></span></div>
      </div>
    `;
  }).join('');

  renderTrendChart();
  renderComparisonTable();
}

function renderTrendChart() {
  const svg = document.getElementById('trendChartOverview');
  const width = 640;
  const height = 280;
  const source = getNode(state.selectedNodeId).history.slice(-24);
  const min = Math.min(...source) - 10;
  const max = Math.max(...source) + 18;
  const polyline = source.map((value, index) => {
    const x = 30 + (index / (source.length - 1)) * (width - 60);
    const y = height - 25 - ((value - min) / (max - min || 1)) * (height - 60);
    return `${x},${y}`;
  }).join(' ');

  svg.innerHTML = `
    <defs>
      <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="rgba(10,162,195,0.35)" />
        <stop offset="100%" stop-color="rgba(10,162,195,0.02)" />
      </linearGradient>
    </defs>
    <g>
      <path d="M 30 ${height - 25} L ${polyline.split(' ').join(' L ')} L ${width - 30} ${height - 25} Z" fill="url(#trendFill)" opacity="0.9"></path>
      <polyline points="${polyline}" fill="none" stroke="#0aa2c3" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></polyline>
      ${Array.from({ length: 5 }, (_, index) => {
        const y = 20 + index * 52;
        return `<line x1="30" y1="${y}" x2="${width - 30}" y2="${y}" stroke="rgba(13,43,64,0.08)" />`;
      }).join('')}
    </g>
  `;
}

function renderComparisonTable() {
  const comparisonTable = document.getElementById('comparisonTable');
  const rows = [
    ['Node', 'Location', 'Status', 'TDS', 'Turbidity', 'Anomaly']
  ];
  mockNodes.forEach((node) => {
    rows.push([node.id, node.location, node.status, `${node.readings.tds} ppm`, `${node.readings.turbidity} NTU`, String(node.anomalyScore)]);
  });

  const html = rows.map((row, index) => `
    <div class="comparison-row ${index === 0 ? 'header' : ''}">
      ${row.map((col) => `<span>${col}</span>`).join('')}
    </div>
  `).join('');
  comparisonTable.innerHTML = html;
}

function renderMonitoring() {
  const grid = document.getElementById('liveMonitoringGrid');
  const liveStatus = document.getElementById('liveStatusBadge');
  liveStatus.textContent = `● ${state.systemStatus}`;
  liveStatus.classList.toggle('warning', state.systemStatus === 'DEMO MODE');
  liveStatus.classList.toggle('critical', state.systemStatus.includes('NOT CONNECTED'));
  document.getElementById('dataModeBadge').textContent = sensorDataProvider.getLabel();
  const nodeSelect = document.getElementById('monitorNodeSelect');
  nodeSelect.innerHTML = mockNodes.map((node) => `<option value="${node.id}" ${node.id === state.selectedNodeId ? 'selected' : ''}>${node.id} — ${node.location}</option>`).join('');

  grid.innerHTML = mockNodes.map((node) => {
    const currentStatus = getStatusClass(node.status);
    const tdsDelta = metricDelta(node.readings.tds, node.baseline.tds);
    const turbidityDelta = metricDelta(node.readings.turbidity, node.baseline.turbidity);
    const tempDelta = metricDelta(node.readings.temperature, node.baseline.temperature);
    return `
      <article class="card monitor-card ${currentStatus}">
        <div class="monitor-top">
          <div>
            <div class="monitor-id">${node.id}</div>
            <div class="eyebrow">${node.location}</div>
          </div>
          <div class="live-dot"><span class="status-dot ${currentStatus}"></span> ${node.connection}</div>
        </div>
        <div class="monitor-score-row"><div class="status-pill ${currentStatus}">${node.status.toUpperCase()}</div><span>Monitoring Score <strong>${node.waterQualityScore}</strong> · Anomaly <strong>${node.anomalyScore}</strong></span></div>
        <div class="monitor-stats">
          <div class="sensor-box"><span>TDS</span><strong>${node.sensors.tds.connected ? `${node.readings.tds} ppm` : 'Disconnected'}</strong><small>Δ ${tdsDelta.toFixed(1)}%</small><svg viewBox="0 0 260 68" preserveAspectRatio="none">${buildSparkline(node.sensors.tds.history || [node.readings.tds])}</svg></div>
          <div class="sensor-box"><span>Turbidity</span><strong>${node.readings.turbidity} NTU</strong><small>Δ ${turbidityDelta.toFixed(1)}%</small><svg viewBox="0 0 260 68" preserveAspectRatio="none">${buildSparkline(node.sensors.turbidity.history || [node.readings.turbidity])}</svg></div>
          <div class="sensor-box"><span>Temperature</span><strong>${node.readings.temperature}°C</strong><small>Δ ${tempDelta.toFixed(1)}%</small></div>
          <div class="sensor-box"><span>pH / Simulated DO</span><strong>${node.readings.ph} / ${node.readings.do} mg/L</strong><small>DO is simulated data</small></div>
          <div class="sensor-box"><span>Data quality</span><strong>${node.dataQuality}</strong><small>${node.sensorHealth} sensor health</small></div>
          <div class="sensor-box"><span>Trend / Updated</span><strong>${node.trend}</strong><small>${formatRelativeTime(node.lastUpdated)}</small></div>
        </div>
        <div class="trend-mini">
          <svg viewBox="0 0 260 68" preserveAspectRatio="none">
            ${buildSparkline(node.history.slice(-12))}
          </svg>
        </div>
        <div class="action-row">
          <span class="small-tag">Last updated ${node.lastUpdate}</span>
          <button class="voice-context-button" type="button" data-voice-context="node-readings" data-node-id="${node.id}">🔊 Read readings</button>
          <button class="secondary-button" data-node="${node.id}">View Node</button>
        </div>
      </article>
    `;
  }).join('');

  grid.querySelectorAll('.secondary-button').forEach((button) => {
    button.addEventListener('click', () => {
      state.selectedNodeId = button.dataset.node;
      openNodeModal(button.dataset.node);
    });
  });
}

function renderMap() {
  const svg = document.getElementById('waterMap');
  const filteredNodes = mockNodes.filter((node) => {
    if (state.selectedMapFilter === 'all') return true;
    if (state.selectedMapFilter === 'offline') return node.connection !== 'ONLINE';
    return state.selectedMapFilter === 'warning'
      ? node.status === 'warning' || node.status === 'watch'
      : node.status === state.selectedMapFilter;
  });

  svg.innerHTML = `
    <defs>
      <linearGradient id="mapBackground" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="rgba(122, 203, 225, 0.08)" />
        <stop offset="100%" stop-color="rgba(55, 122, 143, 0.04)" />
      </linearGradient>
    </defs>
    <rect x="0" y="0" width="760" height="420" fill="url(#mapBackground)" rx="18"></rect>
    <path d="M 90 120 C 180 50, 270 60, 320 135 S 470 260, 620 220 S 700 70, 730 145" fill="none" stroke="rgba(17, 77, 100, 0.24)" stroke-width="18" stroke-linecap="round" opacity="0.7"></path>
    <path d="M 130 330 C 250 300, 430 330, 520 270 S 640 200, 700 240" fill="none" stroke="rgba(17, 77, 100, 0.18)" stroke-width="12" stroke-linecap="round" opacity="0.9"></path>
    ${filteredNodes.map((node) => {
      const color = node.connection !== 'ONLINE' ? '#8799a3' : node.status === 'critical' ? '#d94b4b' : node.status === 'warning' || node.status === 'watch' ? (node.status === 'watch' ? '#e0b642' : '#e18436') : '#1f9d73';
      const selected = node.id === state.selectedNodeId ? 1 : 0.8;
      return `
        <g class="map-marker" data-node="${node.id}" transform="translate(${node.coords.x}, ${node.coords.y})" style="opacity:${selected};">
          <circle class="pulse-ring" r="18" stroke="${color}" fill="none" opacity="0.5"></circle>
          <circle class="marker-core" r="11" fill="${color}"></circle>
          <text x="18" y="-12" fill="#0d2b40" font-size="12" font-weight="700">${node.id}</text>
        </g>
      `;
    }).join('')}
  `;

  svg.querySelectorAll('.map-marker').forEach((marker) => {
    marker.addEventListener('click', () => {
      state.selectedNodeId = marker.dataset.node;
      renderMap();
      renderMapDetail();
    });
  });

  renderMapDetail();
}

function renderMapDetail() {
  const selectedNode = getNode(state.selectedNodeId);
  const statusEl = document.getElementById('mapDetailStatus');
  statusEl.textContent = selectedNode.status.toUpperCase();
  statusEl.className = `status-pill ${getStatusClass(selectedNode.status)}`;
  document.getElementById('mapDetailTitle').textContent = selectedNode.id;
  document.getElementById('mapDetailList').innerHTML = `
    <div class="detail-item"><span>Location</span><strong>${selectedNode.location}</strong></div>
    <div class="detail-item"><span>Status</span><strong>${selectedNode.status}</strong></div>
    <div class="detail-item"><span>TDS</span><strong>${selectedNode.readings.tds} ppm</strong></div>
    <div class="detail-item"><span>Turbidity</span><strong>${selectedNode.readings.turbidity} NTU</strong></div>
    <div class="detail-item"><span>Temperature</span><strong>${selectedNode.readings.temperature} °C</strong></div>
    <div class="detail-item"><span>Monitoring score</span><strong>${selectedNode.waterQualityScore} / 100 · ${getQualityLabel(selectedNode.waterQualityScore)}</strong></div>
    <div class="detail-item"><span>Anomaly score</span><strong>${selectedNode.anomalyScore} / 100</strong></div>
    <div class="detail-item"><span>Data quality</span><strong>${selectedNode.dataQuality}</strong></div>
    <div class="detail-item"><span>Trend</span><strong>${selectedNode.trend}</strong></div>
    <div class="detail-item"><span>Last update</span><strong>${formatRelativeTime(selectedNode.lastUpdated)}</strong></div>
    <button class="secondary-button" id="mapNodeDetailsButton">Open Node Details</button>
  `;
  document.getElementById('mapNodeDetailsButton').addEventListener('click', () => openNodeModal(selectedNode.id));
}

function buildAnalysis(node) {
  const parameters = [
    { key: 'tds', label: 'TDS', weight: 0.45, unit: 'ppm' },
    { key: 'turbidity', label: 'Turbidity', weight: 0.28, unit: 'NTU' },
    { key: 'temperature', label: 'Temp', weight: 0.14, unit: '°C' },
    { key: 'ph', label: 'pH', weight: 0.06, unit: 'pH' },
    { key: 'do', label: 'Simulated DO', weight: 0.07, unit: 'mg/L' }
  ].map((item) => {
    const current = Number(node.readings[item.key]);
    const baseline = Number(node.baseline[item.key]);
    return { ...item, current, baseline, delta: Number.isFinite(current) && baseline ? metricDelta(current, baseline) : 0 };
  });
  const contributorParameters = parameters.filter((item) => Math.abs(item.delta) >= 5);
  const contributorTotal = contributorParameters.reduce((sum, item) => sum + Math.abs(item.delta) * item.weight, 0);
  const contributors = contributorParameters.map((item) => ({
    label: item.label,
    value: contributorTotal ? Math.round((Math.abs(item.delta) * item.weight / contributorTotal) * 100) : 0,
    type: Math.abs(item.delta) > 60 ? 'critical' : Math.abs(item.delta) > 25 ? 'warning' : 'neutral'
  })).filter((item) => item.value > 0);
  const strongest = parameters.filter((item) => Math.abs(item.delta) >= 10).sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta));
  const changes = strongest.length
    ? strongest.map((item) => `${item.label} ${item.delta >= 0 ? 'increased' : 'decreased'} ${Math.abs(Math.round(item.delta))}% from the recent baseline (${Number.isFinite(item.current) ? `${item.current} ${item.unit}` : 'invalid reading'}).`)
    : ['Readings remain close to the recent baseline.'];
  let prediction = 'Collecting more readings...';
  if (node.history.length >= 5) {
    const last = node.history.slice(-5);
    const delta = (last[last.length - 1] - last[0]) / 4;
    const low = Math.max(0, Math.round(node.readings.tds + delta * 0.7));
    const high = Math.max(low, Math.round(node.readings.tds + delta * 1.3));
    prediction = `Current TDS ${node.readings.tds} ppm · Trend: ${node.trend} · Predicted next range: ${low}–${high} ppm. ${delta > 1 ? 'Trend indicates possible worsening over the next monitoring interval.' : 'This short-term prototype estimate is not scientifically validated.'}`;
  }

  return {
    nodeId: node.id,
    anomalyScore: node.anomalyScore,
    status: node.status === 'critical' ? 'CRITICAL ANOMALY' : node.status === 'warning' ? 'WARNING' : node.status === 'watch' ? 'WATCH' : node.status === 'offline' ? 'OFFLINE' : 'NORMAL',
    changes,
    narrative: strongest.length
      ? `Prototype explainability: ${strongest.slice(0, 2).map((item) => `${item.label} changed ${Math.abs(Math.round(item.delta))}%`).join(' and ')} from baseline. Rule-based monitoring does not identify a pollution source.`
      : 'No significant change from the node baseline. This is a rule-based prototype, not a trained ML model.',
    prediction,
    contributors: contributors.length ? contributors : [{ label: 'No notable change', value: 100, type: 'neutral' }],
    recommendation: getRecommendation(node),
    parameters,
    baseline: {
      currentTds: node.readings.tds,
      baselineTds: node.baseline.tds,
      difference: Math.round(metricDelta(node.readings.tds, node.baseline.tds)),
      currentTurbidity: node.readings.turbidity,
      baselineTurbidity: node.baseline.turbidity,
      differenceTurbidity: Math.round(metricDelta(node.readings.turbidity, node.baseline.turbidity))
    }
  };
}

function renderAnalysis() {
  const node = getNode(state.selectedNodeId);
  const analysis = buildAnalysis(node);
  const statusEl = document.getElementById('analysisStatus');
  statusEl.textContent = analysis.status;
  statusEl.className = `status-pill ${getStatusClass(node.status)}`;
  document.getElementById('analysisAnomalyScore').textContent = `${analysis.anomalyScore} / 100`;
  document.getElementById('analysisChanges').innerHTML = analysis.changes.map((entry) => `<li>${entry}</li>`).join('');
  document.getElementById('analysisNarrative').textContent = analysis.narrative;
  document.getElementById('predictionText').textContent = analysis.prediction;

  const baselineHost = document.getElementById('baselineComparison');
  baselineHost.innerHTML = `
    <div class="baseline-box">
      <span class="label">Current</span>
      <strong>${node.readings.tds} ppm</strong>
      <div class="baseline-bar"><span class="baseline-fill ${node.status === 'critical' ? 'critical' : node.status === 'warning' ? 'warning' : ''}" style="width: ${Math.min((node.readings.tds / 1000) * 100, 100)}%"></span></div>
      <small>Baseline: ${analysis.baseline.baselineTds} ppm | Difference: ${analysis.baseline.difference >= 0 ? '+' : ''}${analysis.baseline.difference}%</small>
    </div>
    <div class="baseline-box">
      <span class="label">Turbidity</span>
      <strong>${node.readings.turbidity} NTU</strong>
      <div class="baseline-bar"><span class="baseline-fill ${node.status === 'critical' ? 'critical' : node.status === 'warning' ? 'warning' : ''}" style="width: ${Math.min((node.readings.turbidity / 25) * 100, 100)}%"></span></div>
      <small>Baseline: ${analysis.baseline.baselineTurbidity} NTU | Difference: ${analysis.baseline.differenceTurbidity >= 0 ? '+' : ''}${analysis.baseline.differenceTurbidity}%</small>
    </div>
    <div class="baseline-box"><span class="label">Prototype Water Quality Score</span><strong>${node.waterQualityScore} / 100 · ${getQualityLabel(node.waterQualityScore)}</strong><small>Data quality ${node.dataQuality} · Sensor health ${node.sensorHealth}</small></div>
  `;

  const contributorChart = document.getElementById('contributorChart');
  contributorChart.innerHTML = analysis.contributors.map((entry) => `
    <div class="contributor-row">
      <label>${entry.label}</label>
      <div class="contributor-bar"><span class="contributor-fill ${entry.type}" style="width: ${entry.value}%"></span></div>
      <strong>${entry.value}%</strong>
    </div>
  `).join('');

  renderPredictionChart(node);
}

function renderPredictionChart(node) {
  const svg = document.getElementById('predictionChart');
  const width = 760;
  const height = 260;
  const historical = node.history.slice(-12);
  const recent = historical.slice(-4);
  const slope = recent.length > 1 ? (recent.at(-1) - recent[0]) / (recent.length - 1) : 0;
  const predicted = [...historical, ...[1, 2, 3].map((step) => Math.max(0, node.readings.tds + slope * step))];
  const min = Math.min(...historical, ...predicted) - 25;
  const max = Math.max(...historical, ...predicted) + 25;
  const line = (values) => values.map((value, index) => {
    const x = 30 + (index / (values.length - 1)) * (width - 60);
    const y = height - 30 - ((value - min) / (max - min || 1)) * (height - 80);
    return `${x},${y}`;
  }).join(' ');

  svg.innerHTML = `
    <g>
      ${Array.from({ length: 5 }, (_, index) => {
        const y = 20 + index * 44;
        return `<line x1="30" y1="${y}" x2="${width - 30}" y2="${y}" stroke="rgba(13,43,64,0.07)" />`;
      }).join('')}
      <polyline points="${line(historical)}" fill="none" stroke="#56b8d4" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></polyline>
      <polyline points="${line(predicted)}" fill="none" stroke="#d94b4b" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="10 8"></polyline>
      <text x="30" y="${height - 8}" fill="#0d2b40" font-size="12" font-weight="700">HISTORICAL</text>
      <text x="260" y="${height - 8}" fill="#0d2b40" font-size="12" font-weight="700">CURRENT</text>
      <text x="570" y="${height - 8}" fill="#0d2b40" font-size="12" font-weight="700">PREDICTED</text>
    </g>
  `;
}

function renderAlerts() {
  const filter = state.alertFilter;
  syncAlertNotifications();
  const liveAlerts = mockNodes.flatMap((node) => node.alerts.map((alert, index) => ({
      ...alert,
      alertKey: getAlertKey(node, alert, index),
      nodeId: node.id,
      location: node.location,
      level: alert.level || (node.status === 'critical' ? 'CRITICAL' : 'WARNING')
    })));
  const liveAlertKeys = new Set(liveAlerts.map((alert) => alert.alertKey));
  const historicalAlerts = state.notifications
    .filter((notification) => notification.alertId && notification.alertSnapshot && !liveAlertKeys.has(notification.alertId))
    .map((notification) => ({
      ...notification.alertSnapshot,
      alertKey: notification.alertId,
      nodeId: notification.nodeId,
      location: mockNodes.find((node) => node.id === notification.nodeId)?.location || notification.nodeId,
      level: String(notification.alertSnapshot.level || notification.level || 'WARNING').toUpperCase(),
      status: notification.alertSnapshot.status || 'RESOLVED'
    }));
  const alerts = [...liveAlerts, ...historicalAlerts]
    .filter((alert) => {
      if (filter === 'all') return true;
      if (filter === 'warning') return alert.level === 'WARNING' || alert.level === 'WATCH';
      if (filter === 'critical') return alert.level === 'CRITICAL';
      return alert.status === 'NEW';
    });

  const alertList = document.getElementById('alertList');
  if (!alerts.length) {
    alertList.innerHTML = `
      <article class="card alert-card">
        <div class="alert-top">
          <div class="status-pill neutral">No alerts</div>
          <span class="small-tag">System stable</span>
        </div>
        <h4>No active alert in the current monitoring window.</h4>
        <p>Continue monitoring and compare upstream/downstream readings when needed.</p>
      </article>
    `;
    return;
  }

  alertList.innerHTML = alerts.map((alert) => `
    <article class="card alert-card" data-alert-card="${escapeHtml(alert.alertKey)}" tabindex="-1">
      <div class="alert-top">
        <div class="status-pill ${alert.level === 'CRITICAL' ? 'critical' : 'warning'}">${alert.level}</div>
        <span class="small-tag">${alert.nodeId} · ${alert.status}</span>
      </div>
      <h4>${alert.title}</h4>
      <p class="summary">Node: ${alert.nodeId} | Location: ${alert.location} | Time: ${alert.time || 'Now'}</p>
      <p><strong>Parameter:</strong> ${alert.parameter || 'Water quality'}</p>
      <p><strong>Current / baseline:</strong> ${alert.currentValue ?? 'Unavailable'} / ${alert.baselineValue ?? 'Unavailable'}</p>
      <p><strong>Reason:</strong> ${alert.reason || 'Change detected against the node baseline.'}</p>
      <p><strong>Data quality:</strong> ${getNode(alert.nodeId).dataQuality}</p>
      <p><strong>Recommended action:</strong> ${alert.recommendation || getRecommendation(getNode(alert.nodeId))}</p>
      <div class="alert-actions">
        <button class="voice-context-button" type="button" data-voice-context="alert" data-voice-node="${alert.nodeId}" data-alert-key="${escapeHtml(alert.alertKey)}">🔊 Read alert</button>
        <button class="secondary-button" data-node="${alert.nodeId}">View Node</button>
        <button class="secondary-button" data-analysis="${alert.nodeId}">View Analysis</button>
        ${alert.status === 'NEW' ? `<button class="primary-button" data-ack="${alert.nodeId}" data-alert-id="${alert.id}">Acknowledge</button>` : ''}
        ${alert.status !== 'RESOLVED' ? `<button class="secondary-button" data-resolve-alert="${alert.nodeId}" data-alert-id="${alert.id}">Resolve</button>` : ''}
        <button class="secondary-button" data-task="${alert.nodeId}">Create Inspection</button>
      </div>
    </article>
  `).join('');

  alertList.querySelectorAll('[data-node]').forEach((button) => {
    button.addEventListener('click', () => {
      state.selectedNodeId = button.dataset.node;
      openNodeModal(button.dataset.node);
    });
  });

  alertList.querySelectorAll('[data-analysis]').forEach((button) => {
    button.addEventListener('click', () => {
      state.selectedNodeId = button.dataset.analysis;
      setActivePage('analysis');
      renderAll();
    });
  });

  alertList.querySelectorAll('[data-ack]').forEach((button) => {
    button.addEventListener('click', () => {
      const node = getNode(button.dataset.ack);
      node.alertState = 'ACKNOWLEDGED';
      const alert = node.alerts.find((entry) => entry.id === button.dataset.alertId);
      if (alert) {
        alert.status = 'ACKNOWLEDGED';
        addTimelineEvent(node, `Alert acknowledged: ${alert.title}`, 'info');
      }
      syncActiveAlertFields(node);
      persistSensorState();
      renderAll();
    });
  });

  alertList.querySelectorAll('[data-resolve-alert]').forEach((button) => {
    button.addEventListener('click', () => {
      const node = getNode(button.dataset.resolveAlert);
      const alert = node.alerts.find((entry) => entry.id === button.dataset.alertId);
      if (alert) {
        alert.status = 'RESOLVED';
        alert.resolvedAt = Date.now();
        node.alertSuppressed = true;
        addTimelineEvent(node, `Alert resolved: ${alert.title}`, 'success');
      }
      node.alertState = 'RESOLVED';
      syncActiveAlertFields(node);
      if (state.activeEvent && state.activeEvent.nodeId === node.id) state.activeEvent = null;
      persistSensorState();
      renderAll();
    });
  });

  alertList.querySelectorAll('[data-task]').forEach((button) => {
    button.addEventListener('click', () => {
      const node = getNode(button.dataset.task);
      const task = {
        nodeId: node.id,
        location: node.location,
        reason: 'Possible water-quality anomaly',
        priority: 'HIGH',
        assigned: 'Ops Team',
        status: 'OPEN'
      };
      state.notifications.unshift({
        id: `inspection-${node.id}-${Date.now()}`,
        nodeId: node.id,
        level: 'info',
        title: `Inspection task created for ${node.id}`,
        detail: `${node.id} · Inspection`,
        read: false
      });
      const list = document.getElementById('alertList');
      list.insertAdjacentHTML('beforeend', `<div class="task-banner">Inspection task created for ${node.id}. Status: OPEN</div>`);
      renderNotifications();
    });
  });
}

function renderNodes() {
  const list = document.getElementById('sensorNodeList');
  list.innerHTML = mockNodes.map((node) => `
    <article class="card node-card">
      <div class="node-card-header">
        <h4>${node.id}</h4>
        <span class="status-pill ${getStatusClass(node.status)}">${node.status.toUpperCase()}</span>
      </div>
      <div class="meta">
        <div class="meta-row"><span>Location</span><strong>${node.location}</strong></div>
        <div class="meta-row"><span>Connection</span><strong>${node.connectionStatus}</strong></div>
        <div class="meta-row"><span>Battery</span><strong>${node.battery}</strong></div>
        <div class="meta-row"><span>Last sync</span><strong>${formatRelativeTime(node.lastUpdated)}</strong></div>
        <div class="meta-row"><span>Sensor health</span><strong>${node.sensorHealth}</strong></div>
        <div class="meta-row"><span>Data quality</span><strong>${node.dataQuality}</strong></div>
        <div class="meta-row"><span>Monitoring score</span><strong>${node.waterQualityScore} / 100</strong></div>
        <div class="meta-row"><span>TDS sensor</span><strong>${node.sensors.tds.connected ? 'Operational' : 'Disconnected'}</strong></div>
        <div class="meta-row"><span>Turbidity sensor</span><strong>${node.sensors.turbidity.connected ? 'Operational' : 'Disconnected'}</strong></div>
        <div class="meta-row"><span>Temperature sensor</span><strong>${node.sensors.temperature.connected ? 'Operational' : 'Disconnected'}</strong></div>
      </div>
      <button class="voice-context-button" type="button" data-voice-context="node-readings" data-node-id="${node.id}">🔊 Read node status</button>
      <button class="secondary-button" data-node="${node.id}">View Details</button>
    </article>
  `).join('');

  list.querySelectorAll('[data-node]').forEach((button) => {
    button.addEventListener('click', () => openNodeModal(button.dataset.node));
  });
}

function renderHealth() {
  const container = document.getElementById('sensorHealthList');
  const node = getNode(state.selectedHealthNodeId);
  const summary = getHealthSummary(node);
  const sensorKeys = getSensorKeysForNode(node);

  container.innerHTML = `
    <div class="sensor-health-toolbar card">
      <label>
        <span>Select Monitoring Node</span>
        <select id="healthNodeSelect">${mockNodes.map((entry) => `<option value="${entry.id}" ${entry.id === node.id ? 'selected' : ''}>${entry.id}</option>`).join('')}</select>
      </label>
    </div>
    <div class="health-summary-grid">
      <div class="summary-card card"><span>Sensors Healthy</span><strong>${summary.healthy} / ${summary.total}</strong></div>
      <div class="summary-card card"><span>Warnings</span><strong>${summary.warnings}</strong></div>
      <div class="summary-card card"><span>Disconnected</span><strong>${summary.disconnected}</strong></div>
      <div class="summary-card card"><span>Calibration Due</span><strong>${summary.calibrationDue}</strong></div>
      <div class="summary-card card"><span>Node data quality</span><strong>${node.dataQuality}</strong></div>
    </div>
    <div class="health-grid">
      ${sensorKeys.map((key) => {
        const profile = getSensorHealthProfile(node, key);
        const healthClass = profile.health === 'FAULT' ? 'critical' : profile.health === 'WARNING' ? 'warning' : 'normal';
        const connectionClass = profile.connection === 'DISCONNECTED' || profile.connection === 'TIMEOUT' ? 'neutral' : profile.connection === 'CONNECTED' ? 'normal' : 'warning';
        return `
          <button class="sensor-card card ${healthClass}" type="button" data-health-sensor="${key}" data-node-id="${node.id}">
            <div class="sensor-card-header">
              <div class="sensor-title-wrap">
                <span class="sensor-icon">${profile.icon}</span>
                <strong>${profile.label}</strong>
              </div>
              <span class="status-chip ${connectionClass}">${profile.connection}</span>
            </div>
            <div class="sensor-card-body">
              <div class="sensor-value">${profile.lastReading === 'Not connected' ? 'Not connected' : `${profile.lastReading} ${profile.unit}`}</div>
              <div class="sensor-meta"><span>Last update</span><strong>${profile.lastUpdate}</strong></div>
              <div class="sensor-meta"><span>Last communication</span><strong>${profile.lastCommunication}</strong></div>
              <div class="sensor-meta"><span>Health</span><strong>${profile.health}</strong></div>
              <div class="sensor-meta"><span>Calibration</span><strong>${profile.calibration}</strong></div>
              <div class="sensor-meta"><span>Data quality</span><strong>${profile.dataQuality} (${profile.qualityPct}%)</strong></div>
            </div>
            <div class="sparkline-row">
              <svg viewBox="0 0 260 68" class="mini-sparkline" aria-label="${profile.label} trend">
                ${buildSparkline(getSensorHistoryValues(node.sensors[key], profile.value || 0))}
              </svg>
            </div>
            <div class="sensor-message ${healthClass}">${profile.message}</div>
          </button>
        `;
      }).join('')}
    </div>
    <div class="event-log card">
      <div class="section-header small-gap">
        <div>
          <p class="eyebrow">Recent activity</p>
          <h3>Recent Sensor Events</h3>
        </div>
      </div>
      <ul class="timeline">
        ${state.timeline.filter((event) => event.nodeId === node.id).slice(0, 6).map((event) => `
          <li class="timeline-item ${event.severity}">
            <span class="timeline-time">${new Date(event.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <span class="timeline-text">${event.message}</span>
          </li>
        `).join('') || '<li class="timeline-item success"><span class="timeline-text">No sensor events recorded yet.</span></li>'}
      </ul>
    </div>
  `;

  const healthNodeSelect = document.getElementById('healthNodeSelect');
  if (healthNodeSelect) {
    healthNodeSelect.addEventListener('change', (event) => {
      state.selectedHealthNodeId = event.target.value;
      renderHealth();
    });
  }

  container.querySelectorAll('[data-health-sensor]').forEach((button) => {
    button.addEventListener('click', () => {
      openSensorDrawer(button.dataset.nodeId, button.dataset.healthSensor);
    });
  });
}

function renderCalibration() {
  const grid = document.getElementById('calibrationGrid');
  const node = getNode(state.selectedCalibrationNodeId);
  const sensorKey = state.selectedCalibrationSensor || 'tds';
  const def = getSensorDefinition(sensorKey);
  const sensor = node.sensors[sensorKey];
  const profile = getSensorHealthProfile(node, sensorKey);
  const history = getCalibrationHistory(node, sensorKey);

  grid.innerHTML = `
    <div class="calibration-toolbar card compact">
      <label>
        <span>Select Node</span>
        <select id="calibrationNodeSelect">${mockNodes.map((entry) => `<option value="${entry.id}" ${entry.id === node.id ? 'selected' : ''}>${entry.id}</option>`).join('')}</select>
      </label>
      <label>
        <span>Select Sensor</span>
        <select id="calibrationSensorSelect">
          ${Object.keys(sensorCatalog).map((key) => `<option value="${key}" ${key === sensorKey ? 'selected' : ''}>${sensorCatalog[key].label}</option>`).join('')}
        </select>
      </label>
    </div>
    <div class="calibration-summary card">
      <div class="calibration-badge ${profile.calibration === 'VALID' ? 'valid' : profile.calibration === 'DUE' ? 'warning' : 'critical'}">
        <span class="status-dot small ${profile.calibration === 'VALID' ? 'normal' : profile.calibration === 'DUE' ? 'warning' : 'critical'}"></span>
        ${profile.calibration === 'VALID' ? 'CALIBRATION VALID' : profile.calibration === 'DUE' ? 'CALIBRATION DUE' : 'CALIBRATION OVERDUE'}
      </div>
      <div class="calibration-main">
        <div>
          <p class="eyebrow">${def.label}</p>
          <h3>${node.id}</h3>
          <p class="calibration-subtitle">${sensor.calibration && sensor.calibration.lastCalibrated ? `Last calibrated: ${sensor.calibration.lastCalibrated}` : 'No calibration history yet'}</p>
        </div>
        <button class="primary-button" data-start-calibration="${sensorKey}" data-node-id="${node.id}">Start Calibration</button>
      </div>
      <div class="calibration-meta-row">
        <div><span>Reference</span><strong>${sensor.calibration && sensor.calibration.reference ? sensor.calibration.reference : def.reference}</strong></div>
        <div><span>Next review</span><strong>${sensor.calibration && sensor.calibration.nextCalibration ? sensor.calibration.nextCalibration : 'Pending'}</strong></div>
      </div>
      <button class="voice-context-button" type="button" data-voice-context="calibration" data-voice-node="${node.id}" data-sensor-key="${sensorKey}">🔊 Read calibration instructions</button>
      <div class="calibration-note">Jal Raksha records calibration information and guides the process. Physical sensor calibration must be performed using the appropriate reference standard.</div>
    </div>
    <div class="calibration-history card">
      <div class="section-header small-gap">
        <div>
          <p class="eyebrow">Calibration history</p>
          <h3>Calibration Record</h3>
        </div>
      </div>
      <div class="history-table-wrap">
        <table class="history-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Sensor</th>
              <th>Node</th>
              <th>Reference</th>
              <th>Difference</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            ${history.length ? history.map((entry) => `
              <tr>
                <td>${entry.date}</td>
                <td>${entry.sensor || def.label}</td>
                <td>${entry.node || node.id}</td>
                <td>${entry.reference || def.defaultValue}</td>
                <td>${entry.difference || '0.0'}%</td>
                <td><span class="status-chip ${entry.result === 'VALID' ? 'normal' : entry.result === 'REVIEW' ? 'warning' : 'critical'}">${entry.result || 'VALID'}</span></td>
              </tr>
            `).join('') : '<tr><td colspan="6">No calibration records yet.</td></tr>'}
          </tbody>
        </table>
      </div>
    </div>
  `;

  const calibrationNodeSelect = document.getElementById('calibrationNodeSelect');
  if (calibrationNodeSelect) {
    calibrationNodeSelect.addEventListener('change', (event) => {
      state.selectedCalibrationNodeId = event.target.value;
      const nextNode = getNode(state.selectedCalibrationNodeId);
      state.selectedCalibrationSensor = Object.keys(nextNode.sensors)[0] || 'tds';
      renderCalibration();
    });
  }

  const calibrationSensorSelect = document.getElementById('calibrationSensorSelect');
  if (calibrationSensorSelect) {
    calibrationSensorSelect.addEventListener('change', (event) => {
      state.selectedCalibrationSensor = event.target.value;
      renderCalibration();
    });
  }

  grid.querySelectorAll('[data-start-calibration]').forEach((button) => {
    button.addEventListener('click', () => {
      openCalibrationWizard(button.dataset.nodeId, button.dataset.startCalibration);
    });
  });
}

function renderSettings() {
  const settings = state.settings;
  document.getElementById('tdsWarning').value = settings.tdsWarning;
  document.getElementById('turbidityWarning').value = settings.turbidityWarning;
  document.getElementById('temperatureWarning').value = settings.temperatureWarning;
  document.getElementById('refreshInterval').value = settings.refreshInterval;
  document.getElementById('tempUnit').value = settings.tempUnit;
  document.getElementById('demoModeEnabled').checked = settings.demoModeEnabled;
  document.getElementById('notificationsEnabled').checked = settings.notificationsEnabled;
  document.getElementById('voiceAutoIntroSetting').checked = Boolean(settings.voiceAutoIntro);
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

function getAlertKey(node, alert, index) {
  if (!alert.id) alert.id = `${node.id}-alert-${Date.now()}-${index}`;
  return String(alert.id);
}

function getAlertSnapshot(alert) {
  return {
    id: alert.id,
    level: alert.level,
    title: alert.title,
    status: alert.status,
    time: alert.time,
    parameter: alert.parameter,
    currentValue: alert.currentValue,
    baselineValue: alert.baselineValue,
    reason: alert.reason,
    recommendation: alert.recommendation,
    createdAt: alert.createdAt
  };
}

function syncAlertNotifications() {
  mockNodes.forEach((node) => {
    node.alerts.forEach((alert, index) => {
      const alertId = getAlertKey(node, alert, index);
      let notification = state.notifications.find((item) => item.alertId === alertId);
      if (!notification) {
        if (alert.status === 'RESOLVED') return;
        notification = {
          id: `alert-${alertId}`,
          alertId,
          nodeId: node.id,
          level: (alert.level || (node.status === 'critical' ? 'CRITICAL' : 'WARNING')).toLowerCase(),
          title: alert.title,
          detail: `${node.id} · ${alert.parameter || 'Water quality'}`,
          alertSnapshot: getAlertSnapshot(alert),
          read: false
        };
        state.notifications.unshift(notification);
      } else {
        notification.nodeId = node.id;
        notification.level = (alert.level || (node.status === 'critical' ? 'CRITICAL' : 'WARNING')).toLowerCase();
        notification.title = alert.title;
        notification.detail = `${node.id} · ${alert.parameter || 'Water quality'}`;
        notification.alertSnapshot = getAlertSnapshot(alert);
      }
    });
  });
}

function closeSearchPopover() {
  const results = document.getElementById('searchResults');
  results.classList.add('hidden');
  state.ui.searchOpen = false;
  state.ui.searchActiveIndex = -1;
  document.getElementById('searchToggleButton').setAttribute('aria-expanded', 'false');
}

function closeNotificationPopover() {
  document.getElementById('notificationDropdown').classList.add('hidden');
  document.getElementById('notificationButton').setAttribute('aria-expanded', 'false');
}

function openAlert(nodeId, alertKey) {
  closeSearchPopover();
  closeNotificationPopover();
  state.selectedNodeId = nodeId;
  state.alertFilter = 'all';
  document.querySelectorAll('.alert-tab').forEach((button) => {
    button.classList.toggle('active', button.dataset.alertFilter === 'all');
  });
  setActivePage('alerts');
  renderAlerts();
  requestAnimationFrame(() => {
    const card = Array.from(document.querySelectorAll('[data-alert-card]'))
      .find((item) => item.dataset.alertCard === String(alertKey));
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'center' });
      card.focus({ preventScroll: true });
      card.classList.add('alert-card-highlight');
      window.setTimeout(() => card.classList.remove('alert-card-highlight'), 1800);
    }
  });
}

function activateSearchResult(index) {
  const result = state.ui.searchResults[index];
  if (!result) return;

  if (result.type === 'Node' || result.type === 'Sensor') {
    closeSearchPopover();
    document.getElementById('globalSearchInput').value = '';
    state.selectedNodeId = result.nodeId;
    state.selectedHealthNodeId = result.nodeId;
    state.selectedCalibrationNodeId = result.nodeId;
    state.selectedDemoNodeId = result.nodeId;
    openNodeModal(result.nodeId);
    return;
  }

  if (result.type === 'Alert') {
    document.getElementById('globalSearchInput').value = '';
    openAlert(result.nodeId, result.alertKey);
    return;
  }

  closeSearchPopover();
  document.getElementById('globalSearchInput').value = '';
  setActivePage(result.pageId);
}

function updateSearchSelection() {
  const results = document.getElementById('searchResults');
  const options = results.querySelectorAll('[data-search-index]');
  options.forEach((option) => {
    const selected = Number(option.dataset.searchIndex) === state.ui.searchActiveIndex;
    option.setAttribute('aria-selected', String(selected));
    if (selected) option.scrollIntoView({ block: 'nearest' });
  });
}

function renderSearchResults(query) {
  const results = document.getElementById('searchResults');
  const q = query.trim().toLowerCase();
  state.ui.searchResults = [];
  state.ui.searchActiveIndex = -1;
  if (!q) {
    results.innerHTML = '';
    results.classList.add('hidden');
    state.ui.searchOpen = false;
    document.getElementById('searchToggleButton').setAttribute('aria-expanded', 'false');
    return;
  }

  const matches = [];
  mockNodes.forEach((node) => {
    if (`${node.id} ${node.label} ${node.location}`.toLowerCase().includes(q)) {
      matches.push({
        type: 'Node',
        title: `${node.id} — ${node.location}`,
        detail: `${node.status.toUpperCase()} · ${node.readings.tds} ppm TDS`,
        nodeId: node.id
      });
    }
  });

  mockNodes.forEach((node) => {
    node.alerts.forEach((alert, index) => {
      const alertKey = getAlertKey(node, alert, index);
      if (`${node.id} ${alert.title} ${alert.level} ${alert.parameter || ''}`.toLowerCase().includes(q)) {
        matches.push({
          type: 'Alert',
          title: `${node.id} — ${alert.title}`,
          detail: `${alert.level || 'WARNING'} · ${alert.status}`,
          nodeId: node.id,
          alertKey
        });
      }
    });
  });

  const sensorLabels = {
    tds: 'TDS sensor',
    turbidity: 'Turbidity sensor',
    temperature: 'Temperature sensor',
    ph: 'pH sensor',
    do: 'Dissolved oxygen sensor'
  };
  mockNodes.forEach((node) => {
    Object.entries(sensorLabels).forEach(([key, label]) => {
      if (label.toLowerCase().includes(q)) {
        matches.push({
          type: 'Sensor',
          title: `${node.id} — ${label}`,
          detail: `${node.sensors[key].status} · ${node.readings[key] ?? 'Unavailable'} ${node.sensors[key].unit}`,
          nodeId: node.id
        });
      }
    });
  });

  const pages = [
    { id: 'overview', title: 'Overview', detail: 'Dashboard summary' },
    { id: 'monitoring', title: 'Live Monitoring', detail: 'Current sensor readings' },
    { id: 'map', title: 'Water Quality Map', detail: 'Node locations and water status' },
    { id: 'analysis', title: 'AI Analysis', detail: 'Baseline and anomaly analysis' },
    { id: 'alerts', title: 'Alerts', detail: 'Alerts and recommendations' },
    { id: 'nodes', title: 'Sensor Nodes', detail: 'Registered monitoring nodes' },
    { id: 'health', title: 'Sensor Health', detail: 'Connectivity and diagnostics' },
    { id: 'calibration', title: 'Calibration', detail: 'Sensor calibration records' },
    { id: 'demo', title: 'Demo Mode', detail: 'Demo scenarios' },
    { id: 'settings', title: 'Settings', detail: 'Application settings' },
    { id: 'about', title: 'About', detail: 'Project information' }
  ];
  pages.forEach((page) => {
    if (`${page.title} ${page.detail}`.toLowerCase().includes(q)) {
      matches.push({
        type: 'Page',
        title: page.title,
        detail: page.detail,
        pageId: page.id
      });
    }
  });

  state.ui.searchResults = matches.slice(0, 8);
  state.ui.searchActiveIndex = state.ui.searchResults.length ? 0 : -1;
  results.innerHTML = state.ui.searchResults.length
    ? state.ui.searchResults.map((result, index) => `
      <button class="search-result" type="button" role="option" aria-selected="${index === 0}" data-search-index="${index}">
        <strong>${escapeHtml(result.type)}</strong>
        <span>${escapeHtml(result.title)}</span>
        <small>${escapeHtml(result.detail)}</small>
      </button>
    `).join('')
    : '<div class="search-empty" role="status">No nodes, alerts, sensors, or pages match your search.</div>';
  results.classList.remove('hidden');
  state.ui.searchOpen = true;
  document.getElementById('searchToggleButton').setAttribute('aria-expanded', 'true');

  results.querySelectorAll('[data-search-index]').forEach((option) => {
    option.addEventListener('click', () => activateSearchResult(Number(option.dataset.searchIndex)));
  });
  updateSearchSelection();
}

function renderNotifications() {
  const dropdown = document.getElementById('notificationDropdown');
  const badge = document.getElementById('notificationBadge');
  syncAlertNotifications();
  const unread = state.notifications.filter((item) => !item.read).length;
  badge.textContent = unread > 99 ? '99+' : String(unread);
  badge.style.display = unread ? 'grid' : 'none';

  const recent = state.notifications.slice(0, 8);
  dropdown.innerHTML = `
    <div class="notification-header">
      <strong>Notifications</strong>
      <button type="button" data-mark-all-read ${unread ? '' : 'disabled'}>Mark all read</button>
    </div>
    <div class="notification-list">
      ${recent.length ? recent.map((item) => `
        <button class="notification-item ${item.read ? '' : 'unread'}" type="button" data-notification-id="${escapeHtml(item.id)}">
          <strong>${escapeHtml(String(item.level || 'info').toUpperCase())}</strong>
          <span>${escapeHtml(item.title)}</span>
          <small>${escapeHtml(item.detail || item.nodeId || '')}</small>
        </button>
      `).join('') : '<div class="notification-empty">You are all caught up.</div>'}
    </div>
    <div class="notification-footer">
      <button type="button" data-view-all-notifications>View all notifications</button>
    </div>
  `;

  dropdown.querySelectorAll('[data-notification-id]').forEach((button) => {
    button.addEventListener('click', () => {
      const notification = state.notifications.find((item) => String(item.id) === button.dataset.notificationId);
      if (!notification) return;
      notification.read = true;
      renderNotifications();
      closeNotificationPopover();
      if (notification.alertId) {
        openAlert(notification.nodeId, notification.alertId);
        return;
      }
      if (notification.nodeId) {
        state.selectedNodeId = notification.nodeId;
        openNodeModal(notification.nodeId);
      }
    });
  });

  const markAllButton = dropdown.querySelector('[data-mark-all-read]');
  markAllButton.addEventListener('click', (event) => {
    event.stopPropagation();
    state.notifications.forEach((item) => { item.read = true; });
    renderNotifications();
  });
  dropdown.querySelector('[data-view-all-notifications]').addEventListener('click', () => {
    closeNotificationPopover();
    setActivePage('alerts');
  });
}

function setActivePage(pageId) {
  state.activeSection = pageId;
  document.querySelectorAll('.nav-item').forEach((button) => {
    button.classList.toggle('active', button.dataset.target === pageId);
  });
  document.querySelectorAll('.page').forEach((page) => {
    page.classList.toggle('active', page.id === pageId);
  });
  voiceGuide.routeChanged(pageId);
  if (pageId === 'monitoring') refreshThingSpeak(true);
}

function openNodeModal(nodeId) {
  const node = getNode(nodeId);
  state.detailNodeId = node.id;
  state.selectedNodeId = node.id;
  persistSensorState();
  const modal = document.getElementById('nodeDetailModal');
  document.getElementById('modalNodeTitle').textContent = node.id;
  const analysis = buildAnalysis(node);
  document.getElementById('nodeDetailContent').innerHTML = `
    <div class="node-modal-grid">
      <div class="stat-box"><span>Location</span><strong>${node.location}</strong></div>
      <div class="stat-box"><span>Status</span><strong>${node.status.toUpperCase()}</strong></div>
      <div class="stat-box"><span>Connection</span><strong>${node.connectionStatus}</strong></div>
      <div class="stat-box"><span>Sensor health</span><strong>${node.sensorHealth}</strong></div>
      <div class="stat-box"><span>Data quality</span><strong>${node.dataQuality}</strong></div>
      <div class="stat-box"><span>Last synchronization</span><strong>${formatRelativeTime(node.lastUpdated)}</strong></div>
      <div class="stat-box"><span>Anomaly score</span><strong>${node.anomalyScore} / 100</strong></div>
      <div class="stat-box"><span>Prototype Water Quality Score</span><strong>${node.waterQualityScore} / 100 · ${getQualityLabel(node.waterQualityScore)}</strong></div>
      <div class="stat-box"><span>Trend</span><strong>${node.trend}</strong></div>
    </div>
    <button class="voice-context-button" type="button" data-voice-context="node-readings" data-voice-node="${node.id}">🔊 Read current readings</button>
    <div class="card panel-block">
      <div class="section-header">
        <div>
          <p class="eyebrow">Current readings</p>
          <h3>Live sensor values</h3>
        </div>
      </div>
      <div class="parameter-list">
        ${[['tds', 'TDS', 'ppm', 1200], ['turbidity', 'Turbidity', 'NTU', 25], ['temperature', 'Temperature', '°C', 40], ['ph', 'pH', '', 14], ['do', 'Simulated DO', 'mg/L', 14]].map(([key, label, unit, max]) => {
          const value = node.readings[key];
          const unavailable = key === 'tds' && !node.sensors.tds.connected;
          return `
            <div class="parameter-item">
              <div class="parameter-top"><strong>${label}</strong><span>${unavailable ? 'Disconnected' : `${value} ${unit}`}</span></div>
              <div class="parameter-bar"><span class="parameter-fill" style="width: ${unavailable ? 0 : Math.min((value / max) * 100, 100)}%"></span></div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
    <div class="card panel-block">
      <div class="section-header"><div><p class="eyebrow">Recent sensor history</p><h3>TDS · ${node.history.length} readings</h3></div></div>
      <svg viewBox="0 0 260 68" class="mini-sparkline" aria-label="TDS historical readings">${buildSparkline(node.history.slice(-24))}</svg>
    </div>
    <div class="card panel-block">
      <div class="section-header">
        <div>
          <p class="eyebrow">Prototype explainability</p>
          <h3>Analysis &amp; recommended action</h3>
        </div>
      </div>
      <p>${analysis.narrative}</p>
      <p><strong>Recommended action:</strong> ${analysis.recommendation}</p>
      <div class="contributor-chart">${analysis.contributors.map((entry) => `<div class="contributor-row"><label>${entry.label}</label><div class="contributor-bar"><span class="contributor-fill ${entry.type}" style="width:${entry.value}%"></span></div><strong>${entry.value}%</strong></div>`).join('')}</div>
      <div class="section-header small-gap"><div><p class="eyebrow">Recent alerts</p></div></div>
      <ul>${node.alerts.slice(0, 4).map((alert) => `<li>${alert.level} · ${alert.title} · ${alert.status} · ${alert.time}</li>`).join('') || '<li>No alerts for this node.</li>'}</ul>
      <p class="analysis-text">${analysis.prediction}</p>
      <div class="alert-actions">
        <button class="secondary-button" id="openNodeHealthButton">Open Sensor Health</button>
        <button class="secondary-button" id="openNodeCalibrationButton">Open Calibration</button>
      </div>
    </div>
  `;
  document.getElementById('openNodeHealthButton').addEventListener('click', () => {
    state.selectedHealthNodeId = node.id;
    setActivePage('health');
    closeNodeModal();
    renderAll();
  });
  document.getElementById('openNodeCalibrationButton').addEventListener('click', () => {
    state.selectedCalibrationNodeId = node.id;
    setActivePage('calibration');
    closeNodeModal();
    renderAll();
  });
  modal.classList.remove('hidden');
  modal.setAttribute('aria-hidden', 'false');
}

function closeNodeModal() {
  const modal = document.getElementById('nodeDetailModal');
  modal.classList.add('hidden');
  modal.setAttribute('aria-hidden', 'true');
}

function exportCsv() {
  const rows = [
    ['Timestamp', 'Node ID', 'TDS', 'Turbidity', 'Temperature', 'pH', 'Simulated DO', 'Prototype Water Quality Score', 'Anomaly Score', 'Data Quality', 'Trend', 'Status']
  ];
  mockNodes.forEach((node) => {
    rows.push([
      new Date().toISOString(),
      node.id,
      node.readings.tds,
      node.readings.turbidity,
      node.readings.temperature,
      node.readings.ph ?? null,
      node.readings.do ?? null,
      node.waterQualityScore,
      node.anomalyScore,
      node.dataQuality,
      node.trend,
      node.status
    ]);
  });
  const csvContent = rows.map((row) => row.map((cell) => typeof cell === 'string' && cell.includes(',') ? `"${cell}"` : cell).join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'jal-raksha-export.csv';
  link.click();
  URL.revokeObjectURL(url);
}

function generateReport() {
  const node = getNode(state.selectedNodeId);
  const reportContent = `
    <html><head><title>Jal Raksha Monitoring Report</title></head>
    <body style="font-family: Arial, sans-serif; padding: 32px; color: #17394e;">
      <h1>Jal Raksha Monitoring Report</h1>
      <p>Node: ${node.id}</p>
      <p>Location: ${node.location}</p>
      <p>Status: ${node.status}</p>
      <p>Current TDS: ${node.readings.tds} ppm</p>
      <p>Current turbidity: ${node.readings.turbidity} NTU</p>
      <p>Detected anomaly: ${node.anomalyScore} / 100</p>
      <p>Prototype Water Quality Score: ${node.waterQualityScore} / 100 · ${getQualityLabel(node.waterQualityScore)}</p>
      <p>Data quality: ${node.dataQuality} · Trend: ${node.trend}</p>
      <p>Simulated DO: ${node.readings.do} mg/L (simulated data; not measured by the physical prototype).</p>
      <p>Recommended action: ${getRecommendation(node)}</p>
      <p>This prototype score is not a certified drinking-water safety assessment.</p>
    </body></html>
  `;
  const printWindow = window.open('', '_blank');
  printWindow.document.write(reportContent);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}

function applyDemoEvent(type) {
  if (type === 'normal') {
    state.settings.demoModeEnabled = true;
    sensorDataProvider.setMode('DEMO');
    state.activeEvent = null;
    mockNodes.forEach((node) => {
      node.readings = { ...node.baseline };
      node.failureMode = null;
      node.connection = 'ONLINE';
      node.dataQuality = 'GOOD';
      node.alertSuppressed = false;
      node.lastReadingAt = Date.now();
      Object.values(node.sensors).forEach((sensor) => {
        sensor.connected = true;
        sensor.status = sensor.status === 'SIMULATED' ? 'SIMULATED' : 'CONNECTED';
        sensor.value = node.baseline[Object.keys(node.sensors).find((key) => node.sensors[key] === sensor)];
        sensor.history = makeRecentHistory(sensor.value, Object.keys(node.sensors).find((key) => node.sensors[key] === sensor));
        sensor.lastReadingAt = Date.now();
        sensor.lastCommunicationAt = Date.now();
      });
      node.alerts.forEach((alert) => {
        if (alert.status !== 'RESOLVED') {
          alert.status = 'RESOLVED';
          alert.resolvedAt = Date.now();
        }
      });
      node.alertState = 'RESOLVED';
      node.history = [...node.history.slice(-7), node.baseline.tds];
      syncNodeFields(node);
    });
    addTimelineEvent(getNode(state.selectedDemoNodeId), 'Demo simulation reset; readings returned to baseline', 'success');
  } else {
    const labels = {
      tds: 'TDS Spike',
      sediment: 'Turbidity Event',
      multi: 'Multi-Parameter Anomaly',
      oxygen: 'Oxygen Depletion · Simulated DO',
      'failure-disconnected': 'Sensor Failure · Disconnected',
      'failure-stale': 'Sensor Failure · Stale Reading',
      'failure-constant': 'Sensor Failure · Constant Reading',
      'failure-invalid': 'Sensor Failure · Invalid Reading'
    };
    const targetNode = getNode(state.selectedDemoNodeId || state.selectedNodeId);
    state.selectedNodeId = targetNode.id;
    state.selectedHealthNodeId = targetNode.id;
    state.selectedCalibrationNodeId = targetNode.id;
    state.settings.demoModeEnabled = true;
    sensorDataProvider.setMode('DEMO');
    state.activeEvent = { type, label: labels[type], nodeId: targetNode.id, startedAt: Date.now(), progress: 0, completed: false };
    addTimelineEvent(targetNode, `${labels[type]} scenario started`, 'info');
  }
  saveSettings();
  persistSensorState();
  renderAll();
}

function resolveActiveEvent() {
  const event = state.activeEvent;
  if (!event) return;
  const node = getNode(event.nodeId);
  node.readings = { ...node.baseline };
  node.failureMode = null;
  node.connection = 'ONLINE';
  node.dataQuality = 'GOOD';
  node.alertSuppressed = false;
  node.lastReadingAt = Date.now();
  Object.entries(node.sensors).forEach(([key, sensor]) => {
    sensor.connected = true;
    sensor.status = key === 'ph' || key === 'do' ? 'SIMULATED' : 'CONNECTED';
    sensor.value = node.baseline[key];
    sensor.history = [...(sensor.history || []).slice(-7), sensor.value];
    sensor.lastReadingAt = Date.now();
    sensor.lastCommunicationAt = Date.now();
  });
  node.history.push(node.baseline.tds);
  node.history = node.history.slice(-24);
  state.activeEvent = null;
  syncNodeFields(node);
  node.alerts.filter((alert) => alert.status !== 'RESOLVED').forEach((alert) => {
    alert.status = 'RESOLVED';
    alert.resolvedAt = Date.now();
  });
  node.alertState = 'RESOLVED';
  syncActiveAlertFields(node);
  addTimelineEvent(node, 'Active event resolved; readings are returning to baseline', 'success');
  persistSensorState();
  renderAll();
}

function renderTimeline() {
  const host = document.getElementById('eventTimeline');
  if (!host) return;
  host.innerHTML = state.timeline.slice(0, 10).map((event) => `
    <li class="timeline-item ${event.severity}">
      <span class="timeline-time">${new Date(event.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
      <span class="timeline-text">${event.nodeId} · ${event.message}</span>
    </li>
  `).join('') || '<li class="timeline-item success"><span class="timeline-text">Waiting for monitoring events.</span></li>';
  const demoSelect = document.getElementById('demoNodeSelect');
  demoSelect.innerHTML = mockNodes.map((node) => `<option value="${node.id}" ${node.id === state.selectedDemoNodeId ? 'selected' : ''}>${node.id} — ${node.location}</option>`).join('');
  document.getElementById('activeDemoEvent').textContent = state.activeEvent ? `${state.activeEvent.label} · ${Math.round(state.activeEvent.progress * 100)}%` : 'NORMAL · DEMO DATA';
}

function bindUI() {
  document.querySelectorAll('.nav-item').forEach((button) => {
    button.addEventListener('click', () => setActivePage(button.dataset.target));
  });

  const notificationButton = document.getElementById('notificationButton');
  const notificationDropdown = document.getElementById('notificationDropdown');
  const searchBox = document.querySelector('.search-box');
  const searchInput = document.getElementById('globalSearchInput');
  const searchToggleButton = document.getElementById('searchToggleButton');
  const voiceGuideWrap = document.querySelector('.voice-guide-wrap');
  const voiceGuideButton = document.getElementById('voiceGuideButton');
  const voiceGuidePanel = document.getElementById('voiceGuidePanel');

  notificationButton.addEventListener('click', (event) => {
    event.stopPropagation();
    closeSearchPopover();
    const shouldOpen = notificationDropdown.classList.contains('hidden');
    notificationDropdown.classList.toggle('hidden', !shouldOpen);
    notificationButton.setAttribute('aria-expanded', String(shouldOpen));
  });

  searchToggleButton.addEventListener('click', (event) => {
    event.stopPropagation();
    closeNotificationPopover();
    searchInput.focus();
    if (searchInput.value.trim()) renderSearchResults(searchInput.value);
  });

  voiceGuideButton.addEventListener('click', (event) => {
    event.stopPropagation();
    if (voiceGuidePanel.classList.contains('hidden')) voiceGuide.open();
    else voiceGuide.close();
  });
  document.getElementById('voiceGuideClose').addEventListener('click', () => voiceGuide.close());
  voiceGuidePanel.addEventListener('click', (event) => event.stopPropagation());
  document.getElementById('settingsOpenVoiceGuide').addEventListener('click', () => voiceGuide.open());

  document.querySelectorAll('[data-voice-language]').forEach((button) => {
    button.addEventListener('click', () => {
      voiceGuide.stop();
      state.settings.voiceLanguage = button.dataset.voiceLanguage;
      saveSettings();
      voiceGuide.refreshPreferences();
      voiceGuide.setTranscript(voiceGuide.pageText());
      voiceGuide.setStatus(voiceGuide.copy().ready);
    });
  });

  document.getElementById('voiceRateSelect').addEventListener('change', (event) => {
    state.settings.voiceRate = Number(event.target.value);
    saveSettings();
  });
  document.getElementById('voiceDetailedToggle').addEventListener('change', (event) => {
    state.settings.voiceDetailed = event.target.checked;
    saveSettings();
    voiceGuide.setTranscript(voiceGuide.pageText());
  });
  const updateVoiceAutoIntro = (enabled) => {
    state.settings.voiceAutoIntro = enabled;
    saveSettings();
    voiceGuide.refreshPreferences();
  };
  document.getElementById('voiceAutoIntroToggle').addEventListener('change', (event) => updateVoiceAutoIntro(event.target.checked));
  document.getElementById('voiceAutoIntroSetting').addEventListener('change', (event) => updateVoiceAutoIntro(event.target.checked));

  document.getElementById('voiceListenButton').addEventListener('click', () => voiceGuide.listenPage());
  document.getElementById('voicePauseButton').addEventListener('click', () => voiceGuide.pause());
  document.getElementById('voiceResumeButton').addEventListener('click', () => voiceGuide.resume());
  document.getElementById('voiceStopButton').addEventListener('click', () => voiceGuide.stop());
  document.getElementById('voiceReplayButton').addEventListener('click', () => voiceGuide.speak(voiceGuide.currentText || voiceGuide.pageText()));
  document.getElementById('voiceRetryButton').addEventListener('click', () => voiceGuide.retry());
  document.getElementById('voiceWelcomePlay').addEventListener('click', () => voiceGuide.replayWelcome());
  document.getElementById('voiceWelcomeSkip').addEventListener('click', () => {
    state.settings.voiceWelcomeSeen = true;
    saveSettings();
    voiceGuide.refreshPreferences();
  });
  document.getElementById('voiceReplayWelcome').addEventListener('click', () => voiceGuide.replayWelcome());
  const voiceAudioPlayer = document.getElementById('voiceAudioPlayer');
  voiceAudioPlayer.addEventListener('play', () => {
    if (!voiceGuide.cloudAudioUrl) return;
    voiceGuide.isPlaying = true;
    voiceGuide.isPaused = false;
    voiceGuide.setError('');
    voiceGuide.setStatus(voiceGuide.copy().playing);
  });
  voiceAudioPlayer.addEventListener('pause', () => {
    if (!voiceGuide.cloudAudioUrl || voiceAudioPlayer.ended) return;
    voiceGuide.isPlaying = true;
    voiceGuide.isPaused = true;
    voiceGuide.setStatus(voiceGuide.copy().paused);
  });
  voiceAudioPlayer.addEventListener('ended', () => {
    if (!voiceGuide.cloudAudioUrl) return;
    voiceGuide.isPlaying = false;
    voiceGuide.isPaused = false;
    voiceGuide.currentSentence = -1;
    voiceGuide.renderTranscript();
    voiceGuide.setStatus(voiceGuide.copy().complete);
  });
  voiceAudioPlayer.addEventListener('error', () => {
    if (!voiceGuide.cloudAudioUrl) return;
    voiceGuide.isPlaying = false;
    voiceGuide.isPaused = false;
    voiceGuide.setStatus(voiceGuide.copy().ready);
    voiceGuide.setError(voiceGuide.copy().playbackFailed, true);
  });

  searchInput.addEventListener('focus', () => {
    if (searchInput.value.trim()) renderSearchResults(searchInput.value);
  });

  searchInput.addEventListener('input', () => {
    renderSearchResults(searchInput.value);
  });

  searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      if (!state.ui.searchResults.length) return;
      event.preventDefault();
      const direction = event.key === 'ArrowDown' ? 1 : -1;
      const count = state.ui.searchResults.length;
      state.ui.searchActiveIndex = (state.ui.searchActiveIndex + direction + count) % count;
      updateSearchSelection();
    } else if (event.key === 'Enter' && state.ui.searchActiveIndex >= 0) {
      event.preventDefault();
      activateSearchResult(state.ui.searchActiveIndex);
    } else if (event.key === 'Escape') {
      closeSearchPopover();
    }
  });

  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    if (!searchBox.contains(event.target)) closeSearchPopover();
    if (!notificationButton.parentElement.contains(event.target)) closeNotificationPopover();
    const isContextButton = Boolean(target && target.closest('[data-voice-context]'));
    if (!voiceGuideWrap.contains(event.target)
      && !document.getElementById('settingsOpenVoiceGuide').contains(event.target)
      && !isContextButton) {
      if (!voiceGuidePanel.classList.contains('hidden')) voiceGuide.close();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeSearchPopover();
      closeNotificationPopover();
      if (!voiceGuidePanel.classList.contains('hidden')) voiceGuide.close();
    }
  });

  document.addEventListener('click', (event) => {
    const target = event.target instanceof Element ? event.target : null;
    const button = target?.closest('[data-voice-context]');
    if (!button) return;
    event.preventDefault();
    event.stopPropagation();
    voiceGuide.readContext(buildVoiceContextText(button));
  });

  document.querySelectorAll('.demo-button').forEach((button) => {
    button.addEventListener('click', () => applyDemoEvent(button.dataset.demo));
  });

  document.getElementById('resetSimulationButton').addEventListener('click', () => applyDemoEvent('normal'));
  document.getElementById('resolveDemoEventButton').addEventListener('click', resolveActiveEvent);
  document.getElementById('monitorNodeSelect').addEventListener('change', (event) => {
    state.selectedNodeId = event.target.value;
    state.selectedHealthNodeId = event.target.value;
    state.selectedCalibrationNodeId = event.target.value;
    state.selectedDemoNodeId = event.target.value;
    persistSensorState();
    renderAll();
  });
  document.getElementById('demoNodeSelect').addEventListener('change', (event) => {
    state.selectedDemoNodeId = event.target.value;
    state.selectedNodeId = event.target.value;
    state.selectedHealthNodeId = event.target.value;
    state.selectedCalibrationNodeId = event.target.value;
    persistSensorState();
    renderAll();
  });

  document.querySelectorAll('[data-map-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      state.selectedMapFilter = button.dataset.mapFilter;
      document.querySelectorAll('[data-map-filter]').forEach((chip) => chip.classList.toggle('active', chip === button));
      renderMap();
    });
  });

  document.querySelectorAll('[data-time-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      state.selectedTimeFilter = button.dataset.timeFilter;
      document.querySelectorAll('[data-time-filter]').forEach((chip) => chip.classList.toggle('active', chip === button));
    });
  });

  document.querySelectorAll('.alert-tab').forEach((button) => {
    button.addEventListener('click', () => {
      state.alertFilter = button.dataset.alertFilter;
      document.querySelectorAll('.alert-tab').forEach((tab) => tab.classList.toggle('active', tab === button));
      renderAlerts();
    });
  });

  document.getElementById('newNodeForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const id = document.getElementById('nodeIdInput').value.trim();
    const location = document.getElementById('locationInput').value.trim();
    if (!id || !location) return;
    const newNode = {
      id: id.toUpperCase(),
      label: location,
      location,
      status: 'normal',
      anomalyScore: 16,
      battery: '82%',
      sensorHealth: 'Good',
      connection: 'ONLINE',
      lastSync: 'Just now',
      lastUpdate: 'Just now',
      lastReadingAt: Date.now(),
      latitude: 19.1 + mockNodes.length * 0.01,
      longitude: 72.9 + mockNodes.length * 0.01,
      dataQuality: 'GOOD',
      failureMode: null,
      coords: { x: 180 + Math.random() * 400, y: 100 + Math.random() * 220 },
      readings: { tds: 310, turbidity: 2.9, temperature: 25.8, ph: 7.2, do: 8.1 },
      baseline: { tds: 310, turbidity: 2.9, temperature: 25.8, ph: 7.2, do: 8.1 },
      history: [290, 296, 301, 306, 310, 314, 310],
      sensors: {
        tds: { connected: true, status: 'CONNECTED', value: 310, unit: 'ppm', previous: 295, delta: 5.1 },
        turbidity: { connected: true, status: 'CONNECTED', value: 2.9, unit: 'NTU', previous: 2.7, delta: 7.4 },
        temperature: { connected: true, status: 'CONNECTED', value: 25.8, unit: '°C', previous: 25.1, delta: 2.8 },
        ph: { connected: true, status: 'SIMULATED', value: 7.2, unit: 'pH', previous: 7.2, delta: 0, history: makeRecentHistory(7.2, 'ph') },
        do: { connected: true, status: 'SIMULATED', value: 8.1, unit: 'mg/L', previous: 8.1, delta: 0, history: makeRecentHistory(8.1, 'do') }
      },
      activeAlert: false,
      alertState: 'RESOLVED',
      alerts: []
    };
    mockNodes.push(newNode);
    state.selectedNodeId = newNode.id;
    state.selectedDemoNodeId = newNode.id;
    state.selectedHealthNodeId = newNode.id;
    state.selectedCalibrationNodeId = newNode.id;
    newNode.sensors.tds.history = makeRecentHistory(newNode.readings.tds, 'tds');
    newNode.sensors.turbidity.history = makeRecentHistory(newNode.readings.turbidity, 'turbidity');
    newNode.sensors.temperature.history = makeRecentHistory(newNode.readings.temperature, 'temperature');
    Object.values(newNode.sensors).forEach((sensor) => {
      sensor.lastReadingAt = Date.now();
      sensor.lastCommunicationAt = Date.now();
    });
    syncNodeFields(newNode);
    addTimelineEvent(newNode, 'Monitoring node added', 'success');
    document.getElementById('newNodeForm').reset();
    persistSensorState();
    renderAll();
  });

  document.getElementById('settingsForm').addEventListener('submit', (event) => {
    event.preventDefault();
    state.settings = {
      tdsWarning: Number(document.getElementById('tdsWarning').value),
      turbidityWarning: Number(document.getElementById('turbidityWarning').value),
      temperatureWarning: Number(document.getElementById('temperatureWarning').value),
      refreshInterval: Number(document.getElementById('refreshInterval').value),
      tempUnit: document.getElementById('tempUnit').value,
      demoModeEnabled: document.getElementById('demoModeEnabled').checked,
      notificationsEnabled: document.getElementById('notificationsEnabled').checked,
      liveMode: state.settings.liveMode,
      voiceLanguage: state.settings.voiceLanguage,
      voiceRate: state.settings.voiceRate,
      voiceAutoIntro: document.getElementById('voiceAutoIntroSetting').checked,
      voiceDetailed: state.settings.voiceDetailed,
      voiceWelcomeSeen: state.settings.voiceWelcomeSeen
    };
    saveSettings();
    voiceGuide.refreshPreferences();
    sensorDataProvider.setMode(state.settings.demoModeEnabled ? 'DEMO' : 'HARDWARE');
    state.systemStatus = state.settings.demoModeEnabled ? 'DEMO MODE' : 'HARDWARE MODE · NOT CONNECTED';
    state.activeEvent = null;
    mockNodes.forEach((node) => {
      node.failureMode = null;
      node.connection = state.settings.demoModeEnabled ? 'ONLINE' : 'OFFLINE';
      node.dataQuality = state.settings.demoModeEnabled ? 'GOOD' : 'POOR';
      Object.entries(node.sensors).forEach(([key, sensor]) => {
        sensor.connected = state.settings.demoModeEnabled;
        sensor.status = state.settings.demoModeEnabled
          ? key === 'ph' || key === 'do' ? 'SIMULATED' : 'CONNECTED'
          : 'NOT CONNECTED';
        if (state.settings.demoModeEnabled) {
          sensor.value = node.baseline[key];
          sensor.history = makeRecentHistory(sensor.value, Object.keys(node.sensors).find((key) => node.sensors[key] === sensor));
          sensor.lastReadingAt = Date.now();
          sensor.lastCommunicationAt = Date.now();
        }
      });
      if (state.settings.demoModeEnabled) node.readings = { ...node.baseline };
      syncNodeFields(node);
    });
    addTimelineEvent(null, state.settings.demoModeEnabled ? 'Demo data provider enabled' : 'Hardware mode selected; no ESP32/API provider is connected', state.settings.demoModeEnabled ? 'info' : 'warning');
    persistSensorState();
    clearInterval(state.sensorTimer);
    state.sensorTimer = setInterval(advanceSensorEngine, Math.max(3, Number(state.settings.refreshInterval) || 4) * 1000);
    renderAll();
  });

  document.querySelectorAll('[data-close-modal]').forEach((trigger) => {
    trigger.addEventListener('click', closeNodeModal);
  });

  const closeSensorDrawerButton = document.getElementById('closeSensorDrawer');
  if (closeSensorDrawerButton) {
    closeSensorDrawerButton.addEventListener('click', closeSensorDrawer);
  }

  document.querySelectorAll('[data-close-wizard]').forEach((trigger) => {
    trigger.addEventListener('click', closeCalibrationWizard);
  });

  const exportButton = document.createElement('button');
  exportButton.textContent = 'Export CSV';
  exportButton.className = 'secondary-button';
  exportButton.addEventListener('click', exportCsv);

  const reportButton = document.createElement('button');
  reportButton.textContent = 'Generate Report';
  reportButton.className = 'primary-button';
  reportButton.addEventListener('click', generateReport);

  const actionsPanel = document.querySelector('#alerts .page-header');
  if (actionsPanel) {
    const area = document.createElement('div');
    area.className = 'alert-toolbar';
    area.append(exportButton, reportButton);
    actionsPanel.append(area);
  }
}

function renderAll() {
  renderOverview();
  renderMonitoring();
  renderMap();
  renderAnalysis();
  renderAlerts();
  renderNodes();
  renderHealth();
  renderCalibration();
  renderSettings();
  renderNotifications();
  renderTimeline();
  document.getElementById('sidebarSystemStatus').textContent = state.systemStatus;
  const modal = document.getElementById('nodeDetailModal');
  if (!modal.classList.contains('hidden') && state.detailNodeId) openNodeModal(state.detailNodeId);
}

function init() {
  initializeSensorEngine();
  state.selectedHealthNodeId = state.selectedNodeId;
  state.selectedCalibrationNodeId = state.selectedNodeId;
  state.selectedDemoNodeId = state.selectedDemoNodeId || state.selectedNodeId;
  sensorDataProvider.setMode(state.settings.demoModeEnabled ? 'DEMO' : 'HARDWARE');
  state.systemStatus = state.settings.demoModeEnabled ? 'DEMO MODE' : 'HARDWARE MODE · NOT CONNECTED';
  bindUI();
  setActivePage('overview');
  renderAll();
  state.sensorTimer = setInterval(advanceSensorEngine, Math.max(3, Number(state.settings.refreshInterval) || 4) * 1000);
}

init();
initializeThingSpeak();
