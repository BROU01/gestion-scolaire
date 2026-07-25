/* ============================================
   FT3 — Gestion Scolaire
   JavaScript Principal — app.js
   ============================================ */

/* --- Heroicons SVG Helpers --- */
var ICONS = {
  home: '<svg class="heroicon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v4.875h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/></svg>',
  academicCap: '<svg class="heroicon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"/></svg>',
  users: '<svg class="heroicon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"/></svg>',
  user: '<svg class="heroicon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"/></svg>',
  userGroup: '<svg class="heroicon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"/></svg>',
  buildingLibrary: '<svg class="heroicon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z"/></svg>',
  bookOpen: '<svg class="heroicon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"/></svg>',
  beaker: '<svg class="heroicon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"/></svg>',
  calendar: '<svg class="heroicon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"/></svg>',
  currencyDollar: '<svg class="heroicon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>',
  clock: '<svg class="heroicon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/></svg>',
  shieldCheck: '<svg class="heroicon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"/></svg>',
  shieldExclamation: '<svg class="heroicon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"/></svg>',
  exclamationTriangle: '<svg class="heroicon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"/></svg>',
  plus: '<svg class="heroicon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4.5v15m7.5-7.5h-15"/></svg>',
  pencil: '<svg class="heroicon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/></svg>',
  trash: '<svg class="heroicon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/></svg>',
  eye: '<svg class="heroicon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"/><path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg>',
  magnifyingGlass: '<svg class="heroicon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"/></svg>',
  xMark: '<svg class="heroicon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18 18 6M6 6l12 12"/></svg>',
  check: '<svg class="heroicon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m4.5 12.75 6 6 9-13.5"/></svg>',
  chevronRight: '<svg class="heroicon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m8.25 4.5 7.5 7.5-7.5 7.5"/></svg>',
  arrowsUpRight: '<svg class="heroicon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M13.5 6V4.5M13.5 4.5H18M13.5 4.5 4.5 13.5M10.5 19.5V21M10.5 21H6M10.5 21l9-9"/></svg>',
  sparkles: '<svg class="heroicon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>',
  flag: '<svg class="heroicon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 3v1.5M3 21v-6m0 0 2.77-.693a9 9 0 0 1 6.208.682l.108.054a9 9 0 0 0 6.086.71l3.114-.732a48.524 48.524 0 0 1-.005-10.499l-3.11.732a9 9 0 0 1-6.085-.711l-.108-.054a9 9 0 0 0-6.208-.682L3 4.5M3 15V4.5"/></svg>',
  ticket: '<svg class="heroicon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 0 1 0 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 0 1 0-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375Z"/></svg>',
  musicalNote: '<svg class="heroicon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 9 10.5-3m0 6.553v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 1 1-.99-3.467l2.31-.66a2.25 2.25 0 0 0 1.632-2.163Zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 0 1-1.632 2.163l-1.32.377a1.803 1.803 0 0 1-.99-3.467l2.31-.66A2.25 2.25 0 0 0 9 15.553Z"/></svg>',
  chartBar: '<svg class="heroicon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"/></svg>',
  globeAlt: '<svg class="heroicon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"/></svg>',
  heart: '<svg class="heroicon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/></svg>',
  arrowTrendingUp: '<svg class="heroicon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"/></svg>',
  arrowTrendingDown: '<svg class="heroicon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 6.43l.776 2.898m0 0 3.182-5.511m-3.182 5.51-5.511-3.181"/></svg>',
  noSymbol: '<svg class="heroicon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"/></svg>',
  academicCapSolid: '<svg class="heroicon" viewBox="0 0 24 24" fill="currentColor"><path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 45.055 45.055 0 0 0-9.192 0 2.25 2.25 0 0 1-1.337-1.337A60.588 60.588 0 0 1 11.7 2.805ZM11.8 4.75a56.013 56.013 0 0 0-9.033 1.106A2.25 2.25 0 0 0 1.152 8.33a60.37 60.37 0 0 0 9.287 12.933A60.644 60.644 0 0 0 11.8 4.75Zm-3.49 7.53a44.764 44.764 0 0 1 6.98 0 44.33 44.33 0 0 1 5.225-7.384 59.958 59.958 0 0 0-6.98-1.087 59.958 59.958 0 0 0-5.225 7.384ZM3.75 12a.75.75 0 0 1 .75-.75 60.46 60.46 0 0 1 12.75 0 .75.75 0 0 1-.75.75v3.29a.75.75 0 0 1-.364.647 60.63 60.63 0 0 1-12.022 0 .75.75 0 0 1-.364-.647V12Z"/></svg>',
  paintbrush: '<svg class="heroicon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42"/></svg>',
  clipboard: '<svg class="heroicon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z"/></svg>',
  calendarDays: '<svg class="heroicon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"/></svg>',
  cog: '<svg class="heroicon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 0 1 0 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 0 1 0-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281Z"/><path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/></svg>'
};

/* --- Données Mockées --- */
var MOCK = {
  academicYears: [
    { id: 1, label: '2025-2026', startYear: 2025, endYear: 2026, active: true },
    { id: 2, label: '2024-2025', startYear: 2024, endYear: 2025, active: false }
  ],
  filieres: [
    { id: 1, code: 'INFO', name: 'Informatique', description: 'Développement et systèmes', yearId: 1 },
    { id: 2, code: 'GEST', name: 'Gestion', description: 'Gestion des entreprises', yearId: 1 },
    { id: 3, code: 'COM', name: 'Commerce', description: 'Commerce international', yearId: 1 }
  ],
  specialites: [
    { id: 1, name: 'Développement Web', filiereId: 1 },
    { id: 2, name: 'Réseaux & Systèmes', filiereId: 1 },
    { id: 3, name: 'Finance', filiereId: 2 },
    { id: 4, name: 'Marketing Digital', filiereId: 3 }
  ],
  classes: [
    { id: 1, name: 'L3 INFO A', level: 'L3', filiereId: 1, specialiteId: 1, yearId: 1, capacity: 35 },
    { id: 2, name: 'L3 INFO B', level: 'L3', filiereId: 1, specialiteId: 2, yearId: 1, capacity: 30 },
    { id: 3, name: 'L3 GEST A', level: 'L3', filiereId: 2, specialiteId: 3, yearId: 1, capacity: 40 }
  ],
  students: [
    { id: 1, firstName: 'Jean', lastName: 'Martin', email: 'martin@ecole.fr', classId: 1, birthDate: '2003-05-12', phone: '06 12 34 56 78', parentId: 1 },
    { id: 2, firstName: 'Marie', lastName: 'Durand', email: 'durand@ecole.fr', classId: 1, birthDate: '2002-11-23', phone: '06 23 45 67 89', parentId: 2 },
    { id: 3, firstName: 'Pierre', lastName: 'Leroy', email: 'leroy@ecole.fr', classId: 1, birthDate: '2003-02-14', phone: '06 34 56 78 90', parentId: 3 },
    { id: 4, firstName: 'Sophie', lastName: 'Moreau', email: 'moreau@ecole.fr', classId: 2, birthDate: '2003-08-07', phone: '06 45 67 89 01', parentId: 1 },
    { id: 5, firstName: 'Lucas', lastName: 'Bernard', email: 'bernard@ecole.fr', classId: 2, birthDate: '2002-12-30', phone: '06 56 78 90 12', parentId: 2 },
    { id: 6, firstName: 'Emma', lastName: 'Petit', email: 'petit@ecole.fr', classId: 3, birthDate: '2003-04-18', phone: '06 67 89 01 23', parentId: 3 }
  ],
  teachers: [
    { id: 1, firstName: 'Jean-Pierre', lastName: 'Dupont', email: 'dupont@ecole.fr', phone: '06 11 22 33 44', hireDate: '2018-09-01', speciality: 'Développement Web' },
    { id: 2, firstName: 'Claire', lastName: 'Fontaine', email: 'fontaine@ecole.fr', phone: '06 22 33 44 55', hireDate: '2019-01-15', speciality: 'Réseaux' },
    { id: 3, firstName: 'Ahmed', lastName: 'Benali', email: 'benali@ecole.fr', phone: '06 33 44 55 66', hireDate: '2020-09-01', speciality: 'Finance' }
  ],
  parents: [
    { id: 1, firstName: 'Catherine', lastName: 'Martin', email: 'parent@ecole.fr', phone: '06 00 11 22 33', childrenIds: [1, 4] },
    { id: 2, firstName: 'Michel', lastName: 'Durand', email: 'durand.parent@ecole.fr', phone: '06 00 22 33 44', childrenIds: [2, 5] },
    { id: 3, firstName: 'Sophie', lastName: 'Leroy', email: 'leroy.parent@ecole.fr', phone: '06 00 33 44 55', childrenIds: [3, 6] }
  ],
  subjects: [
    { id: 1, name: 'HTML/CSS/JS', code: 'WEB101', credits: 6, teacherId: 1, classId: 1 },
    { id: 2, name: 'Base de données', code: 'DB201', credits: 5, teacherId: 2, classId: 1 },
    { id: 3, name: 'Node.js', code: 'WEB201', credits: 5, teacherId: 1, classId: 1 },
    { id: 4, name: 'Comptabilité', code: 'GES101', credits: 4, teacherId: 3, classId: 3 }
  ],
  grades: [
    { id: 1, studentId: 1, subjectId: 1, grade: 15, maxGrade: 20, type: 'interro', label: 'Interrogation 1', date: '2025-09-15' },
    { id: 2, studentId: 1, subjectId: 1, grade: 13, maxGrade: 20, type: 'devoir', label: 'DS 1', date: '2025-10-10' },
    { id: 3, studentId: 1, subjectId: 2, grade: 16, maxGrade: 20, type: 'partiel', label: 'Partiel S1', date: '2025-12-20' },
    { id: 4, studentId: 1, subjectId: 3, grade: 17, maxGrade: 20, type: 'interro', label: 'Interrogation 1', date: '2025-09-22' },
    { id: 5, studentId: 2, subjectId: 1, grade: 18, maxGrade: 20, type: 'interro', label: 'Interrogation 1', date: '2025-09-15' },
    { id: 6, studentId: 2, subjectId: 1, grade: 14, maxGrade: 20, type: 'devoir', label: 'DS 1', date: '2025-10-10' },
    { id: 7, studentId: 3, subjectId: 1, grade: 11, maxGrade: 20, type: 'interro', label: 'Interrogation 1', date: '2025-09-15' },
    { id: 8, studentId: 4, subjectId: 4, grade: 16, maxGrade: 20, type: 'devoir', label: 'DS 1', date: '2025-10-15' },
    { id: 9, studentId: 5, subjectId: 4, grade: 9, maxGrade: 20, type: 'partiel', label: 'Partiel S1', date: '2025-12-20' },
    { id: 10, studentId: 6, subjectId: 4, grade: 13, maxGrade: 20, type: 'interro', label: 'Interrogation 1', date: '2025-09-20' }
  ],
  absences: [
    { id: 1, studentId: 1, date: '2025-09-10', reason: 'Maladie', justified: true, type: 'absence' },
    { id: 2, studentId: 1, date: '2025-10-05', reason: '', justified: false, type: 'retard', duration: 15 },
    { id: 3, studentId: 2, date: '2025-09-22', reason: 'Rendez-vous médical', justified: true, type: 'absence' },
    { id: 4, studentId: 3, date: '2025-11-03', reason: '', justified: false, type: 'absence' },
    { id: 5, studentId: 3, date: '2025-11-10', reason: '', justified: false, type: 'retard', duration: 30 },
    { id: 6, studentId: 4, date: '2025-09-15', reason: 'Famille', justified: true, type: 'absence' },
    { id: 7, studentId: 5, date: '2025-10-20', reason: '', justified: false, type: 'absence' },
    { id: 8, studentId: 5, date: '2025-10-21', reason: '', justified: false, type: 'absence' }
  ],
  punitions: [
    { id: 1, studentId: 3, type: 'colle', description: 'Travail supplémentaire sur les exercises', hours: 2, date: '2025-10-15', teacherId: 1 },
    { id: 2, studentId: 5, type: 'punition', description: 'Comportement perturbateur en cours', date: '2025-11-02', teacherId: 2 },
    { id: 3, studentId: 3, type: 'colle', description: 'Non-respect des consignes', hours: 3, date: '2025-11-10', teacherId: 1 },
    { id: 4, studentId: 5, type: 'exclusion_temp', description: 'Insubordination', duration: '3 jours', date: '2025-11-15', teacherId: 2 }
  ],
  teacherAbsences: [
    { id: 1, teacherId: 1, date: '2025-10-10', reason: 'Formation', type: 'absence' },
    { id: 2, teacherId: 2, date: '2025-10-15', reason: '', type: 'retard', duration: 10 }
  ],
  bonusMalus: [
    { id: 1, studentId: 1, teacherId: 1, value: 2, reason: 'Excellent travail de groupe', date: '2025-10-20' },
    { id: 2, studentId: 3, teacherId: 1, value: -1, reason: 'Travail non rendu', date: '2025-11-05' },
    { id: 3, studentId: 5, teacherId: 2, value: -2, reason: 'Perturbation de classe', date: '2025-11-12' }
  ],
  calendar: [
    { id: 1, title: 'Rentrée universitaire', date: '2025-09-02', type: 'academic', endDate: '2025-09-02' },
    { id: 2, title: 'DS Groupe 1', date: '2025-10-10', type: 'academic', endDate: '2025-10-10' },
    { id: 3, title: 'Vacances de la Toussaint', date: '2025-10-18', type: 'holiday', endDate: '2025-11-03' },
    { id: 4, title: 'Fête de l\'école', date: '2025-11-15', type: 'cultural', endDate: '2025-11-15' },
    { id: 5, title: 'Tournoi sportif inter-écoles', date: '2025-11-22', type: 'sport', endDate: '2025-11-23' },
    { id: 6, title: 'Examens semestre 1', date: '2025-12-15', type: 'academic', endDate: '2025-12-20' },
    { id: 7, title: 'Vacances de Noël', date: '2025-12-21', type: 'holiday', endDate: '2026-01-05' },
    { id: 8, title: 'Concert de musique', date: '2026-01-20', type: 'cultural', endDate: '2026-01-20' },
    { id: 9, title: 'DS Groupe 2', date: '2026-02-10', type: 'academic', endDate: '2026-02-10' },
    { id: 10, title: 'Vacances d\'hiver', date: '2026-02-14', type: 'holiday', endDate: '2026-03-02' },
    { id: 11, title: 'Exposition artistique', date: '2026-03-10', type: 'cultural', endDate: '2026-03-12' },
    { id: 12, title: 'Examens semestre 2', date: '2026-05-25', type: 'academic', endDate: '2026-05-30' }
  ],
  activities: [
    { id: 1, name: 'Club Informatique', type: 'extrascolaire', description: 'Développement de projets web et mobile', schedule: 'Mercredi 14h-16h', maxStudents: 20, teacherId: 1, enrolled: [1, 2, 4] },
    { id: 2, name: 'Club de Musique', type: 'culturelle', description: 'Pratique instrumentale et chorale', schedule: 'Vendredi 16h-18h', maxStudents: 25, teacherId: 2, enrolled: [3, 5, 6] },
    { id: 3, name: 'Débat & Éloquence', type: 'culturelle', description: 'Art oratoire et argumentation', schedule: 'Jeudi 15h-17h', maxStudents: 15, teacherId: 3, enrolled: [1, 3] },
    { id: 4, name: 'Football', type: 'extrascolaire', description: 'Entraînement et matchs inter-écoles', schedule: 'Mardi & Jeudi 17h-18h30', maxStudents: 22, teacherId: 2, enrolled: [2, 4, 5] },
    { id: 5, name: 'Atelier Photo', type: 'culturelle', description: 'Prise de vue et retouche numérique', schedule: 'Lundi 16h-18h', maxStudents: 12, teacherId: 1, enrolled: [6] }
  ],
  scholarships: [
    { id: 1, country: 'Chine', flag: '🇨🇳', name: 'Bourse du Gouvernement Chinois (CSC)', eligibility: 'Bachelors ou Masters, <35 ans, bonne moyenne', deadline: 'Avril chaque année', amount: 'Frais de scolarité + allocation mensuelle (~800 USD)', process: 'Candidature en ligne via le site CSC, recommandation de l\'université d\'origine', url: 'https://www.csc.edu.cn' },
    { id: 2, country: 'Japon', flag: '🇯🇵', name: 'MEXT Scholarship', eligibility: '18-30 ans, bon dossier académique', deadline: 'Avril-Mai', amount: 'Frais de scolarité + allocation (117,000-145,000 JPY/mois)', process: 'Ambassade du Japon ou université japonaise', url: 'https://www.studyinjapan.go.jp' },
    { id: 3, country: 'Corée du Sud', flag: '🇰🇷', name: 'Korean Government Scholarship (KGSP)', eligibility: 'Bachelors ou Masters, GPA > 80%', deadline: 'Février-Mars', amount: 'Frais de scolarité + 900,000 KRW/mois', process: 'Ambassade de Corée ou institution coréenne', url: 'https://www.studyinkorea.go.kr' },
    { id: 4, country: 'Luxembourg', flag: '🇱🇺', name: 'Bourse OFPIL', eligibility: 'Étudiants étrangers,Master, <28 ans', deadline: 'Décembre', amount: '1,954 EUR/mois', process: 'Candidature via l\'université du Luxembourg', url: 'https://wwwfruni.lu' },
    { id: 5, country: 'Suède', flag: '🇸🇪', name: 'Swedish Institute Scholarships (SISS)', eligibility: 'Pays éligibles, experience professionnelle 3000h', deadline: 'Février', amount: 'Frais de vie + frais de scolarité + voyage', process: 'Via universités suédoises', url: 'https://si.se/en/apply/scholarships/' },
    { id: 6, country: 'Norvège', flag: '🇳🇴', name: 'Bourses Quota Scheme (NVH)', eligibility: 'Pays en développement,Master ou PhD', deadline: 'Décembre', amount: 'Frais de vie (~NOK 12,000/mois)', process: 'Via universités norvégiennes', url: 'https://www.studyinnorway.no' },
    { id: 7, country: 'Russie', flag: '🇷🇺', name: 'Bourse du Gouvernement Russe', eligibility: 'Bachelors ou Masters, <35 ans', deadline: 'Mars', amount: 'Frais de scolarité + allocation (~25,000 RUB/mois)', process: 'Ambassade de Russie ou Rossotrudnichestvo', url: 'https://rfauaa.org' },
    { id: 8, country: 'Biélorussie', flag: '🇧🇾', name: 'Bourse du Gouvernement de Biélorussie', eligibility: 'Bachelors ou Masters', deadline: 'Juillet', amount: 'Frais de scolarité + allocation', process: 'Ambassade de Biélorussie', url: 'http://www.education.gov.by' },
    { id: 9, country: 'Arabie Saoudite', flag: '🇸🇦', name: 'King Abdullah Scholarship (KAUST)', eligibility: 'Masters ou PhD, STEM', deadline: 'Janvier', amount: 'Frais complets + allocation mensuelle', process: 'Via KAUST ou ambassade', url: 'https://www.kaust.edu.sa' },
    { id: 10, country: 'Qatar', flag: '🇶🇦', name: 'Qatar University Scholarship', eligibility: 'Bachelors ou Masters, GPA > 2.5', deadline: 'Mars-Octobre', amount: 'Frais de scolarité + allocation + logement', process: 'Via Qatar University', url: 'https://www.qu.edu.qa' },
    { id: 11, country: 'Brunei', flag: '🇧🇳', name: 'Brunei Government Scholarship', eligibility: 'Moins de 28 ans, Bachelors ou Masters', deadline: 'Février', amount: 'Frais complets + BND 600/mois', process: 'Via ambassade ou université', url: 'https://www.moe.gov.bn' },
    { id: 12, country: 'Lettonie', flag: '🇱🇻', name: 'Latvia State Scholarships', eligibility: 'Masters ou PhD, échange', deadline: 'Avril', amount: '500-700 EUR/mois', process: 'Via Education Development Agency', url: 'https://www.viaa.gov.lv' },
    { id: 13, country: 'Estonie', flag: '🇪🇪', name: 'Estonian Government Scholarships', eligibility: 'Masters ou PhD', deadline: 'Mars', amount: 'Frais de vie + scolarité', process: 'Via Study in Estonia', url: 'https://studyinestonia.ee' },
    { id: 14, country: 'Moldavie', flag: '🇲🇩', name: 'Bourse du Gouvernement de Moldavie', eligibility: 'Bachelors ou Masters', deadline: 'Juillet', amount: 'Allocation mensuelle', process: 'Via ambassade', url: 'https://www.mecc.gov.md' },
    { id: 15, country: 'Mexique', flag: '🇲🇽', name: 'Bourse AMEXCID', eligibility: 'Masters ou PhD', deadline: 'Août', amount: 'Frais de vie + scolarité', process: 'Via ambassade du Mexique', url: 'https://www.gob.mx/amexcid' },
    { id: 16, country: 'Brésil', flag: '🇧🇷', name: 'Bourse CAPES/CSF', eligibility: 'Masters ou PhD, STEM', deadline: 'Octobre', amount: 'Allocation mensuelle + frais', process: 'Via CAPES', url: 'https://www.capes.gov.br' },
    { id: 17, country: 'Uruguay', flag: '🇺🇾', name: 'ANII Scholarships', eligibility: 'Masters ou PhD', deadline: 'Mai', amount: 'Allocation mensuelle', process: 'Via ANII', url: 'https://www.anii.uy' },
    { id: 18, country: 'Thaïlande', flag: '🇹🇭', name: 'Royal Thai Government Scholarship', eligibility: 'Masters ou PhD, STEM', deadline: 'Mars', amount: 'Frais complets + allocation', process: 'Via ambassade ou université', url: 'https://www.thaembassy.com' },
    { id: 19, country: 'Taïwan', flag: '🇹🇼', name: 'Taiwan Scholarship (MOFA)', eligibility: 'Bachelors, Masters, PhD', deadline: 'Mars', amount: 'NTD 40,000/mois + frais', process: 'Via ambassade de Taïwan', url: 'https://www.taiwanexperience.org.tw' },
    { id: 20, country: 'Grèce', flag: '🇬🇷', name: 'Greek State Scholarships (IKY)', eligibility: 'Masters ou PhD', deadline: 'Mai', amount: 'Allocation mensuelle + frais', process: 'Via IKY', url: 'https://www.iky.gr' },
    { id: 21, country: 'Turquie', flag: '🇹🇷', name: 'Türkiye Burslari', eligibility: '18-35 ans, tout niveau', deadline: 'Février', amount: 'Frais complets + allocation + logement', process: 'Via turkiyeburslari.gov.tr', url: 'https://www.turkiyeburslari.gov.tr' },
    { id: 22, country: 'Danemark', flag: '🇩🇰', name: 'Danish Government Scholarship', eligibility: 'Masters ou PhD', deadline: 'Janvier', amount: 'Frais de scolarité + allocation', process: 'Via universités danoises', url: 'https://studyindenmark.dk' },
    { id: 23, country: 'Roumanie', flag: '🇷🇴', name: 'Bourse du Gouvernement Roumain', eligibility: 'Bachelors, Masters, PhD', deadline: 'Juillet', amount: 'Allocation mensuelle ~65 EUR', process: 'Via ambassade ou MECTS', url: 'https://www.reci.edu.ro' },
    { id: 24, country: 'Lituanie', flag: '🇱🇹', name: 'Lithuanian Government Scholarships', eligibility: 'Masters ou PhD', deadline: 'Mai', amount: 'Allocation mensuelle', process: 'Via Study in Lithuania', url: 'https://studyin.lt' },
    { id: 25, country: 'Finlande', flag: '🇫🇮', name: 'Finland Scholarship (via universités)', eligibility: 'Masters, non-UE', deadline: 'Janvier', amount: 'Frais de scolarité réduits + allocation', process: 'Via universités finlandaises', url: 'https://www.studyinfinland.fi' },
    { id: 26, country: 'Écosse', flag: '🏴\u200d☠️', name: 'Scotland\'s Saltire Scholarships', eligibility: 'Masters, pays éligibles', deadline: 'Mai', amount: '£8,000', process: 'Via universités écossaises', url: 'https://www.studyscotland.ac.uk' },
    { id: 27, country: 'Belgique', flag: '🇧🇪', name: 'ARES Scholarships', eligibility: 'Masters, pays en développement', deadline: 'Janvier', amount: 'Frais complets + allocation', process: 'Via ARES', url: 'https://www.ares-ac.be' },
    { id: 28, country: 'Allemagne', flag: '🇩🇪', name: 'DAAD Scholarships', eligibility: 'Tous niveaux, tout domaine', deadline: 'Octobre', amount: 'Allocation mensuelle + frais', process: 'Via DAAD', url: 'https://www.daad.de' }
  ]
};

/* --- État de l'application --- */
var APP = {
  role: null,
  view: 'dashboard',
  session: null,
  editingEntity: null,
  nextId: 100
};

/* ============================================
   INIT
   ============================================ */
document.addEventListener('DOMContentLoaded', function() {
  var raw = localStorage.getItem('ecole_session');
  if (!raw) { window.location.href = '../public/login.html'; return; }
  APP.session = JSON.parse(raw);
  APP.role = APP.session.role;

  buildSidebar();
  bindEvents();
  navigateTo('dashboard');
});

/* --- Logout --- */
function logout() {
  localStorage.removeItem('ecole_session');
  window.location.href = '../public/login.html';
}

/* --- Events --- */
function bindEvents() {
  document.getElementById('menuToggle').addEventListener('click', toggleSidebar);
  document.getElementById('sidebarOverlay').addEventListener('click', closeSidebar);
  document.getElementById('btnLogout').addEventListener('click', logout);

  document.getElementById('modalOverlay').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
  });
  document.getElementById('confirmOverlay').addEventListener('click', function(e) {
    if (e.target === this) closeConfirm();
  });
}

/* --- Sidebar --- */
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('open');
  document.getElementById('sidebarOverlay').classList.toggle('active');
}
function closeSidebar() {
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('active');
}

/* ============================================
   SIDEBAR NAVIGATION
   ============================================ */
function buildSidebar() {
  var nav = document.getElementById('sidebarNav');
  var role = APP.role;

  document.getElementById('userName').textContent = APP.session.name;
  document.getElementById('userAvatar').textContent = APP.session.name.charAt(0).toUpperCase();
  var roleLabels = { admin: 'Administrateur', teacher: 'Enseignant', student: 'Étudiant', parent: 'Parent' };
  document.getElementById('userRole').textContent = roleLabels[role] || role;
  document.getElementById('sidebarRoleBadge').textContent = roleLabels[role] || role;

  var sections = getMenuSections(role);
  var html = '';
  sections.forEach(function(s) {
    html += '<div class="nav-section-title">' + s.title + '</div>';
    s.items.forEach(function(item) {
      html += '<div class="nav-item" data-view="' + item.view + '">'
        + '<span class="nav-icon">' + item.icon + '</span>'
        + '<span class="nav-label">' + item.label + '</span>'
        + '</div>';
    });
  });
  nav.innerHTML = html;

  nav.querySelectorAll('.nav-item').forEach(function(el) {
    el.addEventListener('click', function() {
      navigateTo(this.dataset.view);
      closeSidebar();
    });
  });
}

function getMenuSections(role) {
  var i = ICONS;
  if (role === 'admin') return [
    { title: 'Principal', items: [
      { view: 'dashboard', icon: i.home, label: 'Tableau de bord' }
    ]},
    { title: 'Administration', items: [
      { view: 'years', icon: i.calendar, label: 'Années académiques' },
      { view: 'filieres', icon: i.academicCap, label: 'Filières' },
      { view: 'specialites', icon: i.beaker, label: 'Spécialités' },
      { view: 'classes', icon: i.buildingLibrary, label: 'Classes' },
      { view: 'students', icon: i.userGroup, label: 'Étudiants' },
      { view: 'teachers', icon: i.users, label: 'Enseignants' },
      { view: 'subjects', icon: i.bookOpen, label: 'Matières' }
    ]},
    { title: 'Discipline & Assiduité', items: [
      { view: 'absences', icon: i.clock, label: 'Absences & Retards' },
      { view: 'punishments', icon: i.shieldExclamation, label: 'Punitions' }
    ]},
    { title: 'Activités', items: [
      { view: 'activities', icon: i.musicalNote, label: 'Activités' },
      { view: 'calendar-view', icon: i.calendar, label: 'Calendrier' }
    ]},
    { title: 'Ressources', items: [
      { view: 'scholarships', icon: i.globeAlt, label: 'Bourses d\'études' }
    ]},
    { title: 'Site Public', items: [
      { view: 'theme', icon: i.paintbrush, label: 'Personnalisation' },
      { view: 'candidates', icon: i.clipboard, label: 'Candidatures' },
      { view: 'appointments', icon: i.calendarDays, label: 'Rendez-vous' },
      { view: 'site-editor', icon: i.paintbrush, label: 'Éditeur site' }
    ]}
  ];

  if (role === 'teacher') return [
    { title: 'Principal', items: [
      { view: 'dashboard', icon: i.home, label: 'Tableau de bord' }
    ]},
    { title: 'Enseignement', items: [
      { view: 'my-classes', icon: i.buildingLibrary, label: 'Mes classes' },
      { view: 'my-students', icon: i.userGroup, label: 'Mes étudiants' },
      { view: 'my-subjects', icon: i.bookOpen, label: 'Mes matières' },
      { view: 'grades', icon: i.chartBar, label: 'Notes' },
      { view: 'bonus-malus', icon: i.sparkles, label: 'Bonus / Malus' }
    ]},
    { title: 'Assiduité', items: [
      { view: 'teacher-absences', icon: i.clock, label: 'Mes absences' },
      { view: 'teacher-punish', icon: i.shieldExclamation, label: 'Punitions données' }
    ]},
    { title: 'Ressources', items: [
      { view: 'calendar-view', icon: i.calendar, label: 'Calendrier' },
      { view: 'activities', icon: i.musicalNote, label: 'Activités' }
    ]}
  ];

  if (role === 'student') return [
    { title: 'Principal', items: [
      { view: 'dashboard', icon: i.home, label: 'Tableau de bord' }
    ]},
    { title: 'Mon espace', items: [
      { view: 'my-profile', icon: i.user, label: 'Mon profil' },
      { view: 'my-filiere', icon: i.academicCap, label: 'Ma filière' },
      { view: 'my-class-student', icon: i.buildingLibrary, label: 'Ma classe' },
      { view: 'my-subjects-student', icon: i.bookOpen, label: 'Mes matières' },
      { view: 'my-grades', icon: i.chartBar, label: 'Mes notes' },
      { view: 'my-exams', icon: i.academicCap, label: 'Mes examens' }
    ]},
    { title: 'Discipline', items: [
      { view: 'my-record', icon: i.shieldCheck, label: 'Mon casier' },
      { view: 'my-attendance', icon: i.clock, label: 'Mes absences' }
    ]},
    { title: 'Vie scolaire', items: [
      { view: 'calendar-view', icon: i.calendar, label: 'Calendrier' },
      { view: 'activities', icon: i.musicalNote, label: 'Activités' }
    ]}
  ];

  if (role === 'parent') return [
    { title: 'Principal', items: [
      { view: 'dashboard', icon: i.home, label: 'Tableau de bord' }
    ]},
    { title: 'Mon enfant', items: [
      { view: 'child-profile', icon: i.user, label: 'Profil' },
      { view: 'child-grades', icon: i.chartBar, label: 'Notes' },
      { view: 'child-attendance', icon: i.clock, label: 'Absences & Retards' },
      { view: 'child-record', icon: i.shieldCheck, label: 'Comportement' }
    ]},
    { title: 'Ressources', items: [
      { view: 'calendar-view', icon: i.calendar, label: 'Calendrier' },
      { view: 'scholarships', icon: i.globeAlt, label: 'Bourses d\'études' }
    ]}
  ];

  return [];
}

/* ============================================
   ROUTING
   ============================================ */
var TITLES = {
  'dashboard': 'Tableau de bord',
  'years': 'Années académiques', 'filieres': 'Filières', 'specialites': 'Spécialités',
  'classes': 'Classes', 'students': 'Étudiants', 'teachers': 'Enseignants', 'subjects': 'Matières',
  'absences': 'Absences & Retards', 'punishments': 'Punitions',
  'my-classes': 'Mes classes', 'my-students': 'Mes étudiants', 'my-subjects': 'Mes matières',
  'grades': 'Gestion des notes', 'bonus-malus': 'Bonus / Malus',
  'teacher-absences': 'Mes absences', 'teacher-punish': 'Punitions données',
  'my-profile': 'Mon profil', 'my-filiere': 'Ma filière',
  'my-class-student': 'Ma classe', 'my-subjects-student': 'Mes matières',
  'my-grades': 'Mes notes', 'my-record': 'Mon casier', 'my-attendance': 'Mes absences',
  'child-profile': 'Profil de mon enfant', 'child-grades': 'Notes de mon enfant',
  'child-attendance': 'Absences & Retards', 'child-record': 'Comportement',
  'activities': 'Activités', 'calendar-view': 'Calendrier académique',
  'my-exams': 'Mes examens', 'site-editor': 'Personnalisation du site',
  'scholarships': 'Bourses d\'études internationales'
};

function navigateTo(view) {
  APP.view = view;
  document.querySelectorAll('.nav-item').forEach(function(el) {
    el.classList.toggle('active', el.dataset.view === view);
  });
  document.getElementById('pageTitle').textContent = TITLES[view] || view;
  document.getElementById('headerActions').innerHTML = '';
  renderView(view);
}

function renderView(view) {
  var b = document.getElementById('contentBody');
  switch(view) {
    /* Admin CRUD */
    case 'dashboard': renderDashboard(b); break;
    case 'years': renderCrud(b, 'academicYears', 'Année académique', yearCols(), yearForm()); break;
    case 'filieres': renderCrud(b, 'filieres', 'Filière', filiereCols(), filiereForm()); break;
    case 'specialites': renderCrud(b, 'specialites', 'Spécialité', specCols(), specForm()); break;
    case 'classes': renderCrud(b, 'classes', 'Classe', classCols(), classForm()); break;
    case 'students': renderCrud(b, 'students', 'Étudiant', studentCols(), studentForm()); break;
    case 'teachers': renderCrud(b, 'teachers', 'Enseignant', teacherCols(), teacherForm()); break;
    case 'subjects': renderCrud(b, 'subjects', 'Matière', subjectCols(), subjectForm()); break;
    case 'absences': renderAbsences(b); break;
    case 'punishments': renderPunishments(b); break;
    /* Teacher */
    case 'my-classes': renderTeacherClasses(b); break;
    case 'my-students': renderTeacherStudents(b); break;
    case 'my-subjects': renderTeacherSubjects(b); break;
    case 'grades': renderGrades(b); break;
    case 'bonus-malus': renderBonusMalus(b); break;
    case 'teacher-absences': renderTeacherAbsences(b); break;
    case 'teacher-punish': renderTeacherPunishments(b); break;
    /* Student */
    case 'my-profile': renderStudentProfile(b); break;
    case 'my-filiere': renderStudentFiliere(b); break;
    case 'my-class-student': renderStudentClass(b); break;
    case 'my-subjects-student': renderStudentSubjects(b); break;
    case 'my-grades': renderStudentGrades(b); break;
    case 'my-record': renderStudentRecord(b); break;
    case 'my-attendance': renderStudentAttendance(b); break;
    /* Parent */
    case 'child-profile': renderParentProfile(b); break;
    case 'child-grades': renderParentGrades(b); break;
    case 'child-attendance': renderParentAttendance(b); break;
    case 'child-record': renderParentRecord(b); break;
    /* Shared */
    case 'activities': renderActivities(b); break;
    case 'calendar-view': renderCalendar(b); break;
    case 'my-exams': renderMyExams(b); break;
    case 'site-editor': renderSiteEditor(b); break;
    case 'scholarships': renderScholarships(b); break;
    case 'theme': if (APP.role !== 'admin') { showToast('Accès réservé à l\'administration.', 'error'); renderDashboard(b); break; } renderThemeSettings(b); break;
    case 'candidates': if (APP.role !== 'admin') { showToast('Accès réservé à l\'administration.', 'error'); renderDashboard(b); break; } renderCandidates(b); break;
    case 'appointments': if (APP.role !== 'admin') { showToast('Accès réservé à l\'administration.', 'error'); renderDashboard(b); break; } renderAppointments(b); break;
    default: renderDashboard(b);
  }
}

/* ============================================
   HELPER: find, lookup, grade badge
   ============================================ */
function findById(arr, id) {
  for (var i = 0; i < arr.length; i++) { if (arr[i].id === id) return arr[i]; }
  return null;
}
function findIndex(arr, id) {
  for (var i = 0; i < arr.length; i++) { if (arr[i].id === id) return i; }
  return -1;
}
function gradeBadge(g) {
  var cls = g >= 14 ? 'badge-success' : g >= 10 ? 'badge-warning' : 'badge-danger';
  return '<span class="badge ' + cls + '">' + g + '/20</span>';
}
function typeName(type) {
  var m = { interro: 'Interrogation', devoir: 'Devoir', partiel: 'Partiel' };
  return m[type] || type;
}
function punTypeLabel(type) {
  var m = { colle: 'Heure de colle', punition: 'Punition', exclusion_temp: 'Exclusion temp.', exclusion_def: 'Exclusion définitive' };
  return m[type] || type;
}

/* ============================================
   DASHBOARD
   ============================================ */
function renderDashboard(c) {
  if (APP.role === 'admin') renderAdminDash(c);
  else if (APP.role === 'teacher') renderTeacherDash(c);
  else if (APP.role === 'student') renderStudentDash(c);
  else renderParentDash(c);
}

function renderAdminDash(c) {
  var d = MOCK;
  var avg = d.grades.length ? (d.grades.reduce(function(s,g){return s+g.grade;},0)/d.grades.length).toFixed(1) : '0';
  var totalAbs = d.absences.filter(function(a){return a.type==='absence';}).length;
  var totalRetards = d.absences.filter(function(a){return a.type==='retard';}).length;

  c.innerHTML = ''
    + '<div class="stats-grid">'
    + statCard(ICONS.userGroup, 'Étudiants', d.students.length, 'success')
    + statCard(ICONS.users, 'Enseignants', d.teachers.length, 'info')
    + statCard(ICONS.buildingLibrary, 'Classes', d.classes.length, 'primary')
    + statCard(ICONS.chartBar, 'Moyenne générale', avg + '/20', 'warning')
    + '</div>'
    + '<div class="stats-grid">'
    + statCard(ICONS.clock, 'Retards', totalRetards, 'warning')
    + statCard(ICONS.noSymbol, 'Absences', totalAbs, 'danger')
    + statCard(ICONS.shieldExclamation, 'Punitions', d.punitions.length, 'danger')
    + statCard(ICONS.musicalNote, 'Activités', d.activities.length, 'info')
    + '</div>'
    + '<div class="grid-2col">'
    + '<div class="card"><div class="card-header"><h3>Dernières notes</h3></div><div class="card-body">' + recentGradesTable() + '</div></div>'
    + '<div class="card"><div class="card-header"><h3>Année en cours</h3></div><div class="card-body">' + currentYearInfo() + '</div></div>'
    + '</div>'
    + '<!-- Flags Section -->'
    + '<div class="card mt-3"><div class="card-header"><h3>' + ICONS.globeAlt + ' Bourses internationales — 25+ pays</h3></div><div class="card-body">'
    + '<div class="admin-flags-row">'
    + '<a href="#" onclick="renderView(\'scholarships\');return false;" class="admin-flag-item" title="Chine">🇨🇳<span>Chine</span></a>'
    + '<a href="#" onclick="renderView(\'scholarships\');return false;" class="admin-flag-item" title="Japon">🇯🇵<span>Japon</span></a>'
    + '<a href="#" onclick="renderView(\'scholarships\');return false;" class="admin-flag-item" title="Corée">🇰🇷<span>Corée</span></a>'
    + '<a href="#" onclick="renderView(\'scholarships\');return false;" class="admin-flag-item" title="Luxembourg">🇱🇺<span>Luxembourg</span></a>'
    + '<a href="#" onclick="renderView(\'scholarships\');return false;" class="admin-flag-item" title="Suède">🇸🇪<span>Suède</span></a>'
    + '<a href="#" onclick="renderView(\'scholarships\');return false;" class="admin-flag-item" title="Norvège">🇳🇴<span>Norvège</span></a>'
    + '<a href="#" onclick="renderView(\'scholarships\');return false;" class="admin-flag-item" title="Allemagne">🇩🇪<span>Allemagne</span></a>'
    + '<a href="#" onclick="renderView(\'scholarships\');return false;" class="admin-flag-item" title="Turquie">🇹🇷<span>Turquie</span></a>'
    + '<a href="#" onclick="renderView(\'scholarships\');return false;" class="admin-flag-item" title="Arabie Saoudite">🇸🇦<span>Arabie</span></a>'
    + '<a href="#" onclick="renderView(\'scholarships\');return false;" class="admin-flag-item" title="Qatar">🇶🇦<span>Qatar</span></a>'
    + '<a href="#" onclick="renderView(\'scholarships\');return false;" class="admin-flag-item" title="Brésil">🇧🇷<span>Brésil</span></a>'
    + '<a href="#" onclick="renderView(\'scholarships\');return false;" class="admin-flag-item" title="Mexique">🇲🇽<span>Mexique</span></a>'
    + '<a href="#" onclick="renderView(\'scholarships\');return false;" class="admin-flag-item" title="Russie">🇷🇺<span>Russie</span></a>'
    + '<a href="#" onclick="renderView(\'scholarships\');return false;" class="admin-flag-item" title="Finlande">🇫🇮<span>Finlande</span></a>'
    + '<a href="#" onclick="renderView(\'scholarships\');return false;" class="admin-flag-item" title="Danemark">🇩🇰<span>Danemark</span></a>'
    + '<a href="#" onclick="renderView(\'scholarships\');return false;" class="admin-flag-item" title="Thaïlande">🇹🇭<span>Thaïlande</span></a>'
    + '<a href="#" onclick="renderView(\'scholarships\');return false;" class="admin-flag-item" title="Taïwan">🇹🇼<span>Taïwan</span></a>'
    + '<a href="#" onclick="renderView(\'scholarships\');return false;" class="admin-flag-item" title="Écosse">🏴󠁧󠁢󠁳󠁣󠁴󠁿<span>Écosse</span></a>'
    + '<a href="#" onclick="renderView(\'scholarships\');return false;" class="admin-flag-item" title="Estonie">🇪🇪<span>Estonie</span></a>'
    + '<a href="#" onclick="renderView(\'scholarships\');return false;" class="admin-flag-item" title="Brunei">🇧🇳<span>Brunei</span></a>'
    + '</div>'
    + '<div style="margin-top:12px;font-size:0.75rem;color:var(--text-muted);text-align:center;">'
    + ICONS.globeAlt + ' Cliquez sur un drapeau pour voir les détails de la bourse'
    + '</div></div></div>';
}

function renderTeacherDash(c) {
  var tid = 1;
  var mySubs = MOCK.subjects.filter(function(s){return s.teacherId===tid;});
  var myClassIds = mySubs.map(function(s){return s.classId;});
  var myStuds = MOCK.students.filter(function(s){return myClassIds.indexOf(s.classId)!==-1;});
  var myPunish = MOCK.punitions.filter(function(p){var st = findById(MOCK.students,p.studentId); return st && myClassIds.indexOf(st.classId)!==-1;});

  c.innerHTML = ''
    + '<div class="stats-grid">'
    + statCard(ICONS.bookOpen, 'Matières', mySubs.length, 'primary')
    + statCard(ICONS.userGroup, 'Étudiants', myStuds.length, 'success')
    + statCard(ICONS.buildingLibrary, 'Classes', myClassIds.length, 'info')
    + statCard(ICONS.shieldExclamation, 'Punitions données', myPunish.length, 'danger')
    + '</div>'
    + '<div class="card">'
    + '<div class="card-header"><h3>Actions rapides</h3></div>'
    + '<div class="card-body"><div class="quick-actions">'
    + quickAction(ICONS.chartBar, 'Saisir les notes', 'grades')
    + quickAction(ICONS.userGroup, 'Mes étudiants', 'my-students')
    + quickAction(ICONS.bookOpen, 'Mes matières', 'my-subjects')
    + quickAction(ICONS.sparkles, 'Bonus / Malus', 'bonus-malus')
    + '</div></div></div>';
}

function renderStudentDash(c) {
  var sid = 1;
  var s = findById(MOCK.students, sid);
  var sg = MOCK.grades.filter(function(g){return g.studentId===sid;});
  var avg = sg.length ? (sg.reduce(function(a,g){return a+g.grade;},0)/sg.length).toFixed(1) : '0';
  var cls = findById(MOCK.classes, s.classId);
  var fil = cls ? findById(MOCK.filieres, cls.filiereId) : null;
  var absCount = MOCK.absences.filter(function(a){return a.studentId===sid && a.type==='absence';}).length;
  var retardCount = MOCK.absences.filter(function(a){return a.studentId===sid && a.type==='retard';}).length;

  c.innerHTML = ''
    + '<div class="stats-grid">'
    + statCard(ICONS.chartBar, 'Moyenne', avg + '/20', avg>=14?'success':avg>=10?'warning':'danger')
    + statCard(ICONS.bookOpen, 'Notes obtenues', sg.length, 'info')
    + statCard(ICONS.noSymbol, 'Absences', absCount, 'danger')
    + statCard(ICONS.clock, 'Retards', retardCount, 'warning')
    + '</div>'
    + '<div class="grid-2col">'
    + '<div class="card"><div class="card-header"><h3>Mon profil</h3></div><div class="card-body">'
    + '<p><strong>' + s.firstName + ' ' + s.lastName + '</strong></p>'
    + '<p class="text-muted">' + s.email + '</p>'
    + '<p class="text-muted">' + (cls ? cls.name : '-') + ' — ' + (fil ? fil.name : '-') + '</p>'
    + '</div></div>'
    + '<div class="card"><div class="card-header"><h3>Dernières notes</h3></div><div class="card-body">'
    + studentRecentGrades(sid)
    + '</div></div>'
    + '</div>';
}

function renderParentDash(c) {
  var pid = APP.session.email === 'parent@ecole.fr' ? 1 : (APP.session.email === 'durand.parent@ecole.fr' ? 2 : 3);
  var parent = findById(MOCK.parents, pid);
  var children = parent.childrenIds.map(function(id){return findById(MOCK.students, id);}).filter(Boolean);

  var html = '<h2 class="mb-3">Mes enfants</h2><div class="grid-2col">';
  children.forEach(function(s) {
    var sg = MOCK.grades.filter(function(g){return g.studentId===s.id;});
    var avg = sg.length ? (sg.reduce(function(a,g){return a+g.grade;},0)/sg.length).toFixed(1) : '—';
    var cls = findById(MOCK.classes, s.classId);
    html += '<div class="card"><div class="card-body">'
      + '<div class="profile-card profile-card-compact">'
      + '<div class="profile-avatar profile-avatar-sm"><span class="heroicon-lg">' + ICONS.user + '</span></div>'
      + '<div class="profile-info"><h2 class="profile-name-sm">' + s.firstName + ' ' + s.lastName + '</h2>'
      + '<div class="profile-meta"><span class="profile-meta-item">' + ICONS.buildingLibrary + ' ' + (cls ? cls.name : '-') + '</span>'
      + '<span class="profile-meta-item">' + ICONS.chartBar + ' Moy: ' + avg + '/20</span></div>'
      + '</div></div>'
      + '<div class="mt-2"><div class="quick-actions">'
      + '<button class="quick-action-btn" onclick="navigateTo(\'child-grades\')"><span>' + ICONS.chartBar + '</span><span>Notes</span></button>'
      + '<button class="quick-action-btn" onclick="navigateTo(\'child-attendance\')"><span>' + ICONS.clock + '</span><span>Absences</span></button>'
      + '<button class="quick-action-btn" onclick="navigateTo(\'child-record\')"><span>' + ICONS.shieldCheck + '</span><span>Comportement</span></button>'
      + '</div></div></div></div>';
  });
  html += '</div>';
  c.innerHTML = html;
}

/* Stat card helper */
function statCard(icon, label, value, color) {
  return '<div class="stat-card"><div class="stat-icon ' + color + '">' + icon + '</div>'
    + '<div class="stat-info"><h4>' + value + '</h4><p>' + label + '</p></div></div>';
}
function quickAction(icon, label, view) {
  return '<button class="quick-action-btn" onclick="navigateTo(\'' + view + '\')">'
    + '<span>' + icon + '</span><span>' + label + '</span></button>';
}

function recentGradesTable() {
  var g = MOCK.grades.slice(-5).reverse();
  if (!g.length) return '<p class="text-muted">Aucune note.</p>';
  var h = '<table class="table"><thead><tr><th>Étudiant</th><th>Matière</th><th>Note</th></tr></thead><tbody>';
  g.forEach(function(r) {
    var st = findById(MOCK.students, r.studentId);
    var sub = findById(MOCK.subjects, r.subjectId);
    h += '<tr><td>' + (st ? st.firstName + ' ' + st.lastName : '-') + '</td><td>' + (sub ? sub.name : '-') + '</td><td>' + gradeBadge(r.grade) + '</td></tr>';
  });
  return h + '</tbody></table>';
}

function currentYearInfo() {
  var y = MOCK.academicYears.find(function(y){return y.active;});
  if (!y) return '<p class="text-muted">Aucune année active.</p>';
  return '<div class="text-center p-lg">'
    + '<div class="year-label">' + y.label + '</div>'
    + '<p class="text-muted">Année académique en cours</p>'
    + '<span class="badge badge-success mt-1">Active</span></div>';
}

function studentRecentGrades(sid) {
  var g = MOCK.grades.filter(function(r){return r.studentId===sid;}).slice(-5).reverse();
  if (!g.length) return '<p class="text-muted">Aucune note.</p>';
  var h = '';
  g.forEach(function(r) {
    var sub = findById(MOCK.subjects, r.subjectId);
    h += '<div class="list-item"><span>' + (sub ? sub.name : '-') + ' <span class="text-muted text-xs">' + typeName(r.type) + '</span></span><span class="ml-auto">' + gradeBadge(r.grade) + '</span></div>';
  });
  return h;
}

/* ============================================
   GENERIC CRUD
   ============================================ */
function renderCrud(c, dataKey, label, cols, formFields) {
  var data = MOCK[dataKey];
  var searchId = 'search-' + dataKey;

  document.getElementById('headerActions').innerHTML =
    '<button class="btn btn-primary" onclick="openAddModal(\'' + dataKey + '\',\'' + label + '\')">' + ICONS.plus + ' Ajouter</button>';

  var html = '<div class="toolbar"><div class="search-box"><span class="search-icon">' + ICONS.magnifyingGlass + '</span>'
    + '<input type="text" id="' + searchId + '" placeholder="Rechercher..." oninput="filterCrud(\'' + dataKey + '\',\'' + label + '\')"></div></div>'
    + '<div class="card"><div class="table-container"><table class="table"><thead><tr>';
  cols.forEach(function(col) { html += '<th>' + col.label + '</th>'; });
  html += '<th>Actions</th></tr></thead><tbody id="tbody-' + dataKey + '">';
  html += crudRows(data, dataKey, label, cols);
  html += '</tbody></table></div></div>';
  c.innerHTML = html;
}

function crudRows(data, dataKey, label, cols) {
  if (!data.length) return '<tr><td colspan="' + (cols.length + 1) + '" class="text-center text-muted empty-pad">Aucun enregistrement</td></tr>';
  var h = '';
  data.forEach(function(item) {
    h += '<tr>';
    cols.forEach(function(col) {
      var val = item[col.key];
      h += '<td>' + (col.render ? col.render(val) : (val !== undefined && val !== null ? val : '-')) + '</td>';
    });
    h += '<td><div class="table-actions">'
      + '<button class="btn btn-ghost btn-sm" onclick="openEditModal(\'' + dataKey + '\',' + item.id + ',\'' + label + '\')">' + ICONS.pencil + '</button>'
      + '<button class="btn btn-ghost btn-sm" onclick="confirmDelete(\'' + dataKey + '\',' + item.id + ',\'' + label + '\')">' + ICONS.trash + '</button>'
      + '</div></td></tr>';
  });
  return h;
}

function filterCrud(dataKey, label) {
  var q = document.getElementById('search-' + dataKey).value.toLowerCase();
  var cols = getColsFor(dataKey);
  var filtered = MOCK[dataKey].filter(function(item) {
    return Object.values(item).some(function(v) { return String(v).toLowerCase().indexOf(q) !== -1; });
  });
  document.getElementById('tbody-' + dataKey).innerHTML = crudRows(filtered, dataKey, label, cols);
}

function getColsFor(dataKey) {
  var m = { academicYears: yearCols, filieres: filiereCols, specialites: specCols, classes: classCols, students: studentCols, teachers: teacherCols, subjects: subjectCols };
  return m[dataKey] ? m[dataKey]() : [];
}

/* Column definitions */
function yearCols() {
  return [
    { key: 'label', label: 'Période' },
    { key: 'active', label: 'Statut', render: function(v) { return v ? '<span class="badge badge-success">Active</span>' : '<span class="badge badge-neutral">Passée</span>'; } }
  ];
}
function filiereCols() {
  return [
    { key: 'code', label: 'Code' }, { key: 'name', label: 'Nom' }, { key: 'description', label: 'Description' },
    { key: 'yearId', label: 'Année', render: function(v) { var y = findById(MOCK.academicYears, v); return y ? y.label : '-'; } }
  ];
}
function specCols() {
  return [
    { key: 'name', label: 'Nom' },
    { key: 'filiereId', label: 'Filière', render: function(v) { var f = findById(MOCK.filieres, v); return f ? f.name : '-'; } }
  ];
}
function classCols() {
  return [
    { key: 'name', label: 'Nom' }, { key: 'level', label: 'Niveau' },
    { key: 'filiereId', label: 'Filière', render: function(v) { var f = findById(MOCK.filieres, v); return f ? f.name : '-'; } },
    { key: 'capacity', label: 'Capacité' }
  ];
}
function studentCols() {
  return [
    { key: 'firstName', label: 'Prénom' }, { key: 'lastName', label: 'Nom' }, { key: 'email', label: 'Email' },
    { key: 'classId', label: 'Classe', render: function(v) { var cl = findById(MOCK.classes, v); return cl ? cl.name : '-'; } },
    { key: 'phone', label: 'Téléphone' }
  ];
}
function teacherCols() {
  return [
    { key: 'firstName', label: 'Prénom' }, { key: 'lastName', label: 'Nom' }, { key: 'email', label: 'Email' },
    { key: 'speciality', label: 'Spécialité' }, { key: 'hireDate', label: 'Embauche' }
  ];
}
function subjectCols() {
  return [
    { key: 'code', label: 'Code' }, { key: 'name', label: 'Nom' }, { key: 'credits', label: 'Crédits' },
    { key: 'teacherId', label: 'Enseignant', render: function(v) { var t = findById(MOCK.teachers, v); return t ? t.firstName + ' ' + t.lastName : '-'; } },
    { key: 'classId', label: 'Classe', render: function(v) { var cl = findById(MOCK.classes, v); return cl ? cl.name : '-'; } }
  ];
}

/* Form field definitions */
function yearForm() {
  return [
    { name: 'label', label: 'Période', type: 'text', placeholder: '2025-2026', required: true },
    { name: 'startYear', label: 'Année début', type: 'number', required: true },
    { name: 'endYear', label: 'Année fin', type: 'number', required: true },
    { name: 'active', label: 'Active', type: 'checkbox' }
  ];
}
function filiereForm() {
  return [
    { name: 'code', label: 'Code', type: 'text', placeholder: 'INFO', required: true },
    { name: 'name', label: 'Nom', type: 'text', placeholder: 'Informatique', required: true },
    { name: 'description', label: 'Description', type: 'text' },
    { name: 'yearId', label: 'Année', type: 'select', options: MOCK.academicYears.map(function(y){return {value:y.id,label:y.label};}), required: true }
  ];
}
function specForm() {
  return [
    { name: 'name', label: 'Nom', type: 'text', placeholder: 'Développement Web', required: true },
    { name: 'filiereId', label: 'Filière', type: 'select', options: MOCK.filieres.map(function(f){return {value:f.id,label:f.name};}), required: true }
  ];
}
function classForm() {
  return [
    { name: 'name', label: 'Nom', type: 'text', placeholder: 'L3 INFO A', required: true },
    { name: 'level', label: 'Niveau', type: 'select', options: [{value:'L1',label:'L1'},{value:'L2',label:'L2'},{value:'L3',label:'L3'},{value:'M1',label:'M1'},{value:'M2',label:'M2'}], required: true },
    { name: 'filiereId', label: 'Filière', type: 'select', options: MOCK.filieres.map(function(f){return {value:f.id,label:f.name};}), required: true },
    { name: 'specialiteId', label: 'Spécialité', type: 'select', options: MOCK.specialites.map(function(s){return {value:s.id,label:s.name};}) },
    { name: 'yearId', label: 'Année', type: 'select', options: MOCK.academicYears.map(function(y){return {value:y.id,label:y.label};}), required: true },
    { name: 'capacity', label: 'Capacité', type: 'number', placeholder: '35' }
  ];
}
function studentForm() {
  return [
    { name: 'firstName', label: 'Prénom', type: 'text', required: true },
    { name: 'lastName', label: 'Nom', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'classId', label: 'Classe', type: 'select', options: MOCK.classes.map(function(c){return {value:c.id,label:c.name};}), required: true },
    { name: 'birthDate', label: 'Date de naissance', type: 'date' },
    { name: 'phone', label: 'Téléphone', type: 'text' }
  ];
}
function teacherForm() {
  return [
    { name: 'firstName', label: 'Prénom', type: 'text', required: true },
    { name: 'lastName', label: 'Nom', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Téléphone', type: 'text' },
    { name: 'speciality', label: 'Spécialité', type: 'text' },
    { name: 'hireDate', label: 'Date d\'embauche', type: 'date' }
  ];
}
function subjectForm() {
  return [
    { name: 'code', label: 'Code', type: 'text', placeholder: 'WEB101', required: true },
    { name: 'name', label: 'Nom', type: 'text', required: true },
    { name: 'credits', label: 'Crédits', type: 'number', required: true },
    { name: 'teacherId', label: 'Enseignant', type: 'select', options: MOCK.teachers.map(function(t){return {value:t.id,label:t.firstName+' '+t.lastName};}), required: true },
    { name: 'classId', label: 'Classe', type: 'select', options: MOCK.classes.map(function(cl){return {value:cl.id,label:cl.name};}), required: true }
  ];
}

/* ============================================
   MODAL CRUD (Add / Edit)
   ============================================ */
function openAddModal(dataKey, label) {
  APP.editingEntity = null;
  var formFields = getFormFor(dataKey)();
  openModal('Ajouter — ' + label, buildForm(formFields, dataKey), dataKey);
}

function openEditModal(dataKey, id, label) {
  var item = findById(MOCK[dataKey], id);
  if (!item) return;
  APP.editingEntity = id;
  var formFields = getFormFor(dataKey)();
  openModal('Modifier — ' + label, buildForm(formFields, dataKey, item), dataKey);
}

function getFormFor(dataKey) {
  var m = { academicYears: yearForm, filieres: filiereForm, specialites: specForm, classes: classForm, students: studentForm, teachers: teacherForm, subjects: subjectForm, activities: activityForm, scholarships: scholarshipForm };
  return m[dataKey] || function(){return[];};
}

function activityForm() {
  return [
    { name: 'name', label: 'Nom', type: 'text', placeholder: 'Club Informatique', required: true },
    { name: 'type', label: 'Type', type: 'select', options: [{value:'extrascolaire',label:'Extrascolaire'},{value:'culturelle',label:'Culturelle'}], required: true },
    { name: 'description', label: 'Description', type: 'text', placeholder: 'Description...', required: true },
    { name: 'schedule', label: 'Horaires', type: 'text', placeholder: 'Mercredi 14h-16h', required: true },
    { name: 'maxStudents', label: 'Places max', type: 'number', placeholder: '20', required: true },
    { name: 'teacherId', label: 'Responsable', type: 'select', options: MOCK.teachers.map(function(t){return {value:t.id,label:t.firstName+' '+t.lastName};}), required: true }
  ];
}

function scholarshipForm() {
  return [
    { name: 'country', label: 'Pays', type: 'text', placeholder: 'France', required: true },
    { name: 'flag', label: 'Drapeau (emoji)', type: 'text', placeholder: '🇫🇷', required: true },
    { name: 'name', label: 'Nom de la bourse', type: 'text', required: true },
    { name: 'eligibility', label: 'Éligibilité', type: 'text', required: true },
    { name: 'deadline', label: 'Deadline', type: 'text', placeholder: 'Mars chaque année', required: true },
    { name: 'amount', label: 'Montant', type: 'text', required: true },
    { name: 'process', label: 'Processus', type: 'text', required: true },
    { name: 'url', label: 'URL', type: 'text', placeholder: 'https://...', required: true }
  ];
}

function buildForm(fields, dataKey, data) {
  var h = '<form id="crudForm" onsubmit="return false;">';
  fields.forEach(function(f) {
    var val = data ? (data[f.name] !== undefined ? data[f.name] : '') : '';
    h += '<div class="form-group"><label for="f-' + f.name + '">' + f.label + (f.required ? ' *' : '') + '</label>';
    if (f.type === 'select') {
      h += '<select id="f-' + f.name + '" class="form-control" ' + (f.required ? 'required' : '') + '>';
      h += '<option value="">— Sélectionner —</option>';
      f.options.forEach(function(o) {
        h += '<option value="' + o.value + '"' + (val == o.value ? ' selected' : '') + '>' + o.label + '</option>';
      });
      h += '</select>';
    } else if (f.type === 'checkbox') {
      h += '<label class="d-flex align-center gap-2 mt-1"><input type="checkbox" id="f-' + f.name + '" ' + (val ? 'checked' : '') + '> Oui</label>';
    } else {
      h += '<input type="' + f.type + '" id="f-' + f.name + '" class="form-control" value="' + (val || '') + '" placeholder="' + (f.placeholder || '') + '" ' + (f.required ? 'required' : '') + '>';
    }
    h += '</div>';
  });
  h += '</form>';
  return h;
}

function openModal(title, body, dataKey) {
  document.getElementById('modalContent').innerHTML = ''
    + '<div class="modal-header"><h2>' + title + '</h2><button class="modal-close" onclick="closeModal()">' + ICONS.xMark + '</button></div>'
    + '<div class="modal-body">' + body + '</div>'
    + '<div class="modal-footer">'
    + '<button class="btn btn-outline" onclick="closeModal()">Annuler</button>'
    + '<button class="btn btn-primary" onclick="saveCrud(\'' + dataKey + '\')">' + ICONS.check + ' Enregistrer</button>'
    + '</div>';
  document.getElementById('modalOverlay').classList.add('active');
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
  APP.editingEntity = null;
}

function saveCrud(dataKey) {
  var fields = getFormFor(dataKey)();
  var item = {};
  var valid = true;

  /* Reset previous errors */
  fields.forEach(function(f) {
    var el = document.getElementById('f-' + f.name);
    if (!el) return;
    el.classList.remove('is-invalid');
    var errEl = el.parentNode.querySelector('.field-error');
    if (errEl) errEl.classList.remove('visible');
  });

  fields.forEach(function(f) {
    var el = document.getElementById('f-' + f.name);
    if (!el) return;
    if (f.type === 'checkbox') {
      item[f.name] = el.checked;
    } else if (f.type === 'number') {
      item[f.name] = el.value ? Number(el.value) : null;
    } else {
      item[f.name] = el.value.trim();
    }
    if (f.required && !item[f.name] && item[f.name] !== 0) {
      valid = false;
      el.classList.add('is-invalid');
      /* Create field error if not exists */
      var errEl = el.parentNode.querySelector('.field-error');
      if (!errEl) {
        errEl = document.createElement('div');
        errEl.className = 'field-error';
        el.parentNode.appendChild(errEl);
      }
      errEl.textContent = 'Ce champ est requis.';
      errEl.classList.add('visible');
    }
  });

  if (!valid) { showToast('Veuillez corriger les champs en rouge.', 'error'); return; }

  if (APP.editingEntity !== null) {
    var idx = findIndex(MOCK[dataKey], APP.editingEntity);
    if (idx !== -1) {
      item.id = APP.editingEntity;
      MOCK[dataKey][idx] = item;
    }
    showToast('Enregistrement modifié.', 'success');
  } else {
    item.id = ++APP.nextId;
    MOCK[dataKey].push(item);
    showToast('Enregistrement ajouté.', 'success');
  }
  closeModal();
  renderView(APP.view);
}

/* Confirm Delete */
function confirmDelete(dataKey, id, label) {
  document.getElementById('confirmContent').innerHTML = ''
    + '<div class="confirm-icon">' + ICONS.exclamationTriangle + '</div>'
    + '<div class="confirm-text"><h3>Supprimer cet élément ?</h3><p>Cette action est irréversible.</p></div>'
    + '<div class="modal-footer confirm-footer">'
    + '<button class="btn btn-outline" onclick="closeConfirm()">Annuler</button>'
    + '<button class="btn btn-danger" onclick="doDelete(\'' + dataKey + '\',' + id + ')">' + ICONS.trash + ' Supprimer</button>'
    + '</div>';
  document.getElementById('confirmOverlay').classList.add('active');
}

function doDelete(dataKey, id) {
  var idx = findIndex(MOCK[dataKey], id);
  if (idx !== -1) MOCK[dataKey].splice(idx, 1);
  closeConfirm();
  showToast('Élément supprimé.', 'success');
  renderView(APP.view);
}

function closeConfirm() {
  document.getElementById('confirmOverlay').classList.remove('active');
}

/* ============================================
   TEACHER VIEWS
   ============================================ */
function renderTeacherClasses(c) {
  var tid = 1;
  var mySubs = MOCK.subjects.filter(function(s){return s.teacherId===tid;});
  var classIds = [];
  mySubs.forEach(function(s){ if(classIds.indexOf(s.classId)===-1) classIds.push(s.classId); });
  var classes = classIds.map(function(id){return findById(MOCK.classes,id);}).filter(Boolean);

  if (!classes.length) { c.innerHTML = '<div class="empty-state"><div class="empty-icon">' + ICONS.buildingLibrary + '</div><h3>Aucune classe</h3></div>'; return; }

  var h = '<div class="stats-grid">';
  classes.forEach(function(cl) {
    var count = MOCK.students.filter(function(s){return s.classId===cl.id;}).length;
    h += statCard(ICONS.buildingLibrary, cl.name, count + ' étudiants', 'info');
  });
  h += '</div>';
  c.innerHTML = h;
}

function renderTeacherStudents(c) {
  var tid = 1;
  var mySubs = MOCK.subjects.filter(function(s){return s.teacherId===tid;});
  var classIds = [];
  mySubs.forEach(function(s){ if(classIds.indexOf(s.classId)===-1) classIds.push(s.classId); });
  var students = MOCK.students.filter(function(s){return classIds.indexOf(s.classId)!==-1;});

  var h = '<div class="card"><div class="table-container"><table class="table"><thead><tr><th>Nom</th><th>Prénom</th><th>Classe</th><th>Email</th></tr></thead><tbody>';
  students.forEach(function(s) {
    var cl = findById(MOCK.classes, s.classId);
    h += '<tr><td>' + s.lastName + '</td><td>' + s.firstName + '</td><td>' + (cl ? cl.name : '-') + '</td><td>' + s.email + '</td></tr>';
  });
  h += '</tbody></table></div></div>';
  c.innerHTML = h;
}

function renderTeacherSubjects(c) {
  var tid = 1;
  var subs = MOCK.subjects.filter(function(s){return s.teacherId===tid;});

  var h = '<div class="stats-grid">';
  subs.forEach(function(s) {
    var cl = findById(MOCK.classes, s.classId);
    h += '<div class="stat-card"><div class="stat-icon primary">' + ICONS.bookOpen + '</div>'
      + '<div class="stat-info"><h4>' + s.name + '</h4><p>' + s.code + ' — ' + (cl ? cl.name : '-') + ' — ' + s.credits + ' crédits</p></div></div>';
  });
  h += '</div>';
  c.innerHTML = h;
}

/* ============================================
   GRADES MANAGEMENT (Teacher)
   ============================================ */
function renderGrades(c) {
  var tid = 1;
  var mySubs = MOCK.subjects.filter(function(s){return s.teacherId===tid;});
  var classIds = [];
  mySubs.forEach(function(s){ if(classIds.indexOf(s.classId)===-1) classIds.push(s.classId); });
  var students = MOCK.students.filter(function(s){return classIds.indexOf(s.classId)!==-1;});

  document.getElementById('headerActions').innerHTML = '<button class="btn btn-primary" onclick="openGradeModal()">' + ICONS.plus + ' Ajouter une note</button>';

  var h = '<div class="card"><div class="table-container"><table class="table"><thead><tr>'
    + '<th>Étudiant</th><th>Matière</th><th>Type</th><th>Note</th><th>Date</th><th>Actions</th>'
    + '</tr></thead><tbody>';
  MOCK.grades.forEach(function(g) {
    var st = findById(MOCK.students, g.studentId);
    var sub = findById(MOCK.subjects, g.subjectId);
    h += '<tr><td>' + (st ? st.firstName + ' ' + st.lastName : '-') + '</td>'
      + '<td>' + (sub ? sub.name : '-') + '</td>'
      + '<td><span class="badge badge-info">' + typeName(g.type) + '</span></td>'
      + '<td>' + gradeBadge(g.grade) + '</td>'
      + '<td>' + (g.date || '-') + '</td>'
      + '<td><div class="table-actions">'
      + '<button class="btn btn-ghost btn-sm" onclick="openEditGrade(' + g.id + ')">' + ICONS.pencil + '</button>'
      + '<button class="btn btn-ghost btn-sm" onclick="deleteGrade(' + g.id + ')">' + ICONS.trash + '</button>'
      + '</div></td></tr>';
  });
  h += '</tbody></table></div></div>';
  c.innerHTML = h;
}

function openGradeModal(data) {
  APP.editingEntity = data ? data.id : null;
  var studOpts = MOCK.students.map(function(s){return {value:s.id, label:s.firstName+' '+s.lastName};});
  var subOpts = MOCK.subjects.map(function(s){return {value:s.id, label:s.name};});

  var h = '<form id="gradeForm" onsubmit="return false;">'
    + formGroupSelect('studentId', 'Étudiant', studOpts, data ? data.studentId : '')
    + formGroupSelect('subjectId', 'Matière', subOpts, data ? data.subjectId : '')
    + formGroupSelect('type', 'Type', [{value:'interro',label:'Interrogation'},{value:'devoir',label:'Devoir'},{value:'partiel',label:'Partiel'}], data ? data.type : '')
    + formGroupText('label', 'Libellé', data ? data.label : '', 'Interrogation 1')
    + formGroupNumber('grade', 'Note /20', data ? data.grade : '', '0', '20')
    + formGroupDate('date', 'Date', data ? data.date : '')
    + '</form>';

  openModal(data ? 'Modifier la note' : 'Ajouter une note', h, 'grades');
}

function openEditGrade(id) {
  var g = findById(MOCK.grades, id);
  if (g) openGradeModal(g);
}

function deleteGrade(id) {
  var idx = findIndex(MOCK.grades, id);
  if (idx !== -1) MOCK.grades.splice(idx, 1);
  showToast('Note supprimée.', 'success');
  renderView('grades');
}

function saveGrade() {
  var item = {
    studentId: Number(document.getElementById('f-studentId').value),
    subjectId: Number(document.getElementById('f-subjectId').value),
    type: document.getElementById('f-type').value,
    label: document.getElementById('f-label').value.trim(),
    grade: Number(document.getElementById('f-grade').value),
    date: document.getElementById('f-date').value
  };
  if (!item.studentId || !item.subjectId || !item.type || isNaN(item.grade)) {
    showToast('Remplissez tous les champs.', 'error'); return;
  }
  if (item.grade < 0 || item.grade > 20) {
    showToast('La note doit être entre 0 et 20.', 'error'); return;
  }
  if (APP.editingEntity !== null) {
    var idx = findIndex(MOCK.grades, APP.editingEntity);
    if (idx !== -1) { item.id = APP.editingEntity; MOCK.grades[idx] = item; }
    showToast('Note modifiée.', 'success');
  } else {
    item.id = ++APP.nextId;
    MOCK.grades.push(item);
    showToast('Note ajoutée.', 'success');
  }
  closeModal();
  renderView('grades');
}

/* ============================================
   BONUS / MALUS
   ============================================ */
function renderBonusMalus(c) {
  document.getElementById('headerActions').innerHTML = '<button class="btn btn-primary" onclick="openBonusMalusModal()">' + ICONS.plus + ' Ajouter</button>';

  var h = '<div class="card"><div class="table-container"><table class="table"><thead><tr>'
    + '<th>Étudiant</th><th>Valeur</th><th>Raison</th><th>Date</th><th>Actions</th>'
    + '</tr></thead><tbody>';
  MOCK.bonusMalus.forEach(function(bm) {
    var st = findById(MOCK.students, bm.studentId);
    var cls = bm.value > 0 ? 'badge-success' : 'badge-danger';
    var icon = bm.value > 0 ? ICONS.arrowTrendingUp : ICONS.arrowTrendingDown;
    h += '<tr><td>' + (st ? st.firstName + ' ' + st.lastName : '-') + '</td>'
      + '<td><span class="badge ' + cls + '">' + icon + ' ' + (bm.value > 0 ? '+' : '') + bm.value + '</span></td>'
      + '<td>' + bm.reason + '</td><td>' + bm.date + '</td>'
      + '<td><button class="btn btn-ghost btn-sm" onclick="deleteBonusMalus(' + bm.id + ')">' + ICONS.trash + '</button></td></tr>';
  });
  h += '</tbody></table></div></div>';
  c.innerHTML = h;
}

function openBonusMalusModal() {
  var studOpts = MOCK.students.map(function(s){return {value:s.id,label:s.firstName+' '+s.lastName};});
  var h = '<form id="bmForm" onsubmit="return false;">'
    + formGroupSelect('studentId', 'Étudiant', studOpts, '')
    + '<div class="form-group"><label>Valeur *</label><select id="f-value" class="form-control" required>'
    + '<option value="">— Sélectionner —</option><option value="1">+1 (Bonus)</option><option value="2">+2 (Bonus)</option>'
    + '<option value="-1">-1 (Malus)</option><option value="-2">-2 (Malus)</option></select></div>'
    + formGroupText('reason', 'Raison', '', 'Raison...')
    + formGroupDate('date', 'Date', new Date().toISOString().split('T')[0])
    + '</form>';
  openModal('Bonus / Malus', h, 'bonus-malus');
}

function saveBonusMalus() {
  var item = {
    studentId: Number(document.getElementById('f-studentId').value),
    value: Number(document.getElementById('f-value').value),
    reason: document.getElementById('f-reason').value.trim(),
    date: document.getElementById('f-date').value,
    teacherId: 1
  };
  if (!item.studentId || !item.value) { showToast('Remplissez les champs.', 'error'); return; }
  item.id = ++APP.nextId;
  MOCK.bonusMalus.push(item);
  closeModal();
  showToast('Bonus/Malus ajouté.', 'success');
  renderView('bonus-malus');
}

function deleteBonusMalus(id) {
  var idx = findIndex(MOCK.bonusMalus, id);
  if (idx !== -1) MOCK.bonusMalus.splice(idx, 1);
  showToast('Supprimé.', 'success');
  renderView('bonus-malus');
}

/* ============================================
   ABSENCES & RETARDS (Admin)
   ============================================ */
function renderAbsences(c) {
  document.getElementById('headerActions').innerHTML = '<button class="btn btn-primary" onclick="openAbsenceModal()">' + ICONS.plus + ' Ajouter</button>';

  var h = '<div class="stats-grid">'
    + statCard(ICONS.noSymbol, 'Absences', MOCK.absences.filter(function(a){return a.type==='absence';}).length, 'danger')
    + statCard(ICONS.clock, 'Retards', MOCK.absences.filter(function(a){return a.type==='retard';}).length, 'warning')
    + '</div>'
    + '<div class="card"><div class="table-container"><table class="table"><thead><tr>'
    + '<th>Étudiant</th><th>Type</th><th>Date</th><th>Motif</th><th>Justifié</th><th>Actions</th>'
    + '</tr></thead><tbody>';
  MOCK.absences.forEach(function(a) {
    var st = findById(MOCK.students, a.studentId);
    var typeBadge = a.type === 'absence' ? '<span class="badge badge-danger">Absence</span>' : '<span class="badge badge-warning">Retard ' + (a.duration ? a.duration + 'min' : '') + '</span>';
    h += '<tr><td>' + (st ? st.firstName + ' ' + st.lastName : '-') + '</td><td>' + typeBadge + '</td><td>' + a.date + '</td>'
      + '<td>' + (a.reason || '-') + '</td><td>' + (a.justified ? '<span class="badge badge-success">Oui</span>' : '<span class="badge badge-danger">Non</span>') + '</td>'
      + '<td><button class="btn btn-ghost btn-sm" onclick="deleteAbsence(' + a.id + ')">' + ICONS.trash + '</button></td></tr>';
  });
  h += '</tbody></table></div></div>';
  c.innerHTML = h;
}

function openAbsenceModal() {
  var studOpts = MOCK.students.map(function(s){return {value:s.id,label:s.firstName+' '+s.lastName};});
  var h = '<form onsubmit="return false;">'
    + formGroupSelect('studentId', 'Étudiant', studOpts, '')
    + '<div class="form-group"><label>Type *</label><select id="f-type" class="form-control" required>'
    + '<option value="">— Sélectionner —</option><option value="absence">Absence</option><option value="retard">Retard</option></select></div>'
    + formGroupDate('date', 'Date', new Date().toISOString().split('T')[0])
    + formGroupText('reason', 'Motif', '', '')
    + formGroupNumber('duration', 'Durée (min, si retard)', '', '0', '240')
    + '<div class="form-group"><label><input type="checkbox" id="f-justified"> Justifié</label></div>'
    + '</form>';
  openModal('Ajouter une absence/retard', h, 'absences');
}

function saveAbsence() {
  var item = {
    studentId: Number(document.getElementById('f-studentId').value),
    type: document.getElementById('f-type').value,
    date: document.getElementById('f-date').value,
    reason: document.getElementById('f-reason').value.trim(),
    duration: Number(document.getElementById('f-duration').value) || null,
    justified: document.getElementById('f-justified').checked
  };
  if (!item.studentId || !item.type) { showToast('Remplissez les champs.', 'error'); return; }
  item.id = ++APP.nextId;
  MOCK.absences.push(item);
  closeModal();
  showToast('Enregistré.', 'success');
  renderView('absences');
}

function deleteAbsence(id) {
  var idx = findIndex(MOCK.absences, id);
  if (idx !== -1) MOCK.absences.splice(idx, 1);
  showToast('Supprimé.', 'success');
  renderView('absences');
}

/* ============================================
   PUNISHMENTS (Admin)
   ============================================ */
function renderPunishments(c) {
  document.getElementById('headerActions').innerHTML = '<button class="btn btn-primary" onclick="openPunishModal()">' + ICONS.plus + ' Ajouter</button>';

  var h = '<div class="card"><div class="table-container"><table class="table"><thead><tr>'
    + '<th>Étudiant</th><th>Type</th><th>Description</th><th>Date</th><th>Durée/Heures</th><th>Actions</th>'
    + '</tr></thead><tbody>';
  MOCK.punitions.forEach(function(p) {
    var st = findById(MOCK.students, p.studentId);
    h += '<tr><td>' + (st ? st.firstName + ' ' + st.lastName : '-') + '</td>'
      + '<td><span class="badge badge-danger">' + punTypeLabel(p.type) + '</span></td>'
      + '<td>' + p.description + '</td><td>' + p.date + '</td>'
      + '<td>' + (p.hours ? p.hours + 'h' : (p.duration || '-')) + '</td>'
      + '<td><button class="btn btn-ghost btn-sm" onclick="deletePunish(' + p.id + ')">' + ICONS.trash + '</button></td></tr>';
  });
  h += '</tbody></table></div></div>';
  c.innerHTML = h;
}

function openPunishModal() {
  var studOpts = MOCK.students.map(function(s){return {value:s.id,label:s.firstName+' '+s.lastName};});
  var h = '<form onsubmit="return false;">'
    + formGroupSelect('studentId', 'Étudiant', studOpts, '')
    + '<div class="form-group"><label>Type *</label><select id="f-type" class="form-control" required>'
    + '<option value="">— Sélectionner —</option>'
    + '<option value="colle">Heure de colle</option>'
    + '<option value="punition">Punition</option>'
    + '<option value="exclusion_temp">Exclusion temporaire</option>'
    + '<option value="exclusion_def">Exclusion définitive</option></select></div>'
    + formGroupText('description', 'Description', '', '')
    + formGroupDate('date', 'Date', new Date().toISOString().split('T')[0])
    + formGroupNumber('hours', 'Heures de colle', '', '0', '20')
    + formGroupText('duration', 'Durée exclusion', '', '3 jours')
    + '</form>';
  openModal('Ajouter une punition', h, 'punishments');
}

function savePunishment() {
  var item = {
    studentId: Number(document.getElementById('f-studentId').value),
    type: document.getElementById('f-type').value,
    description: document.getElementById('f-description').value.trim(),
    date: document.getElementById('f-date').value,
    hours: Number(document.getElementById('f-hours').value) || null,
    duration: document.getElementById('f-duration').value.trim() || null,
    teacherId: 1
  };
  if (!item.studentId || !item.type) { showToast('Remplissez les champs.', 'error'); return; }
  item.id = ++APP.nextId;
  MOCK.punitions.push(item);
  closeModal();
  showToast('Punition enregistrée.', 'success');
  renderView('punishments');
}

function deletePunish(id) {
  var idx = findIndex(MOCK.punitions, id);
  if (idx !== -1) MOCK.punitions.splice(idx, 1);
  showToast('Supprimé.', 'success');
  renderView('punishments');
}

/* ============================================
   TEACHER ABSENCES & PUNISHMENTS
   ============================================ */
function renderTeacherAbsences(c) {
  var h = '<div class="card"><div class="table-container"><table class="table"><thead><tr><th>Date</th><th>Type</th><th>Motif</th><th>Durée</th></tr></thead><tbody>';
  MOCK.teacherAbsences.forEach(function(a) {
    var typeBadge = a.type === 'absence' ? '<span class="badge badge-danger">Absence</span>' : '<span class="badge badge-warning">Retard</span>';
    h += '<tr><td>' + a.date + '</td><td>' + typeBadge + '</td><td>' + (a.reason || '-') + '</td><td>' + (a.duration ? a.duration + 'min' : '-') + '</td></tr>';
  });
  h += '</tbody></table></div></div>';
  c.innerHTML = h;
}

function renderTeacherPunishments(c) {
  var h = '<div class="card"><div class="table-container"><table class="table"><thead><tr><th>Étudiant</th><th>Type</th><th>Description</th><th>Date</th></tr></thead><tbody>';
  MOCK.punitions.forEach(function(p) {
    var st = findById(MOCK.students, p.studentId);
    h += '<tr><td>' + (st ? st.firstName + ' ' + st.lastName : '-') + '</td>'
      + '<td><span class="badge badge-danger">' + punTypeLabel(p.type) + '</span></td>'
      + '<td>' + p.description + '</td><td>' + p.date + '</td></tr>';
  });
  h += '</tbody></table></div></div>';
  c.innerHTML = h;
}

/* ============================================
   STUDENT VIEWS
   ============================================ */
function renderStudentProfile(c) {
  var s = findById(MOCK.students, 1);
  var cls = findById(MOCK.classes, s.classId);
  var fil = cls ? findById(MOCK.filieres, cls.filiereId) : null;

  c.innerHTML = '<div class="card"><div class="card-body"><div class="profile-card">'
    + '<div class="profile-avatar"><span class="heroicon-xl">' + ICONS.user + '</span></div>'
    + '<div class="profile-info"><h2>' + s.firstName + ' ' + s.lastName + '</h2>'
    + '<div class="profile-meta">'
    + '<span class="profile-meta-item">' + ICONS.buildingLibrary + ' ' + (cls ? cls.name : '-') + '</span>'
    + '<span class="profile-meta-item">' + ICONS.academicCap + ' ' + (fil ? fil.name : '-') + '</span>'
    + '<span class="profile-meta-item">' + ICONS.magnifyingGlass + ' ' + s.email + '</span>'
    + '<span class="profile-meta-item">' + ICONS.clock + ' ' + s.phone + '</span>'
    + '<span class="profile-meta-item">' + ICONS.calendar + ' ' + s.birthDate + '</span>'
    + '</div></div></div></div></div>';
}

function renderStudentFiliere(c) {
  var s = findById(MOCK.students, 1);
  var cls = findById(MOCK.classes, s.classId);
  var fil = cls ? findById(MOCK.filieres, cls.filiereId) : null;
  var specs = MOCK.specialites.filter(function(sp){return sp.filiereId === (fil ? fil.id : 0);});
  var specHtml = specs.map(function(sp){return '<span class="badge badge-info">' + sp.name + '</span>';}).join(' ');

  var h = '<div class="grid-2col">'
    + '<div class="card"><div class="card-header"><h3>Ma filière</h3></div><div class="card-body">'
    + '<h4>' + (fil ? fil.name : '-') + '</h4><p class="text-muted">' + (fil ? fil.description : '') + '</p></div></div>'
    + '<div class="card"><div class="card-header"><h3>Spécialités</h3></div><div class="card-body">'
    + (specHtml || '<p class="text-muted">Aucune spécialité</p>')
    + '</div></div></div>';
  c.innerHTML = h;
}

function renderStudentClass(c) {
  var s = findById(MOCK.students, 1);
  var cls = findById(MOCK.classes, s.classId);
  var classmates = MOCK.students.filter(function(st){return st.classId === s.classId;});

  var h = '<div class="card"><div class="card-header"><h3>' + (cls ? cls.name : 'Ma classe') + '</h3><span class="badge badge-info">' + classmates.length + ' élèves</span></div>'
    + '<div class="table-container"><table class="table"><thead><tr><th>Nom</th><th>Prénom</th><th>Email</th></tr></thead><tbody>';
  classmates.forEach(function(st) {
    h += '<tr><td>' + st.lastName + '</td><td>' + st.firstName + '</td><td>' + st.email + '</td></tr>';
  });
  h += '</tbody></table></div></div>';
  c.innerHTML = h;
}

function renderStudentSubjects(c) {
  var s = findById(MOCK.students, 1);
  var cls = findById(MOCK.classes, s.classId);
  var subs = MOCK.subjects.filter(function(sub){return sub.classId === s.classId;});

  var h = '<div class="stats-grid">';
  subs.forEach(function(sub) {
    var t = findById(MOCK.teachers, sub.teacherId);
    h += '<div class="stat-card"><div class="stat-icon primary">' + ICONS.bookOpen + '</div>'
      + '<div class="stat-info"><h4>' + sub.name + '</h4><p>' + sub.code + ' — ' + (t ? t.firstName + ' ' + t.lastName : '-') + ' — ' + sub.credits + ' crédits</p></div></div>';
  });
  h += '</div>';
  c.innerHTML = h;
}

function renderStudentGrades(c) {
  var sid = 1;
  var grades = MOCK.grades.filter(function(g){return g.studentId === sid;});
  var avg = grades.length ? (grades.reduce(function(a,g){return a+g.grade;},0)/grades.length).toFixed(1) : '0';
  var avgClass = avg >= 14 ? 'good' : avg >= 10 ? 'medium' : 'bad';

  var h = '<div class="grid-2col"><div class="card"><div class="card-body"><div class="average-display">'
    + '<div class="average-value ' + avgClass + '">' + avg + '/20</div>'
    + '<div class="average-label">Moyenne générale</div></div></div></div>'
    + '<div class="card"><div class="card-header"><h3>Répartition par type</h3></div><div class="card-body">';
  var interro = grades.filter(function(g){return g.type==='interro';});
  var devoir = grades.filter(function(g){return g.type==='devoir';});
  var partiel = grades.filter(function(g){return g.type==='partiel';});
  h += '<p>Interrogations : ' + interro.length + ' notes</p>'
    + '<p>Devoirs : ' + devoir.length + ' notes</p>'
    + '<p>Partiels : ' + partiel.length + ' notes</p>';
  h += '</div></div></div>';

  h += '<div class="card mt-3"><div class="table-container"><table class="table"><thead><tr><th>Matière</th><th>Type</th><th>Note</th><th>Date</th></tr></thead><tbody>';
  grades.forEach(function(g) {
    var sub = findById(MOCK.subjects, g.subjectId);
    h += '<tr><td>' + (sub ? sub.name : '-') + '</td><td><span class="badge badge-info">' + typeName(g.type) + '</span></td><td>' + gradeBadge(g.grade) + '</td><td>' + (g.date || '-') + '</td></tr>';
  });
  h += '</tbody></table></div></div>';
  c.innerHTML = h;
}

function renderStudentRecord(c) {
  var sid = 1;
  var puns = MOCK.punitions.filter(function(p){return p.studentId === sid;});
  var bm = MOCK.bonusMalus.filter(function(b){return b.studentId === sid;});

  var h = '<div class="stats-grid">'
    + statCard(ICONS.sparkles, 'Bonus', bm.filter(function(b){return b.value>0;}).reduce(function(a,b){return a+b.value;},0), 'success')
    + statCard(ICONS.noSymbol, 'Malus', bm.filter(function(b){return b.value<0;}).reduce(function(a,b){return a+Math.abs(b.value);},0), 'danger')
    + statCard(ICONS.shieldExclamation, 'Punitions', puns.length, 'danger')
    + '</div>';

  if (puns.length) {
    h += '<div class="card mt-3"><div class="card-header"><h3>Historique des punitions</h3></div><div class="table-container"><table class="table"><thead><tr><th>Type</th><th>Description</th><th>Date</th></tr></thead><tbody>';
    puns.forEach(function(p) {
      h += '<tr><td><span class="badge badge-danger">' + punTypeLabel(p.type) + '</span></td><td>' + p.description + '</td><td>' + p.date + '</td></tr>';
    });
    h += '</tbody></table></div></div>';
  }
  c.innerHTML = h;
}

function renderStudentAttendance(c) {
  var sid = 1;
  var abs = MOCK.absences.filter(function(a){return a.studentId === sid;});
  var absCount = abs.filter(function(a){return a.type==='absence';}).length;
  var retardCount = abs.filter(function(a){return a.type==='retard';}).length;
  var justified = abs.filter(function(a){return a.justified;}).length;

  var h = '<div class="stats-grid">'
    + statCard(ICONS.noSymbol, 'Absences', absCount, 'danger')
    + statCard(ICONS.clock, 'Retards', retardCount, 'warning')
    + statCard(ICONS.shieldCheck, 'Justifiées', justified, 'success')
    + '</div>'
    + '<div class="card mt-3"><div class="table-container"><table class="table"><thead><tr><th>Date</th><th>Type</th><th>Motif</th><th>Justifié</th></tr></thead><tbody>';
  abs.forEach(function(a) {
    h += '<tr><td>' + a.date + '</td><td>' + (a.type === 'absence' ? '<span class="badge badge-danger">Absence</span>' : '<span class="badge badge-warning">Retard</span>') + '</td>'
      + '<td>' + (a.reason || '-') + '</td><td>' + (a.justified ? '<span class="badge badge-success">Oui</span>' : '<span class="badge badge-danger">Non</span>') + '</td></tr>';
  });
  h += '</tbody></table></div></div>';
  c.innerHTML = h;
}

/* ============================================
   PARENT VIEWS
   ============================================ */
function renderParentProfile(c) {
  var pid = APP.session.email === 'parent@ecole.fr' ? 1 : (APP.session.email === 'durand.parent@ecole.fr' ? 2 : 3);
  var parent = findById(MOCK.parents, pid);
  var children = parent.childrenIds.map(function(id){return findById(MOCK.students, id);}).filter(Boolean);

  var h = '<div class="card"><div class="card-body"><div class="profile-card">'
    + '<div class="profile-avatar"><span class="heroicon-xl">' + ICONS.user + '</span></div>'
    + '<div class="profile-info"><h2>' + parent.firstName + ' ' + parent.lastName + '</h2>'
    + '<div class="profile-meta">'
    + '<span class="profile-meta-item">' + ICONS.magnifyingGlass + ' ' + parent.email + '</span>'
    + '<span class="profile-meta-item">' + ICONS.clock + ' ' + parent.phone + '</span>'
    + '</div></div></div></div></div>';

  h += '<h3 class="mt-3 mb-2">Mes enfants</h3><div class="grid-2col">';
  children.forEach(function(s) {
    var cls = findById(MOCK.classes, s.classId);
    h += '<div class="card"><div class="card-body">'
      + '<h4>' + s.firstName + ' ' + s.lastName + '</h4>'
      + '<p class="text-muted">' + (cls ? cls.name : '-') + ' — ' + s.email + '</p></div></div>';
  });
  h += '</div>';
  c.innerHTML = h;
}

function renderParentGrades(c) {
  var pid = APP.session.email === 'parent@ecole.fr' ? 1 : (APP.session.email === 'durand.parent@ecole.fr' ? 2 : 3);
  var parent = findById(MOCK.parents, pid);
  var children = parent.childrenIds;

  var h = '';
  children.forEach(function(sid) {
    var s = findById(MOCK.students, sid);
    var grades = MOCK.grades.filter(function(g){return g.studentId===sid;});
    var avg = grades.length ? (grades.reduce(function(a,g){return a+g.grade;},0)/grades.length).toFixed(1) : '—';

    h += '<div class="card mb-3"><div class="card-header"><h3>' + s.firstName + ' ' + s.lastName + '</h3><span class="badge badge-info">Moy: ' + avg + '/20</span></div>'
      + '<div class="table-container"><table class="table"><thead><tr><th>Matière</th><th>Type</th><th>Note</th><th>Date</th></tr></thead><tbody>';
    grades.forEach(function(g) {
      var sub = findById(MOCK.subjects, g.subjectId);
      h += '<tr><td>' + (sub ? sub.name : '-') + '</td><td><span class="badge badge-info">' + typeName(g.type) + '</span></td><td>' + gradeBadge(g.grade) + '</td><td>' + (g.date || '-') + '</td></tr>';
    });
    h += '</tbody></table></div></div>';
  });
  c.innerHTML = h || '<div class="empty-state"><div class="empty-icon">' + ICONS.chartBar + '</div><h3>Aucune note</h3></div>';
}

function renderParentAttendance(c) {
  var pid = APP.session.email === 'parent@ecole.fr' ? 1 : (APP.session.email === 'durand.parent@ecole.fr' ? 2 : 3);
  var parent = findById(MOCK.parents, pid);

  var h = '';
  parent.childrenIds.forEach(function(sid) {
    var s = findById(MOCK.students, sid);
    var abs = MOCK.absences.filter(function(a){return a.studentId===sid;});

    h += '<div class="card mb-3"><div class="card-header"><h3>' + s.firstName + ' ' + s.lastName + '</h3>'
      + '<div>' + '<span class="badge badge-danger">' + abs.filter(function(a){return a.type==='absence';}).length + ' absences</span> '
      + '<span class="badge badge-warning">' + abs.filter(function(a){return a.type==='retard';}).length + ' retards</span></div></div>'
      + '<div class="table-container"><table class="table"><thead><tr><th>Date</th><th>Type</th><th>Motif</th><th>Justifié</th></tr></thead><tbody>';
    abs.forEach(function(a) {
      h += '<tr><td>' + a.date + '</td><td>' + (a.type === 'absence' ? '<span class="badge badge-danger">Absence</span>' : '<span class="badge badge-warning">Retard</span>') + '</td>'
        + '<td>' + (a.reason || '-') + '</td><td>' + (a.justified ? '<span class="badge badge-success">Oui</span>' : '<span class="badge badge-danger">Non</span>') + '</td></tr>';
    });
    h += '</tbody></table></div></div>';
  });
  c.innerHTML = h || '<div class="empty-state"><div class="empty-icon">' + ICONS.clock + '</div><h3>Aucune absence</h3></div>';
}

function renderParentRecord(c) {
  var pid = APP.session.email === 'parent@ecole.fr' ? 1 : (APP.session.email === 'durand.parent@ecole.fr' ? 2 : 3);
  var parent = findById(MOCK.parents, pid);

  var h = '';
  parent.childrenIds.forEach(function(sid) {
    var s = findById(MOCK.students, sid);
    var puns = MOCK.punitions.filter(function(p){return p.studentId===sid;});
    var bm = MOCK.bonusMalus.filter(function(b){return b.studentId===sid;});

    h += '<div class="card mb-3"><div class="card-header"><h3>' + s.firstName + ' ' + s.lastName + '</h3></div><div class="card-body">';
    if (!puns.length && !bm.length) {
      h += '<p class="text-muted">Aucun incident enregistré.</p>';
    } else {
      bm.forEach(function(b) {
        var t = findById(MOCK.teachers, b.teacherId);
        var cls = b.value > 0 ? 'badge-success' : 'badge-danger';
        var icon = b.value > 0 ? ICONS.arrowTrendingUp : ICONS.arrowTrendingDown;         h += '<div class="list-item">'
          + '<span class="badge ' + cls + '">' + icon + ' ' + (b.value > 0 ? '+' : '') + b.value + '</span>'
          + '<span class="flex-1">' + b.reason + '</span><span class="list-item-date-sm">' + b.date + '</span></div>';
      });
      puns.forEach(function(p) {         h += '<div class="list-item">'
          + '<span class="badge badge-danger">' + punTypeLabel(p.type) + '</span>'
          + '<span class="flex-1">' + p.description + '</span><span class="list-item-date-sm">' + p.date + '</span></div>';
      });
    }
    h += '</div></div>';
  });
  c.innerHTML = h;
}

/* ============================================
   STUDENT EXAM VIEW
   ============================================ */
function renderMyExams(c) {
  loadCalendarEvents();
  var exams = [];
  for (var i = 0; i < CALENDAR_EVENTS.length; i++) {
    if (CALENDAR_EVENTS[i].type === 'academic') {
      exams.push(CALENDAR_EVENTS[i]);
    }
  }

  var now = new Date();
  var upcoming = [];
  var past = [];
  for (var j = 0; j < exams.length; j++) {
    if (new Date(exams[j].date) >= now) {
      upcoming.push(exams[j]);
    } else {
      past.push(exams[j]);
    }
  }
  upcoming.sort(function(a,b){return new Date(a.date)-new Date(b.date);});
  past.sort(function(a,b){return new Date(b.date)-new Date(a.date);});

  var h = '<div class="stats-grid" style="margin-bottom:24px;">'
    + statCard(ICONS.calendar, 'Examens à venir', upcoming.length, 'info')
    + statCard(ICONS.chartBar, 'Examens passés', past.length, 'neutral')
    + '</div>';

  h += '<div class="card"><div class="card-header"><h3>' + ICONS.calendar + ' Examens à venir</h3></div><div class="card-body">';
  if (upcoming.length === 0) {
    h += '<div class="empty-state"><p>Aucun examen prévu.</p></div>';
  } else {
    h += '<div class="table-container"><table class="table"><thead><tr><th>Date</th><th>Événement</th><th>Période</th></tr></thead><tbody>';
    for (var u = 0; u < upcoming.length; u++) {
      h += '<tr><td><span class="badge badge-info">' + upcoming[u].date + '</span></td>'
        + '<td>' + upcoming[u].title + '</td>'
        + '<td>' + (upcoming[u].endDate && upcoming[u].endDate !== upcoming[u].date ? upcoming[u].date + ' → ' + upcoming[u].endDate : upcoming[u].date) + '</td></tr>';
    }
    h += '</tbody></table></div>';
  }
  h += '</div></div>';

  h += '<div class="card mt-3"><div class="card-header"><h3>' + ICONS.chartBar + ' Examens passés</h3></div><div class="card-body">';
  if (past.length === 0) {
    h += '<div class="empty-state"><p>Aucun examen passé.</p></div>';
  } else {
    h += '<div class="table-container"><table class="table"><thead><tr><th>Date</th><th>Événement</th><th>Période</th></tr></thead><tbody>';
    for (var p = 0; p < past.length; p++) {
      h += '<tr><td><span class="badge badge-neutral">' + past[p].date + '</span></td>'
        + '<td>' + past[p].title + '</td>'
        + '<td>' + (past[p].endDate && past[p].endDate !== past[p].date ? past[p].date + ' → ' + past[p].endDate : past[p].date) + '</td></tr>';
    }
    h += '</tbody></table></div>';
  }
  h += '</div></div>';

  c.innerHTML = h;
}

/* ============================================
   CALENDAR — Connecté à l'API
   ============================================ */
/* Calendrier state */
var calYear, calMonth;
var CALENDAR_EVENTS = [];

/* Charger les événements depuis l'API (ou fallback MOCK) */
function loadCalendarEvents(year, month) {
  var url = '/api/calendar';
  if (year !== undefined && month !== undefined) {
    url += '?year=' + year + '&month=' + (month + 1);
  }
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url, false); /* synchrone pour simplifier le rendu */
  try {
    xhr.send();
    if (xhr.status === 200) {
      CALENDAR_EVENTS = JSON.parse(xhr.responseText);
    } else {
      CALENDAR_EVENTS = MOCK.calendar || [];
    }
  } catch(e) {
    /* Serveur indisponible : utiliser les données mockées */
    CALENDAR_EVENTS = MOCK.calendar || [];
  }
}

function renderCalendar(c, yearOffset, monthOffset) {
  if (!window._calInit) {
    var now = new Date();
    calYear = now.getFullYear();
    calMonth = now.getMonth();
    window._calInit = true;
  }
  if (monthOffset) {
    calMonth += monthOffset;
    if (calMonth > 11) { calMonth = 0; calYear++; }
    if (calMonth < 0) { calMonth = 11; calYear--; }
  }
  var year = calYear;
  var month = calMonth;
  var firstDay = new Date(year, month, 1).getDay();
  var daysInMonth = new Date(year, month + 1, 0).getDate();
  var monthNames = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
  var dayNames = ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'];
  var isAdmin = APP.role === 'admin';

  /* Charger les événements du mois */
  loadCalendarEvents(year, month);

  var eventsThisMonth = CALENDAR_EVENTS.filter(function(ev) {
    var d = new Date(ev.date);
    return d.getMonth() === month && d.getFullYear() === year;
  });

  /* Filtres par type */
  var calFilter = window._calFilter || 'all';
  var filteredEvents = eventsThisMonth;
  if (calFilter !== 'all') {
    filteredEvents = [];
    for (var fe = 0; fe < eventsThisMonth.length; fe++) {
      if (eventsThisMonth[fe].type === calFilter) {
        filteredEvents.push(eventsThisMonth[fe]);
      }
    }
  }

  /* Bouton Ajouter pour admin */
  if (isAdmin) {
    document.getElementById('headerActions').innerHTML = '<button class="btn btn-primary" onclick="openCalendarEventModal()">' + ICONS.plus + ' Ajouter un événement</button>';
  }

  var calId = 'calGrid_' + Math.random().toString(36).substr(2, 5);

  var h = '<div class="card"><div class="card-header">' +
    '<div class="calendar-nav">' +
    '<button class="calendar-nav-btn" onclick="window._calInit=false;renderCalendar(document.getElementById(\'contentBody\'),0,-1)" aria-label="Mois précédent">' + ICONS.chevronRight.replace('rotate(0)', 'rotate(180deg)') + '</button>' +
    '<span class="calendar-nav-title">' + monthNames[month] + ' ' + year + '</span>' +
    '<button class="calendar-nav-btn" onclick="window._calInit=false;renderCalendar(document.getElementById(\'contentBody\'),0,1)" aria-label="Mois suivant">' + ICONS.chevronRight + '</button>' +
    '</div>' +
  '</div><div class="card-body">'
    + '<div class="calendar-grid">';

  dayNames.forEach(function(d) { h += '<div class="calendar-header-cell">' + d + '</div>'; });

  /* Jours vides avant le 1er */
  var startDay = firstDay === 0 ? 6 : firstDay - 1;
  for (var i = 0; i < startDay; i++) { h += '<div class="calendar-cell other-month"></div>'; }

  var now = new Date();
  var today = now.getDate();
  for (var d = 1; d <= daysInMonth; d++) {
    var isToday = d === today && month === now.getMonth() && year === now.getFullYear();
    h += '<div class="calendar-cell' + (isToday ? ' today' : '') + '"><div class="calendar-day">' + d + '</div>';
    for (var ei = 0; ei < filteredEvents.length; ei++) {
      var ev = filteredEvents[ei];
      var evDay = new Date(ev.date).getDate();
      if (evDay === d) {
        var typeCls = ev.type === 'academic' ? 'academic' : ev.type === 'cultural' ? 'cultural' : ev.type === 'sport' ? 'sport' : 'holiday';
        var adminActions = isAdmin
          ? '<div class="cal-event-actions">'
            + '<button class="cal-event-edit" onclick="event.stopPropagation();openCalendarEventModal(\'' + ev.id + '\')" title="Modifier">' + ICONS.pencil + '</button>'
            + '<button class="cal-event-delete" onclick="event.stopPropagation();confirmDeleteCalendar(\'' + ev.id + '\',\'' + ev.title.replace(/'/g, "\\'") + '\')" title="Supprimer">' + ICONS.trash + '</button>'
            + '</div>'
          : '';
        h += '<div class="calendar-event ' + typeCls + '">'
          + '<div class="cal-event-title">' + ev.title + '</div>'
          + adminActions
          + '</div>';
      }
    }
    h += '</div>';
  }

  h += '</div></div></div>';

  /* Filtres */
  var filterTabs = ['all','academic','cultural','sport','holiday'];
  var filterLabels = { all:'Tous', academic:'Académique', cultural:'Culturel', sport:'Sportif', holiday:'Vacances' };
  h += '<div class="card mt-3"><div class="card-body">'
    + '<div class="cal-filter-tabs">';
  for (var ft = 0; ft < filterTabs.length; ft++) {
    var fk = filterTabs[ft];
    var activeCls = calFilter === fk ? ' cal-filter-active' : '';
    h += '<button class="cal-filter-tab' + activeCls + '" onclick="window._calFilter=\'' + fk + '\';renderCalendar(document.getElementById(\'contentBody\'))">' + filterLabels[fk] + '</button>';
  }
  h += '</div></div></div>';

  /* Prochains événements */
  h += '<div class="card mt-3"><div class="card-header"><h3>Prochains événements</h3></div><div class="card-body" id="' + calId + '">';
  if (CALENDAR_EVENTS.length === 0) {
    h += '<div class="empty-state"><div class="empty-icon">' + ICONS.calendarDays + '</div><p>Aucun événement à venir.</p></div>';
  } else {
    CALENDAR_EVENTS.sort(function(a,b){return new Date(a.date)-new Date(b.date);}).forEach(function(ev) {
      var typeLabel = ev.type === 'academic' ? 'Acad.' : ev.type === 'cultural' ? 'Cult.' : ev.type === 'sport' ? 'Sport' : 'Vac.';
      h += '<div class="list-item">'
        + '<span class="list-item-date">' + ev.date + '</span>'
        + '<span class="list-item-title">' + ev.title + '</span>'
        + '<span class="badge badge-info" style="margin-left:auto;font-size:0.65rem;">' + typeLabel + '</span>'
        + '</div>';
    });
  }
  h += '</div></div>';

  c.innerHTML = h;
}

/* --- Modal Événement Calendrier --- */
function openCalendarEventModal(id) {
  var isEdit = !!id;
  var ev = null;
  if (isEdit) {
    for (var i = 0; i < CALENDAR_EVENTS.length; i++) {
      if (CALENDAR_EVENTS[i].id === id) {
        ev = CALENDAR_EVENTS[i];
        break;
      }
    }
  }

  var todayStr = new Date().toISOString().split('T')[0];

  var h = '<form onsubmit="return false;">'
    + '<div class="form-group"><label for="cal-title">Titre *</label>'
    + '<input type="text" id="cal-title" class="form-control" value="' + (ev ? ev.title.replace(/"/g, '&quot;') : '') + '" placeholder="Ex: DS Groupe 1" required></div>'
    + '<div class="form-group"><label for="cal-date">Date *</label>'
    + '<input type="date" id="cal-date" class="form-control" value="' + (ev ? ev.date : todayStr) + '" required></div>'
    + '<div class="form-group"><label for="cal-endDate">Date de fin</label>'
    + '<input type="date" id="cal-endDate" class="form-control" value="' + (ev && ev.endDate ? ev.endDate : '') + '"></div>'
    + '<div class="form-group"><label for="cal-type">Type *</label>'
    + '<select id="cal-type" class="form-control" required>'
    + '<option value="academic"' + (ev && ev.type === 'academic' ? ' selected' : '') + '>Académique</option>'
    + '<option value="cultural"' + (ev && ev.type === 'cultural' ? ' selected' : '') + '>Culturel</option>'
    + '<option value="sport"' + (ev && ev.type === 'sport' ? ' selected' : '') + '>Sportif</option>'
    + '<option value="holiday"' + (ev && ev.type === 'holiday' ? ' selected' : '') + '>Vacances</option>'
    + '</select></div>'
    + '<div class="form-group"><label for="cal-desc">Description</label>'
    + '<textarea id="cal-desc" class="form-control" rows="3" placeholder="Description optionnelle...">' + (ev && ev.description ? ev.description.replace(/"/g, '&quot;') : '') + '</textarea></div>'
    + '</form>';

  APP.editingEntity = isEdit ? id : null;

  var modalBody = h;
  var modalTitle = isEdit ? 'Modifier un événement' : 'Ajouter un événement';
  var footer = '<button class="btn btn-outline" onclick="closeModal()">Annuler</button>'
    + '<button class="btn btn-primary" onclick="saveCalendarEvent()">' + ICONS.check + ' Enregistrer</button>';

  document.getElementById('modalContent').innerHTML = ''
    + '<div class="modal-header"><h2>' + modalTitle + '</h2><button class="modal-close" onclick="closeModal()">' + ICONS.xMark + '</button></div>'
    + '<div class="modal-body">' + modalBody + '</div>'
    + '<div class="modal-footer">' + footer + '</div>';
  document.getElementById('modalOverlay').classList.add('active');
}

function saveCalendarEvent() {
  var title = document.getElementById('cal-title').value.trim();
  var date = document.getElementById('cal-date').value;
  var endDate = document.getElementById('cal-endDate').value || date;
  var type = document.getElementById('cal-type').value;
  var description = document.getElementById('cal-desc').value.trim();

  if (!title || !date || !type) {
    showToast('Veuillez remplir tous les champs obligatoires.', 'error');
    return;
  }

  var isEdit = APP.editingEntity !== null;
  var url = isEdit ? '/api/calendar/' + APP.editingEntity : '/api/calendar';
  var method = isEdit ? 'PUT' : 'POST';
  var body = JSON.stringify({ title: title, date: date, endDate: endDate, type: type, description: description });

  var session = JSON.parse(localStorage.getItem('ecole_session') || '{}');
  var token = session.token;

  /* Si token mocké ou API indisponible, enregistrer localement */
  if (!token || token.indexOf('mock-') === 0) {
    saveCalendarEventLocal(isEdit, title, date, endDate, type, description);
    return;
  }

  var xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Authorization', 'Bearer ' + token);

  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
      closeModal();
      showToast(isEdit ? 'Événement modifié avec succès.' : 'Événement ajouté avec succès.', 'success');
      window._calInit = false;
      renderView('calendar-view');
    } else if (xhr.status === 401) {
      /* Token invalide : fallback local */
      saveCalendarEventLocal(isEdit, title, date, endDate, type, description);
    } else {
      try {
        var err = JSON.parse(xhr.responseText);
        showToast(err.error || 'Erreur lors de l\'enregistrement.', 'error');
      } catch(e) {
        showToast('Erreur lors de l\'enregistrement.', 'error');
      }
    }
  };
  xhr.onerror = function() {
    /* Serveur indisponible : fallback local */
    saveCalendarEventLocal(isEdit, title, date, endDate, type, description);
  };
  xhr.send(body);
}

/* Sauvegarde locale (fallback quand le serveur API est indisponible) */
function saveCalendarEventLocal(isEdit, title, date, endDate, type, description) {
  if (isEdit) {
    for (var i = 0; i < CALENDAR_EVENTS.length; i++) {
      if (CALENDAR_EVENTS[i].id === APP.editingEntity) {
        CALENDAR_EVENTS[i].title = title;
        CALENDAR_EVENTS[i].date = date;
        CALENDAR_EVENTS[i].endDate = endDate;
        CALENDAR_EVENTS[i].type = type;
        CALENDAR_EVENTS[i].description = description;
        break;
      }
    }
    /* Also update MOCK.calendar */
    for (var j = 0; j < MOCK.calendar.length; j++) {
      if (MOCK.calendar[j].id === APP.editingEntity) {
        MOCK.calendar[j].title = title;
        MOCK.calendar[j].date = date;
        MOCK.calendar[j].endDate = endDate;
        MOCK.calendar[j].type = type;
        break;
      }
    }
  } else {
    var newId = Date.now();
    var ev = { id: newId, title: title, date: date, endDate: endDate, type: type, description: description };
    CALENDAR_EVENTS.push(ev);
    MOCK.calendar.push(ev);
  }
  closeModal();
  showToast((isEdit ? 'Événement modifié' : 'Événement ajouté') + ' (mode local).', 'success');
  window._calInit = false;
  renderView('calendar-view');
}

/* --- Confirmation de suppression --- */
function confirmDeleteCalendar(id, title) {
  document.getElementById('confirmContent').innerHTML = ''
    + '<div class="confirm-icon">' + ICONS.exclamationTriangle + '</div>'
    + '<div class="confirm-text"><h3>Supprimer cet événement ?</h3>'
    + '<p>\'' + title + '\' sera définitivement supprimé.</p></div>'
    + '<div class="modal-footer confirm-footer">'
    + '<button class="btn btn-outline" onclick="closeConfirm()">Annuler</button>'
    + '<button class="btn btn-danger" onclick="deleteCalendarEvent(\'' + id + '\')">' + ICONS.trash + ' Supprimer</button>'
    + '</div>';
  document.getElementById('confirmOverlay').classList.add('active');
}

function deleteCalendarEvent(id) {
  var session = JSON.parse(localStorage.getItem('ecole_session') || '{}');
  var token = session.token;

  /* Si token mocké ou API indisponible, supprimer localement */
  if (!token || token.indexOf('mock-') === 0) {
    deleteCalendarEventLocal(id);
    return;
  }

  var xhr = new XMLHttpRequest();
  xhr.open('DELETE', '/api/calendar/' + id, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.setRequestHeader('Authorization', 'Bearer ' + token);

  xhr.onload = function() {
    if (xhr.status >= 200 && xhr.status < 300) {
      closeConfirm();
      showToast('Événement supprimé.', 'success');
      window._calInit = false;
      renderView('calendar-view');
    } else if (xhr.status === 401) {
      deleteCalendarEventLocal(id);
    } else {
      try {
        var err = JSON.parse(xhr.responseText);
        showToast(err.error || 'Erreur lors de la suppression.', 'error');
      } catch(e) {
        showToast('Erreur lors de la suppression.', 'error');
      }
    }
  };
  xhr.onerror = function() {
    deleteCalendarEventLocal(id);
  };
  xhr.send();
}

/* Suppression locale (fallback) */
/* ============================================
   SITE EDITOR
   ============================================ */
var _siteEditingPage = null;

function renderSiteEditor(c) {
  if (typeof SITE_load === 'undefined') {
    c.innerHTML = '<div class="empty-state"><div class="empty-icon">' + ICONS.exclamationTriangle + '</div><h3>Module éditeur non chargé</h3><p>Le fichier site-editor.js est manquant.</p></div>';
    return;
  }
  var data = SITE_load();
  document.getElementById('headerActions').innerHTML = ''
    + '<button class="btn btn-primary" onclick="openSitePageModal()">' + ICONS.plus + ' Nouvelle page</button>'
    + '<button class="btn btn-success" onclick="openSiteLogoModal()">' + ICONS.paintbrush + ' Logo</button>'
    + '<button class="btn btn-outline" onclick="openSiteNavModal()">' + ICONS.cog + ' Navigation</button>';

  var pagesHtml = '';
  for (var i = 0; i < data.pages.length; i++) {
    var p = data.pages[i];
    pagesHtml += '<div class="nav-item-sm" onclick="editSitePage(\'' + p.id + '\')">'
      + '<span>' + p.title + '</span>'
      + '<span class="badge ' + (p.published ? 'badge-success' : 'badge-neutral') + '" style="font-size:0.6rem;">' + (p.published ? 'Publié' : 'Brouillon') + '</span>'
      + '</div>';
  }

  var previewHtml = '<div class="empty-state"><div class="empty-icon">' + ICONS.calendarDays + '</div><h3>Sélectionnez une page</h3><p>Choisissez une page dans la liste pour l\'éditer.</p></div>';

  c.innerHTML = '<div class="site-editor-layout">'
    + '<div class="site-editor-sidebar"><h4>' + ICONS.calendar + ' Pages du site</h4>'
    + pagesHtml
    + '<div style="margin-top:var(--space-4);padding-top:var(--space-3);border-top:1px solid #000;">'
    + '<h4>Images</h4>'
    + '<button class="btn btn-ghost btn-sm w-full" onclick="openSiteImageModal()" style="font-size:0.75rem;">' + ICONS.plus + ' Ajouter une image</button>'
    + '</div></div>'
    + '<div class="site-editor-main" id="siteEditorMain">' + previewHtml + '</div></div>';
}

function editSitePage(pageId) {
  _siteEditingPage = pageId;
  var data = SITE_load();
  var page = null;
  for (var i = 0; i < data.pages.length; i++) {
    if (data.pages[i].id === pageId) { page = data.pages[i]; break; }
  }
  if (!page) return;

  var main = document.getElementById('siteEditorMain');
  if (!main) return;

  /* Highlight active page */
  var allNav = main.parentNode.querySelectorAll('.nav-item-sm');
  for (var n = 0; n < allNav.length; n++) { allNav[n].classList.remove('active'); }
  var activeEl = main.parentNode.querySelector('[onclick*="' + pageId + '"]');
  if (activeEl) activeEl.classList.add('active');

  var sectionsHtml = '';
  for (var s = 0; s < page.sections.length; s++) {
    var sec = page.sections[s];
    var typeLabel = sec.type.charAt(0).toUpperCase() + sec.type.slice(1);
    var previewText = sec.content.title || sec.content.body || '';
    sectionsHtml += '<div class="section-card">'
      + '<span class="section-type">' + typeLabel + '</span>'
      + '<span class="section-preview">' + previewText.substring(0, 60) + '</span>'
      + '<div class="section-actions">'
      + '<button onclick="openSiteSectionModal(\'' + pageId + '\',\'' + sec.id + '\')" title="Modifier">' + ICONS.pencil + '</button>'
      + '<button onclick="confirmDeleteSection(\'' + pageId + '\',\'' + sec.id + '\')" title="Supprimer">' + ICONS.trash + '</button>'
      + '</div></div>';
  }

  var typeOptions = ['hero','text','features','cta','image'];
  var typeSelectHtml = '<select id="newSectionType" class="form-control" style="width:auto;display:inline-block;">';
  for (var t = 0; t < typeOptions.length; t++) {
    typeSelectHtml += '<option value="' + typeOptions[t] + '">' + typeOptions[t].charAt(0).toUpperCase() + typeOptions[t].slice(1) + '</option>';
  }
  typeSelectHtml += '</select>';

  main.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-4);">'
    + '<h3 style="font-size:1.125rem;font-weight:700;">' + page.title + '</h3>'
    + '<div class="d-flex gap-1">'
    + '<button class="btn btn-sm btn-outline" onclick="openSitePageModal(\'' + pageId + '\')">' + ICONS.pencil + ' Modifier</button>'
    + '<button class="btn btn-sm btn-danger" onclick="confirmDeleteSitePage(\'' + pageId + '\')">' + ICONS.trash + ' Supprimer</button>'
    + '<button class="btn btn-sm btn-primary" onclick="previewSitePage(\'' + pageId + '\')">' + ICONS.eye + ' Aperçu</button>'
    + '</div></div>'
    + '<div style="margin-bottom:var(--space-4);display:flex;gap:var(--space-2);align-items:center;flex-wrap:wrap;">'
    + '<span style="font-weight:600;font-size:0.875rem;">Ajouter une section :</span>'
    + typeSelectHtml
    + '<button class="btn btn-sm btn-primary" onclick="addSiteSection(\'' + pageId + '\')">' + ICONS.plus + ' Ajouter</button>'
    + '</div>'
    + '<div>' + sectionsHtml + '</div>'
    + (sectionsHtml === '' ? '<div class="empty-state"><p>Cette page est vide. Ajoutez des sections ci-dessus.</p></div>' : '');
}

function addSiteSection(pageId) {
  var type = document.getElementById('newSectionType').value;
  var defaults = {
    hero: { title: 'Nouvelle section', subtitle: 'Sous-titre', bgColor: '#16A34A', btnText: 'En savoir plus', btnLink: '#' },
    text: { body: '<p>Contenu texte ici...</p>' },
    features: { title: 'Nos fonctionnalités', items: [{ icon: '✓', text: 'Fonctionnalité 1' }, { icon: '✓', text: 'Fonctionnalité 2' }] },
    cta: { title: 'Appel à l\'action', btnText: 'Contactez-nous', btnLink: '#' },
    image: { src: '', alt: 'Image' }
  };
  SITE_addSection(pageId, type, defaults[type] || {});
  showToast('Section ajoutée.', 'success');
  editSitePage(pageId);
}

function openSiteSectionModal(pageId, sectionId) {
  var data = SITE_load();
  var section = null;
  for (var i = 0; i < data.pages.length; i++) {
    if (data.pages[i].id === pageId) {
      for (var j = 0; j < data.pages[i].sections.length; j++) {
        if (data.pages[i].sections[j].id === sectionId) {
          section = data.pages[i].sections[j];
          break;
        }
      }
      break;
    }
  }
  if (!section) return;

  var c = section.content;
  var fields = [];

  if (section.type === 'hero') {
    fields = [
      { name: 'title', label: 'Titre', type: 'text', value: c.title || '' },
      { name: 'subtitle', label: 'Sous-titre', type: 'text', value: c.subtitle || '' },
      { name: 'btnText', label: 'Texte du bouton', type: 'text', value: c.btnText || '' },
      { name: 'btnLink', label: 'Lien du bouton', type: 'text', value: c.btnLink || '' },
      { name: 'bgColor', label: 'Couleur de fond', type: 'color', value: c.bgColor || '#16A34A' }
    ];
  } else if (section.type === 'text') {
    fields = [
      { name: 'body', label: 'Contenu (HTML)', type: 'textarea', value: c.body || '' }
    ];
  } else if (section.type === 'features') {
    var itemsStr = '';
    if (c.items) {
      for (var it = 0; it < c.items.length; it++) {
        itemsStr += (it > 0 ? '\n' : '') + (c.items[it].icon || '') + '|' + (c.items[it].text || '');
      }
    }
    fields = [
      { name: 'title', label: 'Titre', type: 'text', value: c.title || '' },
      { name: 'items_raw', label: 'Éléments (icône|texte par ligne)', type: 'textarea', value: itemsStr }
    ];
  } else if (section.type === 'cta') {
    fields = [
      { name: 'title', label: 'Titre', type: 'text', value: c.title || '' },
      { name: 'btnText', label: 'Texte du bouton', type: 'text', value: c.btnText || '' },
      { name: 'btnLink', label: 'Lien du bouton', type: 'text', value: c.btnLink || '' }
    ];
  } else if (section.type === 'image') {
    var imgOptions = '<option value="">— Sélectionner —</option>';
    for (var im = 0; im < data.images.length; im++) {
      var selected = data.images[im].dataUrl === c.src ? ' selected' : '';
      imgOptions += '<option value="' + im + '"' + selected + '>' + data.images[im].name + '</option>';
    }
    fields = [
      { name: 'src', label: 'Image', type: 'select', options: imgOptions, value: '' },
      { name: 'alt', label: 'Texte alternatif', type: 'text', value: c.alt || '' }
    ];
  }

  var formHtml = '<form onsubmit="return false;">';
  for (var f = 0; f < fields.length; f++) {
    var field = fields[f];
    formHtml += '<div class="form-group"><label for="sec-' + field.name + '">' + field.label + '</label>';
    if (field.type === 'textarea') {
      formHtml += '<textarea id="sec-' + field.name + '" class="form-control" rows="4">' + (field.value || '').replace(/"/g, '&quot;') + '</textarea>';
    } else if (field.type === 'color') {
      formHtml += '<input type="color" id="sec-' + field.name + '" class="form-control" style="height:40px;padding:4px;" value="' + field.value + '">';
    } else if (field.type === 'select') {
      formHtml += '<select id="sec-' + field.name + '" class="form-control">' + field.options + '</select>';
    } else {
      formHtml += '<input type="text" id="sec-' + field.name + '" class="form-control" value="' + (field.value || '').replace(/"/g, '&quot;') + '">';
    }
    formHtml += '</div>';
  }
  formHtml += '</form>';

  APP._editSectionContext = { pageId: pageId, sectionId: sectionId, type: section.type };

  document.getElementById('modalContent').innerHTML = ''
    + '<div class="modal-header"><h2>Section ' + section.type + '</h2><button class="modal-close" onclick="closeModal()">' + ICONS.xMark + '</button></div>'
    + '<div class="modal-body">' + formHtml + '</div>'
    + '<div class="modal-footer">'
    + '<button class="btn btn-outline" onclick="closeModal()">Annuler</button>'
    + '<button class="btn btn-primary" onclick="saveSiteSection()">' + ICONS.check + ' Enregistrer</button>'
    + '</div>';
  document.getElementById('modalOverlay').classList.add('active');
}

function saveSiteSection() {
  var ctx = APP._editSectionContext;
  if (!ctx) return;

  var content = {};
  if (ctx.type === 'hero') {
    content.title = document.getElementById('sec-title').value.trim();
    content.subtitle = document.getElementById('sec-subtitle').value.trim();
    content.btnText = document.getElementById('sec-btnText').value.trim();
    content.btnLink = document.getElementById('sec-btnLink').value.trim();
    content.bgColor = document.getElementById('sec-bgColor').value;
  } else if (ctx.type === 'text') {
    content.body = document.getElementById('sec-body').value;
  } else if (ctx.type === 'features') {
    content.title = document.getElementById('sec-title').value.trim();
    var raw = document.getElementById('sec-items_raw').value;
    var lines = raw.split('\n');
    content.items = [];
    for (var i = 0; i < lines.length; i++) {
      var parts = lines[i].split('|');
      content.items.push({ icon: parts[0] || '✓', text: parts[1] || parts[0] || '' });
    }
  } else if (ctx.type === 'cta') {
    content.title = document.getElementById('sec-title').value.trim();
    content.btnText = document.getElementById('sec-btnText').value.trim();
    content.btnLink = document.getElementById('sec-btnLink').value.trim();
  } else if (ctx.type === 'image') {
    var data = SITE_load();
    var idx = parseInt(document.getElementById('sec-src').value);
    content.src = (!isNaN(idx) && data.images[idx]) ? data.images[idx].dataUrl : '';
    content.alt = document.getElementById('sec-alt').value.trim();
  }

  SITE_updateSection(ctx.pageId, ctx.sectionId, content);
  closeModal();
  showToast('Section mise à jour.', 'success');
  editSitePage(ctx.pageId);
}

function confirmDeleteSection(pageId, sectionId) {
  document.getElementById('confirmContent').innerHTML = ''
    + '<div class="confirm-icon">' + ICONS.exclamationTriangle + '</div>'
    + '<div class="confirm-text"><h3>Supprimer cette section ?</h3><p>Cette action est irréversible.</p></div>'
    + '<div class="modal-footer confirm-footer">'
    + '<button class="btn btn-outline" onclick="closeConfirm()">Annuler</button>'
    + '<button class="btn btn-danger" onclick="doDeleteSection(\'' + pageId + '\',\'' + sectionId + '\')">' + ICONS.trash + ' Supprimer</button>'
    + '</div>';
  document.getElementById('confirmOverlay').classList.add('active');
}

function doDeleteSection(pageId, sectionId) {
  SITE_deleteSection(pageId, sectionId);
  closeConfirm();
  showToast('Section supprimée.', 'success');
  editSitePage(pageId);
}

function openSitePageModal(editId) {
  var data = SITE_load();
  var isEdit = !!editId;
  var page = null;
  if (isEdit) {
    for (var i = 0; i < data.pages.length; i++) {
      if (data.pages[i].id === editId) { page = data.pages[i]; break; }
    }
  }

  var formHtml = '<form onsubmit="return false;">'
    + '<div class="form-group"><label for="page-title">Titre de la page *</label>'
    + '<input type="text" id="page-title" class="form-control" value="' + (page ? page.title.replace(/"/g, '&quot;') : '') + '" placeholder="Ex: À propos"></div>'
    + '<div class="form-group"><label for="page-slug">Slug (URL)</label>'
    + '<input type="text" id="page-slug" class="form-control" value="' + (page ? page.slug : '') + '" placeholder="Ex: a-propos"></div>'
    + '<div class="form-group"><label><input type="checkbox" id="page-published"' + (page && page.published ? ' checked' : '') + '> Page publiée</label></div>'
    + '</form>';

  APP._editPageId = editId || null;

  document.getElementById('modalContent').innerHTML = ''
    + '<div class="modal-header"><h2>' + (isEdit ? 'Modifier la page' : 'Nouvelle page') + '</h2><button class="modal-close" onclick="closeModal()">' + ICONS.xMark + '</button></div>'
    + '<div class="modal-body">' + formHtml + '</div>'
    + '<div class="modal-footer">'
    + '<button class="btn btn-outline" onclick="closeModal()">Annuler</button>'
    + '<button class="btn btn-primary" onclick="saveSitePage()">' + ICONS.check + ' Enregistrer</button>'
    + '</div>';
  document.getElementById('modalOverlay').classList.add('active');
}

function saveSitePage() {
  var title = document.getElementById('page-title').value.trim();
  if (!title) { showToast('Le titre est requis.', 'error'); return; }
  var slug = document.getElementById('page-slug').value.trim() || title.toLowerCase().replace(/[^a-z0-9]+/g,'-');
  var published = document.getElementById('page-published').checked;

  if (APP._editPageId) {
    SITE_updatePage(APP._editPageId, { title: title, slug: slug, published: published });
    showToast('Page modifiée.', 'success');
  } else {
    SITE_addPage(title, slug);
    SITE_updatePage(SITE_load().pages[SITE_load().pages.length - 1].id, { published: published });
    showToast('Page créée.', 'success');
  }
  closeModal();
  renderSiteEditor(document.getElementById('contentBody'));
}

function confirmDeleteSitePage(pageId) {
  document.getElementById('confirmContent').innerHTML = ''
    + '<div class="confirm-icon">' + ICONS.exclamationTriangle + '</div>'
    + '<div class="confirm-text"><h3>Supprimer cette page ?</h3><p>Toutes ses sections seront perdues.</p></div>'
    + '<div class="modal-footer confirm-footer">'
    + '<button class="btn btn-outline" onclick="closeConfirm()">Annuler</button>'
    + '<button class="btn btn-danger" onclick="doDeleteSitePage(\'' + pageId + '\')">' + ICONS.trash + ' Supprimer</button>'
    + '</div>';
  document.getElementById('confirmOverlay').classList.add('active');
}

function doDeleteSitePage(pageId) {
  SITE_deletePage(pageId);
  closeConfirm();
  showToast('Page supprimée.', 'success');
  _siteEditingPage = null;
  renderSiteEditor(document.getElementById('contentBody'));
}

function openSiteLogoModal() {
  var data = SITE_load();
  var formHtml = '<form onsubmit="return false;">'
    + '<div class="form-group"><label for="logo-text">Texte du logo</label>'
    + '<input type="text" id="logo-text" class="form-control" value="' + (data.logo.text || 'FT3').replace(/"/g, '&quot;') + '"></div>'
    + '<div class="form-group"><label for="logo-icon">Icône (emoji)</label>'
    + '<input type="text" id="logo-icon" class="form-control" value="' + (data.logo.icon || '🎓') + '" maxlength="4"></div>'
    + '<div class="form-group"><label>Logo image (optionnel, remplace texte)</label>'
    + '<input type="file" id="logo-image-input" accept="image/*" class="form-control" style="padding:8px;">'
    + (data.logoImage ? '<div style="margin-top:8px;"><img src="' + data.logoImage + '" style="max-height:60px;border:1px solid #000;"></div><div><button class="btn btn-ghost btn-sm" id="btnDeleteLogoImage">Supprimer l\'image</button></div>' : '')
    + '</div>'
    + '</form>';

  document.getElementById('modalContent').innerHTML = ''
    + '<div class="modal-header"><h2>Logo du site</h2><button class="modal-close" onclick="closeModal()">' + ICONS.xMark + '</button></div>'
    + '<div class="modal-body">' + formHtml + '</div>'
    + '<div class="modal-footer">'
    + '<button class="btn btn-outline" onclick="closeModal()">Annuler</button>'
    + '<button class="btn btn-primary" onclick="saveSiteLogo()">' + ICONS.check + ' Enregistrer</button>'
    + '</div>';
  document.getElementById('modalOverlay').classList.add('active');

  /* Handle image upload */
  var fileInput = document.getElementById('logo-image-input');
  if (fileInput) {
    fileInput.addEventListener('change', function(e) {
      var file = e.target.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function(ev) {
        SITE_setLogoImage(ev.target.result);
        showToast('Logo mis à jour.', 'success');
        closeModal();
        renderSiteEditor(document.getElementById('contentBody'));
      };
      reader.readAsDataURL(file);
    });
  }
}

function saveSiteLogo() {
  var text = document.getElementById('logo-text').value.trim() || 'FT3';
  var icon = document.getElementById('logo-icon').value.trim() || '🎓';
  SITE_setLogo({ text: text, icon: icon });
  closeModal();
  showToast('Logo enregistré.', 'success');
  renderSiteEditor(document.getElementById('contentBody'));
}

function openSiteNavModal() {
  var data = SITE_load();
  var itemsHtml = '';
  for (var i = 0; i < data.nav.length; i++) {
    itemsHtml += '<div class="form-group">'
      + '<div style="display:flex;gap:8px;align-items:center;">'
      + '<input type="text" class="form-control" id="nav-label-' + i + '" value="' + data.nav[i].label.replace(/"/g, '&quot;') + '" placeholder="Label" style="flex:1;">'
      + '<input type="text" class="form-control" id="nav-href-' + i + '" value="' + data.nav[i].href.replace(/"/g, '&quot;') + '" placeholder="Lien" style="flex:1;">'
      + '<button class="btn btn-ghost btn-sm" onclick="removeNavItem(' + i + ');closeModal();openSiteNavModal()" style="color:var(--danger);">' + ICONS.trash + '</button>'
      + '</div></div>';
  }

  var formHtml = '<form onsubmit="return false;">'
    + itemsHtml
    + '<button type="button" class="btn btn-ghost btn-sm" onclick="addNavItem();closeModal();openSiteNavModal()">' + ICONS.plus + ' Ajouter un lien</button>'
    + '</form>';

  document.getElementById('modalContent').innerHTML = ''
    + '<div class="modal-header"><h2>Navigation du site</h2><button class="modal-close" onclick="closeModal()">' + ICONS.xMark + '</button></div>'
    + '<div class="modal-body">' + formHtml + '</div>'
    + '<div class="modal-footer">'
    + '<button class="btn btn-outline" onclick="closeModal()">Annuler</button>'
    + '<button class="btn btn-primary" onclick="saveSiteNav()">' + ICONS.check + ' Enregistrer</button>'
    + '</div>';
  document.getElementById('modalOverlay').classList.add('active');
}

function saveSiteNav() {
  var data = SITE_load();
  var newNav = [];
  for (var i = 0; i < data.nav.length; i++) {
    var label = document.getElementById('nav-label-' + i);
    var href = document.getElementById('nav-href-' + i);
    if (label && href) {
      newNav.push({ label: label.value.trim() || 'Lien', href: href.value.trim() || '#' });
    }
  }
  data.nav = newNav;
  SITE_save(data);
  closeModal();
  showToast('Navigation enregistrée.', 'success');
  renderSiteEditor(document.getElementById('contentBody'));
}

function addNavItem() {
  var data = SITE_load();
  data.nav.push({ label: 'Nouveau lien', href: '#' });
  SITE_save(data);
}

function removeNavItem(idx) {
  var data = SITE_load();
  var newNav = [];
  for (var i = 0; i < data.nav.length; i++) {
    if (i !== idx) newNav.push(data.nav[i]);
  }
  data.nav = newNav;
  SITE_save(data);
}

function openSiteImageModal() {
  var data = SITE_load();
  var existingHtml = '';
  if (data.images.length > 0) {
    existingHtml = '<h4 style="margin-bottom:var(--space-3);font-size:0.875rem;">Images existantes</h4><div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:var(--space-4);">';
    for (var i = 0; i < data.images.length; i++) {
      existingHtml += '<div style="border:1px solid #000;padding:4px;text-align:center;width:100px;">'
        + '<img src="' + data.images[i].dataUrl + '" style="width:80px;height:60px;object-fit:cover;">'
        + '<div style="font-size:0.65rem;overflow:hidden;text-overflow:ellipsis;">' + data.images[i].name + '</div>'
        + '<button class="btn btn-ghost btn-sm" data-action="del-img" data-id="' + data.images[i].id + '" style="font-size:0.6rem;color:var(--danger);">' + ICONS.trash + '</button>'
        + '</div>';
    }
    existingHtml += '</div>';
  }

  var formHtml = '<form onsubmit="return false;">'
    + existingHtml
    + '<div class="form-group"><label for="img-name">Nom de l\'image</label>'
    + '<input type="text" id="img-name" class="form-control" placeholder="Ex: photo-campus"></div>'
    + '<div class="form-group"><label>Fichier image</label>'
    + '<input type="file" id="img-file-input" accept="image/*" class="form-control" style="padding:8px;"></div>'
    + '</form>';

  document.getElementById('modalContent').innerHTML = ''
    + '<div class="modal-header"><h2>Gestion des images</h2><button class="modal-close" onclick="closeModal()">' + ICONS.xMark + '</button></div>'
    + '<div class="modal-body">' + formHtml + '</div>'
    + '<div class="modal-footer">'
    + '<button class="btn btn-outline" onclick="closeModal()">Fermer</button>'
    + '<button class="btn btn-primary" onclick="uploadSiteImage()">' + ICONS.plus + ' Ajouter</button>'
    + '</div>';
  document.getElementById('modalOverlay').classList.add('active');

  /* Delegation pour les boutons data-action dans la modale */
  setTimeout(function(){
    var delBtns = document.querySelectorAll('[data-action=del-img]');
    for (var di = 0; di < delBtns.length; di++) {
      delBtns[di].onclick = function() {
        var id = this.getAttribute('data-id');
        if (id) {
          SITE_deleteImage(id);
          closeModal();
          setTimeout(function(){ openSiteImageModal(); }, 100);
          showToast('Image supprimée.', 'info');
        }
      };
    }
  }, 50);
}

function uploadSiteImage() {
  var fileInput = document.getElementById('img-file-input');
  var nameInput = document.getElementById('img-name');
  if (!fileInput || !fileInput.files || !fileInput.files[0]) {
    showToast('Sélectionnez un fichier image.', 'error');
    return;
  }
  var name = nameInput.value.trim() || fileInput.files[0].name;
  var reader = new FileReader();
  reader.onload = function(ev) {
    SITE_addImage(name, ev.target.result);
    showToast('Image ajoutée.', 'success');
    closeModal();
    renderSiteEditor(document.getElementById('contentBody'));
  };
  reader.readAsDataURL(fileInput.files[0]);
}

function previewSitePage(pageId) {
  var html = SITE_previewHTML(pageId);
  var main = document.getElementById('siteEditorMain');
  if (!main) return;

  main.innerHTML = '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:var(--space-3);">'
    + '<h3 style="font-size:1rem;font-weight:700;">Aperçu</h3>'
    + '<button class="btn btn-sm btn-outline" onclick="editSitePage(\'' + pageId + '\')">' + ICONS.pencil + ' Retour à l\'édition</button>'
    + '</div>'
    + '<div class="site-preview-frame">' + html + '</div>';
}

function deleteCalendarEventLocal(id) {
  var newArr = [];
  for (var i = 0; i < CALENDAR_EVENTS.length; i++) {
    if (CALENDAR_EVENTS[i].id !== id) {
      newArr.push(CALENDAR_EVENTS[i]);
    }
  }
  CALENDAR_EVENTS = newArr;

  /* Also update MOCK.calendar */
  var newMock = [];
  for (var j = 0; j < MOCK.calendar.length; j++) {
    if (MOCK.calendar[j].id !== id) {
      newMock.push(MOCK.calendar[j]);
    }
  }
  MOCK.calendar = newMock;

  closeConfirm();
  showToast('Événement supprimé (mode local).', 'success');
  window._calInit = false;
  renderView('calendar-view');
}

/* ============================================
   ACTIVITIES
   ============================================ */function renderActivities(c) {
  /* Admin CRUD buttons */
  if (APP.role === 'admin') {
    document.getElementById('headerActions').innerHTML = '<button class="btn btn-primary" onclick="openAddModal(\'activities\',\'Activité\')">' + ICONS.plus + ' Ajouter</button>';
  }

  var h = '<div class="tabs">'
    + '<button class="tab-btn active" onclick="filterActivities(\'all\', this)">Toutes</button>'
    + '<button class="tab-btn" onclick="filterActivities(\'extrascolaire\', this)">Extrascolaires</button>'
    + '<button class="tab-btn" onclick="filterActivities(\'culturelle\', this)">Culturelles</button>'
    + '</div>'
    + '<div class="activity-grid" id="activitiesGrid">';

  MOCK.activities.forEach(function(act) {
    var typeBadge = act.type === 'extrascolaire' ? 'badge-info' : 'badge-primary';
    var adminActions = APP.role === 'admin'
      ? '<div class="card-actions">' +
        '<button class="btn btn-ghost btn-sm" onclick="openEditModal(\'activities\',' + act.id + ',\'Activité\')">' + ICONS.pencil + '</button>'
        + '<button class="btn btn-ghost btn-sm" onclick="confirmDelete(\'activities\',' + act.id + ',\'Activité\')">' + ICONS.trash + '</button>'
        + '</div>'
      : '';
    h += '<div class="activity-card" data-type="' + act.type + '">' 
      + adminActions
      + '<div class="activity-card-image">' + (act.type === 'extrascolaire' ? ICONS.sparkles : ICONS.musicalNote) + '</div>'
      + '<div class="activity-card-body"><h4>' + act.name + '</h4>'
      + '<p>' + act.description + '</p></div>'
      + '<div class="activity-card-meta">'
      + '<span>' + ICONS.calendar + ' ' + act.schedule + '</span>'
      + '<span>' + ICONS.users + ' ' + act.enrolled.length + '/' + act.maxStudents + '</span>'
      + '<span class="badge ' + typeBadge + '">' + (act.type === 'extrascolaire' ? 'Extrascolaire' : 'Culturelle') + '</span>'
      + '</div></div>';
  });

  h += '</div>';
  c.innerHTML = h;
}

function filterActivities(type, btn) {
  document.querySelectorAll('.tab-btn').forEach(function(b){b.classList.remove('active');});
  if (btn) btn.classList.add('active');

  document.querySelectorAll('.activity-card').forEach(function(card) {
    if (type === 'all' || card.dataset.type === type) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}

/* ============================================
   SCHOLARSHIPS
   ============================================ */function renderScholarships(c) {
  if (APP.role === 'admin') {
    document.getElementById('headerActions').innerHTML = '<button class="btn btn-primary" onclick="openAddModal(\'scholarships\',\'Bourse\')">' + ICONS.plus + ' Ajouter</button>';
  }

  var h = '<div class="toolbar"><div class="search-box"><span class="search-icon">' + ICONS.magnifyingGlass + '</span>'
    + '<input type="text" id="scholarshipSearch" placeholder="Rechercher un pays..." oninput="filterScholarships()"></div></div>'
    + '<div class="scholarship-grid" id="scholarshipGrid">';

  MOCK.scholarships.forEach(function(s) {
    var adminActions = APP.role === 'admin'
      ? '<div class="card-actions-row">' +
        '<button class="btn btn-ghost btn-sm" onclick="openEditModal(\'scholarships\',' + s.id + ',\'Bourse\')">' + ICONS.pencil + '</button>' +
        '<button class="btn btn-ghost btn-sm" onclick="confirmDelete(\'scholarships\',' + s.id + ',\'Bourse\')">' + ICONS.trash + '</button>' +
        '</div>'
      : '';
    h += '<div class="scholarship-card" data-country="' + s.country.toLowerCase() + '">' 
      + adminActions
      + '<div class="scholarship-card-header"><div class="scholarship-flag">' + s.flag + '</div>'
      + '<div><div class="scholarship-country">' + s.country + '</div><div class="scholarship-type">' + s.name + '</div></div></div>'
      + '<div class="scholarship-card-body">'
      + scholarshipDetail(ICONS.users, 'Éligibilité', s.eligibility)
      + scholarshipDetail(ICONS.calendar, 'Deadline', s.deadline)
      + scholarshipDetail(ICONS.currencyDollar, 'Montant', s.amount)
      + scholarshipDetail(ICONS.arrowTrendingUp, 'Processus', s.process)
      + '</div>'
      + '<div class="scholarship-card-footer"><a href="' + s.url + '" target="_blank" class="btn btn-primary btn-sm btn-block">' + ICONS.globeAlt + ' Visiter le site</a></div>'
      + '</div>';
  });

  h += '</div>';
  c.innerHTML = h;
}

function scholarshipDetail(icon, label, value) {
  return '<div class="scholarship-detail"><span>' + icon + '</span><div><div class="scholarship-detail-label">' + label + '</div><div class="scholarship-detail-value">' + value + '</div></div></div>';
}

function filterScholarships() {
  var q = document.getElementById('scholarshipSearch').value.toLowerCase();
  document.querySelectorAll('.scholarship-card').forEach(function(card) {
    var country = card.dataset.country;
    card.style.display = country.indexOf(q) !== -1 ? '' : 'none';
  });
}

/* ============================================
   FORM HELPERS
   ============================================ */
function formGroupSelect(id, label, options, value) {
  var h = '<div class="form-group"><label for="f-' + id + '">' + label + ' *</label><select id="f-' + id + '" class="form-control" required><option value="">— Sélectionner —</option>';
  options.forEach(function(o) {
    h += '<option value="' + o.value + '"' + (value == o.value ? ' selected' : '') + '>' + o.label + '</option>';
  });
  return h + '</select></div>';
}

function formGroupText(id, label, value, placeholder) {
  return '<div class="form-group"><label for="f-' + id + '">' + label + '</label><input type="text" id="f-' + id + '" class="form-control" value="' + (value || '') + '" placeholder="' + (placeholder || '') + '"></div>';
}

function formGroupNumber(id, label, value, min, max) {
  return '<div class="form-group"><label for="f-' + id + '">' + label + '</label><input type="number" id="f-' + id + '" class="form-control" value="' + (value || '') + '" min="' + (min || '') + '" max="' + (max || '') + '"></div>';
}

function formGroupDate(id, label, value) {
  return '<div class="form-group"><label for="f-' + id + '">' + label + '</label><input type="date" id="f-' + id + '" class="form-control" value="' + (value || '') + '"></div>';
}



/* ============================================
   TOAST
   ============================================ */
function showToast(message, type) {
  var container = document.getElementById('toastContainer');
  var toast = document.createElement('div');
  toast.className = 'toast toast-' + (type || 'info');

  var icons = {
    success: ICONS.check,
    error: ICONS.exclamationTriangle,
    info: '<svg class="heroicon heroicon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"/></svg>',
    warning: ICONS.exclamationTriangle
  };

  toast.innerHTML = '<span class="toast-icon">' + (icons[type] || icons.info) + '</span>'
    + '<span class="toast-message">' + message + '</span>';

  container.appendChild(toast);
  setTimeout(function() {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(function() { toast.remove(); }, 300);
  }, 3000);
}

/* ============================================
   GLOBAL SAVE ROUTER (called from modal buttons)
   ============================================ */
/* Override saveCrud for special entities */
var _origSaveCrud = saveCrud;
saveCrud = function(dataKey) {
  if (dataKey === 'grades') { saveGrade(); return; }
  if (dataKey === 'bonus-malus') { saveBonusMalus(); return; }
  if (dataKey === 'absences') { saveAbsence(); return; }
  if (dataKey === 'punishments') { savePunishment(); return; }
  _origSaveCrud(dataKey);
};

/* ============================================
   THEME SETTINGS — Personnalisation du site public
   ============================================ */
function renderThemeSettings(c) {
  document.getElementById('pageTitle').textContent = 'Personnalisation du site';

  var config = STORE_THEME.load();
  var keys = ['primary', 'primaryLight', 'primaryDark', 'bg', 'surface', 'text', 'textSecondary', 'border', 'accent'];

  /* Color fields */
  var colorFieldsHtml = '';
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    colorFieldsHtml += '<div class="theme-field">'
      + '<label for="theme-' + k + '">' + STORE_THEME.getLabel(k) + '</label>'
      + '<div class="theme-input-row">'
      + '<input type="color" class="theme-color-picker" id="theme-' + k + '" value="' + config[k] + '" aria-label="' + STORE_THEME.getLabel(k) + '">'
      + '<input type="text" class="pub-form-input theme-hex-input" id="theme-' + k + '-text" value="' + config[k] + '" maxlength="7" aria-label="' + STORE_THEME.getLabel(k) + ' (hex)">'
      + '</div></div>';
  }

  /* Text fields */
  var textFieldsHtml = ''
    + '<div class="theme-field"><label for="theme-schoolName">' + STORE_THEME.getLabel('schoolName') + '</label>'
    + '<input type="text" class="pub-form-input" id="theme-schoolName" value="' + config.schoolName.replace(/"/g, '&quot;') + '" aria-label="' + STORE_THEME.getLabel('schoolName') + '"></div>'
    + '<div class="theme-field"><label for="theme-schoolSlogan">' + STORE_THEME.getLabel('schoolSlogan') + '</label>'
    + '<input type="text" class="pub-form-input" id="theme-schoolSlogan" value="' + config.schoolSlogan.replace(/"/g, '&quot;') + '" aria-label="' + STORE_THEME.getLabel('schoolSlogan') + '"></div>';

  var h = '<div class="theme-settings">'
    + '<div class="theme-card">'
    + '<div class="card-header"><h3>' + ICONS.paintbrush + ' Couleurs du thème</h3></div>'
    + '<div class="card-body"><div class="theme-grid">' + colorFieldsHtml + '</div></div>'
    + '</div>'
    + '<div class="theme-card" style="margin-top:20px;">'
    + '<div class="card-header"><h3>' + ICONS.pencil + ' Informations de l\'établissement</h3></div>'
    + '<div class="card-body">' + textFieldsHtml + '</div>'
    + '</div>'
    /* Preview */
    + '<div class="theme-card" style="margin-top:20px;">'
    + '<div class="card-header"><h3>' + ICONS.eye + ' Aperçu en direct</h3></div>'
    + '<div class="card-body">'
    + '<div class="theme-preview" id="themePreview" style="--preview-primary:' + config.primary + ';--preview-primaryLight:' + config.primaryLight + ';--preview-primaryDark:' + config.primaryDark + ';--preview-bg:' + config.bg + ';--preview-surface:' + config.surface + ';--preview-text:' + config.text + ';--preview-textSecondary:' + config.textSecondary + ';--preview-border:' + config.border + ';--preview-accent:' + config.accent + ';">'
    + '<div class="theme-preview-nav" id="previewNav" style="background:var(--preview-surface);border-bottom:1px solid var(--preview-border);padding:12px 20px;display:flex;align-items:center;gap:10px;">'
    + '<div style="width:32px;height:32px;border-radius:6px;background:var(--preview-primary);display:flex;align-items:center;justify-content:center;color:white;font-weight:bold;font-size:14px;">🏫</div>'
    + '<span style="font-weight:600;color:var(--preview-text);font-size:14px;" id="previewSchoolName">' + config.schoolName + '</span>'
    + '<span style="margin-left:auto;padding:6px 14px;border-radius:6px;background:var(--preview-primary);color:white;font-size:12px;font-weight:600;">Espace Privé</span>'
    + '</div>'
    + '<div style="padding:32px 20px;text-align:center;background:var(--preview-bg);">'
    + '<div style="display:inline-block;padding:3px 12px;border-radius:999px;background:var(--preview-primaryLight);color:var(--preview-primaryDark);font-size:11px;font-weight:600;margin-bottom:16px;">Année 2025-2026</div>'
    + '<h2 style="font-size:24px;font-weight:700;color:var(--preview-text);margin-bottom:8px;">Bienvenue à <span style="color:var(--preview-primary);" id="previewSlogan">' + config.schoolSlogan + '</span></h2>'
    + '<p style="color:var(--preview-textSecondary);font-size:14px;max-width:400px;margin:0 auto 20px;">Un établissement moderne, transparent et connecté.</p>'
    + '<div style="display:inline-flex;gap:8px;">'
    + '<span style="padding:10px 24px;border-radius:6px;background:var(--preview-primary);color:white;font-size:14px;font-weight:600;">S\'inscrire</span>'
    + '<span style="padding:10px 24px;border-radius:6px;border:1px solid var(--preview-border);color:var(--preview-textSecondary);font-size:14px;font-weight:600;">Découvrir</span>'
    + '</div></div>'
    + '<div style="padding:12px 20px;background:var(--preview-surface);border-top:1px solid var(--preview-border);text-align:center;font-size:11px;color:var(--preview-textSecondary);">'
    + '© <span id="previewSchoolNameFooter">' + config.schoolName + '</span>. Tous droits réservés.</div>'
    + '</div></div></div>'
    + '</div>'
    /* Actions */
    + '<div class="theme-actions" style="margin-top:20px;display:flex;gap:12px;">'
    + '<button class="btn btn-primary" onclick="saveThemeConfig()">' + ICONS.check + ' Appliquer le thème</button>'
    + '<button class="btn btn-outline" onclick="resetThemeConfig()">' + ICONS.noSymbol + ' Réinitialiser</button>'
    + '</div>';

  c.innerHTML = h;

  /* Sync color picker ↔ text input */
  for (var j = 0; j < keys.length; j++) {
    (function(key) {
      var picker = document.getElementById('theme-' + key);
      var text = document.getElementById('theme-' + key + '-text');
      if (picker && text) {
        picker.addEventListener('input', function() {
          text.value = this.value;
          updatePreview();
        });
        text.addEventListener('input', function() {
          if (/^#[0-9a-f]{6}$/i.test(this.value)) {
            picker.value = this.value;
            updatePreview();
          }
        });
      }
    })(keys[j]);
  }

  /* Preview live update on text inputs */
  document.getElementById('theme-schoolName').addEventListener('input', updatePreview);
  document.getElementById('theme-schoolSlogan').addEventListener('input', updatePreview);
}

function updatePreview() {
  var p = document.getElementById('themePreview');
  if (!p) return;
  var nav = document.getElementById('previewNav');
  var schoolName = document.getElementById('theme-schoolName').value;
  var slogan = document.getElementById('theme-schoolSlogan').value;
  document.getElementById('previewSchoolName').textContent = schoolName;
  document.getElementById('previewSlogan').textContent = slogan;
  var footerEl = document.getElementById('previewSchoolNameFooter');
  if (footerEl) footerEl.textContent = schoolName;

  /* Update preview colors */
  var keys = ['primary', 'primaryLight', 'primaryDark', 'bg', 'surface', 'text', 'textSecondary', 'border', 'accent'];
  for (var i = 0; i < keys.length; i++) {
    var k = keys[i];
    var val = document.getElementById('theme-' + k + '-text').value;
    if (val) {
      p.style.setProperty('--preview-' + k, val);
    }
  }
}

function saveThemeConfig() {
  var config = {
    primary: document.getElementById('theme-primary-text').value,
    primaryLight: document.getElementById('theme-primaryLight-text').value,
    primaryDark: document.getElementById('theme-primaryDark-text').value,
    bg: document.getElementById('theme-bg-text').value,
    surface: document.getElementById('theme-surface-text').value,
    text: document.getElementById('theme-text-text').value,
    textSecondary: document.getElementById('theme-textSecondary-text').value,
    border: document.getElementById('theme-border-text').value,
    accent: document.getElementById('theme-accent-text').value,
    schoolName: document.getElementById('theme-schoolName').value,
    schoolSlogan: document.getElementById('theme-schoolSlogan').value
  };
  STORE_THEME.save(config);
  showToast('Thème appliqué avec succès ! Actualisez le site public pour voir les changements.', 'success');
}

function resetThemeConfig() {
  var defaults = STORE_THEME.reset();
  /* Reload page to reset form */
  navigateTo('theme');
  showToast('Thème réinitialisé aux valeurs par défaut.', 'info');
}

/* ============================================
   CANDIDATES — Gestion des candidatures
   ============================================ */
function renderCandidates(c) {
  document.getElementById('pageTitle').textContent = 'Candidatures';

  var list = STORE_CANDIDATES.getAll();
  var stats = STORE_CANDIDATES.getStats();

  var h = '<div class="stats-grid" style="margin-bottom:24px;">'
    + '<div class="stat-card"><div class="stat-icon primary">' + ICONS.clipboard + '</div><div class="stat-info"><h4>' + stats.total + '</h4><p>Total candidatures</p></div></div>'
    + '<div class="stat-card"><div class="stat-icon warning">' + ICONS.clock + '</div><div class="stat-info"><h4>' + stats.pending + '</h4><p>En attente</p></div></div>'
    + '<div class="stat-card"><div class="stat-icon success">' + ICONS.check + '</div><div class="stat-info"><h4>' + stats.accepted + '</h4><p>Acceptées</p></div></div>'
    + '<div class="stat-card"><div class="stat-icon danger">' + ICONS.noSymbol + '</div><div class="stat-info"><h4>' + stats.rejected + '</h4><p>Rejetées</p></div></div>'
    + '</div>';

  if (list.length === 0) {
    h += '<div class="empty-state"><div class="empty-icon">' + ICONS.clipboard + '</div><h3>Aucune candidature</h3><p>Les inscriptions en ligne apparaîtront ici.</p></div>';
  } else {
    h += '<div class="table-container"><table class="table"><thead><tr>'
      + '<th>Nom</th><th>Prénom</th><th>Âge</th><th>Filière</th><th>Date</th><th>Statut</th><th>Actions</th>'
      + '</tr></thead><tbody>';

    for (var i = 0; i < list.length; i++) {
      var cand = list[i];
      h += '<tr>'
        + '<td><strong>' + cand.nom + '</strong></td>'
        + '<td>' + cand.prenom + '</td>'
        + '<td>' + (cand.age || '—') + ' ans</td>'
        + '<td>' + APP_UTILS.getFiliereLabel(cand.filiere) + '</td>'
        + '<td>' + APP_UTILS.formatDate(cand.createdAt ? cand.createdAt.split('T')[0] : cand.date) + '</td>'
        + '<td>' + APP_UTILS.getStatusBadge(cand.status) + '</td>'
        + '<td><div class="table-actions">'
        + '<button class="btn btn-ghost btn-sm" onclick="viewCandidate(' + cand.id + ')" title="Voir détails">' + ICONS.eye + '</button>'
        + '<button class="btn btn-ghost btn-sm" onclick="updateCandidateStatus(' + cand.id + ',\'accepted\')" title="Accepter" ' + (cand.status === 'accepted' ? 'disabled' : '') + '>' + ICONS.check + '</button>'
        + '<button class="btn btn-ghost btn-sm" onclick="updateCandidateStatus(' + cand.id + ',\'rejected\')" title="Rejeter" ' + (cand.status === 'rejected' ? 'disabled' : '') + '>' + ICONS.noSymbol + '</button>'
        + '</div></td>'
        + '</tr>';
    }
    h += '</tbody></table></div>';
  }

  c.innerHTML = h;
}

function updateCandidateStatus(id, status) {
  STORE_CANDIDATES.updateStatus(id, status);
  renderCandidates(document.getElementById('contentBody'));
  showToast('Statut de la candidature mis à jour.', 'success');
}

function viewCandidate(id) {
  var cand = STORE_CANDIDATES.getById(id);
  if (!cand) { showToast('Candidature introuvable.', 'error'); return; }

  var body = '<div class="candidate-detail">'
    + '<div class="profile-card" style="margin-bottom:24px;">'
    + '<div class="profile-avatar">' + ICONS.user + '</div>'
    + '<div class="profile-info"><h2>' + cand.prenom + ' ' + cand.nom + '</h2>'
    + '<div class="profile-meta">'
    + '<span class="profile-meta-item">' + ICONS.clock + ' ' + (cand.age || '—') + ' ans</span>'
    + '<span class="profile-meta-item">' + ICONS.user + ' ' + cand.phone + '</span>'
    + '<span class="profile-meta-item">' + ICONS.ticket + ' ' + cand.email + '</span>'
    + '</div></div></div>'
    + '<div class="grid-2col">'
    + '<div class="card"><div class="card-header"><h3>' + ICONS.academicCap + ' Parcours</h3></div>'
    + '<div class="card-body">'
    + '<p><strong>Dernier diplôme :</strong> ' + APP_UTILS.getDiplomeLabel(cand.diplome) + '</p>'
    + '<p><strong>Établissement :</strong> ' + (cand.etablissement || '—') + '</p>'
    + '<p><strong>Moyenne :</strong> ' + (cand.moyenne || '—') + '</p>'
    + '</div></div>'
    + '<div class="card"><div class="card-header"><h3>' + ICONS.arrowTrendingUp + ' Vœux</h3></div>'
    + '<div class="card-body">'
    + '<p><strong>Filière :</strong> ' + APP_UTILS.getFiliereLabel(cand.filiere) + '</p>'
    + '<p><strong>Spécialité :</strong> ' + APP_UTILS.getSpecialiteLabel(cand.specialite) + '</p>'
    + '<p><strong>Motivation :</strong> ' + (cand.motivation || '—') + '</p>'
    + '</div></div>'
    + '</div>'
    + '<div class="card" style="margin-top:16px;"><div class="card-header"><h3>' + ICONS.calendarDays + ' Rendez-vous</h3></div>'
    + '<div class="card-body">'
    + '<p><strong>Date :</strong> ' + APP_UTILS.formatDate(cand.rdvDate) + '</p>'
    + '<p><strong>Créneau :</strong> ' + (cand.rdvTime || '—') + '</p>'
    + '<p><strong>Statut :</strong> ' + APP_UTILS.getStatusBadge(cand.status) + '</p>'
    + '</div></div>'
    + '<div style="margin-top:16px;text-align:right;">'
    + '<button class="btn btn-success" onclick="updateCandidateStatus(' + cand.id + ',\'accepted\')">' + ICONS.check + ' Accepter</button> '
    + '<button class="btn btn-danger" onclick="updateCandidateStatus(' + cand.id + ',\'rejected\')">' + ICONS.noSymbol + ' Rejeter</button> '
    + '<button class="btn btn-ghost" onclick="navigateTo(\'candidates\')">Fermer</button>'
    + '</div>'
    + '</div>';

  openModal('Détail candidature — ' + cand.prenom + ' ' + cand.nom, body, null);
}

/* ============================================
   APPOINTMENTS — Gestion des rendez-vous
   ============================================ */
function renderAppointments(c) {
  document.getElementById('pageTitle').textContent = 'Rendez-vous d\'admission';

  /* Get candidates with RDV from localStorage */
  var candidates = STORE_CANDIDATES.getAll();
  var appointments = [];

  for (var i = 0; i < candidates.length; i++) {
    if (candidates[i].rdvDate) {
      appointments.push({
        id: candidates[i].id,
        candidateId: candidates[i].id,
        candidateName: candidates[i].prenom + ' ' + candidates[i].nom,
        date: candidates[i].rdvDate,
        time: candidates[i].rdvTime,
        status: candidates[i].status
      });
    }
  }

  /* Sort by date */
  appointments.sort(function(a, b) { return a.date.localeCompare(b.date); });

  /* Stats */
  var today = APP_UTILS.today();
  var todayCount = 0, weekCount = 0;
  var nextWeek = APP_UTILS.addDays(today, 7);
  for (var k = 0; k < appointments.length; k++) {
    if (appointments[k].date >= today && appointments[k].date <= nextWeek) weekCount++;
    if (appointments[k].date === today) todayCount++;
  }

  var h = '<div class="stats-grid" style="margin-bottom:24px;">'
    + '<div class="stat-card"><div class="stat-icon primary">' + ICONS.calendarDays + '</div><div class="stat-info"><h4>' + appointments.length + '</h4><p>RDV programmés</p></div></div>'
    + '<div class="stat-card"><div class="stat-icon info">' + ICONS.clock + '</div><div class="stat-info"><h4>' + todayCount + '</h4><p>Aujourd\'hui</p></div></div>'
    + '<div class="stat-card"><div class="stat-icon warning">' + ICONS.calendar + '</div><div class="stat-info"><h4>' + weekCount + '</h4><p>Cette semaine</p></div></div>'
    + '<div class="stat-card"><div class="stat-icon success">' + ICONS.check + '</div><div class="stat-info"><h4>' + candidates.length + '</h4><p>Candidats inscrits</p></div></div>'
    + '</div>';

  if (appointments.length === 0) {
    h += '<div class="empty-state"><div class="empty-icon">' + ICONS.calendarDays + '</div><h3>Aucun rendez-vous</h3><p>Les candidats prendront rendez-vous via le formulaire d\'inscription public.</p></div>';
  } else {
    h += '<div class="toolbar"><div class="search-box"><span class="search-icon">' + ICONS.magnifyingGlass + '</span>'
      + '<input type="text" id="rdvSearch" placeholder="Rechercher un candidat..." oninput="filterAppointments()"></div></div>'
      + '<div class="table-container"><table class="table" id="rdvTable"><thead><tr>'
      + '<th>Candidat</th><th>Date</th><th>Créneau</th><th>Statut</th><th>Actions</th>'
      + '</tr></thead><tbody>';

    for (var j = 0; j < appointments.length; j++) {
      var a = appointments[j];
      var isToday = a.date === today;
      var isPast = a.date < today;
      h += '<tr class="' + (isToday ? 'tr-today' : '') + (isPast ? 'tr-past' : '') + '">'
        + '<td><strong>' + a.candidateName + '</strong></td>'
        + '<td>' + APP_UTILS.formatDate(a.date) + '</td>'
        + '<td>' + (a.time || '—') + '</td>'
        + '<td>' + APP_UTILS.getStatusBadge(a.status) + '</td>'
        + '<td><div class="table-actions">'
        + '<button class="btn btn-ghost btn-sm" onclick="viewCandidate(' + a.candidateId + ')" title="Voir candidat">' + ICONS.eye + '</button>'
        + '<button class="btn btn-ghost btn-sm" onclick="updateAppointmentDate(' + a.candidateId + ')" title="Reporter">' + ICONS.calendarDays + '</button>'
        + '</div></td>'
        + '</tr>';
    }
    h += '</tbody></table></div>';
  }

  /* Time slots config */
  h += '<div class="card" style="margin-top:24px;"><div class="card-header"><h3>' + ICONS.cog + ' Configuration des créneaux</h3></div>'
    + '<div class="card-body">'
    + '<p style="font-size:0.875rem;color:var(--text-secondary);margin-bottom:16px;">Définissez les plages horaires proposées aux candidats dans le formulaire d\'inscription public.</p>'
    + '<div class="slots-config" id="slotsConfig">';

  var currentSlots = STORE_CANDIDATES.getSlots();
  for (var s = 0; s < currentSlots.length; s++) {
    h += '<div class="slot-chip">'
      + '<span>' + currentSlots[s] + '</span>'
      + '<button class="slot-remove" onclick="removeSlot(\'' + currentSlots[s] + '\')">' + ICONS.xMark + '</button>'
      + '</div>';
  }

  h += '</div>'
    + '<div class="slot-add-row" style="margin-top:12px;display:flex;gap:8px;">'
    + '<input type="time" id="newSlotTime" class="pub-form-input" style="width:140px;" value="09:00">'
    + '<button class="btn btn-primary btn-sm" onclick="addSlot()">' + ICONS.plus + ' Ajouter</button>'
    + '<button class="btn btn-outline btn-sm" onclick="resetSlots()">' + ICONS.noSymbol + ' Réinitialiser</button>'
    + '</div></div></div>';

  c.innerHTML = h;
}

function filterAppointments() {
  var q = document.getElementById('rdvSearch').value.toLowerCase().trim();
  var rows = document.querySelectorAll('#rdvTable tbody tr');
  for (var i = 0; i < rows.length; i++) {
    var text = rows[i].textContent.toLowerCase();
    rows[i].style.display = (!q || text.indexOf(q) !== -1) ? '' : 'none';
  }
}

function updateAppointmentDate(candidateId) {
  var cand = STORE_CANDIDATES.getById(candidateId);
  if (!cand) return;

  var body = '<div class="pub-form-group"><label for="rescheduleDate">Nouvelle date</label>'
    + '<input type="date" id="rescheduleDate" class="pub-form-input" value="' + (cand.rdvDate || APP_UTILS.today()) + '"></div>'
    + '<div class="pub-form-group"><label for="rescheduleTime">Nouveau créneau</label>'
    + '<input type="time" id="rescheduleTime" class="pub-form-input" value="' + (cand.rdvTime || '09:00') + '"></div>'
    + '<div class="pub-form-group" style="margin-top:16px;">'
    + '<button class="btn btn-primary" onclick="confirmReschedule(' + candidateId + ')">' + ICONS.check + ' Confirmer le report</button></div>';

  openModal('Reporter le rendez-vous — ' + cand.prenom + ' ' + cand.nom, body, null);
}

function confirmReschedule(candidateId) {
  var newDate = document.getElementById('rescheduleDate').value;
  var newTime = document.getElementById('rescheduleTime').value;
  if (!newDate) { showToast('Veuillez choisir une date.', 'error'); return; }

  var list = STORE_CANDIDATES.getAll();
  for (var i = 0; i < list.length; i++) {
    if (list[i].id === candidateId) {
      list[i].rdvDate = newDate;
      list[i].rdvTime = newTime;
      STORE_CANDIDATES.save(list);
      closeModal();
      navigateTo('appointments');
      showToast('Rendez-vous reporté au ' + APP_UTILS.formatDate(newDate) + ' à ' + newTime + '.', 'success');
      return;
    }
  }
}

function addSlot() {
  var timeInput = document.getElementById('newSlotTime');
  if (!timeInput) return;
  var time = timeInput.value;
  if (!time) return;
  var slots = STORE_CANDIDATES.getSlots();
  if (slots.indexOf(time) !== -1) {
    showToast('Ce créneau existe déjà.', 'warning');
    return;
  }
  slots.push(time);
  slots.sort();
  STORE_CANDIDATES.saveSlots(slots);
  navigateTo('appointments');
  showToast('Créneau ' + time + ' ajouté.', 'success');
}

function removeSlot(time) {
  var slots = STORE_CANDIDATES.getSlots();
  var idx = slots.indexOf(time);
  if (idx !== -1) slots.splice(idx, 1);
  STORE_CANDIDATES.saveSlots(slots);
  navigateTo('appointments');
  showToast('Créneau ' + time + ' supprimé.', 'info');
}

function resetSlots() {
  STORE_CANDIDATES.saveSlots(STORE_CANDIDATES.defaultSlots.slice());
  navigateTo('appointments');
  showToast('Créneaux réinitialisés.', 'info');
}
