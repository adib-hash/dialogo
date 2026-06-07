// ── Dialogo card data ────────────────────────────────────────────────────────
// 50 cards across 8 categories, ordered by error frequency per:
// Cabrera Solano et al. (2014), Hasbún (2009), Hevia-Tuero et al. (2023)
// Swan & Smith, Learner English (Cambridge, 2001)

export const CARDS_DATA = [
  {
    category: "Verb Tenses",
    emoji: "⏱",
    description: "The #1 error category — 20% of all Spanish-interference mistakes",
    cards: [
      { id: "vt1", front: "I am here since three hours.", back_english: "I have been here for three hours.", wrong: "I am here for three hours.", back_spanish: "Llevo tres horas aquí.", explanation: "Spanish uses present tense + 'desde hace'; English needs present perfect + 'for'." },
      { id: "vt2", front: "She is working in this company since 2019.", back_english: "She has been working at this company since 2019.", wrong: "She is working at this company since 2019.", back_spanish: "Trabaja en esta empresa desde 2019.", explanation: "Ongoing duration from past to now needs present perfect continuous in English." },
      { id: "vt3", front: "Yesterday I have gone to the store.", back_english: "Yesterday I went to the store.", wrong: "Yesterday I had gone to the store.", back_spanish: "Ayer fui a la tienda.", explanation: "Finished time markers like 'yesterday' always require simple past, not present perfect." },
      { id: "vt4", front: "When I will arrive, I will call you.", back_english: "When I arrive, I will call you.", wrong: "When I will arrive, I am calling you.", back_spanish: "Cuando llegue, te llamaré.", explanation: "English uses present simple (not future) in time clauses after 'when', 'after', 'before'." },
      { id: "vt5", front: "I am wanting to learn English.", back_english: "I want to learn English.", wrong: "I am want to learn English.", back_spanish: "Quiero aprender inglés.", explanation: "Stative verbs (want, know, love, need, believe) don't use continuous tenses in English." },
      { id: "vt6", front: "He no come to class yesterday.", back_english: "He didn't come to class yesterday.", wrong: "He not come to class yesterday.", back_spanish: "No vino a clase ayer.", explanation: "Spanish has no 'do'-support; English requires 'did/didn't' for past negation and questions." },
      { id: "vt7", front: "She no like coffee.", back_english: "She doesn't like coffee.", wrong: "She not like coffee.", back_spanish: "A ella no le gusta el café.", explanation: "Third-person -s is mandatory in English; Spanish marks person on every verb so learners drop it." },
      { id: "vt8", front: "I can to speak English very well.", back_english: "I can speak English very well.", wrong: "I can to speaking English very well.", back_spanish: "Puedo hablar inglés muy bien.", explanation: "English modals (can, should, must, will) take a bare infinitive — never 'to'." },
      { id: "vt9", front: "If I would have more money, I would travel.", back_english: "If I had more money, I would travel.", wrong: "If I would have more money, I will travel.", back_spanish: "Si tuviera más dinero, viajaría.", explanation: "The Spanish past subjunctive maps to simple past in English 'if'-clauses, not 'would'." },
      { id: "vt10", front: "I am born in Mexico City.", back_english: "I was born in Mexico City.", wrong: "I have born in Mexico City.", back_spanish: "Nací en Ciudad de México.", explanation: "'Be born' is passive past in English; Spanish uses present 'ser' or simple preterite." },
    ],
  },
  {
    category: "Pronouns & Subjects",
    emoji: "👤",
    description: "The #2 error category — 16% of Spanish-interference mistakes",
    cards: [
      { id: "pr1", front: "Is raining outside right now.", back_english: "It is raining outside right now.", wrong: "Is it raining outside right now.", back_spanish: "Está lloviendo afuera.", explanation: "Spanish is 'pro-drop' — the verb encodes the subject. English always needs an explicit subject, including dummy 'it'." },
      { id: "pr2", front: "Is a big problem with the system.", back_english: "There is a big problem with the system.", wrong: "It is a big problem with the system.", back_spanish: "Hay un gran problema con el sistema.", explanation: "Spanish 'hay' has no overt subject. English needs existential 'there' to introduce new information." },
      { id: "pr3", front: "Listen me! I have something important to say.", back_english: "Listen to me! I have something important to say.", wrong: "Listen me to! I have something important to say.", back_spanish: "¡Escúchame! Tengo algo importante que decir.", explanation: "Spanish object clitics attach to the verb; English 'listen' requires the preposition 'to'." },
      { id: "pr4", front: "Maria left his jacket on the chair.", back_english: "Maria left her jacket on the chair.", wrong: "Maria left its jacket on the chair.", back_spanish: "María dejó su chaqueta en la silla.", explanation: "Spanish 'su' covers his/her/your/their. English possessives agree with the possessor's gender." },
      { id: "pr5", front: "She gave to me the keys before leaving.", back_english: "She gave me the keys before leaving.", wrong: "She gave to me the keys before to leave.", back_spanish: "Ella me dio las llaves antes de irse.", explanation: "Spanish requires 'a' before indirect objects; English uses the bare double-object construction." },
      { id: "pr6", front: "The friend that I told you about her called today.", back_english: "The friend I told you about called today.", wrong: "The friend whom I told you about her called today.", back_spanish: "La amiga de quien te hablé llamó hoy.", explanation: "Spanish often resumes a relative clause with a pronoun ('de ella'); English doesn't." },
    ],
  },
  {
    category: "Prepositions",
    emoji: "📍",
    description: "The #3 error category — 11% of Spanish-interference mistakes",
    cards: [
      { id: "pp1", front: "I'll see you in Monday at the office.", back_english: "I'll see you on Monday at the office.", wrong: "I'll see you at Monday at the office.", back_spanish: "Te veo el lunes en la oficina.", explanation: "English uses 'on' for days of the week. Spanish 'en' maps to both 'in' and 'on'." },
      { id: "pp2", front: "She has been married with him for ten years.", back_english: "She has been married to him for ten years.", wrong: "She has been married by him for ten years.", back_spanish: "Lleva diez años casada con él.", explanation: "'Married to' is the fixed English collocation; Spanish 'con' (with) doesn't transfer here." },
      { id: "pp3", front: "It depends of the weather that day.", back_english: "It depends on the weather that day.", wrong: "It depends from the weather that day.", back_spanish: "Depende del tiempo ese día.", explanation: "'Depend on' is a fixed English collocation; Spanish 'depender de' maps the wrong preposition." },
      { id: "pp4", front: "I arrived to Madrid very late at night.", back_english: "I arrived in Madrid very late at night.", wrong: "I arrived at Madrid very late at night.", back_spanish: "Llegué a Madrid muy tarde por la noche.", explanation: "Spanish 'a' covers both English 'in' (cities/countries) and 'at' (specific points like stations)." },
      { id: "pp5", front: "I was listening music while I cooked dinner.", back_english: "I was listening to music while I cooked dinner.", wrong: "I was listening at music while I cooked dinner.", back_spanish: "Estaba escuchando música mientras cocinaba.", explanation: "'Escuchar' needs no preposition in Spanish; English 'listen' always requires 'to'." },
      { id: "pp6", front: "Put the vegetables in the plate before serving.", back_english: "Put the vegetables on the plate before serving.", wrong: "Put the vegetables at the plate before serving.", back_spanish: "Pon las verduras en el plato antes de servir.", explanation: "Spanish 'en' maps to in/on/at. A surface like a plate requires 'on' in English." },
      { id: "pp7", front: "I think in you every single day.", back_english: "I think about you every single day.", wrong: "I think on you every single day.", back_spanish: "Pienso en ti todos los días.", explanation: "Spanish 'pensar en' doesn't transfer — English uses 'think about' or 'think of'." },
      { id: "pp8", front: "I'm very interested on learning photography.", back_english: "I'm very interested in learning photography.", wrong: "I'm very interested about learning photography.", back_spanish: "Estoy muy interesado en aprender fotografía.", explanation: "'Interested in' is a fixed dependent preposition in English, despite the similar Spanish 'en'." },
    ],
  },
  {
    category: "Articles & Determiners",
    emoji: "📖",
    description: "The #4 error category — overuse of articles accounts for up to 59% of article errors",
    cards: [
      { id: "ad1", front: "The life is very short, so enjoy it.", back_english: "Life is very short, so enjoy it.", wrong: "A life is very short, so enjoy it.", back_spanish: "La vida es muy corta, así que disfrútala.", explanation: "Spanish uses definite articles with abstract/generic nouns; English uses zero article for general reference." },
      { id: "ad2", front: "I really love the music from the 1970s.", back_english: "I really love music from the 1970s.", wrong: "I really love a music from the 1970s.", back_spanish: "Me encanta la música de los años 70.", explanation: "General likes and dislikes drop 'the' in English; Spanish always uses the article." },
      { id: "ad3", front: "She has always wanted to be the architect.", back_english: "She has always wanted to be an architect.", wrong: "She has always wanted to be the one architect.", back_spanish: "Siempre ha querido ser arquitecta.", explanation: "Spanish omits the article before professions ('soy médico'); English requires the indefinite 'a/an'." },
      { id: "ad4", front: "I've had the headache all morning.", back_english: "I've had a headache all morning.", wrong: "I've had headache all morning.", back_spanish: "He tenido dolor de cabeza toda la mañana.", explanation: "Countable singular ailments in English take the indefinite article 'a', not 'the'." },
      { id: "ad5", front: "The honesty is always the best policy.", back_english: "Honesty is always the best policy.", wrong: "An honesty is always the best policy.", back_spanish: "La honestidad es siempre la mejor política.", explanation: "Abstract concepts used as subjects drop 'the' in English, unlike Spanish." },
      { id: "ad6", front: "I play the football every Saturday morning.", back_english: "I play football every Saturday morning.", wrong: "I play a football every Saturday morning.", back_spanish: "Juego al fútbol cada sábado por la mañana.", explanation: "Spanish 'al' (a + el) prompts a definite article; English drops the article with most sports." },
      { id: "ad7", front: "She goes to the school by bus every day.", back_english: "She goes to school by bus every day.", wrong: "She goes to a school by bus every day.", back_spanish: "Va a la escuela en autobús todos los días.", explanation: "Functional institutions (school, work, church, bed, prison) take zero article in their generic role." },
      { id: "ad8", front: "He speaks the English and the French fluently.", back_english: "He speaks English and French fluently.", wrong: "He speaks an English and a French fluently.", back_spanish: "Habla el inglés y el francés con fluidez.", explanation: "Language names take zero article unless modified (e.g., 'the English of Shakespeare')." },
    ],
  },
  {
    category: "Word Order",
    emoji: "🔀",
    description: "The #5 error category — 9% of Spanish-interference mistakes",
    cards: [
      { id: "wo1", front: "She is a person very kind and generous.", back_english: "She is a very kind and generous person.", wrong: "She is a person very kind and very generous.", back_spanish: "Es una persona muy amable y generosa.", explanation: "Spanish places most descriptive adjectives after the noun; English places them before." },
      { id: "wo2", front: "Always I drink coffee before I start working.", back_english: "I always drink coffee before I start working.", wrong: "I drink coffee always before I start working.", back_spanish: "Siempre tomo café antes de empezar a trabajar.", explanation: "Frequency adverbs in English go between the subject and the main verb (or after 'be')." },
      { id: "wo3", front: "Tell me what time is it right now.", back_english: "Tell me what time it is right now.", wrong: "Tell me what is the time right now.", back_spanish: "Dime qué hora es ahora mismo.", explanation: "Embedded questions in English use statement word order (subject before verb), not question order." },
      { id: "wo4", front: "I bought a car red last weekend.", back_english: "I bought a red car last weekend.", wrong: "I bought a car of red color last weekend.", back_spanish: "Compré un coche rojo el fin de semana pasado.", explanation: "Spanish adjectives typically follow the noun; in English they always come before the noun." },
    ],
  },
  {
    category: "False Cognates",
    emoji: "🪤",
    description: "Lower frequency but highest social cost — these mistakes cause real embarrassment",
    cards: [
      { id: "fc1", front: "I can't believe she's embarrassed — she just told everyone!", back_english: "I can't believe she's pregnant — she just told everyone!", wrong: "I can't believe she's ashamed — she just told everyone!", back_spanish: "¡No puedo creer que esté embarazada — acaba de decírselo a todos!", explanation: "'Embarazada' means pregnant; 'embarrassed' means ashamed/awkward — the most famous false cognate." },
      { id: "fc2", front: "I assist to all my English classes without missing one.", back_english: "I attend all my English classes without missing one.", wrong: "I help to all my English classes without missing one.", back_spanish: "Asisto a todas mis clases de inglés sin faltar una.", explanation: "Spanish 'asistir a' means 'to attend'; English 'assist' means 'to help'." },
      { id: "fc3", front: "I'm going to realize my dream of living abroad.", back_english: "I'm going to fulfill my dream of living abroad.", wrong: "I'm going to complete my dream of living abroad.", back_spanish: "Voy a realizar mi sueño de vivir en el extranjero.", explanation: "Spanish 'realizar' means to carry out/achieve; English 'realize' means to become aware of something." },
      { id: "fc4", front: "Actually, I live in Barcelona, not Madrid.", back_english: "Currently, I live in Barcelona, not Madrid.", wrong: "In fact, I live in Barcelona, not Madrid.", back_spanish: "Actualmente vivo en Barcelona, no en Madrid.", explanation: "Spanish 'actualmente' means currently/nowadays; English 'actually' means in fact/surprisingly." },
      { id: "fc5", front: "I'm constipated — I've had this cold for a week.", back_english: "I have a cold — I've been sick for a week.", wrong: "I'm congested — I've had this cold for a week.", back_spanish: "Estoy constipado — llevo una semana con este resfriado.", explanation: "Spanish 'constipado' means having a cold; English 'constipated' refers to a digestive problem." },
      { id: "fc6", front: "My carpet is completely full of important documents.", back_english: "My folder is completely full of important documents.", wrong: "My rug is completely full of important documents.", back_spanish: "Mi carpeta está completamente llena de documentos importantes.", explanation: "Spanish 'carpeta' means folder/binder; English 'carpet' is a floor covering." },
      { id: "fc7", front: "Don't molest me while I'm trying to concentrate.", back_english: "Don't bother me while I'm trying to concentrate.", wrong: "Don't disturb to me while I'm trying to concentrate.", back_spanish: "No me molestes mientras intento concentrarme.", explanation: "Spanish 'molestar' means to bother/annoy; English 'molest' has a narrow, serious legal meaning." },
      { id: "fc8", front: "She is very sensible — she cries at everything.", back_english: "She is very sensitive — she cries at everything.", wrong: "She is very reasonable — she cries at everything.", back_spanish: "Es muy sensible — llora por todo.", explanation: "Spanish 'sensible' means sensitive/emotional; English 'sensible' means practical/reasonable." },
    ],
  },
  {
    category: "Idioms & Calques",
    emoji: "💬",
    description: "'Tener' and 'hacer' calques — direct translations that don't work in English",
    cards: [
      { id: "if1", front: "I have 28 years and I live in Guadalajara.", back_english: "I am 28 years old and I live in Guadalajara.", wrong: "I have 28 years old and I live in Guadalajara.", back_spanish: "Tengo 28 años y vivo en Guadalajara.", explanation: "Spanish uses 'tener' (to have) for age; English uses 'to be'. Never 'I have X years'." },
      { id: "if2", front: "I have a lot of hunger after that long walk.", back_english: "I am very hungry after that long walk.", wrong: "I have a lot of hungry after that long walk.", back_spanish: "Tengo mucha hambre después de ese largo paseo.", explanation: "Physical states (hungry, cold, hot, afraid, sleepy, thirsty) use 'to be' in English, not 'to have'." },
      { id: "if3", front: "Can you make me a favor and call him?", back_english: "Can you do me a favor and call him?", wrong: "Can you make to me a favor and call him?", back_spanish: "¿Puedes hacerme un favor y llamarle?", explanation: "'Hacer un favor' calques to 'do a favor' in English, never 'make a favor'." },
      { id: "if4", front: "How do you call this thing in English?", back_english: "What do you call this thing in English?", wrong: "How is called this thing in English?", back_spanish: "¿Cómo se llama esto en inglés?", explanation: "Spanish '¿cómo?' maps to English 'what?' when asking for names or labels, not 'how?'." },
      { id: "if5", front: "I'm agree with everything you just said.", back_english: "I agree with everything you just said.", wrong: "I am in agree with everything you just said.", back_spanish: "Estoy de acuerdo con todo lo que dijiste.", explanation: "Spanish 'estoy de acuerdo' uses an adjectival phrase; English 'agree' is a standalone verb." },
      { id: "if6", front: "She made a mistake and now she has reason.", back_english: "She made a mistake but now she is right.", wrong: "She made a mistake and now she has the reason.", back_spanish: "Cometió un error pero ahora tiene razón.", explanation: "'Tener razón' calques as 'to be right' in English. 'Have reason' is not natural English." },
    ],
  },
  {
    category: "Subject-Verb Agreement",
    emoji: "⚖️",
    description: "Errors driven by Spanish's different agreement rules for collective and indefinite nouns",
    cards: [
      { id: "sv1", front: "The people here is very friendly and welcoming.", back_english: "The people here are very friendly and welcoming.", wrong: "The people here be very friendly and welcoming.", back_spanish: "La gente aquí es muy amable y acogedora.", explanation: "Spanish 'gente' is grammatically singular; English 'people' is an irregular plural — always 'are'." },
      { id: "sv2", front: "Everybody have their own opinion on this topic.", back_english: "Everybody has their own opinion on this topic.", wrong: "Everybody have his own opinion on this topic.", back_spanish: "Todo el mundo tiene su propia opinión sobre este tema.", explanation: "'Everybody, everyone, somebody, nobody' are grammatically singular in English and take 'has'." },
      { id: "sv3", front: "There is many reasons to visit that city.", back_english: "There are many reasons to visit that city.", wrong: "There is a lot of reasons to visit that city.", back_spanish: "Hay muchas razones para visitar esa ciudad.", explanation: "Spanish 'hay' is invariant; English 'there is/are' must agree with the following noun." },
      { id: "sv4", front: "She don't know the answer to that question.", back_english: "She doesn't know the answer to that question.", wrong: "She not know the answer to that question.", back_spanish: "Ella no sabe la respuesta a esa pregunta.", explanation: "Third-person -s applies to the auxiliary 'do' too: 'she doesn't', never 'she don't'." },
    ],
  },
];

export const ALL_CARDS = CARDS_DATA.flatMap((cat) =>
  cat.cards.map((c) => ({ ...c, category: cat.category }))
);
