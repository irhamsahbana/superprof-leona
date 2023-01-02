let todayStr = new Date().toISOString().replace(/T.*$/, ""); // YYYY-MM-DD of today

export const DummyCalendarData = [
  { title: "Dokter Agung off", start: "2022-12-13", color: "#f87171" }, //yyyy-mm-dd
  { title: "Dokter Talitha off", start: "2022-12-12", color: "#f87171"},
  { title: "kontrol Clare Resimont", start: "2022-01-02" + "T15:00:00", color: "#a78bfa"  },
  { title: "kontrol Rika Wani", start: todayStr + "T16:00:00" , color: "#a78bfa" },
  { title: "kontrol Jessica Josephine", start: todayStr + "T17:00:00", color: "#a78bfa"  },
  { title: "kontrol Dian Agustina", start: todayStr + "T18:00:00", color: "#a78bfa"  },
  { title: "kontrol Gita Gutawa", start: todayStr + "T19:00:00" , color: "#a78bfa" },
  { title: "kontrol Vivian Holly", start: todayStr + "T20:00:00",color: "#a78bfa"  },

];
