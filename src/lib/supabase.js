import { createClient } from '@supabase/supabase-js';

// Local Mock Supabase Client using localStorage
// This allows running the platform fully locally without external database setup first

const initialFacts = [
  { id: 1, fact_text: "Asal hech qachon buzilmaydi. Arxeologlar Misr piramidalaridan 3000 yillik asal topishgan va u hali ham iste'molga yaroqli bo'lgan!" },
  { id: 2, fact_text: "Inson tanasidagi eng kuchli mushak - bu chaynash mushagidir (masseter)." },
  { id: 3, fact_text: "Dunyodagi eng katta gul - Rafflesiya. Uning diametri 1 metrgacha yetadi va u chirigan go'sht hidini tarqatadi." },
  { id: 4, fact_text: "Ko'k kitning yuragi yengil avtomobil kattaligida bo'lib, uning urishi bir necha kilometr naridan eshitiladi." },
  { id: 5, fact_text: "Bambuk dunyodagi eng tez o'sadigan o'simlik hisoblanadi. U bir kunda 90 sm gacha o'sishi mumkin." }
];

const initialGrades = [
  { id: 1, name: "5-Sinf", display_order: 1 },
  { id: 2, name: "6-Sinf", display_order: 2 },
  { id: 3, name: "7-Sinf", display_order: 3 },
  { id: 4, name: "8-Sinf", display_order: 4 },
  { id: 5, name: "9-Sinf", display_order: 5 },
  { id: 6, name: "10-Sinf", display_order: 6 },
  { id: 7, name: "11-Sinf", display_order: 7 }
];

const initialSubjects = [
  { id: 1, grade_id: 1, name: "Biologiya" },
  { id: 2, grade_id: 2, name: "Botanika" },
  { id: 3, grade_id: 3, name: "Zoologiya" },
  { id: 4, grade_id: 4, name: "Odam va uning salomatligi" },
  { id: 5, grade_id: 5, name: "Biologiya" },
  { id: 6, grade_id: 6, name: "Biologiya" },
  { id: 7, grade_id: 7, name: "Biologiya" }
];

// Grade 5 Biology Topics (101 - 118)
const grade5Topics = [
  {
    id: 101,
    subject_id: 1,
    title: "1-§. Biologiya – hayot haqidagi fan",
    content: `
      <p>Biologiya grekcha "bios" – hayot va "logos" – fan degan so'zlardan olingan bo'lib, tirik tabiatni va undagi qonuniyatlarni o'rganadigan fandir. Biologiya atamasini fanga birinchi bo'lib J.B.Lamark va G.R.Treviranus kiritgan.</p>
      <br/>
      <h3>Biologiyaning asosiy tarmoqlari:</h3>
      <ul>
        <li><strong>Botanika:</strong> O'simliklarni o'rganadi.</li>
        <li><strong>Zoologiya:</strong> Hayvonlarni o'rganadi.</li>
        <li><strong>Mikologiya:</strong> Zamburug'larni o'rganadi.</li>
        <li><strong>Mikrobiologiya:</strong> Mikroskopik organizmlarni (bakteriyalarni) o'rganadi.</li>
      </ul>
    `,
    reading_time: 4,
    difficulty: "Easy",
    display_order: 1
  },
  {
    id: 102,
    subject_id: 1,
    title: "2-§. Tirik organizmlarning xususiyatlari",
    content: `
      <p>Tirik organizmlar o'lik tabiat jismlaridan o'zining bir qator xususiyatlari bilan ajralib turadi. Bu xususiyatlar hayotning mavjudligini belgilaydi.</p>
      <br/>
      <h3>Asosiy xususiyatlar:</h3>
      <ul>
        <li><strong>Hujayraviy tuzilish:</strong> Deyarli barcha tirik organizmlar hujayralardan tashkil topgan.</li>
        <li><strong>Moddalar va energiya almashinuvi:</strong> Oziqlanish, nafas olish va ajratish.</li>
        <li><strong>Ko'payish:</strong> O'ziga o'xshash avlod qoldirish.</li>
      </ul>
    `,
    reading_time: 5,
    difficulty: "Easy",
    display_order: 2
  },
  {
    id: 103,
    subject_id: 1,
    title: "3-§. Biologiyaning o‘rganish usullari",
    content: `
      <p>Tirik tabiatni ilmiy o'rganishda turli usullardan foydalaniladi. Bu usullar tabiat hodisalarini aniq tushunishga yordam beradi.</p>
      <br/>
      <h3>Asosiy o'rganish usullari:</h3>
      <ul>
        <li><strong>Kuzatish usuli:</strong> Tabiiy sharoitda organizmlarning hayotini o'rganish.</li>
        <li><strong>Eksperiment (Tajriba) usuli:</strong> Sun'iy yaratilgan sharoitda tadqiqot o'tkazish.</li>
      </ul>
    `,
    reading_time: 4,
    difficulty: "Easy",
    display_order: 3
  },
  {
    id: 104,
    subject_id: 1,
    title: "4-§. Hujayra – tiriklikning asosi",
    content: `<p>Hujayra – tirik organizmlarning eng kichik tuzilish birligidir. 1665-yilda ingliz olimi Robert Guk kashf qilgan.</p>`,
    reading_time: 5,
    difficulty: "Medium",
    display_order: 4
  },
  {
    id: 105,
    subject_id: 1,
    title: "5-§. Tirik organizmlar haqida umumiy ma’lumot",
    content: `<p>Yer yuzidagi barcha tirik organizmlar prokariotlar (yadrosizlar) va eukariotlar (yadrolilar) bo'linadi.</p>`,
    reading_time: 4,
    difficulty: "Easy",
    display_order: 5
  },
  {
    id: 106,
    subject_id: 1,
    title: "6-§. Bakteriyalar dunyosi",
    content: `<p>Bakteriyalar – sayyoramizdagi eng sodda va qadimiy bir hujayrali, yadrosiz organizmlardir.</p>`,
    reading_time: 5,
    difficulty: "Medium",
    display_order: 6
  },
  {
    id: 107,
    subject_id: 1,
    title: "7-§. Zamburug‘lar dunyosi",
    content: `<p>Zamburug'lar – eukariot organizmlar bo'lib, o'simliklar va hayvonlar belgilarini o'zida birlashtiradi.</p>`,
    reading_time: 5,
    difficulty: "Medium",
    display_order: 7
  },
  {
    id: 108,
    subject_id: 1,
    title: "8-§. O‘simliklar dunyosi",
    content: `<p>O'simliklar – avtotrof oziqlanadigan (fotosintez qiluvchi) eukariot organizmlardir.</p>`,
    reading_time: 4,
    difficulty: "Easy",
    display_order: 8
  },
  {
    id: 109,
    subject_id: 1,
    title: "9-§ Tuban o‘simliklar",
    content: `<p>Tuban o'simliklarga suvo'tlar kiradi. Ularning tanasi ildiz, poya va bargga ajralmagan (tallom).</p>`,
    reading_time: 5,
    difficulty: "Medium",
    display_order: 9
  },
  {
    id: 110,
    subject_id: 1,
    title: "10-§ Yuksak o‘simliklar",
    content: `<p>Yuksak o'simliklar tanasi organlarga ajralgan. Ularga yo'sinlar, qirqquloqlar, ochiq va yopiq urug'lilar kiradi.</p>`,
    reading_time: 6,
    difficulty: "Hard",
    display_order: 10
  },
  {
    id: 111,
    subject_id: 1,
    title: "11-§. Dorivor va zaharli o‘simliklar",
    content: `<p>Na'matak, moychechak, qizilmiya – dorivor; bangidevona va isiriq – zaharli o'simliklar sirasiga kiradi.</p>`,
    reading_time: 5,
    difficulty: "Medium",
    display_order: 11
  },
  {
    id: 112,
    subject_id: 1,
    title: "12-§. Hayvonot dunyosi",
    content: `<p>Hayvonlar – geterotrof oziqlanadigan faol harakatchan organizmlardir. Ular umurtqali va umurtqasizlarga bo'linadi.</p>`,
    reading_time: 4,
    difficulty: "Easy",
    display_order: 12
  },
  {
    id: 113,
    subject_id: 1,
    title: "13-§. Umurtqasiz hayvonlar",
    content: `<p>Sodda hayvonlar, chuvalchanglar, molyuskalar va hasharotlar umurtqasiz hayvonlar hisoblanadi.</p>`,
    reading_time: 6,
    difficulty: "Medium",
    display_order: 13
  },
  {
    id: 114,
    subject_id: 1,
    title: "14-§. Umurtqali hayvonlar",
    content: `<p>Baliqlar, amfibiyalar, reptiliyalar, qushlar va sutemizuvchilar umurtqali hayvonlar sinfiga mansub.</p>`,
    reading_time: 5,
    difficulty: "Medium",
    display_order: 14
  },
  {
    id: 115,
    subject_id: 1,
    title: "15-§. Odam organlari sistemasi",
    content: `<p>Tayanch-harakat, hazm qilish, qon aylanish, nafas va nerv sistemasi inson tanasini hosil qiladi.</p>`,
    reading_time: 6,
    difficulty: "Hard",
    display_order: 15
  },
  {
    id: 116,
    subject_id: 1,
    title: "16-§. Ekologik omillar",
    content: `<p>Ekologik omillar abiotik (o'lik tabiat), biotik (tirik tabiat) va antropogen (inson ta'siri) guruhlarga bo'linadi.</p>`,
    reading_time: 5,
    difficulty: "Medium",
    display_order: 16
  },
  {
    id: 117,
    subject_id: 1,
    title: "17-§. Inson va tabiat",
    content: `<p>Inson tabiat resurslaridan o'z ehtiyojlari uchun oqilona foydalanishi va atrof-muhitni asrashi lozim.</p>`,
    reading_time: 4,
    difficulty: "Easy",
    display_order: 17
  },
  {
    id: 118,
    subject_id: 1,
    title: "18-§. Tabiatni muhofaza qilish",
    content: `<p>Yo'qolib ketish xavfidagi turlar Qizil kitobga kiritiladi va qo'riqxonalarda muhofaza qilinadi.</p>`,
    reading_time: 5,
    difficulty: "Easy",
    display_order: 18
  }
];

// Grade 6 Botanika Topics (201 - 259)
const grade6Topics = [
  // I bob. O'simliklar dunyosi bilan umumiy tanishuv
  { id: 201, subject_id: 2, title: "1-§. Botanika – o‘simliklar haqidagi fan", content: "<p>Botanika o'simliklar dunyosining tuzilishi, hayotiy faoliyati va tarqalishini o'rganadigan yirik biologik fandir.</p>", reading_time: 4, difficulty: "Easy", display_order: 1 },
  { id: 202, subject_id: 2, title: "2-§. Gulli o‘simliklar bilan umumiy tanishish", content: "<p>Gulli o'simliklar barg, poya, ildiz, gul va urug'ga ega bo'lgan yuksak guruh vakillaridir.</p>", reading_time: 4, difficulty: "Easy", display_order: 2 },
  { id: 203, subject_id: 2, title: "3-§. O‘simliklarning hayotiy shakllari", content: "<p>Daraxtlar, butalar, yarimbutalar va o'tlar o'simliklarning asosiy hayotiy shakllaridir.</p>", reading_time: 5, difficulty: "Easy", display_order: 3 },
  
  // II bob. Hujayra – hayotning asosi
  { id: 204, subject_id: 2, title: "4-§. O‘simlik hujayrasining tuzilishi", content: "<p>Hujayra devori, sitoplazma, yadro, plastidalar va yirik vakuola o'simlik hujayrasi xususiyatlaridir.</p>", reading_time: 5, difficulty: "Medium", display_order: 4 },
  { id: 205, subject_id: 2, title: "5-§. Hujayralarning hayotiy faoliyati", content: "<p>Hujayraning o'sishi, modda almashinuvi, nafas olishi hamda bo'linishi hayotiy jarayonlardir.</p>", reading_time: 5, difficulty: "Medium", display_order: 5 },
  { id: 206, subject_id: 2, title: "6-§. O‘simlik to‘qimalari", content: "<p>Hosil qiluvchi, qoplovchi, asosiy, mexanik, o'tkazuvchi va ajratuvchi to'qimalar farqlanadi.</p>", reading_time: 5, difficulty: "Hard", display_order: 6 },

  // III bob. Gulli o‘simliklarning vegetativ va generativ organlari
  { id: 207, subject_id: 2, title: "7-§. Ildiz turlari va tizimlari", content: "<p>Bosh, yon va qo'shimcha ildizlar o'q va popuk ildiz tizimlarini hosil qiladi.</p>", reading_time: 4, difficulty: "Easy", display_order: 7 },
  { id: 208, subject_id: 2, title: "8-§. Ildizning ichki tuzilishi", content: "<p>Ildiz po'stlog'i, shimuvchi zona va o'tkazuvchi zonalar ildizning ko'ndalang kesimida ko'rinadi.</p>", reading_time: 5, difficulty: "Medium", display_order: 8 },
  { id: 209, subject_id: 2, title: "9-§. Shakli o‘zgargan ildizlar", content: "<p>Ildizmevalar (sabzi, lavlagi) va ildizpoyalar ozuqa g'amlovchi metamorfozlardir.</p>", reading_time: 5, difficulty: "Medium", display_order: 9 },
  { id: 210, subject_id: 2, title: "10-§. Novda", content: "<p>Novda - barg va kurtaklar joylashgan poya qismidir. U vegetativ va generativ bo'ladi.</p>", reading_time: 4, difficulty: "Easy", display_order: 10 },
  { id: 211, subject_id: 2, title: "11-§. Poyalarning xilma-xilligi", content: "<p>Tik o'suvchi, yopishuvchi, sudralib yuruvchi va chirmashuvchi poyalar mavjud.</p>", reading_time: 4, difficulty: "Easy", display_order: 11 },
  { id: 212, subject_id: 2, title: "12-§. Kurtak", content: "<p>Kurtak - murtak holatidagi novda. U vegetativ (barg hosil qiluvchi) va generativ (gul hosil qiluvchi) bo'ladi.</p>", reading_time: 4, difficulty: "Easy", display_order: 12 },
  { id: 213, subject_id: 2, title: "13-§. Poyaning ichki tuzilishi", content: "<p>Poya po'stloq, qobiq, kambiy, yog'ochlik va o'zak qismlaridan tashkil topgan.</p>", reading_time: 5, difficulty: "Hard", display_order: 13 },
  { id: 214, subject_id: 2, title: "14-§. Novda tizimining shakllanishi", content: "<p>Novdalarning shoxlanishi va shakllanishi o'simlik tojining ko'rinishini belgilaydi.</p>", reading_time: 5, difficulty: "Medium", display_order: 14 },
  { id: 215, subject_id: 2, title: "15-§. Barglarning tashqi tuzilishi", content: "<p>Barg plastinkasi va barg bandi uning asosiy tashqi qismlari hisoblanadi.</p>", reading_time: 4, difficulty: "Easy", display_order: 15 },
  { id: 216, subject_id: 2, title: "16-§. Oddiy va murakkab barglar", content: "<p>Bitta barg bandida bitta plastinka bo'lsa oddiy, bir nechta bo'lsa murakkab barg deyiladi.</p>", reading_time: 4, difficulty: "Easy", display_order: 16 },
  { id: 217, subject_id: 2, title: "17-§. Novdada barglarning joylashishi", content: "<p>Navbatma-navbat, qarama-qarshi va xalqasimon (to'p-to'p) joylashish turlari bor.</p>", reading_time: 4, difficulty: "Easy", display_order: 17 },
  { id: 218, subject_id: 2, title: "18-§. Barglarning ichki tuzilishi", content: "<p>Barg og'izchalari (ustitsa), ustunsimon va g'ovak to'qimalar fotosintez va transpiratsiyada ishtirok etadi.</p>", reading_time: 5, difficulty: "Hard", display_order: 18 },
  { id: 219, subject_id: 2, title: "19-§. Shakli o‘zgargan novdalar", content: "<p>Tugunaklar (kartoshka), piyozboshlar (piyoz) – shakli o'zgargan erostki novdalardir.</p>", reading_time: 5, difficulty: "Medium", display_order: 19 },
  { id: 220, subject_id: 2, title: "20-§. Gul – o‘simliklarning generativ ko‘payish organi", content: "<p>Gulkosa, gultoj, changchi va urug'chi gulning asosiy generativ qismlaridir.</p>", reading_time: 5, difficulty: "Medium", display_order: 20 },
  { id: 221, subject_id: 2, title: "21-§. Gullarning xilma-xilligi", content: "<p>Bir uyli va ikki uyli o'simliklar, to'g'ri va noto'g'ri gullar farqlanadi.</p>", reading_time: 4, difficulty: "Easy", display_order: 21 },
  { id: 222, subject_id: 2, title: "22-§. To‘pgullar", content: "<p>Oddiy (savatcha, soyabon) va murakkab (ro'vak, murakkab soyabon) to'pgullar mavjud.</p>", reading_time: 4, difficulty: "Easy", display_order: 22 },
  { id: 223, subject_id: 2, title: "23-§. Mevalar", content: "<p>Quruq (dona, ko'sak) va ho'l (baxmal, meva rezavorlari) mevalar hosil bo'ladi.</p>", reading_time: 4, difficulty: "Easy", display_order: 23 },
  { id: 224, subject_id: 2, title: "24-§. Urug‘", content: "<p>Urug' po'sti, murtak va endosperm urug'ning asosiy qismlari hisoblanadi.</p>", reading_time: 4, difficulty: "Easy", display_order: 24 },

  // IV bob. Gulli o‘simliklarning hayotiy faoliyati
  { id: 225, subject_id: 2, title: "25-§. O‘simliklarning mineral oziqlanishi. Ildiz bosimi. O‘g‘itlar", content: "<p>O'simliklar tuproqdan mineral moddalarni ildiz bosimi yordamida shimib oladi.</p>", reading_time: 5, difficulty: "Medium", display_order: 25 },
  { id: 226, subject_id: 2, title: "26-§. Poyada oziq moddalarning harakatlanishi", content: "<p>Suv ksilema (yog'ochlik) orqali yuqoriga, organik moddalar floema (lola) orqali pastga harakatlanadi.</p>", reading_time: 5, difficulty: "Medium", display_order: 26 },
  { id: 227, subject_id: 2, title: "27-§. Barglarda organik moddalarning hosil bo‘lishi", content: "<p>Yorug'likda xloroplastlarda suv va karbonat angidrid gazidan glyukoza va kislorod sintezlanadi (fotosintez).</p>", reading_time: 5, difficulty: "Medium", display_order: 27 },
  { id: 228, subject_id: 2, title: "28-§. Nafas olish, oziqlanish va moddalar almashinuvi", content: "<p>Nafas olish jarayonida organik moddalar kislorod ishtirokida parchalanib, energiya ajraladi.</p>", reading_time: 5, difficulty: "Medium", display_order: 28 },
  { id: 229, subject_id: 2, title: "29-§. O'simliklarning suv bug'latishi", content: "<p>Transpiratsiya - barglar orqali suvning bug'lanishi bo'lib, o'simlikni qizib ketishdan asraydi.</p>", reading_time: 4, difficulty: "Easy", display_order: 29 },
  { id: 230, subject_id: 2, title: "30-§. Kuzgi o'zgarishlar", content: "<p>Kuzda xlorofill parchalanishi sababli barglar sarg'ayadi va barg to'kilishi (xazonrezgi) sodir bo'ladi.</p>", reading_time: 4, difficulty: "Easy", display_order: 30 },
  { id: 231, subject_id: 2, title: "31-§. O'simliklarning ko'payishi", content: "<p>O'simliklar jinssiz (spora orqali), vegetativ (novda, ildiz) va jinsiy yo'l bilan ko'payadi.</p>", reading_time: 5, difficulty: "Medium", display_order: 31 },
  { id: 232, subject_id: 2, title: "32-§. Gullarning changlanishi", content: "<p>O'z-o'zidan changlanish va chetdan (shamol, hasharotlar yordamida) changlanish farqlanadi.</p>", reading_time: 4, difficulty: "Easy", display_order: 32 },
  { id: 233, subject_id: 2, title: "33-§. Gulli o'simliklarning jinsiy ko'payishi. Urug'lanish", content: "<p>S.G.Navashin kashf etgan qo'sh urug'lanish jarayonida urug' murtagi va endosperm hosil bo'ladi.</p>", reading_time: 5, difficulty: "Hard", display_order: 33 },
  { id: 234, subject_id: 2, title: "34-§. Meva va urug'larning tarqalishi", content: "<p>Urug'lar shamol, suv, hayvonlar va insonlar yordamida uzoq masofalarga tarqaladi.</p>", reading_time: 4, difficulty: "Easy", display_order: 34 },
  { id: 235, subject_id: 2, title: "35-§. Urug'larning unib chiqishi", content: "<p>Urug' unib chiqishi uchun issiqlik, namlik (suv) va havo (kislorod) yetarli bo'lishi shart.</p>", reading_time: 4, difficulty: "Easy", display_order: 35 },
  { id: 236, subject_id: 2, title: "36-§. O'simlik – yaxlit organizm", content: "<p>O'simlikning barcha organlari to'qimalar orqali bog'langan bo'lib, yagona tizimni tashkil etadi.</p>", reading_time: 4, difficulty: "Easy", display_order: 36 },
  { id: 237, subject_id: 2, title: "37-§. O'simliklar dunyosiga ekologik omillarning ta'siri", content: "<p>Yorug'lik, suv, tuproq tarkibi o'simliklarning o'sishi va geografik tarqalishini belgilaydi.</p>", reading_time: 4, difficulty: "Easy", display_order: 37 },

  // V bob. O'simliklar sistematikasi
  { id: 238, subject_id: 2, title: "38-§. O'simliklar sistematikasi haqida tushuncha", content: "<p>Sistematika o'simliklarni qarindoshlik aloqalariga ko'ra guruhlarga (tur, turkum, oila, bo'lim) ajratadi.</p>", reading_time: 4, difficulty: "Easy", display_order: 38 },
  { id: 239, subject_id: 2, title: "39-§. Suvo'tlar. Bir hujayrali yashil suvo'tlar", content: "<p>Xlamidomonada va xlorella bir hujayrali yashil suvo'tlar vakillaridir.</p>", reading_time: 5, difficulty: "Medium", display_order: 39 },
  { id: 240, subject_id: 2, title: "40-§. Ko'p hujayrali yashil suvo'tlar", content: "<p>Ulotriks va spirogira chuchuk suvlarda ipli koloniyalar hosil qiluvchi suvo'tlardir.</p>", reading_time: 5, difficulty: "Medium", display_order: 40 },
  { id: 241, subject_id: 2, title: "41-§. Qo'ng'ir va qizil suvo'tlar bo'limlari", content: "<p>Laminariya, makrotsistis kabi yirik suvo'tlar dengiz ekotizimida asosiy o'rin tutadi.</p>", reading_time: 5, difficulty: "Medium", display_order: 41 },
  { id: 242, subject_id: 2, title: "42-§. Yo'sinlar bo'limi", content: "<p>Funariya va sfagnum yo'sinlari ildizsiz, rizoidli, sporali yuksak o'simliklardir.</p>", reading_time: 5, difficulty: "Medium", display_order: 42 },
  { id: 243, subject_id: 2, title: "43-§. Qirqbo'g'imlar bo'limi", content: "<p>Dala qirqbo'g'imi bo'g'imli poyaga ega bo'lib, bahorgi va yozgi novdalar chiqaradi.</p>", reading_time: 5, difficulty: "Medium", display_order: 43 },
  { id: 244, subject_id: 2, title: "44-§. Qirqquloqlar bo'limi", content: "<p>Qirqquloqlar (paporotniklar) ildizpoya va soruslar (spora to'plami) yordamida ko'payadi.</p>", reading_time: 5, difficulty: "Medium", display_order: 44 },
  { id: 245, subject_id: 2, title: "45-§. Ochiq urug'li o'simliklar bo'limi. Archa", content: "<p>Ignabargli o'simliklar (archa, qarag'ay) urug'lari qubbalardagi tangachalar ustida ochiq holda yetiladi.</p>", reading_time: 5, difficulty: "Medium", display_order: 45 },
  { id: 246, subject_id: 2, title: "46-§. Yopiq urug'li o'simliklar haqida ma'lumotlar", content: "<p>Urug'lari meva ichida yopiq joylashgan, gul hosil qiluvchi o'simliklar bo'limidir.</p>", reading_time: 4, difficulty: "Easy", display_order: 46 },
  { id: 247, subject_id: 2, title: "47-§. Ra'nodoshlar oilasi", content: "<p>Gul formulasi: Ca5 Co5 A∞ G∞ yoki G1. Vakillari: na'matak, olma, nok, shaftoli.</p>", reading_time: 5, difficulty: "Hard", display_order: 47 },
  { id: 248, subject_id: 2, title: "48-§. Karamdoshlar oilasi", content: "<p>Gullari xochsimon joylashgan, mevasi qo'zoq. Vakillari: karam, rediska, turp.</p>", reading_time: 5, difficulty: "Medium", display_order: 48 },
  { id: 249, subject_id: 2, title: "49-§. Sho'radoshlar oilasi", content: "<p>Qurg'oqchil va sho'rxok yerlarda o'sadi. Vakillari: saksovul, lavlagi, ismaloq.</p>", reading_time: 5, difficulty: "Medium", display_order: 49 },
  { id: 250, subject_id: 2, title: "50-§. Gulxayridoshlar oilasi", content: "<p>Gultoji va changchilari qo'shilib naysimon shakl oladi. Vakillari: g'o'za, gulxayri.</p>", reading_time: 5, difficulty: "Medium", display_order: 50 },
  { id: 251, subject_id: 2, title: "51-§. Burchoqdoshlar (Dukkakdoshlar) oilasi", content: "<p>Mevasi dukkak, ildizida tugunak bakteriyalari yashaydi. Vakillari: beda, no'xat, soya.</p>", reading_time: 5, difficulty: "Medium", display_order: 51 },
  { id: 252, subject_id: 2, title: "52-§. Ituzumdoshlar oilasi", content: "<p>Vakillari: kartoshka, pomidor, baqlajon, qalampir. Ko'pchiligi tarkibida solanin zaharli moddasini saqlaydi.</p>", reading_time: 5, difficulty: "Medium", display_order: 52 },
  { id: 253, subject_id: 2, title: "53-§. Tokdoshlar oilasi", content: "<p>Chirmashib o'suvchi lianalar guruhiga kiradi. Asosiy vakili - madaniy uzum (tok).</p>", reading_time: 5, difficulty: "Medium", display_order: 53 },
  { id: 254, subject_id: 2, title: "54-§. Qovoqdoshlar oilasi", content: "<p>Poyasi yerbag'irlab o'sadi, mo'ylovchalari bor. Vakillari: tarvuz, qovun, bodring, qovoq.</p>", reading_time: 5, difficulty: "Medium", display_order: 54 },
  { id: 255, subject_id: 2, title: "55-§. Qoqo'tdoshlar (Murakkabguldoshlar) oilasi", content: "<p>To'pguli savatcha. Vakillari: kungaboqar, shuvoq, momoqaldiroq, bo'tako'z.</p>", reading_time: 5, difficulty: "Hard", display_order: 55 },
  { id: 256, subject_id: 2, title: "56-§. Loladoshlar oilasi", content: "<p>Bir pallalilar sinfi vakillari bo'lib, chiroyli gullarga ega. Vakillari: lola, boychechak.</p>", reading_time: 4, difficulty: "Easy", display_order: 56 },
  { id: 257, subject_id: 2, title: "57-§. Piyozdoshlar oilasi", content: "<p>Piyozbosh hosil qiladi, o'ziga xos o'tkir hidga ega. Vakillari: piyoz, sarimsoqpiyoz.</p>", reading_time: 4, difficulty: "Easy", display_order: 57 },
  { id: 258, subject_id: 2, title: "58-§. Bug'doydoshlar (Boshoqdoshlar) oilasi", content: "<p>Poyasi somon poya, to'pguli boshoq yoki ro'vak. Vakillari: bug'doy, sholi, makkajo'xori.</p>", reading_time: 5, difficulty: "Medium", display_order: 58 },
  { id: 259, subject_id: 2, title: "59-§. Yerda o'simliklar dunyosining rivojlanishi", content: "<p>O'simliklar dunyosi suvdan quruqlikka chiqish va rivojlanishning uzoq evolyutsion yo'lini bosib o'tgan.</p>", reading_time: 5, difficulty: "Medium", display_order: 59 }
];

// Grade 7 Zoologiya Topics (301)
// Grade 7 Zoologiya Topics (301-320)
const grade7Topics = [
  { id: 301, subject_id: 3, title: "1-§. Zoologiya – hayvonlar haqidagi fan", content: "<p>Zoologiya – biologiyaning hayvonlar tuzilishi, hayot faoliyati va klassifikatsiyasini o'rganadigan tarmog'i. Aristotel hayvonlarni birinchi bo'lib tasniflagan.</p>", reading_time: 4, difficulty: "Easy", display_order: 1 },
  { id: 302, subject_id: 3, title: "2-§. Hayvonlar sistematikasi", content: "<p>Hayvonlar tipi, sinfi, turkumi, oilasi, avlodi va turi bo'yicha guruhlanadi. Binomial nomenklatura K.Linney tomonidan kiritilgan.</p>", reading_time: 4, difficulty: "Easy", display_order: 2 },
  { id: 303, subject_id: 3, title: "3-§. Bir hujayrali hayvonlar (Sodda hayvonlar)", content: "<p>Amyoba, evglena va infuzoriya – bir hujayrali hayvonlar. Ular mustaqil hayot kechiradi.</p>", reading_time: 5, difficulty: "Easy", display_order: 3 },
  { id: 304, subject_id: 3, title: "4-§. Protoktistalar va zamburug'lar", content: "<p>Protoktistalar eukariot organizmlar bo'lib, o'simlik, hayvon va zamburug'lar xususiyatlarini birlashtiradi.</p>", reading_time: 5, difficulty: "Medium", display_order: 4 },
  { id: 305, subject_id: 3, title: "5-§. Bo'shliqichlilar tipi", content: "<p>Gidra, meduzalar va marjon poliplari bo'shliqichlilar tipiga kiradi. Ikki qavatli tana devori xos.</p>", reading_time: 5, difficulty: "Medium", display_order: 5 },
  { id: 306, subject_id: 3, title: "6-§. Yassi chuvalchanglar tipi", content: "<p>Oq planariya erkin yashovchi, jigar qo'ng'izi va tasmasimon chuvalchanglar parazit yassi chuvalchanglar.</p>", reading_time: 5, difficulty: "Medium", display_order: 6 },
  { id: 307, subject_id: 3, title: "7-§. To'garak chuvalchanglar tipi", content: "<p>Odam askaridasi va bolalar qurti eng keng tarqalgan parazit to'garak chuvalchanglar hisoblanadi.</p>", reading_time: 5, difficulty: "Medium", display_order: 7 },
  { id: 308, subject_id: 3, title: "8-§. Halqali chuvalchanglar tipi", content: "<p>Yomg'ir chuvalchangi tuproqni ishlaydi va unumdorligini oshiradi. Tanasi segmentlarga bo'lingan.</p>", reading_time: 5, difficulty: "Medium", display_order: 8 },
  { id: 309, subject_id: 3, title: "9-§. Molyuskalar tipi", content: "<p>Qorinoyoqlilar (salyangoz), ikki pallalilar (midiya) va boshoyoqlilar (kalmar) molyuskalar tipini tashkil etadi.</p>", reading_time: 5, difficulty: "Medium", display_order: 9 },
  { id: 310, subject_id: 3, title: "10-§. Bo'g'imoyoqlilar tipi. Qisqichbaqasimonlar", content: "<p>Qisqichbaqalar suvda yashovchi bo'g'imoyoqlilar bo'lib, xitin qobiqqa ega va juda ko'p turlari bor.</p>", reading_time: 5, difficulty: "Medium", display_order: 10 },
  { id: 311, subject_id: 3, title: "11-§. O'rgimchaksimonlar sinfi", content: "<p>O'rgimchaklar, kanalar va chayonlar 8 oyoqqa ega bo'lib, hasharotlardan farq qiladi.</p>", reading_time: 5, difficulty: "Medium", display_order: 11 },
  { id: 312, subject_id: 3, title: "12-§. Hasharotlar sinfi", content: "<p>Hasharotlar eng ko'p turga ega hayvonlar sinfi. Ular 6 oyoqli, 3 tana bo'limli va qanotlarga ega.</p>", reading_time: 6, difficulty: "Medium", display_order: 12 },
  { id: 313, subject_id: 3, title: "13-§. Baliqlar sinfi", content: "<p>Baliqlar suvda yashovchi sovuq qonli umurtqali hayvonlar. Jabra bilan nafas oladi, suzgichlar bilan harakatlanadi.</p>", reading_time: 5, difficulty: "Medium", display_order: 13 },
  { id: 314, subject_id: 3, title: "14-§. Suvda ham quruqlikda yashovchilar (Amfibiyalar)", content: "<p>Baqalar va tritonlar lichinka davrida suvda, voyaga yetganda quruqlikda yashaydi. Tana harorati o'zgaruvchan.</p>", reading_time: 5, difficulty: "Medium", display_order: 14 },
  { id: 315, subject_id: 3, title: "15-§. Sudralib yuruvchilar (Reptiliyalar)", content: "<p>Ilonlar, kaltakesaklar, toshbaqalar va timsohlar quruqlikda yashashga to'liq moslashgan sovuq qonli hayvonlar.</p>", reading_time: 5, difficulty: "Medium", display_order: 15 },
  { id: 316, subject_id: 3, title: "16-§. Qushlar sinfi", content: "<p>Qushlar issiq qonli, tanasi pat-par bilan qoplangan, tuxum qo'yadigan umurtqali hayvonlar. Ko'pchiligi ucha oladi.</p>", reading_time: 5, difficulty: "Medium", display_order: 16 },
  { id: 317, subject_id: 3, title: "17-§. Sutemizuvchilar sinfi", content: "<p>Sutemizuvchilar issiq qonli, bolasini tirik tug'ib sut bilan boqadigan eng rivojlangan hayvonlar sinfi.</p>", reading_time: 6, difficulty: "Medium", display_order: 17 },
  { id: 318, subject_id: 3, title: "18-§. Hayvonlar xulqi va nerv sistemasi", content: "<p>Shartsiz va shartli reflekslar hayvonlar xulqining asosi. Nerv tizimi murakkablashgan sari xulq ham murakkablashadi.</p>", reading_time: 5, difficulty: "Hard", display_order: 18 },
  { id: 319, subject_id: 3, title: "19-§. Hayvonlarning ekologik guruhlari", content: "<p>Hayvonlar yashash muhitiga ko'ra suv, yer, havo va tuproq hayvonlariga bo'linadi.</p>", reading_time: 4, difficulty: "Easy", display_order: 19 },
  { id: 320, subject_id: 3, title: "20-§. Hayvonlarni muhofaza qilish", content: "<p>Yo'qolib ketayotgan hayvon turlarini Qizil kitobga kiritish, qo'riqxonalar tashkil etish va sun'iy ko'paytirish muhofaza usullaridir.</p>", reading_time: 4, difficulty: "Easy", display_order: 20 }
];

// Grade 8 Odam va uning salomatligi (401-425)
const grade8Topics = [
  { id: 401, subject_id: 4, title: "1-§. Odam organizmining umumiy tuzilishi", content: "<p>Odam tanasi hujayralar, to'qimalar, organlar va organlar sistemasidan iborat murakkab biologik tizimdir.</p>", reading_time: 5, difficulty: "Easy", display_order: 1 },
  { id: 402, subject_id: 4, title: "2-§. Hujayra – odam tanasining tuzilish birligi", content: "<p>Odam hujayrasi yadro, sitoplazma, membrana va organoidlardan tashkil topgan. Hujayralar ixtisoslashgan funksiyalar bajaradi.</p>", reading_time: 5, difficulty: "Medium", display_order: 2 },
  { id: 403, subject_id: 4, title: "3-§. Odam to'qimalari", content: "<p>Odam tanasida 4 xil to'qima bor: epiteliy, biriktiruvchi (suyak, qon, tog'ay), mushak va nerv to'qimalari.</p>", reading_time: 5, difficulty: "Medium", display_order: 3 },
  { id: 404, subject_id: 4, title: "4-§. Organlar va organlar sistemasi", content: "<p>O'xshash vazifani bajaradigan organlar birlashib organlar sistemasini hosil qiladi (hazm qilish, nafas olish va boshq.).</p>", reading_time: 5, difficulty: "Medium", display_order: 4 },
  { id: 405, subject_id: 4, title: "5-§. Nerv sistemasining tuzilishi", content: "<p>Nerv sistemasi markaziy (bosh va orqa miya) va periferik (nervlar va nerv tugunlari) bo'limlardan iborat.</p>", reading_time: 6, difficulty: "Hard", display_order: 5 },
  { id: 406, subject_id: 4, title: "6-§. Refleks va refleks yoyi", content: "<p>Refleks – tashqi ta'sirga nerv sistemasi orqali beriladigan javob. Refleks yoyi retseptor, afferent nerv, markaz, efferent nerv va effektordan iborat.</p>", reading_time: 5, difficulty: "Hard", display_order: 6 },
  { id: 407, subject_id: 4, title: "7-§. Sekretsiya bezlari (Gumoral boshqaruv)", content: "<p>Gipofiz, qalqonsimon bez va buyrakusti bezlari gormonlar ishlab chiqaradi. Ular organizmni gumoral yo'l bilan boshqaradi.</p>", reading_time: 5, difficulty: "Hard", display_order: 7 },
  { id: 408, subject_id: 4, title: "8-§. Suyaklarning tuzilishi va tarkibi", content: "<p>Suyaklar organik (osteyn) va mineral (kalsiy tuzlari) moddalardan tashkil topgan. Organik moddalar egiluvchanlik, mineral moddalar qattiqlik beradi.</p>", reading_time: 5, difficulty: "Medium", display_order: 8 },
  { id: 409, subject_id: 4, title: "9-§. Skelet tuzilishi", content: "<p>Inson skeleti bosh suyagi, umurtqa pog'onasi, ko'krak qafasi va oyoq-qo'l skeletlaridan iborat. Hammasi 206 ta suyakdan tashkil topgan.</p>", reading_time: 6, difficulty: "Medium", display_order: 9 },
  { id: 410, subject_id: 4, title: "10-§. Muskullar va ularning ishlashi", content: "<p>Skelet muskullari ko'ndalang-targ'il tuzilishga ega va ixtiyoriy qisqaradi. Silliq muskullar ichki organlar devorida joylashgan.</p>", reading_time: 5, difficulty: "Medium", display_order: 10 },
  { id: 411, subject_id: 4, title: "11-§. Qonning tarkibi va funksiyalari", content: "<p>Qon plazma va shaklli elementlardan (eritrositlar, leykositlar, trombotsitlar) iborat. Qon moddalar tashish, himoya va haroratni tartibga solish vazifalarini bajaradi.</p>", reading_time: 6, difficulty: "Hard", display_order: 11 },
  { id: 412, subject_id: 4, title: "12-§. Immunitet va qon guruhlari", content: "<p>Immunitet – tananing kasalliklardan himoya tizimi. Odam qonida 4 ta asosiy qon guruhi (I, II, III, IV) mavjud.</p>", reading_time: 5, difficulty: "Medium", display_order: 12 },
  { id: 413, subject_id: 4, title: "13-§. Yurakning tuzilishi", content: "<p>Yurak 4 kamerali (2 bo'lmacha, 2 qorincha) mushakli organ. U qonni tomirlar orqali tanaga haydaydi.</p>", reading_time: 6, difficulty: "Hard", display_order: 13 },
  { id: 414, subject_id: 4, title: "14-§. Qon aylanish doiralari", content: "<p>Katta doira: chap qorinchadan boshlanib, o'ng bo'lmachaga qaytadi. Kichik doira: o'ng qorinchadan o'pkaga boradi va chap bo'lmachaga qaytadi.</p>", reading_time: 5, difficulty: "Hard", display_order: 14 },
  { id: 415, subject_id: 4, title: "15-§. Nafas olish organlari", content: "<p>Burun bo'shlig'i, hiqildoq, traxeya, bronxlar va o'pka nafas organlarini tashkil etadi.</p>", reading_time: 5, difficulty: "Medium", display_order: 15 },
  { id: 416, subject_id: 4, title: "16-§. Gazlar almashinuvi", content: "<p>O'pkada kislorod qonga, karbonat angidrid qondan o'pkaga o'tadi. To'qimalarda aksincha – kislorod hujayralarga beriladi.</p>", reading_time: 5, difficulty: "Hard", display_order: 16 },
  { id: 417, subject_id: 4, title: "17-§. Ovqat hazm qilish organlari", content: "<p>Og'iz bo'shlig'i, qizilo'ngach, oshqozon, ingichka ichak va yo'g'on ichak hazm tizimini hosil qiladi.</p>", reading_time: 5, difficulty: "Medium", display_order: 17 },
  { id: 418, subject_id: 4, title: "18-§. Moddalar va energiya almashinuvi", content: "<p>Assimilyatsiya (o'zlashtirish) va dissimilyatsiya (parchalanish) moddalar almashinuvining ikki tomoni.</p>", reading_time: 5, difficulty: "Hard", display_order: 18 },
  { id: 419, subject_id: 4, title: "19-§. Vitaminlar va ularning ahamiyati", content: "<p>A, B, C, D guruh vitaminlar organizmning normal ishlashi uchun zarur. Yetishmovchiligi avitaminoz kasalligiga olib keladi.</p>", reading_time: 5, difficulty: "Easy", display_order: 19 },
  { id: 420, subject_id: 4, title: "20-§. Siydik ayirish sistemasi", content: "<p>Buyraklar, siydik yo'llari va qovuq ayirish sistemasini tashkil etadi. Buyraklar qondagi keraksiz moddalarni filtrlaydi.</p>", reading_time: 5, difficulty: "Medium", display_order: 20 },
  { id: 421, subject_id: 4, title: "21-§. Terining tuzilishi va funksiyalari", content: "<p>Teri epidermis, derma va teri osti yog' qavatidan iborat. U himoya, harorat tartibga solish va sezish vazifasini bajaradi.</p>", reading_time: 5, difficulty: "Medium", display_order: 21 },
  { id: 422, subject_id: 4, title: "22-§. Sezgi organlari. Ko'rish va eshitish", content: "<p>Ko'z – ko'rish, quloq – eshitish va muvozanat organlardir. Ular tashqi muhit haqida axborot to'playdi.</p>", reading_time: 5, difficulty: "Medium", display_order: 22 },
  { id: 423, subject_id: 4, title: "23-§. Oliy nerv faoliyati", content: "<p>Bosh miya po'stlog'i oliy nerv faoliyatining markazi. Tafakkur, xotira, nutq va ong uning asosiy funksiyalaridir.</p>", reading_time: 6, difficulty: "Hard", display_order: 23 },
  { id: 424, subject_id: 4, title: "24-§. Ko'payish va rivojlanish", content: "<p>Inson ko'payish tizimi erkak va ayol jinsiy bezlaridan iborat. Homila 9 oy davomida bachadonda rivojlanadi.</p>", reading_time: 5, difficulty: "Medium", display_order: 24 },
  { id: 425, subject_id: 4, title: "25-§. Salomatlik va gigiyena", content: "<p>Sog'lom turmush tarzi – to'g'ri ovqatlanish, jismoniy mashqlar, uxlash rejimi va zararli odatlardan voz kechishdir.</p>", reading_time: 4, difficulty: "Easy", display_order: 25 }
];

// Grade 9 Sitologiya va Genetika (501-518)
const grade9Topics = [
  { id: 501, subject_id: 5, title: "1-§. Biologiya – tirik tabiat haqidagi fan", content: "<p>9-sinf biologiya kursi hujayra biologiyasi (sitologiya) va irsiyat qonuniyatlari (genetika) asoslarini o'rganishga qaratilgan.</p>", reading_time: 4, difficulty: "Easy", display_order: 1 },
  { id: 502, subject_id: 5, title: "2-§. Hujayra nazariyasi", content: "<p>Hujayra nazariyasini M.Shleyden va T.Shvann yaratgan (1838-1839). Asosiy qoidasi: barcha tirik organizmlar hujayralardan tashkil topgan.</p>", reading_time: 5, difficulty: "Medium", display_order: 2 },
  { id: 503, subject_id: 5, title: "3-§. Hujayra kimyoviy tarkibi", content: "<p>Hujayra tarkibida anorganik (suv, mineral tuzlar) va organik (oqsillar, yog'lar, uglevodlar, nuklein kislotalar) moddalar bor.</p>", reading_time: 5, difficulty: "Medium", display_order: 3 },
  { id: 504, subject_id: 5, title: "4-§. Oqsillar – hayotning asosi", content: "<p>Oqsillar aminokislotalardan tuzilgan polimer birikmalaridir. Ular fermentlik, himoya, transport va energetik funksiyalarni bajaradi.</p>", reading_time: 6, difficulty: "Hard", display_order: 4 },
  { id: 505, subject_id: 5, title: "5-§. Nuklein kislotalar: DNK va RNK", content: "<p>DNK irsiy axborotni saqlaydi (qo'sh spiralli), RNK oqsil sintezida ishtirok etadi (bir zanjirli). Nukleotidlardan tuzilgan.</p>", reading_time: 6, difficulty: "Hard", display_order: 5 },
  { id: 506, subject_id: 5, title: "6-§. Hujayra organoidlari", content: "<p>Mitoxondriya (energiya), ribosoma (oqsil sintezi), endoplazmatik to'r, Golji apparati, lizosomalar – asosiy organoidlar.</p>", reading_time: 6, difficulty: "Hard", display_order: 6 },
  { id: 507, subject_id: 5, title: "7-§. Moddalar va energiya almashinuvi (Metabolizm)", content: "<p>Anabolizm (sintez) va katabolizm (parchalanish) metabolizmning ikki tomoni. ATF – energiya valyutasi.</p>", reading_time: 6, difficulty: "Hard", display_order: 7 },
  { id: 508, subject_id: 5, title: "8-§. Fotosintez va xemosintez", content: "<p>Fotosintez – yorug'lik energiyasini kimyoviy energiyaga aylantirish. Xemosintez – kimyoviy reaksiyalar energiyasi hisobiga organik modda sintezi.</p>", reading_time: 5, difficulty: "Hard", display_order: 8 },
  { id: 509, subject_id: 5, title: "9-§. Hujayraning bo'linishi. Mitoz", content: "<p>Mitoz – somatik hujayralar bo'linishi. Profaza, metafaza, anafaza, telofaza bosqichlaridan iborat. Natija: 2 ta bir xil hujayra.</p>", reading_time: 6, difficulty: "Hard", display_order: 9 },
  { id: 510, subject_id: 5, title: "10-§. Meyoz – jinsiy hujayralar bo'linishi", content: "<p>Meyoz ikki marta bo'linishdan iborat. Natija: xromosomalar soni ikki barobar kamaygan 4 ta hujayra (gametalar) hosil bo'ladi.</p>", reading_time: 6, difficulty: "Hard", display_order: 10 },
  { id: 511, subject_id: 5, title: "11-§. Genetika fani va uning asosiy tushunchalari", content: "<p>Genetika – irsiyat va o'zgaruvchanlik qonuniyatlarini o'rganadi. Gen, genotip, fenotip, dominant va retsessiv belgilar asosiy tushunchalar.</p>", reading_time: 5, difficulty: "Medium", display_order: 11 },
  { id: 512, subject_id: 5, title: "12-§. G.Mendelning I va II qonunlari", content: "<p>I qonun (bir xillilik): F1 avlod bir xil bo'ladi. II qonun (ajralish): F2 da 3:1 nisbatda ajralish kuzatiladi.</p>", reading_time: 6, difficulty: "Hard", display_order: 12 },
  { id: 513, subject_id: 5, title: "13-§. G.Mendelning III qonuni (mustaqil taqsimlanish)", content: "<p>Ikki va undan ortiq juft belgilar bir-biridan mustaqil taqsimlanadi. Digibrid chatishtirishda 9:3:3:1 nisbat hosil bo'ladi.</p>", reading_time: 6, difficulty: "Hard", display_order: 13 },
  { id: 514, subject_id: 5, title: "14-§. Jinsning genetik asosi", content: "<p>Jinsni X va Y xromosomalar belgilaydi: XX – ayol, XY – erkak. Jins bilan tizimlangan irsiylanish mavjud.</p>", reading_time: 5, difficulty: "Hard", display_order: 14 },
  { id: 515, subject_id: 5, title: "15-§. O'zgaruvchanlik turlari", content: "<p>Modifikatsion (irsiylanmaydigan) va mutatsion (irsiylanadigan) o'zgaruvchanlik farqlanadi. Mutatsiyalar genning, xromosomaning yoki genomning o'zgarishidir.</p>", reading_time: 5, difficulty: "Hard", display_order: 15 },
  { id: 516, subject_id: 5, title: "16-§. Nasliy kasalliklar", content: "<p>Gemofilliya, Daun sindromi, rang ko'rlik – odamda uchraydigan nasliy kasalliklar. Tibbiy-genetik maslahat muhim.</p>", reading_time: 5, difficulty: "Medium", display_order: 16 },
  { id: 517, subject_id: 5, title: "17-§. Seleksiya asoslari", content: "<p>Seleksiya – madaniy o'simlik navlari va chorva hayvon zotlarini yaratish fani. Sun'iy tanlash va chatishlash asosiy usullari. N.I.Vavilov kelib chiqish markazlarini aniqlagan.</p>", reading_time: 5, difficulty: "Medium", display_order: 17 },
  { id: 518, subject_id: 5, title: "18-§. Biotexnologiya va uning yutuqlari", content: "<p>Biotexnologiya – tirik organizmlardan foydalanib sanoat mahsulotlari olish. Gen injeneriyasi, hujayra injeneriyasi va klonlash zamonaviy yo'nalishlari.</p>", reading_time: 5, difficulty: "Medium", display_order: 18 }
];

// Grade 10 Umumiy Biologiya (601-612)
const grade10Topics = [
  { id: 601, subject_id: 6, title: "1-§. Umumiy biologiyaga kirish. Hayotning tuzilish darajalari", content: "<p>Tiriklikning tuzilish darajalari molekula, hujayra, to'qima, organ, organizm, populyatsiya, biogeotsenoz va biosfera darajalarini o'z ichiga oladi.</p>", reading_time: 5, difficulty: "Easy", display_order: 1 },
  { id: 602, subject_id: 6, title: "2-§. Sitologiya fani va hujayra nazariyasi", content: "<p>Hujayra nazariyasining asosiy qoidalariga ko'ra, hujayra barcha tirik organizmlarning tuzilish, funksional va ko'payish birligidir. M.Shleyden, T.Shvann va R.Virxov uning rivojiga hissa qo'shgan.</p>", reading_time: 5, difficulty: "Medium", display_order: 2 },
  { id: 603, subject_id: 6, title: "3-§. Hujayraning noorganik moddalari", content: "<p>Suv – eng muhim erituvchi va gidrofil moddalar uchun muhit hisoblanadi. Shuningdek, hujayrada turli makro va mikroelementlar mineral tuzlar ko'rinishida bo'ladi.</p>", reading_time: 5, difficulty: "Medium", display_order: 3 },
  { id: 604, subject_id: 6, title: "4-§. Hujayraning organik moddalari: uglevodlar va lipidlar", content: "<p>Uglevodlar (monosaxaridlar, disaxaridlar va polisaxaridlar) va lipidlar (yog'lar, lipidlar) hujayrada birinchi navbatda energetik va qurilish funksiyalarini bajaradi.</p>", reading_time: 5, difficulty: "Medium", display_order: 4 },
  { id: 605, subject_id: 6, title: "5-§. Oqsillar va ularning tuzilishi", content: "<p>Oqsillar – aminokislotalardan tashkil topgan polimerlar. Ularning birlamchi (peptid bog'lar), ikkilamchi (vodorod bog'lar), uchlamchi (disulfid ko'priklari) va to'rtlamchi strukturaviy shakllari mavjud.</p>", reading_time: 6, difficulty: "Hard", display_order: 5 },
  { id: 606, subject_id: 6, title: "6-§. Oqsillarning funksiyalari", content: "<p>Oqsillar katalitik (fermentlar), transport (gemoglobin), himoya (antitelalar), qurilish (kollagen), harakat (aktin va miozin) va energetik vazifalarni bajaradi.</p>", reading_time: 5, difficulty: "Medium", display_order: 6 },
  { id: 607, subject_id: 6, title: "7-§. Nuklein kislotalar: DNK", content: "<p>DNK qo'sh zanjirli spiral molekula bo'lib, uning nukleotidlari (adenin, timin, guanin va sitozin) komplementarlik qoidasi bo'yicha bog'lanadi (A=T, G≡C).</p>", reading_time: 6, difficulty: "Hard", display_order: 7 },
  { id: 608, subject_id: 6, title: "8-§. Nuklein kislotalar: RNK va ATF", content: "<p>RNK bir zanjirli molekula bo'lib, uratsil nukleotidiga ega. ATF esa hujayraning universal energiya manbai bo'lib, tarkibida ikkita yuqori energiyali (makroergik) bog' bor.</p>", reading_time: 5, difficulty: "Hard", display_order: 8 },
  { id: 609, subject_id: 6, title: "9-§. Prokariot va eukariot hujayralar", content: "<p>Prokariotlar (bakteriyalar) shakllangan yadroga ega emas, DNK halqasimon bo'lib sitoplazmada joylashadi. Eukariotlar (o'simlik, hayvon, zamburug') yadroga va membranali organoidlarga ega.</p>", reading_time: 5, difficulty: "Medium", display_order: 9 },
  { id: 610, subject_id: 6, title: "10-§. Hujayra organoidlari va sitoplazma", content: "<p>Ribosoma – oqsil sintezi markazi. Mitoxondriya – hujayraning energetik stansiyasi (ATF sintezi). Plastidalar esa faqat o'simliklarda uchrab, fotosintezni amalga oshiradi.</p>", reading_time: 6, difficulty: "Hard", display_order: 10 },
  { id: 611, subject_id: 6, title: "11-§. Hujayra metabolizmi: Energiya almashinuvi", content: "<p>Energiya almashinuvi (katabolizm) 3 bosqichdan iborat: tayyorgarlik bosqichi, kislorodsiz bo'linish (glikoliz) va kislorodli nafas olish (Krebs sikli va oksidlanish).</p>", reading_time: 6, difficulty: "Hard", display_order: 11 },
  { id: 612, subject_id: 6, title: "12-§. Hujayra bo'linishi: Mitoz va Meyoz", content: "<p>Mitozda xromosomalar soni saqlangan holda somatik hujayralar bo'linadi (2 ta hujayra). Meyoz natijasida jinsiy hujayralarda xromosomalar soni ikki barobar kamayadi (4 ta gaploid hujayra).</p>", reading_time: 6, difficulty: "Hard", display_order: 12 }
];

// Grade 11 Evolyutsiya va Ekologiya (701-712)
const grade11Topics = [
  { id: 701, subject_id: 7, title: "1-§. Evolyutsion ta'limot. Charlz Darvin nazariyasi", content: "<p>Charlz Darvin evolyutsiyaning asosiy omillari sifatida irsiyat, o'zgaruvchanlik va tabiiy tanlanishni ko'rsatgan. Bu ta'limot biologiyaning poydevoridir.</p>", reading_time: 5, difficulty: "Medium", display_order: 1 },
  { id: 702, subject_id: 7, title: "2-§. Yashash uchun kurash va uning shakllari", content: "<p>Yashash uchun kurash turlararo (turli turlar o'rtasida), tur ichidagi (eng shafqatsiz kurash) va noqulay atrof-muhit sharoitlariga qarshi kurash ko'rinishlarida namoyon bo'ladi.</p>", reading_time: 5, difficulty: "Easy", display_order: 2 },
  { id: 703, subject_id: 7, title: "3-§. Tabiiy tanlanish va moslashuvchanlik", content: "<p>Tabiiy tanlanish evolyutsiyaning yo'naltiruvchi kuchi bo'lib, muhit sharoitiga eng yaxshi moslashgan organizmlarning yashab qolishi va avlod qoldirishini ta'minlaydi.</p>", reading_time: 5, difficulty: "Medium", display_order: 3 },
  { id: 704, subject_id: 7, title: "4-§. Tur va uning mezonlari. Mikroevolyutsiya", content: "<p>Tur mezonlari: morfologik, fiziologik, geografik, ekologik va genetik mezonlar. Mikroevolyutsiya populyatsiyalar darajasida kechib, yangi turlar hosil bo'lishiga olib keladi.</p>", reading_time: 6, difficulty: "Hard", display_order: 4 },
  { id: 705, subject_id: 7, title: "5-§. Makroevolyutsiya. Evolyutsiya yo'nalishlari", content: "<p>Makroevolyutsiya turlar ustidagi yirik tizimlarning shakllanishi. Asosiy yo'nalishlari: aromorfoz (tuzilishning murakkablashishi), idioadaptatsiya (xususiy moslashuv) va umumiy degeneratsiya.</p>", reading_time: 6, difficulty: "Hard", display_order: 5 },
  { id: 706, subject_id: 7, title: "6-§. Hayotning paydo bo'lishi haqidagi nazariyalar", content: "<p>Oparin-Xaldeynning koatservat nazariyasiga ko'ra, hayot birlamchi okeanda noorganik birikmalardan kimyoviy evolyutsiya orqali kelib chiqqan (abiogenez).</p>", reading_time: 5, difficulty: "Medium", display_order: 6 },
  { id: 707, subject_id: 7, title: "7-§. Antropogenez: Insonning kelib chiqishi", content: "<p>Inson evolyutsiyasi (antropogenez) biologik (irsiyat, tabiiy tanlanish) va ijtimoiy (mehnat, nutq, jamiyat) omillar ta'sirida kechgan. Avstralopiteklar, Homo erectus, Neandertallar asosiy bosqichlardir.</p>", reading_time: 6, difficulty: "Hard", display_order: 7 },
  { id: 708, subject_id: 7, title: "8-§. Ekologiya faniga kirish. Ekologik omillar", content: "<p>Ekologiya – tirik organizmlarning o'zaro va atrof-muhit bilan munosabatlarini o'rganadi. Omili uchga bo'linadi: abiotik (jonsiz), biotik (tiriklik ta'siri) va antropogen (inson ta'siri).</p>", reading_time: 5, difficulty: "Medium", display_order: 8 },
  { id: 709, subject_id: 7, title: "9-§. Populyatsiyalar ekologiyasi", content: "<p>Populyatsiya – bir turning ma'lum hududda uzoq vaqt ajralgan holda yashovchi vakillari yig'indisi. Zichlik, tug'ilish, o'lim va jinsiy tarkib populyatsiyaning asosiy belgilaridir.</p>", reading_time: 5, difficulty: "Medium", display_order: 9 },
  { id: 710, subject_id: 7, title: "10-§. Biogeotsenoz va ekotizimlar", content: "<p>Ekotizim tarkibiy qismlari: produtsentlar (organik modda yaratuvchilar), konsumentlar (tayyor modda iste'molchilari) va redutsentlar (qoldiqlarni parchalovchilar). Ular oziq zanjirini hosil qiladi.</p>", reading_time: 5, difficulty: "Medium", display_order: 10 },
  { id: 711, subject_id: 7, title: "11-§. Biosfera haqidagi ta'limot", content: "<p>V.I.Vernadskiy biosferani Yerning hayot tarqalgan faol qobig'i sifatida ta'riflagan. Tirik moddaning gaz, konsentratsiya va oksidlanish-qaytarilish funksiyalari mavjud.</p>", reading_time: 5, difficulty: "Medium", display_order: 11 },
  { id: 712, subject_id: 7, title: "12-§. Ekologik muammolar va tabiatni muhofaza qilish", content: "<p>Global isish, ozon qavatining yemirilishi va bioxilmaxillikning kamayishi zamonaviy muammolardir. Qizil kitob va qo'riqxonalar turlarni asrab qolish usullaridir.</p>", reading_time: 5, difficulty: "Easy", display_order: 12 }
];

const initialTopics = [...grade5Topics, ...grade6Topics, ...grade7Topics, ...grade8Topics, ...grade9Topics, ...grade10Topics, ...grade11Topics];

const initialQuestions = [
  // 5-Sinf Biologiya Questions
{
    "id": 10101,
    "topic_id": 101,
    "question_text": "Yunoncha \"bios\" so'zi nima ma'noni anglatadi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Hayot."
  },
  {
    "id": 10102,
    "topic_id": 101,
    "question_text": "\"Logos\" so'zi qanday tarjima qilinadi?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Fan, ta’limot."
  },
  {
    "id": 10103,
    "topic_id": 101,
    "question_text": "O'simliklarni o'rganuvchi fan qanday nomlanadi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Botanika."
  },
  {
    "id": 10104,
    "topic_id": 101,
    "question_text": "Hayvonlar haqidagi fan nima?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Zoologiya."
  },
  {
    "id": 10105,
    "topic_id": 101,
    "question_text": "Zamburug'larni qaysi fan o'rganadi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Mikologiya."
  },
  {
    "id": 10106,
    "topic_id": 101,
    "question_text": "Kichik jonzotlarni (mikroorganizmlarni) o‘rganuvchi fan qaysi?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Mikrobiologiya."
  },
  {
    "id": 10107,
    "topic_id": 101,
    "question_text": "Hujayra haqidagi fan qanday ataladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Sitologiya."
  },
  {
    "id": 10108,
    "topic_id": 101,
    "question_text": "Tirik organizmning ichki tuzilishini o'rganuvchi fan qaysi?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Anatomiya."
  },
  {
    "id": 10109,
    "topic_id": 101,
    "question_text": "Tirik organizmlarni o'xshash belgilariga ko'ra guruhlarga bo'lib o'rganuvchi fan nima?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Sistematika."
  },
  {
    "id": 10110,
    "topic_id": 101,
    "question_text": "Tirik organizmda boradigan jarayonlarni (nafas olish, oziqlanish va b.) qaysi fan o'rganadi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Fiziologiya."
  },
  {
    "id": 10111,
    "topic_id": 101,
    "question_text": "Irsiyat va o'zgaruvchanlik haqidagi fan nima?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Genetika."
  },
  {
    "id": 10112,
    "topic_id": 101,
    "question_text": "Organizmlarning o'zaro va tashqi muhit bilan munosabatlarini o'rganuvchi fan qaysi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Ekologiya."
  },
  {
    "id": 10113,
    "topic_id": 101,
    "question_text": "\"Turli kasalliklar ovqatlanish tartibining buzilishidan kelib chiqadi\" degan fikrni kim bildirgan?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Ibn Sino."
  },
  {
    "id": 10114,
    "topic_id": 101,
    "question_text": "Qalqonsimon bez faoliyatini o'rganib, buqoqning oldini olish uchun tuzga yod qo'shishni taklif etgan olim kim?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Yolqin To'raqulov."
  },
  {
    "id": 10115,
    "topic_id": 101,
    "question_text": "O'zbekistonda sitologiya sohasining rivojlanishiga hissa qo'shgan olim kim?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Jahongir Hamidov."
  },
  {
    "id": 10116,
    "topic_id": 101,
    "question_text": "Dunyoda birinchi bo'lib g'o'za kolleksiyasini yaratgan akademik olim kim?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Jo'ra Musayev."
  },
  {
    "id": 10117,
    "topic_id": 101,
    "question_text": "Mashhura Mavloniy biologiyaning qaysi sohasiga munosib hissa qo'shgan?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Mikrobiologiya."
  },
  {
    "id": 10118,
    "topic_id": 101,
    "question_text": "Zoologiya sohasida hayvon parazitlarini o'rgangan akademik olim kim?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Jaloliddin Azimov."
  },
  {
    "id": 10119,
    "topic_id": 101,
    "question_text": "O'zbekistondagi cho'l va adir o'simliklarining ekologiyasini aniqlagan olima kim?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) To'raxon Rahimova."
  },
  {
    "id": 10120,
    "topic_id": 101,
    "question_text": "Botanika fanining rivojlanishiga ulkan hissa qo'shgan \"Biologiya 5\" darsligi mualliflaridan biri kim?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) O'ktam Pratov."
  },
  {
    "id": 10201,
    "topic_id": 102,
    "question_text": "Tirik organizmlardagi barcha modda va energiya almashinuvi nima deyiladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Metabolizm."
  },
  {
    "id": 10202,
    "topic_id": 102,
    "question_text": "Hujayrada moddalarning sintezlanishi va energiya sarflanishi nima deyiladi?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Assimilyatsiya."
  },
  {
    "id": 10203,
    "topic_id": 102,
    "question_text": "Murakkab moddalarning parchalanishi va energiya hosil bo‘lish jarayoni nima?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Dissimilyatsiya."
  },
  {
    "id": 10204,
    "topic_id": 102,
    "question_text": "O'z oziqasini (organik moddalarni) o'zi sintezlaydigan organizmlar qanday ataladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Avtotrof."
  },
  {
    "id": 10205,
    "topic_id": 102,
    "question_text": "Tayyor ozuqa bilan oziqlanadigan organizmlar (hayvonlar, zamburug‘lar) nima deyiladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Geterotrof."
  },
  {
    "id": 10206,
    "topic_id": 102,
    "question_text": "Yashil o‘simliklar oziqlanishiga ko‘ra qaysi guruhga kiradi?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Avtotrof."
  },
  {
    "id": 10207,
    "topic_id": 102,
    "question_text": "Qaysi organizm turi geterotrof oziqlanadi?",
    "correct_answer": "C",
    "explanation": "To'g'ri javob: C) Quyon."
  },
  {
    "id": 10208,
    "topic_id": 102,
    "question_text": "Nafas olishda tirik organizmlar asosan qaysi gazni yutadi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Kislorod."
  },
  {
    "id": 10209,
    "topic_id": 102,
    "question_text": "Nafas olish natijasida organizmdan qanday gaz ajraladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Karbonat angidrid."
  },
  {
    "id": 10210,
    "topic_id": 102,
    "question_text": "Organizm uchun zararli bo‘lgan mahsulotlarni (mochevina, ortiqcha tuzlar) chiqarish nima deyiladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Ayirish."
  },
  {
    "id": 10211,
    "topic_id": 102,
    "question_text": "Tashqi ta’sirga javoban qochish yoki qisqarish bilan javob qaytarish nima deyiladi?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Ta’sirlanish."
  },
  {
    "id": 10212,
    "topic_id": 102,
    "question_text": "Uyatchan mimoza barglariga qo‘l tekkizilganda barglarini yumishi nimaga misol?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Ta’sirlanish."
  },
  {
    "id": 10213,
    "topic_id": 102,
    "question_text": "Hayvonlarning dushmandan qochish yoki oziq topish uchun joyini o‘zgartirishi qanday harakat?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Aktiv harakat."
  },
  {
    "id": 10214,
    "topic_id": 102,
    "question_text": "Kungaboqar gulining quyoshga qarab burilishi qanday harakat turiga kiradi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Passiv harakat."
  },
  {
    "id": 10215,
    "topic_id": 102,
    "question_text": "Tirik organizmlarning o'zidan nasl qoldirishi nima deyiladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Ko‘payish."
  },
  {
    "id": 10216,
    "topic_id": 102,
    "question_text": "Kurtaklanish yoki ikkiga bo'linish qanday ko‘payish turi?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Jinssiz."
  },
  {
    "id": 10217,
    "topic_id": 102,
    "question_text": "Jinsiy ko'payishda ishtirok etuvchi hujayralar nima deyiladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Gametalar."
  },
  {
    "id": 10218,
    "topic_id": 102,
    "question_text": "Organizmni miqdor jihatdan ortishi (bo‘yi, vazni) nima deyiladi?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) O‘sish."
  },
  {
    "id": 10219,
    "topic_id": 102,
    "question_text": "Organizmni sifat jihatdan o'zgarishi (masalan, gullash, meva berish) nima deyiladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Rivojlanish."
  },
  {
    "id": 10220,
    "topic_id": 102,
    "question_text": "Suvda yashovchi organizmlar qaysi modda bilan nafas oladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Suvda erigan kislorod."
  },
  {
    "id": 10301,
    "topic_id": 103,
    "question_text": "Biologiyada eng qadimgi o'rganish usuli qaysi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Kuzatish."
  },
  {
    "id": 10302,
    "topic_id": 103,
    "question_text": "Kuzatish usulida ma'lumotlar asosan nimalar yordamida to'planadi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Sezgi organlari."
  },
  {
    "id": 10303,
    "topic_id": 103,
    "question_text": "Ikki organizm o'rtasidagi o'xshashlik va farqlarni aniqlash qaysi usul?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Taqqoslash."
  },
  {
    "id": 10304,
    "topic_id": 103,
    "question_text": "Otlarning qadimda tulkidek keladigan hayvondan kelib chiqqanini aniqlash qaysi usulga misol?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Tarixiy usul."
  },
  {
    "id": 10305,
    "topic_id": 103,
    "question_text": "Organizmlar uchun maxsus sharoit yaratib, ularning o'zgarishini o'rganish nima deyiladi?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Tajriba usuli."
  },
  {
    "id": 10306,
    "topic_id": 103,
    "question_text": "Qadimgi organizmlarni hozirgilar bilan solishtirib, o'zgarish darajasini aniqlaydigan olimlar kim?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Paleontologlar."
  },
  {
    "id": 10307,
    "topic_id": 103,
    "question_text": "XVII asrda italiyalik shifokor Franchesko Redi qanday tajriba o'tkazgan?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Go‘sht bo‘laklari va pashshalar ustida."
  },
  {
    "id": 10308,
    "topic_id": 103,
    "question_text": "Redi tajribasida nima uchun ochiq qoldirilgan idishda pashshalar paydo bo'ldi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Pashshalar tuxum qo'ygani uchun."
  },
  {
    "id": 10309,
    "topic_id": 103,
    "question_text": "Qaysi usulda tabiiy muhitga ta'sir etmagan holda ma'lumot olinadi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Kuzatish."
  },
  {
    "id": 10310,
    "topic_id": 103,
    "question_text": "Oq gullarni bo'yoqli suvga solib, rangining o'zgarishini o'rganish qaysi usul?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Tajriba."
  },
  {
    "id": 10311,
    "topic_id": 103,
    "question_text": "Hozirgi kunda qushlar uyasi oldiga videokamera qo‘yish qaysi usulni osonlashtiradi?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Kuzatish."
  },
  {
    "id": 10312,
    "topic_id": 103,
    "question_text": "Ikki xil hayvon turining oziqlanishi va tuzilishidagi farqlarni o‘rganish qaysi usul?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Taqqoslash."
  },
  {
    "id": 10313,
    "topic_id": 103,
    "question_text": "Tarixiy usulda organizmlar qanday solishtiriladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Qadimgi turlar hozirgilar bilan."
  },
  {
    "id": 10314,
    "topic_id": 103,
    "question_text": "Redi tajribasida necha xil shisha idish ishlatilgan?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Uchta."
  },
  {
    "id": 10315,
    "topic_id": 103,
    "question_text": "Oq planariyaning daryodagi harakatini durbin bilan kuzatish qaysi usulga kiradi?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Kuzatish."
  },
  {
    "id": 10316,
    "topic_id": 103,
    "question_text": "Tajriba usuli yordamida nima o‘rganiladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Tashqi muhit ta’sirida organizmning o‘zgarishi."
  },
  {
    "id": 10317,
    "topic_id": 103,
    "question_text": "Redi tajribasining uchinchi idishi nima bilan yopilgan edi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Doka."
  },
  {
    "id": 10318,
    "topic_id": 103,
    "question_text": "Biologiya usullarini birgalikda qo‘llash mumkinmi?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Ha."
  },
  {
    "id": 10319,
    "topic_id": 103,
    "question_text": "Taqqoslash usulida nima aniqlanadi?",
    "correct_answer": "C",
    "explanation": "To'g'ri javob: C) O‘xshashlik hamda farqlar."
  },
  {
    "id": 10320,
    "topic_id": 103,
    "question_text": "Tarixiy usul nima uchun muhim?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Organizmlarda qanday o‘zgarishlar bo‘lganini bilish uchun."
  },
  {
    "id": 10401,
    "topic_id": 104,
    "question_text": "Tirik organizmning eng kichik tuzilish va vazifa birligi nima?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Hujayra."
  },
  {
    "id": 10402,
    "topic_id": 104,
    "question_text": "Inson qonidagi eritrotsitlarning shakli qanday?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Ikki tomoni botiq."
  },
  {
    "id": 10403,
    "topic_id": 104,
    "question_text": "Organizmni mikroblardan himoya qiluvchi va soxta oyoqlar hosil qiluvchi hujayra qaysi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Leykotsit."
  },
  {
    "id": 10404,
    "topic_id": 104,
    "question_text": "Nerv impulslarini hujayradan hujayraga o'tkazib beruvchi hujayra nima?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Nerv hujayrasi."
  },
  {
    "id": 10405,
    "topic_id": 104,
    "question_text": "Yadrosi shakllanmagan organizmlar (bakteriyalar) nima deyiladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Prokariotlar."
  },
  {
    "id": 10406,
    "topic_id": 104,
    "question_text": "Yadrosi yaxshi shakllangan organizmlar (zamburug‘lar, o‘simliklar, hayvonlar) qanday ataladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Eukariotlar."
  },
  {
    "id": 10407,
    "topic_id": 104,
    "question_text": "Hujayrani tashqi tomondan o'rab himoya qiluvchi va moddalarni tanlab o'tkazuvchi qism nima?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Sitoplazmatik membrana."
  },
  {
    "id": 10408,
    "topic_id": 104,
    "question_text": "Hujayraning ichki suyuqligi bo‘lib, unda organoidlar joylashgan qism nima?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Sitoplazma."
  },
  {
    "id": 10409,
    "topic_id": 104,
    "question_text": "Hujayraning eng muhim qismi bo'lib, irsiy axborotni saqlaydigan organoid qaysi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Yadro."
  },
  {
    "id": 10410,
    "topic_id": 104,
    "question_text": "Faqat o‘simlik hujayrasi uchun xos bo‘lgan mustahkam tashqi qavat nima?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Sellyuloza qobiq."
  },
  {
    "id": 10411,
    "topic_id": 104,
    "question_text": "O'simlik hujayrasidagi yashil plastidalar nima deyiladi?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Xloroplast."
  },
  {
    "id": 10412,
    "topic_id": 104,
    "question_text": "Mevaning sariq yoki qizil rangini ta’minlovchi plastidalar qanday nomlanadi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Xromoplast."
  },
  {
    "id": 10413,
    "topic_id": 104,
    "question_text": "Ildiz va urug‘larda uchraydigan rangsiz plastidalar qaysi?",
    "correct_answer": "C",
    "explanation": "To'g'ri javob: C) Leykoplast."
  },
  {
    "id": 10414,
    "topic_id": 104,
    "question_text": "Hujayra shirasiga ega bo'lib, mevaning shirin yoki nordonligini belgilaydigan bo'shliq nima?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Vakuola."
  },
  {
    "id": 10415,
    "topic_id": 104,
    "question_text": "O‘simlikning yosh hujayrasiga nisbatan qari hujayrasida vakuola qanday bo‘ladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Yirik bo‘ladi."
  },
  {
    "id": 10416,
    "topic_id": 104,
    "question_text": "Hayvon hujayrasidagi ortiqcha suyuqlikni chiqarib yuboruvchi organoid qaysi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Qisqaruvchi vakuola."
  },
  {
    "id": 10417,
    "topic_id": 104,
    "question_text": "Hujayraga kirgan oziq moddalarni parchalovchi hayvon hujayrasi bo‘shlig‘i nima?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Hazm vakuolasi."
  },
  {
    "id": 10418,
    "topic_id": 104,
    "question_text": "Bir xil vazifani bajaruvchi hujayralar yig‘indisi nima deyiladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) To‘qima."
  },
  {
    "id": 10419,
    "topic_id": 104,
    "question_text": "To‘qimalar birlashib nimani hosil qiladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Organni."
  },
  {
    "id": 10420,
    "topic_id": 104,
    "question_text": "Pomidorning yashil rangdan (xloroplast) qizil rangga (xromoplast) aylanishi nimani isbotlaydi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Plastidalar bir-biriga aylanishini."
  },
  {
    "id": 10501,
    "topic_id": 105,
    "question_text": "Tirik organizmlar necha dunyoga bo‘linadi?",
    "correct_answer": "C",
    "explanation": "To'g'ri javob: C) 4 ta."
  },
  {
    "id": 10502,
    "topic_id": 105,
    "question_text": "Quyidagilardan qaysi biri tirik organizmlar dunyosiga kirmaydi?",
    "correct_answer": "D",
    "explanation": "To'g'ri javob: D) Viruslar."
  },
  {
    "id": 10503,
    "topic_id": 105,
    "question_text": "Faqat mikroskop yordamida o‘rganiladigan eukariot bo‘lmagan dunyo qaysi?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Bakteriyalar."
  },
  {
    "id": 10504,
    "topic_id": 105,
    "question_text": "Zamburug‘lar tanasini tashkil etuvchi ingichka ipchalar nima deyiladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Gifalar."
  },
  {
    "id": 10505,
    "topic_id": 105,
    "question_text": "O‘simliklar dunyosining boshqa nomi nima?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Flora."
  },
  {
    "id": 10506,
    "topic_id": 105,
    "question_text": "Hayvonot dunyosi qanday ataladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Fauna."
  },
  {
    "id": 10507,
    "topic_id": 105,
    "question_text": "O‘simliklar fotosintez jarayonida qaysi gazni yutadi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Karbonat angidrid."
  },
  {
    "id": 10508,
    "topic_id": 105,
    "question_text": "Fotosintez natijasida atmosferaga qanday gaz ajraladi?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Kislorod."
  },
  {
    "id": 10509,
    "topic_id": 105,
    "question_text": "Hayvonlarning boshqa tirik organizmlardan asosiy farqi nimada?",
    "correct_answer": "C",
    "explanation": "To'g'ri javob: C) Nerv sistemasi va sezgi organlari borligida."
  },
  {
    "id": 10510,
    "topic_id": 105,
    "question_text": "Hayotning hujayrasiz shakli nima?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Virus."
  },
  {
    "id": 10511,
    "topic_id": 105,
    "question_text": "Viruslar qachon tiriklik belgilarini namoyon qiladi?",
    "correct_answer": "C",
    "explanation": "To'g'ri javob: C) Hujayra ichiga kirganda."
  },
  {
    "id": 10512,
    "topic_id": 105,
    "question_text": "Bakteriyalarda parazitlik qiluvchi virus qanday nomlanadi?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Bakteriofag."
  },
  {
    "id": 10513,
    "topic_id": 105,
    "question_text": "Odamda jigarni zararlaydigan virusli kasallik qaysi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Gepatit (A va B)."
  },
  {
    "id": 10514,
    "topic_id": 105,
    "question_text": "Nafas yo‘llari shilliq qavatida qaysi virus parazitlik qiladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Gripp va koronavirus."
  },
  {
    "id": 10515,
    "topic_id": 105,
    "question_text": "Tamaki mozaikasi virusi qaysi dunyo vakillarida parazitlik qiladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) O‘simliklarda."
  },
  {
    "id": 10516,
    "topic_id": 105,
    "question_text": "Lab epiteliysida qaysi virusli kasallik toshmalari uchraydi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Gerpes."
  },
  {
    "id": 10517,
    "topic_id": 105,
    "question_text": "Gripp kasalligining dastlabki belgilariga nima kirmaydi?",
    "correct_answer": "D",
    "explanation": "To'g'ri javob: D) Suye suyak og‘rig‘i."
  },
  {
    "id": 10518,
    "topic_id": 105,
    "question_text": "Virusli kasallikka chalingan bemorga birinchi navbatda nima qilish kerak?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Ko‘p suyuqlik ichirish va shifokorga murojaat qilish."
  },
  {
    "id": 10519,
    "topic_id": 105,
    "question_text": "Hayvonlarda quturish kasalligini nima keltirib chiqaradi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Virus."
  },
  {
    "id": 10520,
    "topic_id": 105,
    "question_text": "Quyidagilardan qaysi biri mustaqil yashay olmaydigan mavjudot?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Virus."
  },
  {
    "id": 10601,
    "topic_id": 106,
    "question_text": "Bakteriyalarni o‘rganuvchi fan nima?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Mikrobiologiya."
  },
  {
    "id": 10602,
    "topic_id": 106,
    "question_text": "Sharsimon shakldagi bakteriyalar qanday nomlanadi?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Kokk."
  },
  {
    "id": 10603,
    "topic_id": 106,
    "question_text": "Tayoqchasimon bakteriyalar nima deyiladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Batsilla."
  },
  {
    "id": 10604,
    "topic_id": 106,
    "question_text": "Buralgan shaklli bakteriyalar guruhi qaysi?",
    "correct_answer": "C",
    "explanation": "To'g'ri javob: C) Vibrion va spirilla."
  },
  {
    "id": 10605,
    "topic_id": 106,
    "question_text": "Bakteriyalar qulay sharoitda har necha daqiqada bo‘linadi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) 20-30."
  },
  {
    "id": 10606,
    "topic_id": 106,
    "question_text": "Noqulay sharoitda bakteriyalar nima hosil qiladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Spora."
  },
  {
    "id": 10607,
    "topic_id": 106,
    "question_text": "Bakteriya sporasi qanday haroratga bardosh bera oladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) +140°C dan -253°C gacha."
  },
  {
    "id": 10608,
    "topic_id": 106,
    "question_text": "Sut-qatiq mahsulotlari olishda qaysi bakteriyalardan foydalaniladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Achituvchi."
  },
  {
    "id": 10609,
    "topic_id": 106,
    "question_text": "Tuzlama tayyorlashda sabzavotlar chirishining oldini nima oladi?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Sut kislotasi hosil qiluvchi bakteriyalar."
  },
  {
    "id": 10610,
    "topic_id": 106,
    "question_text": "\"Yer yuzining sanitarlari\" deb qaysi bakteriyalarga aytiladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Chirituvchi."
  },
  {
    "id": 10611,
    "topic_id": 106,
    "question_text": "Dukkakdoshlar (beda) ildizida qaysi bakteriyalar yashaydi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Tugunak."
  },
  {
    "id": 10612,
    "topic_id": 106,
    "question_text": "Tugunak bakteriyalar havoning qaysi elementini o‘zlashtiradi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Azot."
  },
  {
    "id": 10613,
    "topic_id": 106,
    "question_text": "Bakteriya va o‘simlikning o‘zaro foydali hamkorligi nima deyiladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Simbioz."
  },
  {
    "id": 10614,
    "topic_id": 106,
    "question_text": "Bakteriyalar keltirib chiqaradigan kasallikni aniqlang.",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Sil (vabo, o‘lat)."
  },
  {
    "id": 10615,
    "topic_id": 106,
    "question_text": "Yuqumli kasalliklarning yoppasiga tarqalishi nima deyiladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Epidemiya."
  },
  {
    "id": 10616,
    "topic_id": 106,
    "question_text": "Epidemiyaning oldini olish uchun qanday chora ko‘riladi?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Karantin."
  },
  {
    "id": 10617,
    "topic_id": 106,
    "question_text": "Bakteriyalarni o‘ldiruvchi modda ajratadigan o‘simliklar qaysi?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Archa, terak."
  },
  {
    "id": 10618,
    "topic_id": 106,
    "question_text": "Bakteriyalarga qarshi o‘simlik ajratadigan modda nima?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Fitonsid."
  },
  {
    "id": 10619,
    "topic_id": 106,
    "question_text": "Fransuz olimi Lui Paster o‘z tajribasida qanday shakldagi naychadan foydalanigan?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) \"S\" shaklidagi nay."
  },
  {
    "id": 10620,
    "topic_id": 106,
    "question_text": "Nima uchun Paster tajribasida ochiq kolbadagi go‘sht qaynatmasi aynib qoldi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Havo bilan bakteriyalar tushgani uchun."
  },
  {
    "id": 10701,
    "topic_id": 107,
    "question_text": "Zamburug‘larni o‘rganuvchi fan qaysi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Mikologiya."
  },
  {
    "id": 10702,
    "topic_id": 107,
    "question_text": "Zamburug‘lar oziqlanishiga ko‘ra qaysi guruhga kiradi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Geterotrof."
  },
  {
    "id": 10703,
    "topic_id": 107,
    "question_text": "Zamburug‘lar yashashi uchun nima shart emas?",
    "correct_answer": "D",
    "explanation": "To'g'ri javob: D) Yorug‘lik."
  },
  {
    "id": 10704,
    "topic_id": 107,
    "question_text": "Non yopishda foydalaniladigan bir hujayrali zamburug‘ qaysi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Achitqi."
  },
  {
    "id": 10705,
    "topic_id": 107,
    "question_text": "Achitqi zamburug‘i qanday ko‘payadi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Kurtaklanib."
  },
  {
    "id": 10706,
    "topic_id": 107,
    "question_text": "Non selofan paketda qolib ketsa, qanday zamburug‘ rivojlanadi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Mog‘or."
  },
  {
    "id": 10707,
    "topic_id": 107,
    "question_text": "Mog‘or zamburug‘ining sporalari yetilgach, qanday rangga kiradi?",
    "correct_answer": "C",
    "explanation": "To'g'ri javob: C) Yashil yoki qoramtir."
  },
  {
    "id": 10708,
    "topic_id": 107,
    "question_text": "Mog‘or zamburug‘ining ayrim turlaridan qanday dori olinadi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Antibiotik."
  },
  {
    "id": 10709,
    "topic_id": 107,
    "question_text": "Iste’mol qilinadigan (yeyiladigan) zamburug‘ni toping.",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Qo‘zidumba (shampinion)."
  },
  {
    "id": 10710,
    "topic_id": 107,
    "question_text": "Oq qo‘ziqorin zamburug‘larning qaysi turiga kiradi?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Qalpoqchali."
  },
  {
    "id": 10711,
    "topic_id": 107,
    "question_text": "Zamburug‘larni taomga ishlatishdan oldin nima qilish shart?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) 5-7 daqiqa qaynatib, suvini to‘kib yuborish."
  },
  {
    "id": 10712,
    "topic_id": 107,
    "question_text": "Zaharli qalpoqchali zamburug‘ni aniqlang.",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Qizil muxomor."
  },
  {
    "id": 10713,
    "topic_id": 107,
    "question_text": "Boshoqli o‘simliklarda qora kukun hosil qiluvchi parazit zamburug‘ qaysi?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Qorakuya."
  },
  {
    "id": 10714,
    "topic_id": 107,
    "question_text": "G‘o‘za va boshqa o‘simliklarning so‘lishiga (vilt) nima sabab bo‘ladi?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Vertitsillium zamburug‘i."
  },
  {
    "id": 10715,
    "topic_id": 107,
    "question_text": "Barglarda zangga o‘xshash dog‘ hosil qiladigan zamburug‘ qaysi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Zang zamburug‘i."
  },
  {
    "id": 10716,
    "topic_id": 107,
    "question_text": "Zamburug‘lar hujayra tuzilishiga ko‘ra qanday organizm?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Eukariot."
  },
  {
    "id": 10717,
    "topic_id": 107,
    "question_text": "Qalpoqchali zamburug‘lar nima yordamida tarqaladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Spora."
  },
  {
    "id": 10718,
    "topic_id": 107,
    "question_text": "Nima uchun zamburug‘lar ilgari o‘simliklar dunyosiga kiritilgan?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Erkin harakatlana olmagani uchun."
  },
  {
    "id": 10719,
    "topic_id": 107,
    "question_text": "Iste’mol qilinadigan zamburug‘lar asosan nima sifatida foydalaniladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Ozuqa."
  },
  {
    "id": 10720,
    "topic_id": 107,
    "question_text": "Sariq soxta qo‘ziqorin qanday zamburug‘?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Zaharli."
  },
  {
    "id": 10801,
    "topic_id": 108,
    "question_text": "O‘simliklarning oziqlanishi, o‘sishi va rivojlanishini ta’minlovchi organlar qanday nomlanadi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Vegetativ."
  },
  {
    "id": 10802,
    "topic_id": 108,
    "question_text": "Quyidagilardan qaysi biri vegetativ organ?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Ildiz (poya, barg)."
  },
  {
    "id": 10803,
    "topic_id": 108,
    "question_text": "O‘simlikning ko‘payishi va tarqalishini ta’minlovchi organlar nima deyiladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Generativ."
  },
  {
    "id": 10804,
    "topic_id": 108,
    "question_text": "Generativ organlarga nimalar kiradi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Gul, meva, urug‘."
  },
  {
    "id": 10805,
    "topic_id": 108,
    "question_text": "O‘simliklar oziq zanjirida qanday rol o‘ynaydi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Produtsent."
  },
  {
    "id": 10806,
    "topic_id": 108,
    "question_text": "Sistematika faniga kim asos solgan?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Karl Linney."
  },
  {
    "id": 10807,
    "topic_id": 108,
    "question_text": "O‘simliklar sistematikasidagi eng kichik birlik nima?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Tur."
  },
  {
    "id": 10808,
    "topic_id": 108,
    "question_text": "Tuzilishi o‘xshash organizmlar qaysi guruhga birlashadi?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Bitta turga."
  },
  {
    "id": 10809,
    "topic_id": 108,
    "question_text": "O‘simliklar sistematik birliklarining to‘g‘ri ketma-ketligini toping.",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Tur -> Turkum -> Oila -> Sinf -> Bo‘lim -> Dunyo."
  },
  {
    "id": 10810,
    "topic_id": 108,
    "question_text": "Makkajo‘xori qaysi oilaga kiradi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Bug‘doydoshlar."
  },
  {
    "id": 10811,
    "topic_id": 108,
    "question_text": "Dorivor qoqio‘t qaysi sinf vakili?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Ikki urug‘pallalilar."
  },
  {
    "id": 10812,
    "topic_id": 108,
    "question_text": "Tanasi ildiz, poya, bargga bo‘linmagan o‘simliklar qanday ataladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Tuban (tallomli)."
  },
  {
    "id": 10813,
    "topic_id": 108,
    "question_text": "Tuban o‘simliklarning tanasi nima deyiladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Tallom yoki qattana."
  },
  {
    "id": 10814,
    "topic_id": 108,
    "question_text": "Tuban o‘simliklarga misol keltiring.",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Suvo‘tlar."
  },
  {
    "id": 10815,
    "topic_id": 108,
    "question_text": "Yuksak o‘simliklar qaysi guruhlarga bo‘linadi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Sporali va urug‘li."
  },
  {
    "id": 10816,
    "topic_id": 108,
    "question_text": "Sporali yuksak o‘simliklarga nimalar kiradi?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Yo‘sin, qirqbo‘g‘im, qirqquloq."
  },
  {
    "id": 10817,
    "topic_id": 108,
    "question_text": "Urug‘li o‘simliklar bo‘limlarini aniqlang.",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Ochiq urug‘lilar va yopiq urug‘lilar."
  },
  {
    "id": 10818,
    "topic_id": 108,
    "question_text": "Yopiq urug‘li o‘simliklar yana qanday nomlanadi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Gulli o‘simliklar."
  },
  {
    "id": 10819,
    "topic_id": 108,
    "question_text": "O‘simliklar havoni namlantirishda qanday ishtirok etadi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Suv bug‘latish (transpiratsiya) orqali."
  },
  {
    "id": 10820,
    "topic_id": 108,
    "question_text": "Makkajo‘xori qaysi bo‘limga mansub?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Yopiq urug‘lilar."
  },
  {
    "id": 10901,
    "topic_id": 109,
    "question_text": "Tanasi organlarga (ildiz, poya, barg) bo‘linmagan o‘simliklar nima deyiladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Tuban (tallomli)."
  },
  {
    "id": 10902,
    "topic_id": 109,
    "question_text": "Suvo‘tlar hujayrasida pigment joylashgan qism nima?",
    "correct_answer": "C",
    "explanation": "To'g'ri javob: C) Xromatofor."
  },
  {
    "id": 10903,
    "topic_id": 109,
    "question_text": "Sharsimon shakldagi bir hujayrali yashil suvo‘t qaysi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Xlorella."
  },
  {
    "id": 10904,
    "topic_id": 109,
    "question_text": "Xivchinlari yordamida yorug‘likka qarab harakatlanuvchi yashil suvo‘t qaysi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Xlamidomonada."
  },
  {
    "id": 10905,
    "topic_id": 109,
    "question_text": "Xlamidomonada yorug‘likni nima yordamida sezadi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Qizil ko‘zcha."
  },
  {
    "id": 10906,
    "topic_id": 109,
    "question_text": "Xromatofori belbog‘ shaklida joylashgan ipsimon yashil suvo‘t?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Ulotriks."
  },
  {
    "id": 10907,
    "topic_id": 109,
    "question_text": "Suvo‘tlarning ildiz vazifasini bajaruvchi birikish organi nima?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Rizoid."
  },
  {
    "id": 10908,
    "topic_id": 109,
    "question_text": "Ulotriks qulay sharoitda necha xivchinli zoosporalar orqali ko‘payadi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) To‘rt."
  },
  {
    "id": 10909,
    "topic_id": 109,
    "question_text": "Ulotriksning jinsiy ko‘payishida qatnashuvchi ikki xivchinli hujayralar nima?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Izogametalar."
  },
  {
    "id": 10910,
    "topic_id": 109,
    "question_text": "\"Baqa to‘nlari\"ni hosil qiluvchi rizoidsiz ko‘p hujayrali suvo‘t qaysi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Spirogira."
  },
  {
    "id": 10911,
    "topic_id": 109,
    "question_text": "Spirogiraning xromatofori qanday shaklda bo‘ladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Spiralsimon buralgan."
  },
  {
    "id": 10912,
    "topic_id": 109,
    "question_text": "\"Dengiz salati\" deb ataluvchi qizil suvo‘tni aniqlang.",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Porfira."
  },
  {
    "id": 10913,
    "topic_id": 109,
    "question_text": "Qizil suvo‘tlarga qizil rang beruvchi pigment nima?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Antotsian."
  },
  {
    "id": 10914,
    "topic_id": 109,
    "question_text": "\"Dengiz karami\" deb ataluvchi qo‘ng‘ir suvo‘t qaysi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Laminariya."
  },
  {
    "id": 10915,
    "topic_id": 109,
    "question_text": "Laminariya tarkibida qaysi modda ko‘p uchraydi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Yod."
  },
  {
    "id": 10916,
    "topic_id": 109,
    "question_text": "Xlorelladan nima maqsadda foydalaniladi?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Chorva mollari uchun ozuqa sifatida."
  },
  {
    "id": 10917,
    "topic_id": 109,
    "question_text": "Ifloslangan suv havzalarini tozalashda qaysi suvo‘tdan foydalaniladi?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Xlamidomonada."
  },
  {
    "id": 10918,
    "topic_id": 109,
    "question_text": "Tallom so‘zi qanday ma’noni anglatadi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Organlarga bo‘linmagan tana."
  },
  {
    "id": 10919,
    "topic_id": 109,
    "question_text": "Suvo‘tlar suvni nima bilan boyitadi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Kislorod."
  },
  {
    "id": 10920,
    "topic_id": 109,
    "question_text": "Spirogira qanday ko‘payadi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Tallomining bo‘laklarga bo‘linishi bilan."
  },
  {
    "id": 11001,
    "topic_id": 110,
    "question_text": "Yuksak o‘simliklar tanasi nimalardan iborat?",
    "correct_answer": "C",
    "explanation": "To'g'ri javob: C) Ildiz, poya va barg."
  },
  {
    "id": 11002,
    "topic_id": 110,
    "question_text": "Sporali yuksak o‘simliklarga nimalar kiradi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Yo‘sin, qirqbo‘g‘im, qirqquloq."
  },
  {
    "id": 11003,
    "topic_id": 110,
    "question_text": "Ildizi bo‘lmagan, tuproqqa rizoidlari bilan birikuvchi yo‘sin?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Funariya yo‘sini."
  },
  {
    "id": 11004,
    "topic_id": 110,
    "question_text": "Funariya yo‘sini sporalari qayerda yetiladi?",
    "correct_answer": "C",
    "explanation": "To'g'ri javob: C) Ko‘sakchalarda."
  },
  {
    "id": 11005,
    "topic_id": 110,
    "question_text": "Bahorda qo‘ng‘ir, yozda yashil poya hosil qiluvchi o‘simlik?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Dala qirqbo‘g‘imi."
  },
  {
    "id": 11006,
    "topic_id": 110,
    "question_text": "Qirqbo‘g‘imning qaysi poyasi fotosintez qilib ozuqa to‘playdi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Yozgi yashil."
  },
  {
    "id": 11007,
    "topic_id": 110,
    "question_text": "Qirqquloq bargi ostidagi sporalar yetiladigan qo‘ng‘ir bo‘rtma nima?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Sorus."
  },
  {
    "id": 11008,
    "topic_id": 110,
    "question_text": "Toshko‘mir qatlamlari qadimda qaysi o‘simliklar nobud bo‘lishidan hosil bo‘lgan?",
    "correct_answer": "C",
    "explanation": "To'g'ri javob: C) Daraxtsimon qirqquloqlar."
  },
  {
    "id": 11009,
    "topic_id": 110,
    "question_text": "Tabobatda gijjaga qarshi qaysi o‘simlikdan foydalaniladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Qirqquloq."
  },
  {
    "id": 11010,
    "topic_id": 110,
    "question_text": "Urug‘i qubbada ochiq holda yetiladigan o‘simliklar?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Ochiq urug‘lilar."
  },
  {
    "id": 11011,
    "topic_id": 110,
    "question_text": "Ochiq urug‘li o‘simliklar shikastlansa, nima ajratadi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Smola."
  },
  {
    "id": 11012,
    "topic_id": 110,
    "question_text": "Smola yillar davomida qotib nimaga aylanadi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Kahrabo toshi."
  },
  {
    "id": 11013,
    "topic_id": 110,
    "question_text": "Juda sekin o‘sadigan va ming yil yashaydigan ochiq urug‘li daraxt?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Archa."
  },
  {
    "id": 11014,
    "topic_id": 110,
    "question_text": "Ninabargli o‘simliklar bargidan qanday modda ajraladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Fitonsid."
  },
  {
    "id": 11015,
    "topic_id": 110,
    "question_text": "Ochiq urug‘lilarda urug‘lanish uchun nima ishtirok etishi shart emas?",
    "correct_answer": "C",
    "explanation": "To'g'ri javob: C) Suv."
  },
  {
    "id": 11016,
    "topic_id": 110,
    "question_text": "Urug‘i meva ichida himoyalangan o‘simliklar guruhi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Yopiq urug‘lilar (Gulli)."
  },
  {
    "id": 11017,
    "topic_id": 110,
    "question_text": "Erta bahorda dastlab gul kurtaklari, keyin barg yozuvchi mevali daraxt?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) O‘rik."
  },
  {
    "id": 11018,
    "topic_id": 110,
    "question_text": "May oyida momiqqa o‘xshash uchma meva hosil qiluvchi daraxt?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Terak."
  },
  {
    "id": 11019,
    "topic_id": 110,
    "question_text": "Terakning uchma mevalari insonda qanday noxushlik chaqirishi mumkin?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Allergiya."
  },
  {
    "id": 11020,
    "topic_id": 110,
    "question_text": "O‘rikning quritilgan mevasi nima deyiladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Turshak."
  },
  {
    "id": 11101,
    "topic_id": 111,
    "question_text": "Tarkibida mentol bo‘lib, asabni tinchlantiruvchi ariq bo‘yi o‘simligi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Yalpiz."
  },
  {
    "id": 11102,
    "topic_id": 111,
    "question_text": "C vitaminiga boy, immunitetni oshiruvchi meva qaysi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Na’matak."
  },
  {
    "id": 11103,
    "topic_id": 111,
    "question_text": "Uy-joylarni dezinfeksiya qilish va havosini tozalashda ishlatiladigan o‘simlik?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Isiriq."
  },
  {
    "id": 11104,
    "topic_id": 111,
    "question_text": "Qaysi o‘simlik ildizpoyasidan quruq yo‘talga qarshi sirop olinadi?",
    "correct_answer": "C",
    "explanation": "To'g'ri javob: C) Shirinmiya (Qizilmiya)."
  },
  {
    "id": 11105,
    "topic_id": 111,
    "question_text": "Xona o‘simligi sifatida o‘stiriladigan, shamollashda ishlatiladigan sersuv bargli o‘simlik?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Aloe."
  },
  {
    "id": 11106,
    "topic_id": 111,
    "question_text": "Urug‘ida zaharli modda va 40-50% moy bo‘lgan bir yillik o‘t?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Kanakunjut."
  },
  {
    "id": 11107,
    "topic_id": 111,
    "question_text": "Kanakunjut moyi nima uchun foydali?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Soch va kipriklarni mustahkamlashga."
  },
  {
    "id": 11108,
    "topic_id": 111,
    "question_text": "Voronkasimon oq guli va tikanli ko‘sak mevasi bor zaharli o‘simlik?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Bangidevona."
  },
  {
    "id": 11109,
    "topic_id": 111,
    "question_text": "Bangidevona organizmning qaysi tizimiga zararli ta’sir ko‘rsatadi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Asab tizimiga."
  },
  {
    "id": 11110,
    "topic_id": 111,
    "question_text": "Oqish-sariq guli bor, hamma qismi zaharli bo‘lgan tikanli mevali o‘simlik?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Mingdevona."
  },
  {
    "id": 11111,
    "topic_id": 111,
    "question_text": "Sariq gulli, bargidagi suyuqlik ko‘zni yoshlantiruvchi o‘simlik?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Zaharli ayiqtovon."
  },
  {
    "id": 11112,
    "topic_id": 111,
    "question_text": "O‘zbekiston Respublikasi «Qizil kitob»i nechanchi yili ta’sis etilgan?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) 1979."
  },
  {
    "id": 11113,
    "topic_id": 111,
    "question_text": "«Qizil kitob»ning birinchi jildi qaysi hayvonlar haqida?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Umurtqali hayvonlar."
  },
  {
    "id": 11114,
    "topic_id": 111,
    "question_text": "Uzunligi 30 metrga yetadigan «Qizil kitob»ga kiritilgan o‘simlik?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Yovvoyi tok."
  },
  {
    "id": 11115,
    "topic_id": 111,
    "question_text": "Aprelda qizil gul ochadigan, piyozi yeyiladigan «Qizil kitob»dagi o‘simlik?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Xolmon isirg‘aguli."
  },
  {
    "id": 11116,
    "topic_id": 111,
    "question_text": "Tog‘ yonbag‘irlarida o‘suvchi «Qizil kitob»ga kiritilgan daraxt?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Safsan xurmosi."
  },
  {
    "id": 11117,
    "topic_id": 111,
    "question_text": "«Qizil kitob»ga kiritilgan Xongul hayvonining boshqa nomi nima?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Buxoro bug‘usi."
  },
  {
    "id": 11118,
    "topic_id": 111,
    "question_text": "Suvsizlikka chiday oladigan, cho‘l sharoitiga moslashgan «Qizil kitob»dagi qush?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Yo‘rg‘a tuvaloq."
  },
  {
    "id": 11119,
    "topic_id": 111,
    "question_text": "Mingdevonadan zaharlanganda birinchi yordam qanday?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Ko‘p suyuqlik ichirib qustirish."
  },
  {
    "id": 11120,
    "topic_id": 111,
    "question_text": "Na’matakni qayerda damlaganda vitaminlari ko‘proq saqlanadi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Termosda."
  },
  {
    "id": 11201,
    "topic_id": 112,
    "question_text": "Hayvonlar oziqlanishiga ko‘ra qaysi guruhga kiradi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Geterotrof."
  },
  {
    "id": 11202,
    "topic_id": 112,
    "question_text": "Hayvonot dunyosining boshqa nomi nima?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Fauna."
  },
  {
    "id": 11203,
    "topic_id": 112,
    "question_text": "Tabiat sanitarlari bo‘lgan umurtqasiz hayvonlarni toping.",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Yomg‘ir chuvalchangi, go‘ng qo‘ng‘izi."
  },
  {
    "id": 11204,
    "topic_id": 112,
    "question_text": "Suvni organik qoldiqlardan tozalovchi biofiltr hayvonlar qaysi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Ikki pallali mollyuskalar."
  },
  {
    "id": 11205,
    "topic_id": 112,
    "question_text": "Dorivor maqsadlarda ishlatiladigan hayvon mahsulotini aniqlang.",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Ilon zahari, bo‘rsiq yog‘i."
  },
  {
    "id": 11206,
    "topic_id": 112,
    "question_text": "Umurtqasining mavjudligiga ko‘ra hayvonlar necha guruhga bo‘linadi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) 2 ta (Umurtqali va umurtqasiz)."
  },
  {
    "id": 11207,
    "topic_id": 112,
    "question_text": "Umurtqali hayvonlar necha tipga bo‘linadi?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Bitta (Xordalilar)."
  },
  {
    "id": 11208,
    "topic_id": 112,
    "question_text": "Hayvonlar sistematikasidagi eng kichik birlik nima?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Tur."
  },
  {
    "id": 11209,
    "topic_id": 112,
    "question_text": "Qo‘ng‘ir ayiq qaysi turkum vakili?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Yirtqichlar."
  },
  {
    "id": 11210,
    "topic_id": 112,
    "question_text": "Ilvirs (bars) qaysi oilaga kiradi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Mushuksimonlar."
  },
  {
    "id": 11211,
    "topic_id": 112,
    "question_text": "Odam uchun kasallik tarqatuvchi hayvonlar qaysi?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Pashsha, chivin."
  },
  {
    "id": 11212,
    "topic_id": 112,
    "question_text": "Oziq zanjirida hayvonlar qanday rol o‘ynaydi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Konsument."
  },
  {
    "id": 11213,
    "topic_id": 112,
    "question_text": "Hayvonlarda o‘simliklardan farqli o‘laroq qaysi sistema yaxshi taraqqiy etgan?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Nerv sistemasi."
  },
  {
    "id": 11214,
    "topic_id": 112,
    "question_text": "Urug‘ va mevalarning tarqalishiga yordam beruvchi hayvonlar?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Olmaxon, qushlar."
  },
  {
    "id": 11215,
    "topic_id": 112,
    "question_text": "Sanoat uchun xomashyo (jun, pat) beradigan hayvonlar?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Qo‘y, qushlar."
  },
  {
    "id": 11216,
    "topic_id": 112,
    "question_text": "Transport vositasi sifatida foydalaniladigan hayvon?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Ot, eshak."
  },
  {
    "id": 11217,
    "topic_id": 112,
    "question_text": "Oq ayiq qaysi urug‘ga mansub?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Ayiq."
  },
  {
    "id": 11218,
    "topic_id": 112,
    "question_text": "Hayvonlar sistematikasi birliklarining to‘g‘ri ketma-ketligini toping.",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Tur -> Urug‘ -> Oila -> Turkum -> Sinf -> Tip -> Dunyo."
  },
  {
    "id": 11219,
    "topic_id": 112,
    "question_text": "Ichki organlar uchun tayanch vazifasini bajaruvchi tuzilma nima?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Umurtqa."
  },
  {
    "id": 11220,
    "topic_id": 112,
    "question_text": "O‘simliklarni changlatuvchi hayvonlar?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Asalari, kapalak."
  },
  {
    "id": 11301,
    "topic_id": 113,
    "question_text": "Tanasi faqat bitta hujayradan iborat hayvonlar?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Sodda hayvonlar."
  },
  {
    "id": 11302,
    "topic_id": 113,
    "question_text": "Yashil rangda bo‘lib, fotosintez qilish xususiyatiga ega sodda hayvon?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Yashil evglena."
  },
  {
    "id": 11303,
    "topic_id": 113,
    "question_text": "\"Tufli tagcharmi\"ga o‘xshash shakldagi sodda hayvon qaysi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Tufelka."
  },
  {
    "id": 11304,
    "topic_id": 113,
    "question_text": "Tanasi ikki qavat hujayradan iborat tip qaysi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Bo‘shliqichlilar."
  },
  {
    "id": 11305,
    "topic_id": 113,
    "question_text": "Hayvonning shikastlangan qismini qayta tiklanishi nima deyiladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Regeneratsiya."
  },
  {
    "id": 11306,
    "topic_id": 113,
    "question_text": "Reaktiv harakat qiluvchi bo‘shliqichli hayvon qaysi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Meduza."
  },
  {
    "id": 11307,
    "topic_id": 113,
    "question_text": "Tana bo‘shlig‘i bo‘lmagan, ikki tomonlama simmetriyali chuvalchanglar?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Yassi chuvalchanglar."
  },
  {
    "id": 11308,
    "topic_id": 113,
    "question_text": "Parazit yassi chuvalchangni aniqlang.",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Jigar qurti."
  },
  {
    "id": 11309,
    "topic_id": 113,
    "question_text": "Tashqi tomondan pishiq qobiq — kutikula bilan qoplangan chuvalchanglar?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) To‘garak chuvalchanglar."
  },
  {
    "id": 11310,
    "topic_id": 113,
    "question_text": "Odamning ichki organlarida parazitlik qiluvchi to‘garak chuvalchang?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Askarida."
  },
  {
    "id": 11311,
    "topic_id": 113,
    "question_text": "Tana bo‘shlig‘i suyuqlik bilan to‘lgan chuvalchanglar guruhi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) To‘garak."
  },
  {
    "id": 11312,
    "topic_id": 113,
    "question_text": "Qon aylanish sistemasi ilk bor qaysi hayvonlarda vujudga kelgan?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Halqali chuvalchangda."
  },
  {
    "id": 11313,
    "topic_id": 113,
    "question_text": "Tuproq unumdorligini oshiruvchi foydali hayvon?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Yomg‘ir chuvalchangi."
  },
  {
    "id": 11314,
    "topic_id": 113,
    "question_text": "Qon tomir kasalliklarini davolashda ishlatiladigan halqali chuvalchang?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Tibbiyot zulugi."
  },
  {
    "id": 11315,
    "topic_id": 113,
    "question_text": "Ohakli chig‘anoqqa ega bo‘lgan yumshoq tanali hayvonlar?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Mollyuskalar."
  },
  {
    "id": 11316,
    "topic_id": 113,
    "question_text": "Dushmanini chalg‘itish uchun siyoh chiqaradigan mollyuska?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Sakkizoyoq."
  },
  {
    "id": 11317,
    "topic_id": 113,
    "question_text": "Tanasi va oyoqlari bo‘g‘imlarga bo‘lingan, xitin qobiqli hayvonlar?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Bo‘g‘imoyoqlilar."
  },
  {
    "id": 11318,
    "topic_id": 113,
    "question_text": "O‘ljasini ovlash uchun tutqich to‘r to‘qiydigan hayvon?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Butli o‘rgimchak."
  },
  {
    "id": 11319,
    "topic_id": 113,
    "question_text": "Zararkunanda hasharot shira bitlarini yeb foyda keltiruvchi hasharot?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Xonqizi."
  },
  {
    "id": 11320,
    "topic_id": 113,
    "question_text": "Askarida va rishta qanday chuvalchanglar?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Parazit."
  },
  {
    "id": 11401,
    "topic_id": 114,
    "question_text": "Tanasi suyri shaklda, shilimshiq bilan qoplangan suv hayvoni?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Baliq."
  },
  {
    "id": 11402,
    "topic_id": 114,
    "question_text": "Baliqlar nima yordamida nafas oladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Jabra."
  },
  {
    "id": 11403,
    "topic_id": 114,
    "question_text": "Tana harorati tashqi muhitga bog‘liq bo‘lgan hayvonlar?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Sovuqqonli."
  },
  {
    "id": 11404,
    "topic_id": 114,
    "question_text": "Baliqlar yuragi necha kamerali?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) 2 kamerali."
  },
  {
    "id": 11405,
    "topic_id": 114,
    "question_text": "Hayotining bir qismi suvda, bir qismi quruqlikda o‘tadigan hayvonlar?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Suvda hamda quruqlikda yashovchilar (Amfibiyalar)."
  },
  {
    "id": 11406,
    "topic_id": 114,
    "question_text": "Qurbaqa va tritonlar qanday nafas oladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Teri va o‘pka orqali."
  },
  {
    "id": 11407,
    "topic_id": 114,
    "question_text": "Tanasi muguz tangacha bilan qoplangan, tuxumini quruqlikka qo‘yadigan hayvonlar?",
    "correct_answer": "C",
    "explanation": "To'g'ri javob: C) Sudralib yuruvchilar (Reptiliyalar)."
  },
  {
    "id": 11408,
    "topic_id": 114,
    "question_text": "Sudralib yuruvchilar yuragi necha kamerali?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) 3 ta."
  },
  {
    "id": 11409,
    "topic_id": 114,
    "question_text": "Gavdasi pat bilan qoplangan, oldingi oyoqlari qanotga aylangan hayvonlar?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Qushlar."
  },
  {
    "id": 11410,
    "topic_id": 114,
    "question_text": "Qushlar yuragi necha kamerali?",
    "correct_answer": "C",
    "explanation": "To'g'ri javob: C) 4 ta."
  },
  {
    "id": 11411,
    "topic_id": 114,
    "question_text": "Tana harorati o‘zgarmas bo‘lgan hayvonlar nima deyiladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Issiqqonli."
  },
  {
    "id": 11412,
    "topic_id": 114,
    "question_text": "Bolasini tirik tug‘ib, sut bilan boquvchi hayvonlar?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Sut emizuvchilar."
  },
  {
    "id": 11413,
    "topic_id": 114,
    "question_text": "Baqaning tuxumidan chiqqan lichinkasi nima deyiladi?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Itbaliq."
  },
  {
    "id": 11414,
    "topic_id": 114,
    "question_text": "Itbaliq baqaga aylanayotganda dastlab qaysi oyog‘i rivojlanadi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Orqa."
  },
  {
    "id": 11415,
    "topic_id": 114,
    "question_text": "Erta bahorda qurillagan ovoz chiqaruvchi baqa qaysi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Erkak."
  },
  {
    "id": 11416,
    "topic_id": 114,
    "question_text": "Qushlarda bir marta olgan havosidan ikki marta nafas olishga nima yordam beradi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Havo xaltachalari."
  },
  {
    "id": 11417,
    "topic_id": 114,
    "question_text": "Qaysi hayvonlar tuxumini suvga qo‘yadi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Baliq va baqalar."
  },
  {
    "id": 11418,
    "topic_id": 114,
    "question_text": "Baliq yuragida qanday qon oqadi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Venoz."
  },
  {
    "id": 11419,
    "topic_id": 114,
    "question_text": "Sudralib yuruvchilarning tuxumi nima bilan himoyalangan?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Qattiq po‘choq."
  },
  {
    "id": 11420,
    "topic_id": 114,
    "question_text": "Quyidagilardan issiqqonli hayvonni toping.",
    "correct_answer": "D",
    "explanation": "To'g'ri javob: D) Ot."
  },
  {
    "id": 11501,
    "topic_id": 115,
    "question_text": "Odam tanasining eng kichik birligi nima?",
    "correct_answer": "C",
    "explanation": "To'g'ri javob: C) Hujayra."
  },
  {
    "id": 11502,
    "topic_id": 115,
    "question_text": "Odam skeleti qaysi qismlardan iborat?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Bosh, tana, qo‘l va oyoq."
  },
  {
    "id": 11503,
    "topic_id": 115,
    "question_text": "Odam yuragi necha kamerali?",
    "correct_answer": "C",
    "explanation": "To'g'ri javob: C) 4 ta."
  },
  {
    "id": 11504,
    "topic_id": 115,
    "question_text": "Yurakdan qonni butun tanaga haydab beruvchi qon tomirlar?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Arteriya."
  },
  {
    "id": 11505,
    "topic_id": 115,
    "question_text": "Yurakka qonni olib keluvchi tomirlar nima deyiladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Vena."
  },
  {
    "id": 11506,
    "topic_id": 115,
    "question_text": "To‘qimalar orasida joylashgan eng mayda qon tomirlari?",
    "correct_answer": "C",
    "explanation": "To'g'ri javob: C) Kapillyar."
  },
  {
    "id": 11507,
    "topic_id": 115,
    "question_text": "Ovqat hazm qilish qayerdan boshlanadi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Og‘iz bo‘shlig‘idan."
  },
  {
    "id": 11508,
    "topic_id": 115,
    "question_text": "Markaziy nerv sistemasiga nimalar kiradi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Bosh miya va orqa miya."
  },
  {
    "id": 11509,
    "topic_id": 115,
    "question_text": "Nafas olish jarayonida gazlar almashinuvi qayerda sodir bo‘ladi?",
    "correct_answer": "C",
    "explanation": "To'g'ri javob: C) O‘pka alveolalarida."
  },
  {
    "id": 11510,
    "topic_id": 115,
    "question_text": "Odam nafas olganda qaysi gazni yutadi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Kislorod."
  },
  {
    "id": 11511,
    "topic_id": 115,
    "question_text": "Organizmni mikroblardan himoya qiluvchi va filtrlash vazifasini bajaruvchi sistema?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Limfa sistemasi."
  },
  {
    "id": 11512,
    "topic_id": 115,
    "question_text": "Limfa sistemasi hujayralari — limfotsitlar qayerda hosil bo‘ladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Taloqda."
  },
  {
    "id": 11513,
    "topic_id": 115,
    "question_text": "Ichki sekretsiya bezlari va gormonlar yig‘indisi nima deyiladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Endokrin sistema."
  },
  {
    "id": 11514,
    "topic_id": 115,
    "question_text": "Bezlar to‘g‘ridan-to‘g‘ri qonga ajratadigan biologik faol modda?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Gormon."
  },
  {
    "id": 11515,
    "topic_id": 115,
    "question_text": "Qo‘rquv va hayajon vaqtida buyrak usti bezidan ko‘p ajraladigan gormon?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Adrenalin."
  },
  {
    "id": 11516,
    "topic_id": 115,
    "question_text": "Yelkadagi ikki boshli muskul qisqarsa, qo‘l qanday harakatlanadi?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Bilakdan bukiladi."
  },
  {
    "id": 11517,
    "topic_id": 115,
    "question_text": "Odamda qon aylanish sistemasi qanday turga kiradi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Yopiq."
  },
  {
    "id": 11518,
    "topic_id": 115,
    "question_text": "Miya qutisi qaysi organni himoya qiladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Bosh miyani."
  },
  {
    "id": 11519,
    "topic_id": 115,
    "question_text": "Suyakning qaysi qismida qonning shaklli elementlari hosil bo‘ladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Ko‘mik qismida."
  },
  {
    "id": 11520,
    "topic_id": 115,
    "question_text": "Umurtqa pog‘onasi kanalida qaysi organ joylagan?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Orqa miya."
  },
  {
    "id": 11601,
    "topic_id": 116,
    "question_text": "Tirik organizmga ta’sir ko‘rsatuvchi barcha tashqi omillar nima deyiladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Ekologik omillar."
  },
  {
    "id": 11602,
    "topic_id": 116,
    "question_text": "Jonsiz tabiat (yorug‘lik, harorat, namlik) ta’siri qanday omil?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Abiotik."
  },
  {
    "id": 11603,
    "topic_id": 116,
    "question_text": "Tirik organizmlarning bir-biriga ta’siri qanday omilga kiradi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Biotik."
  },
  {
    "id": 11604,
    "topic_id": 116,
    "question_text": "Inson faoliyati natijasida yuzaga keladigan tabiatga ta’sir?",
    "correct_answer": "C",
    "explanation": "To'g'ri javob: C) Antropogen."
  },
  {
    "id": 11605,
    "topic_id": 116,
    "question_text": "Tabiiy jamoaning jonli qismi nima deyiladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Biotsenoz."
  },
  {
    "id": 11606,
    "topic_id": 116,
    "question_text": "Biotsenozda organik modda hosil qiluvchi o‘simliklar guruhi?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Produtsent."
  },
  {
    "id": 11607,
    "topic_id": 116,
    "question_text": "Tayyor organik moddalar bilan oziqlanuvchi hayvonlar nima deyiladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Konsumentlar."
  },
  {
    "id": 11608,
    "topic_id": 116,
    "question_text": "Organik moddalarni parchalab, mineral moddalarga aylantiruvchi bakteriya va zamburug‘lar?",
    "correct_answer": "C",
    "explanation": "To'g'ri javob: C) Redutsentlar."
  },
  {
    "id": 11609,
    "topic_id": 116,
    "question_text": "Oziqlanish ketma-ketligi orqali hosil bo‘lgan zanjir nima?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Oziq zanjiri."
  },
  {
    "id": 11610,
    "topic_id": 116,
    "question_text": "Oziq zanjirining birinchi halqasida doimo nima turadi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Yashil o‘simlik."
  },
  {
    "id": 11611,
    "topic_id": 116,
    "question_text": "Chigirtka oziq zanjirida qaysi guruhga kiradi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Konsument."
  },
  {
    "id": 11612,
    "topic_id": 116,
    "question_text": "Burgut va ilon oziq zanjirining qaysi halqasida qatnashadi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) O‘rta (Iste’molchi)."
  },
  {
    "id": 11613,
    "topic_id": 116,
    "question_text": "Tirik organizm o‘zi uchun qulay bo‘lgan moslashgan joyi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Yashash muhiti."
  },
  {
    "id": 11614,
    "topic_id": 116,
    "question_text": "Baliqning suyri shakli nimaga moslashish?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Suv qarshiligini yengishga."
  },
  {
    "id": 11615,
    "topic_id": 116,
    "question_text": "Oziq zanjiri uzilsa, keyingi halqalarga qanday ta’sir qiladi?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Salbiy ta’sir qiladi."
  },
  {
    "id": 11616,
    "topic_id": 116,
    "question_text": "Baqa oziq zanjirida kimga ozuqa bo‘ladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Ilonga."
  },
  {
    "id": 11617,
    "topic_id": 116,
    "question_text": "Ekologik muvozanatning buzilishiga nima sabab bo‘lishi mumkin?",
    "correct_answer": "D",
    "explanation": "To'g'ri javob: D) Barcha javoblar to‘g‘ri."
  },
  {
    "id": 11618,
    "topic_id": 116,
    "question_text": "Biotsenoz necha tarkibiy qismdan iborat?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) 3 ta (Produtsent, konsument, redutsent)."
  },
  {
    "id": 11619,
    "topic_id": 116,
    "question_text": "Bakteriya va zamburug‘lar oziq zanjirining qaysi qismida turadi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Oxirida (Parchalovchi)."
  },
  {
    "id": 11620,
    "topic_id": 116,
    "question_text": "Chigirtkani kim yeydi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Baqa."
  },
  {
    "id": 11701,
    "topic_id": 117,
    "question_text": "Insonning tabiatga ijobiy ta’siriga misol keltiring.",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Yangi nav va zotlar yaratish."
  },
  {
    "id": 11702,
    "topic_id": 117,
    "question_text": "Insonning tabiatga salbiy ta’siriga nima kiradi?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Yovvoyi hayvonlarni ko‘plab ovlash."
  },
  {
    "id": 11703,
    "topic_id": 117,
    "question_text": "Orol dengizi qurishining asosiy sababi nima?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Daryo suvlarining g‘o‘za sug‘orishga ko‘p ishlatilishi."
  },
  {
    "id": 11704,
    "topic_id": 117,
    "question_text": "Atmosferadagi karbonat angidrid miqdori ortishi nimaga olib keladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Havo harorati ko‘tarilishiga (Global isish)."
  },
  {
    "id": 11705,
    "topic_id": 117,
    "question_text": "Muzliklar erishi natijasida qanday xavf tug‘iladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Suv toshqinlari."
  },
  {
    "id": 11706,
    "topic_id": 117,
    "question_text": "Atmosferaning himoya qobig‘i nima deyiladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Ozon qatlami."
  },
  {
    "id": 11707,
    "topic_id": 117,
    "question_text": "Ozon qatlamiga qaysi qurilmalardan ajraladigan moddalar zarar yetkazadi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Muzlatkich va konditsioner."
  },
  {
    "id": 11708,
    "topic_id": 117,
    "question_text": "Ozon tuynuklari orqali yerga qanday nurlar yetib keladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Zararli quyosh nurlari."
  },
  {
    "id": 11709,
    "topic_id": 117,
    "question_text": "Quyoshning zararli nurlari odamda qanday kasallik keltirib chiqarishi mumkin?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Terining xavfli o‘sma kasalligi."
  },
  {
    "id": 11710,
    "topic_id": 117,
    "question_text": "Odam yovvoyi tabiatni uzluksiz o‘zlashtirishi natijasida nima sodir bo‘ladi?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Ekologik muvozanat buziladi."
  },
  {
    "id": 11711,
    "topic_id": 117,
    "question_text": "Tabiatdagi o‘zgarishlarni tushunishda bizga qaysi fan yordam beradi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Biologiya."
  },
  {
    "id": 11712,
    "topic_id": 117,
    "question_text": "Qadimgi odamlar isinish va ovqat pishirish uchun nimadan foydalangan?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Olovdan."
  },
  {
    "id": 11713,
    "topic_id": 117,
    "question_text": "Inson tabiatdan doimiy ravishda nimalarni qabul qiladi?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Kislorod va ozuqa."
  },
  {
    "id": 11714,
    "topic_id": 117,
    "question_text": "Cho‘llarning o‘zlashtirilishi tabiatga qanday ta’sir ko‘rsatadi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Daryo va dengizlarning qurishiga olib kelishi mumkin."
  },
  {
    "id": 11715,
    "topic_id": 117,
    "question_text": "Transport vositalari ko‘payishi nimani ifloslantiradi?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Havo haroratini."
  },
  {
    "id": 11716,
    "topic_id": 117,
    "question_text": "Sersut va go‘shtdor hayvon zotlarini yaratish qanday ta’sir?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Ijobiy."
  },
  {
    "id": 11717,
    "topic_id": 117,
    "question_text": "O‘rmonlardagi daraxtlarning keragidan ortiq kesilishi nima deb ataladi?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Salbiy antropogen ta’sir."
  },
  {
    "id": 11718,
    "topic_id": 117,
    "question_text": "Ekologik muammolarni kamaytirish uchun nima qilish kerak?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Tabiat boyliklaridan oqilona foydalanish."
  },
  {
    "id": 11719,
    "topic_id": 117,
    "question_text": "Quyosh nurini yutuvchi baqa tuxumi qanday rangda bo‘ladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Qora."
  },
  {
    "id": 11720,
    "topic_id": 117,
    "question_text": "Inson o‘zining yashash sharoitini yaxshilash uchun nima qiladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Tabiatga ta’sir ko‘rsatadi."
  },
  {
    "id": 11801,
    "topic_id": 118,
    "question_text": "Odamning xo‘jalik faoliyati butunlay cheklangan hudud?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Qo‘riqxona."
  },
  {
    "id": 11802,
    "topic_id": 118,
    "question_text": "Qo‘riqxonalarda nima qilish qat’iyan taqiqlangan?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Mol boqish va hayvon ovlash."
  },
  {
    "id": 11803,
    "topic_id": 118,
    "question_text": "Ma’lum davrlarda hayvon ovlashga yoki ko‘chat yetishtirishga ruxsat beriladigan hudud?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Buyurtmaxona."
  },
  {
    "id": 11804,
    "topic_id": 118,
    "question_text": "Odamlar madaniy hordiq chiqaradigan va manzarali o‘simliklar ekiladigan joy?",
    "correct_answer": "C",
    "explanation": "To'g'ri javob: C) Milliy bog‘."
  },
  {
    "id": 11805,
    "topic_id": 118,
    "question_text": "Noyob g‘orlar, daralar va qadimiy ulkan daraxtlar nima deb ataladi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Tabiat yodgorliklari."
  },
  {
    "id": 11806,
    "topic_id": 118,
    "question_text": "«Qizil kitob» nima maqsadda joriy etilgan?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Yo‘qolib ketayotgan turlarni saqlash va ogohlantirish uchun."
  },
  {
    "id": 11807,
    "topic_id": 118,
    "question_text": "Birinchi O‘zbekiston Respublikasi «Qizil kitob»i qachon nashr etilgan?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) 1979."
  },
  {
    "id": 11808,
    "topic_id": 118,
    "question_text": "«Qizil kitob»ga kiritilgan, uzunligi 30 metrgacha boradigan uzumdosh vakili?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Yovvoyi tok."
  },
  {
    "id": 11809,
    "topic_id": 118,
    "question_text": "Loladoshlar oilasiga kiruvchi, piyozi iste’mol qilinganligi uchun kamaygan gulli o‘simlik?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Xolmon isirg‘aguli."
  },
  {
    "id": 11810,
    "topic_id": 118,
    "question_text": "«Qizil kitob»ga kiritilgan Xongul (Buxoro bug‘usi) qayerlarda yashaydi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) To‘qayzor va qumli cho‘llarda."
  },
  {
    "id": 11811,
    "topic_id": 118,
    "question_text": "Buxoro bug‘usining urg‘ochisi qanday xususiyatga ega?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Shoxi bo‘lmaydi."
  },
  {
    "id": 11812,
    "topic_id": 118,
    "question_text": "Suvsizlikka chiday oladigan, cho‘lda yashaydigan «Qizil kitob»dagi qulupnay?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Yo‘rg‘a tuvaloq."
  },
  {
    "id": 11813,
    "topic_id": 118,
    "question_text": "Safsan xurmosi nima maqsadda ishlatilgani uchun kamayib ketgan?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Qurilish va o‘tin uchun."
  },
  {
    "id": 11814,
    "topic_id": 118,
    "question_text": "O‘zbekistondagi Chotqol, Zomin va Hisor nima nomlari?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Davlat qo‘riqxonalari."
  },
  {
    "id": 11815,
    "topic_id": 118,
    "question_text": "Qadimgi odamlarning qoldiqlari topilgan mashhur g‘or nomi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Teshiktosh."
  },
  {
    "id": 11816,
    "topic_id": 118,
    "question_text": "Tabiat yodgorligi hisoblanuvchi qoyatosh rasmlari qayerda joylashgan?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) Xo‘jakentda."
  },
  {
    "id": 11817,
    "topic_id": 118,
    "question_text": "«Qizil kitob»ga yangi tur kiritish bo‘yicha takliflarni qaysi institutlar beradi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Zoologiya va Botanika institutlari."
  },
  {
    "id": 11818,
    "topic_id": 118,
    "question_text": "Qaysi hududda o‘simliklarga chiroyli shakl berish va parvarishlash mumkin?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Milliy bog‘."
  },
  {
    "id": 11819,
    "topic_id": 118,
    "question_text": "Yo‘rg‘a tuvaloq polaponlari qaysi oylarda ucha boshlaydi?",
    "correct_answer": "B",
    "explanation": "To'g'ri javob: B) Iyun-iyul."
  },
  {
    "id": 11820,
    "topic_id": 118,
    "question_text": "Tabiatni muhofaza qilish qaysi qonunga asosan amalga oshiriladi?",
    "correct_answer": "A",
    "explanation": "To'g'ri javob: A) «Tabiatni muhofaza qilish to‘g‘risida»gi qonunga."
  },

  // 6-Sinf Botanika Questions
  { id: 201, topic_id: 201, question_text: "Botanika so'zi qaysi so'zdan olingan va nima ma'noni beradi?", correct_answer: "A", explanation: "Botanika grekcha 'botane' (ko'kat, o't, o'simlik) so'zidan olingan." },
  { id: 202, topic_id: 203, question_text: "Bitta yo'g'on yog'ochlashgan poyaga ega o'simlik qanday ataladi?", correct_answer: "A", explanation: "Daraxtlar bitta mustahkam yog'ochlashgan tanaga ega bo'ladi." },
  { id: 203, topic_id: 204, question_text: "O'simlik hujayrasidagi yirik vakuolada nima saqlanadi?", correct_answer: "C", explanation: "Vakuolada hujayra sharbati to'planadi va u suv balansini nazorat qiladi." },
  { id: 204, topic_id: 206, question_text: "Hujayralari doimiy bo'linadigan o'simlik to'qimasi qaysi?", correct_answer: "A", explanation: "Hosil qiluvchi to'qima (meristema) o'simlikning bo'yiga va eniga o'sishini ta'minlaydi." },
  { id: 205, topic_id: 207, question_text: "G'o'za va beda o'simliklarida qaysi ildiz tizimi rivojlangan?", correct_answer: "A", explanation: "Ikki pallali o'simliklar (g'o'za, beda va b.) o'q ildiz tizimiga ega." },
  { id: 206, topic_id: 213, question_text: "Poyaning eniga o'sishini ta'minlaydigan hosil qiluvchi hujayralar qavati qanday ataladi?", correct_answer: "B", explanation: "Kambiy qavati hujayralari bo'linishi natijasida poya eniga o'sadi." },
  { id: 207, topic_id: 220, question_text: "Gulning chang hosil qiladigan asosiy qismi qaysi?", correct_answer: "A", explanation: "Gulning changchilarida chang donachalari yetiladi." },
  { id: 208, topic_id: 225, question_text: "O'simliklarda suv va minerallarni yuqoriga haydovchi bosim nima?", correct_answer: "A", explanation: "Ildiz bosimi suvning ildiz teshiklaridan poyaga ko'tarilishini ta'minlaydi." },
  { id: 209, topic_id: 227, question_text: "Fotosintez jarayoni hujayraning qaysi qismida kechadi?", correct_answer: "C", explanation: "Fotosintez yashil plastidalar bo'lgan xloroplastlarda quyosh nuri ta'sirida kechadi." },
  { id: 210, topic_id: 233, question_text: "Gulli o'simliklarda qo'sh urug'lanishni kim kashf qilgan?", correct_answer: "B", explanation: "Rus botanigi S.G.Navashin 1898-yilda gulli o'simliklarda qo'sh urug'lanishni kashf etgan." },
  { id: 211, topic_id: 239, question_text: "Qaysi bir hujayrali suvo'ti xivchinsiz bo'ladi?", correct_answer: "B", explanation: "Xlorella - xivchinsiz, sharsimon bir hujayrali yashil suvo'tdir." },
  { id: 212, topic_id: 242, question_text: "Yo'sinlarning yopishish va shimish vazifasini bajaradigan a'zosi qaysi?", correct_answer: "B", explanation: "Rizoidlar yo'sinlarda ildiz vazifasini bajaradi." },
  { id: 213, topic_id: 245, question_text: "Ignabargli ochiq urug'li daraxtga misol keltiring:", correct_answer: "A", explanation: "Archa, qarag'ay va pixta ochiq urug'li ignabargli daraxtlardir." },
  { id: 214, topic_id: 251, question_text: "Burchoqdoshlar (dukkakdoshlar) oilasi ildizida qanday bakteriyalar bo'ladi?", correct_answer: "C", explanation: "Ildizida tugunak bakteriyalari yashab, havodagi azotni o'zlashtiradi." },
  { id: 215, topic_id: 258, question_text: "Bug'doydoshlar oilasining poyasi qanday ataladi?", correct_answer: "B", explanation: "Bug'doydoshlar poyasi somon poya (kovak) deb ataladi." },

  // 7-Sinf Zoologiya Questions
  { id: 301, topic_id: 301, question_text: "Zoologiya fani nimani o'rganadi?", correct_answer: "B", explanation: "Zoologiya hayvonlarning tuzilishi, hayoti va klassifikatsiyasini o'rganadi." },
  { id: 302, topic_id: 303, question_text: "Amyoba qanday a'zolari yordamida harakatlanadi?", correct_answer: "C", explanation: "Oddiy amyoba soxta oyoqlar chiqarib harakatlanadi." },
  { id: 303, topic_id: 305, question_text: "Bo'shliqichlilar tipining tanasi nechta hujayra qavatidan tashkil topgan?", correct_answer: "B", explanation: "Bo'shliqichlilarning tanasi ikki qavatli (ektoderma va endoderma) hujayra devoridan iborat." },
  { id: 304, topic_id: 308, question_text: "Yomg'ir chuvalchangi tabiatda qanday muhim vazifani bajaradi?", correct_answer: "A", explanation: "Yomg'ir chuvalchangi tuproqni yumshatib, uning unumdorligini oshiradi." },
  { id: 305, topic_id: 312, question_text: "Hasharotlarning nechta oyog'i bo'ladi?", correct_answer: "B", explanation: "Hasharotlar sinfi vakillarining 6 ta oyog'i (3 juft) bor." },
  { id: 306, topic_id: 313, question_text: "Baliqlar qanday nafas oladi?", correct_answer: "A", explanation: "Baliqlar jabra orqali suvdan erigan kislorodni shimib nafas oladi." },
  { id: 307, topic_id: 316, question_text: "Qushlar tanasini nima qoplaydi?", correct_answer: "B", explanation: "Qushlarning tanasi pat va parlar bilan qoplangan." },
  { id: 308, topic_id: 317, question_text: "Sutemizuvchilarning eng muhim xususiyati nima?", correct_answer: "A", explanation: "Sutemizuvchilar bolalarini tirik tug'ib, sut bilan boqadi." },

  // 8-Sinf Odam va uning salomatligi Questions
  { id: 401, topic_id: 401, question_text: "Odam tanasida nechta asosiy to'qima turi bor?", correct_answer: "C", explanation: "Epiteliy, biriktiruvchi, mushak va nerv – 4 ta asosiy to'qima." },
  { id: 402, topic_id: 405, question_text: "Nerv sistemasining markaziy qismi qaysi organlardan iborat?", correct_answer: "B", explanation: "Markaziy nerv sistemasi bosh miya va orqa miyadan iborat." },
  { id: 403, topic_id: 409, question_text: "Inson skeletida nechta suyak bor?", correct_answer: "B", explanation: "Inson skeletida 206 ta suyak mavjud." },
  { id: 404, topic_id: 411, question_text: "Qonning qaysi elementlari kislorod tashiydi?", correct_answer: "A", explanation: "Eritrositlar (qizil qon tanachalari) tarkibidagi gemoglobin kislorodni bog'lab tashiydi." },
  { id: 405, topic_id: 412, question_text: "Odam qonida nechta asosiy qon guruhi mavjud?", correct_answer: "C", explanation: "Odam qonida 4 ta asosiy guruh (I, II, III, IV) mavjud." },
  { id: 406, topic_id: 413, question_text: "Inson yuragi nechta kameradan iborat?", correct_answer: "C", explanation: "Inson yuragi 4 kamerali: 2 bo'lmacha va 2 qorincha." },
  { id: 407, topic_id: 419, question_text: "Qaysi vitamin yetishmovchiligi skorbut (tsinga) kasalligiga olib keladi?", correct_answer: "C", explanation: "C vitamini (askorbin kislota) yetishmovchiligi skorbut kasalligini keltirib chiqaradi." },
  { id: 408, topic_id: 423, question_text: "Oliy nerv faoliyatining markazi qayerda joylashgan?", correct_answer: "A", explanation: "Bosh miya po'stlog'i (katta yarim sharlar) oliy nerv faoliyatining markazi hisoblanadi." },

  // 9-Sinf Sitologiya va Genetika Questions
  { id: 501, topic_id: 502, question_text: "Hujayra nazariyasini kim yaratgan?", correct_answer: "B", explanation: "M.Shleyden va T.Shvann 1838-1839 yillarda hujayra nazariyasini yaratishgan." },
  { id: 502, topic_id: 505, question_text: "Irsiy axborotni saqlaydigan molekula qaysi?", correct_answer: "A", explanation: "DNK (dezoksiribonuklein kislota) irsiy axborotni saqlaydi." },
  { id: 503, topic_id: 506, question_text: "Hujayraning qaysi organoidida energiya hosil bo'ladi?", correct_answer: "B", explanation: "Mitoxondriyada organik moddalar parchalanib ATF hosil bo'ladi." },
  { id: 504, topic_id: 509, question_text: "Mitoz natijasida nechta hujayra hosil bo'ladi?", correct_answer: "A", explanation: "Mitoz natijasida 2 ta bir xil (diploid) hujayra hosil bo'ladi." },
  { id: 505, topic_id: 510, question_text: "Meyoz natijasida nechta hujayra hosil bo'ladi?", correct_answer: "C", explanation: "Meyoz natijasida 4 ta gaploid hujayra (gametalari) hosil bo'ladi." },
  { id: 506, topic_id: 512, question_text: "Mendelning II qonuni bo'yicha F2 avlodda ajralish nisbati qanday?", correct_answer: "B", explanation: "F2 avlodda fenotip bo'yicha 3:1 nisbatda ajralish kuzatiladi." },
  { id: 507, topic_id: 514, question_text: "Erkak jinsini belgilovchi xromosomalar qaysi?", correct_answer: "B", explanation: "Erkaklar XY xromosomalariga ega, ayollar esa XX." },
  { id: 508, topic_id: 517, question_text: "Madaniy o'simliklarning kelib chiqish markazlarini kim aniqlagan?", correct_answer: "A", explanation: "Rus olimi N.I.Vavilov madaniy o'simliklarning kelib chiqish markazlarini aniqlagan." },
  
  // 10-Sinf Biology Questions
  { id: 601, topic_id: 601, question_text: "Tiriklikning qaysi tuzilish darajasida moddalar va energiya almashinuvi boshlanadi?", correct_answer: "B", explanation: "Hujayra - hayotning eng kichik tarkibiy va funksional birligi bo'lib, metabolizm aynan shu darajada boshlanadi." },
  { id: 602, topic_id: 605, question_text: "Oqsil molekulasining birlamchi strukturasidagi aminokislotalarni o'zaro bog'lovchi bog' turi qaysi?", correct_answer: "A", explanation: "Oqsillarning birlamchi strukturasi aminokislotalarning peptid bog'lar yordamida chiziqli bog'lanishidan hosil bo'ladi." },

  // 11-Sinf Biology Questions
  { id: 701, topic_id: 702, question_text: "Charlz Darvin evolyutsion nazariyasiga ko'ra, tabiiy tanlanishning bevosita oqibati/natijasi nima?", correct_answer: "B", explanation: "Tabiiy tanlanish natijasida organizmlar muayyan yashash muhiti sharoitlariga moslashadi." },
  { id: 702, topic_id: 710, question_text: "Ekotizimda organik qoldiqlarni noorganik minerallargacha parchalovchi organizmlar guruhi qanday ataladi?", correct_answer: "C", explanation: "Redutsentlar (bakteriya va zamburug'lar) organik moddalarni mineral moddalargacha parchalaydi." }
];

const initialQuestionOptions = [
  // 5-Sinf options
{
    "id": 101011,
    "question_id": 10101,
    "option_label": "A",
    "option_text": "Fan"
  },
  {
    "id": 101012,
    "question_id": 10101,
    "option_label": "B",
    "option_text": "Hayot"
  },
  {
    "id": 101013,
    "question_id": 10101,
    "option_label": "C",
    "option_text": "Tabiat"
  },
  {
    "id": 101014,
    "question_id": 10101,
    "option_label": "D",
    "option_text": "O‘simlik"
  },
  {
    "id": 101021,
    "question_id": 10102,
    "option_label": "A",
    "option_text": "Fan, ta’limot"
  },
  {
    "id": 101022,
    "question_id": 10102,
    "option_label": "B",
    "option_text": "Tiriklik"
  },
  {
    "id": 101023,
    "question_id": 10102,
    "option_label": "C",
    "option_text": "Bilim"
  },
  {
    "id": 101024,
    "question_id": 10102,
    "option_label": "D",
    "option_text": "Hujayra"
  },
  {
    "id": 101031,
    "question_id": 10103,
    "option_label": "A",
    "option_text": "Zoologiya"
  },
  {
    "id": 101032,
    "question_id": 10103,
    "option_label": "B",
    "option_text": "Botanika"
  },
  {
    "id": 101033,
    "question_id": 10103,
    "option_label": "C",
    "option_text": "Mikologiya"
  },
  {
    "id": 101034,
    "question_id": 10103,
    "option_label": "D",
    "option_text": "Anatomiya"
  },
  {
    "id": 101041,
    "question_id": 10104,
    "option_label": "A",
    "option_text": "Zoologiya"
  },
  {
    "id": 101042,
    "question_id": 10104,
    "option_label": "B",
    "option_text": "Botanika"
  },
  {
    "id": 101043,
    "question_id": 10104,
    "option_label": "C",
    "option_text": "Sitologiya"
  },
  {
    "id": 101044,
    "question_id": 10104,
    "option_label": "D",
    "option_text": "Genetika"
  },
  {
    "id": 101051,
    "question_id": 10105,
    "option_label": "A",
    "option_text": "Mikrobiologiya"
  },
  {
    "id": 101052,
    "question_id": 10105,
    "option_label": "B",
    "option_text": "Mikologiya"
  },
  {
    "id": 101053,
    "question_id": 10105,
    "option_label": "C",
    "option_text": "Ekologiya"
  },
  {
    "id": 101054,
    "question_id": 10105,
    "option_label": "D",
    "option_text": "Fiziologiya"
  },
  {
    "id": 101061,
    "question_id": 10106,
    "option_label": "A",
    "option_text": "Mikrobiologiya"
  },
  {
    "id": 101062,
    "question_id": 10106,
    "option_label": "B",
    "option_text": "Zoologiya"
  },
  {
    "id": 101063,
    "question_id": 10106,
    "option_label": "C",
    "option_text": "Genetika"
  },
  {
    "id": 101064,
    "question_id": 10106,
    "option_label": "D",
    "option_text": "Sistematika"
  },
  {
    "id": 101071,
    "question_id": 10107,
    "option_label": "A",
    "option_text": "Anatomiya"
  },
  {
    "id": 101072,
    "question_id": 10107,
    "option_label": "B",
    "option_text": "Sitologiya"
  },
  {
    "id": 101073,
    "question_id": 10107,
    "option_label": "C",
    "option_text": "Fiziologiya"
  },
  {
    "id": 101074,
    "question_id": 10107,
    "option_label": "D",
    "option_text": "Ekologiya"
  },
  {
    "id": 101081,
    "question_id": 10108,
    "option_label": "A",
    "option_text": "Anatomiya"
  },
  {
    "id": 101082,
    "question_id": 10108,
    "option_label": "B",
    "option_text": "Sistematika"
  },
  {
    "id": 101083,
    "question_id": 10108,
    "option_label": "C",
    "option_text": "Sitologiya"
  },
  {
    "id": 101084,
    "question_id": 10108,
    "option_label": "D",
    "option_text": "Botanika"
  },
  {
    "id": 101091,
    "question_id": 10109,
    "option_label": "A",
    "option_text": "Genetika"
  },
  {
    "id": 101092,
    "question_id": 10109,
    "option_label": "B",
    "option_text": "Sistematika"
  },
  {
    "id": 101093,
    "question_id": 10109,
    "option_label": "C",
    "option_text": "Anatomiya"
  },
  {
    "id": 101094,
    "question_id": 10109,
    "option_label": "D",
    "option_text": "Mikologiya"
  },
  {
    "id": 101101,
    "question_id": 10110,
    "option_label": "A",
    "option_text": "Sitologiya"
  },
  {
    "id": 101102,
    "question_id": 10110,
    "option_label": "B",
    "option_text": "Fiziologiya"
  },
  {
    "id": 101103,
    "question_id": 10110,
    "option_label": "C",
    "option_text": "Genetika"
  },
  {
    "id": 101104,
    "question_id": 10110,
    "option_label": "D",
    "option_text": "Ekologiya"
  },
  {
    "id": 101111,
    "question_id": 10111,
    "option_label": "A",
    "option_text": "Sistematika"
  },
  {
    "id": 101112,
    "question_id": 10111,
    "option_label": "B",
    "option_text": "Genetika"
  },
  {
    "id": 101113,
    "question_id": 10111,
    "option_label": "C",
    "option_text": "Anatomiya"
  },
  {
    "id": 101114,
    "question_id": 10111,
    "option_label": "D",
    "option_text": "Botanika"
  },
  {
    "id": 101121,
    "question_id": 10112,
    "option_label": "A",
    "option_text": "Fiziologiya"
  },
  {
    "id": 101122,
    "question_id": 10112,
    "option_label": "B",
    "option_text": "Ekologiya"
  },
  {
    "id": 101123,
    "question_id": 10112,
    "option_label": "C",
    "option_text": "Zoologiya"
  },
  {
    "id": 101124,
    "question_id": 10112,
    "option_label": "D",
    "option_text": "Mikrobiologiya"
  },
  {
    "id": 101131,
    "question_id": 10113,
    "option_label": "A",
    "option_text": "Ibn Sino"
  },
  {
    "id": 101132,
    "question_id": 10113,
    "option_label": "B",
    "option_text": "Abu Nasr Forobiy"
  },
  {
    "id": 101133,
    "question_id": 10113,
    "option_label": "C",
    "option_text": "Beruniy"
  },
  {
    "id": 101134,
    "question_id": 10113,
    "option_label": "D",
    "option_text": "Bobur"
  },
  {
    "id": 101141,
    "question_id": 10114,
    "option_label": "A",
    "option_text": "Yolqin To'raqulov"
  },
  {
    "id": 101142,
    "question_id": 10114,
    "option_label": "B",
    "option_text": "Jahongir Hamidov"
  },
  {
    "id": 101143,
    "question_id": 10114,
    "option_label": "C",
    "option_text": "Jo'ra Musayev"
  },
  {
    "id": 101144,
    "question_id": 10114,
    "option_label": "D",
    "option_text": "O'ktam Pratov"
  },
  {
    "id": 101151,
    "question_id": 10115,
    "option_label": "A",
    "option_text": "Mashhura Mavloniy"
  },
  {
    "id": 101152,
    "question_id": 10115,
    "option_label": "B",
    "option_text": "Jahongir Hamidov"
  },
  {
    "id": 101153,
    "question_id": 10115,
    "option_label": "C",
    "option_text": "Jaloliddin Azimov"
  },
  {
    "id": 101154,
    "question_id": 10115,
    "option_label": "D",
    "option_text": "Muhsin Valixonov"
  },
  {
    "id": 101161,
    "question_id": 10116,
    "option_label": "A",
    "option_text": "Jo'ra Musayev"
  },
  {
    "id": 101162,
    "question_id": 10116,
    "option_label": "B",
    "option_text": "Yolqin To'raqulov"
  },
  {
    "id": 101163,
    "question_id": 10116,
    "option_label": "C",
    "option_text": "O'ktam Pratov"
  },
  {
    "id": 101164,
    "question_id": 10116,
    "option_label": "D",
    "option_text": "Muhsin Valixonov"
  },
  {
    "id": 101171,
    "question_id": 10117,
    "option_label": "A",
    "option_text": "Botanika"
  },
  {
    "id": 101172,
    "question_id": 10117,
    "option_label": "B",
    "option_text": "Mikrobiologiya"
  },
  {
    "id": 101173,
    "question_id": 10117,
    "option_label": "C",
    "option_text": "Zoologiya"
  },
  {
    "id": 101174,
    "question_id": 10117,
    "option_label": "D",
    "option_text": "Anatomiya"
  },
  {
    "id": 101181,
    "question_id": 10118,
    "option_label": "A",
    "option_text": "Jaloliddin Azimov"
  },
  {
    "id": 101182,
    "question_id": 10118,
    "option_label": "B",
    "option_text": "To'raxon Rahimova"
  },
  {
    "id": 101183,
    "question_id": 10118,
    "option_label": "C",
    "option_text": "Jo'ra Musayev"
  },
  {
    "id": 101184,
    "question_id": 10118,
    "option_label": "D",
    "option_text": "Jahongir Hamidov"
  },
  {
    "id": 101191,
    "question_id": 10119,
    "option_label": "A",
    "option_text": "Mashhura Mavloniy"
  },
  {
    "id": 101192,
    "question_id": 10119,
    "option_label": "B",
    "option_text": "To'raxon Rahimova"
  },
  {
    "id": 101193,
    "question_id": 10119,
    "option_label": "C",
    "option_text": "F. Azimova"
  },
  {
    "id": 101194,
    "question_id": 10119,
    "option_label": "D",
    "option_text": "Z. Tillayeva"
  },
  {
    "id": 101201,
    "question_id": 10120,
    "option_label": "A",
    "option_text": "Yolqin To'raqulov"
  },
  {
    "id": 101202,
    "question_id": 10120,
    "option_label": "B",
    "option_text": "O'ktam Pratov"
  },
  {
    "id": 101203,
    "question_id": 10120,
    "option_label": "C",
    "option_text": "Jahongir Hamidov"
  },
  {
    "id": 101204,
    "question_id": 10120,
    "option_label": "D",
    "option_text": "Jo'ra Musayev"
  },
  {
    "id": 102011,
    "question_id": 10201,
    "option_label": "A",
    "option_text": "Fotosintez"
  },
  {
    "id": 102012,
    "question_id": 10201,
    "option_label": "B",
    "option_text": "Metabolizm"
  },
  {
    "id": 102013,
    "question_id": 10201,
    "option_label": "C",
    "option_text": "Ayirish"
  },
  {
    "id": 102014,
    "question_id": 10201,
    "option_label": "D",
    "option_text": "O‘sish"
  },
  {
    "id": 102021,
    "question_id": 10202,
    "option_label": "A",
    "option_text": "Assimilyatsiya"
  },
  {
    "id": 102022,
    "question_id": 10202,
    "option_label": "B",
    "option_text": "Dissimilyatsiya"
  },
  {
    "id": 102023,
    "question_id": 10202,
    "option_label": "C",
    "option_text": "Ayirish"
  },
  {
    "id": 102024,
    "question_id": 10202,
    "option_label": "D",
    "option_text": "Nafas olish"
  },
  {
    "id": 102031,
    "question_id": 10203,
    "option_label": "A",
    "option_text": "Assimilyatsiya"
  },
  {
    "id": 102032,
    "question_id": 10203,
    "option_label": "B",
    "option_text": "Dissimilyatsiya"
  },
  {
    "id": 102033,
    "question_id": 10203,
    "option_label": "C",
    "option_text": "Oziqlanish"
  },
  {
    "id": 102034,
    "question_id": 10203,
    "option_label": "D",
    "option_text": "Ta’sirlanish"
  },
  {
    "id": 102041,
    "question_id": 10204,
    "option_label": "A",
    "option_text": "Geterotrof"
  },
  {
    "id": 102042,
    "question_id": 10204,
    "option_label": "B",
    "option_text": "Avtotrof"
  },
  {
    "id": 102043,
    "question_id": 10204,
    "option_label": "C",
    "option_text": "Parazit"
  },
  {
    "id": 102044,
    "question_id": 10204,
    "option_label": "D",
    "option_text": "Saprofit"
  },
  {
    "id": 102051,
    "question_id": 10205,
    "option_label": "A",
    "option_text": "Avtotrof"
  },
  {
    "id": 102052,
    "question_id": 10205,
    "option_label": "B",
    "option_text": "Geterotrof"
  },
  {
    "id": 102053,
    "question_id": 10205,
    "option_label": "C",
    "option_text": "Produtsent"
  },
  {
    "id": 102054,
    "question_id": 10205,
    "option_label": "D",
    "option_text": "O‘simlik"
  },
  {
    "id": 102061,
    "question_id": 10206,
    "option_label": "A",
    "option_text": "Avtotrof"
  },
  {
    "id": 102062,
    "question_id": 10206,
    "option_label": "B",
    "option_text": "Geterotrof"
  },
  {
    "id": 102063,
    "question_id": 10206,
    "option_label": "C",
    "option_text": "Redutsent"
  },
  {
    "id": 102064,
    "question_id": 10206,
    "option_label": "D",
    "option_text": "Yirtqich"
  },
  {
    "id": 102071,
    "question_id": 10207,
    "option_label": "A",
    "option_text": "Bug‘doy"
  },
  {
    "id": 102072,
    "question_id": 10207,
    "option_label": "B",
    "option_text": "Archa"
  },
  {
    "id": 102073,
    "question_id": 10207,
    "option_label": "C",
    "option_text": "Quyon"
  },
  {
    "id": 102074,
    "question_id": 10207,
    "option_label": "D",
    "option_text": "Suv o‘ti"
  },
  {
    "id": 102081,
    "question_id": 10208,
    "option_label": "A",
    "option_text": "Karbonat angidrid"
  },
  {
    "id": 102082,
    "question_id": 10208,
    "option_label": "B",
    "option_text": "Kislorod"
  },
  {
    "id": 102083,
    "question_id": 10208,
    "option_label": "C",
    "option_text": "Azot"
  },
  {
    "id": 102084,
    "question_id": 10208,
    "option_label": "D",
    "option_text": "Vodorod"
  },
  {
    "id": 102091,
    "question_id": 10209,
    "option_label": "A",
    "option_text": "Kislorod"
  },
  {
    "id": 102092,
    "question_id": 10209,
    "option_label": "B",
    "option_text": "Karbonat angidrid"
  },
  {
    "id": 102093,
    "question_id": 10209,
    "option_label": "C",
    "option_text": "Argon"
  },
  {
    "id": 102094,
    "question_id": 10209,
    "option_label": "D",
    "option_text": "Is gazi"
  },
  {
    "id": 102101,
    "question_id": 10210,
    "option_label": "A",
    "option_text": "Oziqlanish"
  },
  {
    "id": 102102,
    "question_id": 10210,
    "option_label": "B",
    "option_text": "Ayirish"
  },
  {
    "id": 102103,
    "question_id": 10210,
    "option_label": "C",
    "option_text": "Nafas olish"
  },
  {
    "id": 102104,
    "question_id": 10210,
    "option_label": "D",
    "option_text": "O‘sish"
  },
  {
    "id": 102111,
    "question_id": 10211,
    "option_label": "A",
    "option_text": "Ta’sirlanish"
  },
  {
    "id": 102112,
    "question_id": 10211,
    "option_label": "B",
    "option_text": "O‘sish"
  },
  {
    "id": 102113,
    "question_id": 10211,
    "option_label": "C",
    "option_text": "Rivojlanish"
  },
  {
    "id": 102114,
    "question_id": 10211,
    "option_label": "D",
    "option_text": "Ko‘payish"
  },
  {
    "id": 102121,
    "question_id": 10212,
    "option_label": "A",
    "option_text": "Harakatlanish"
  },
  {
    "id": 102122,
    "question_id": 10212,
    "option_label": "B",
    "option_text": "Ta’sirlanish"
  },
  {
    "id": 102123,
    "question_id": 10212,
    "option_label": "C",
    "option_text": "Oziqlanish"
  },
  {
    "id": 102124,
    "question_id": 10212,
    "option_label": "D",
    "option_text": "Ayirish"
  },
  {
    "id": 102131,
    "question_id": 10213,
    "option_label": "A",
    "option_text": "Aktiv harakat"
  },
  {
    "id": 102132,
    "question_id": 10213,
    "option_label": "B",
    "option_text": "Passiv harakat"
  },
  {
    "id": 102133,
    "question_id": 10213,
    "option_label": "C",
    "option_text": "Rivojlanish"
  },
  {
    "id": 102134,
    "question_id": 10213,
    "option_label": "D",
    "option_text": "Ta’sirlanish"
  },
  {
    "id": 102141,
    "question_id": 10214,
    "option_label": "A",
    "option_text": "Aktiv harakat"
  },
  {
    "id": 102142,
    "question_id": 10214,
    "option_label": "B",
    "option_text": "Passiv harakat"
  },
  {
    "id": 102143,
    "question_id": 10214,
    "option_label": "C",
    "option_text": "Tez harakat"
  },
  {
    "id": 102144,
    "question_id": 10214,
    "option_label": "D",
    "option_text": "Ayirish"
  },
  {
    "id": 102151,
    "question_id": 10215,
    "option_label": "A",
    "option_text": "O‘sish"
  },
  {
    "id": 102152,
    "question_id": 10215,
    "option_label": "B",
    "option_text": "Ko‘payish"
  },
  {
    "id": 102153,
    "question_id": 10215,
    "option_label": "C",
    "option_text": "Rivojlanish"
  },
  {
    "id": 102154,
    "question_id": 10215,
    "option_label": "D",
    "option_text": "Oziqlanish"
  },
  {
    "id": 102161,
    "question_id": 10216,
    "option_label": "A",
    "option_text": "Jinssiz"
  },
  {
    "id": 102162,
    "question_id": 10216,
    "option_label": "B",
    "option_text": "Jinsiy"
  },
  {
    "id": 102163,
    "question_id": 10216,
    "option_label": "C",
    "option_text": "Murakkab"
  },
  {
    "id": 102164,
    "question_id": 10216,
    "option_label": "D",
    "option_text": "Vegetativ"
  },
  {
    "id": 102171,
    "question_id": 10217,
    "option_label": "A",
    "option_text": "Spory"
  },
  {
    "id": 102172,
    "question_id": 10217,
    "option_label": "B",
    "option_text": "Gametalar"
  },
  {
    "id": 102173,
    "question_id": 10217,
    "option_label": "C",
    "option_text": "Organoidlar"
  },
  {
    "id": 102174,
    "question_id": 10217,
    "option_label": "D",
    "option_text": "Plastidalar"
  },
  {
    "id": 102181,
    "question_id": 10218,
    "option_label": "A",
    "option_text": "O‘sish"
  },
  {
    "id": 102182,
    "question_id": 10218,
    "option_label": "B",
    "option_text": "Rivojlanish"
  },
  {
    "id": 102183,
    "question_id": 10218,
    "option_label": "C",
    "option_text": "Ko‘payish"
  },
  {
    "id": 102184,
    "question_id": 10218,
    "option_label": "D",
    "option_text": "Ayirish"
  },
  {
    "id": 102191,
    "question_id": 10219,
    "option_label": "A",
    "option_text": "O‘sish"
  },
  {
    "id": 102192,
    "question_id": 10219,
    "option_label": "B",
    "option_text": "Rivojlanish"
  },
  {
    "id": 102193,
    "question_id": 10219,
    "option_label": "C",
    "option_text": "Ta’sirlanish"
  },
  {
    "id": 102194,
    "question_id": 10219,
    "option_label": "D",
    "option_text": "Nafas olish"
  },
  {
    "id": 102201,
    "question_id": 10220,
    "option_label": "A",
    "option_text": "Atmosfera kislorodi"
  },
  {
    "id": 102202,
    "question_id": 10220,
    "option_label": "B",
    "option_text": "Suvda erigan kislorod"
  },
  {
    "id": 102203,
    "question_id": 10220,
    "option_label": "C",
    "option_text": "Vodorod"
  },
  {
    "id": 102204,
    "question_id": 10220,
    "option_label": "D",
    "option_text": "Suv bug‘i"
  },
  {
    "id": 103011,
    "question_id": 10301,
    "option_label": "A",
    "option_text": "Tajriba"
  },
  {
    "id": 103012,
    "question_id": 10301,
    "option_label": "B",
    "option_text": "Kuzatish"
  },
  {
    "id": 103013,
    "question_id": 10301,
    "option_label": "C",
    "option_text": "Tarixiy"
  },
  {
    "id": 103014,
    "question_id": 10301,
    "option_label": "D",
    "option_text": "Taqqoslash"
  },
  {
    "id": 103021,
    "question_id": 10302,
    "option_label": "A",
    "option_text": "Mikroskop"
  },
  {
    "id": 103022,
    "question_id": 10302,
    "option_label": "B",
    "option_text": "Sezgi organlari"
  },
  {
    "id": 103023,
    "question_id": 10302,
    "option_label": "C",
    "option_text": "Kitoblar"
  },
  {
    "id": 103024,
    "question_id": 10302,
    "option_label": "D",
    "option_text": "Laboratoriya"
  },
  {
    "id": 103031,
    "question_id": 10303,
    "option_label": "A",
    "option_text": "Kuzatish"
  },
  {
    "id": 103032,
    "question_id": 10303,
    "option_label": "B",
    "option_text": "Taqqoslash"
  },
  {
    "id": 103033,
    "question_id": 10303,
    "option_label": "C",
    "option_text": "Tajriba"
  },
  {
    "id": 103034,
    "question_id": 10303,
    "option_label": "D",
    "option_text": "Tarixiy"
  },
  {
    "id": 103041,
    "question_id": 10304,
    "option_label": "A",
    "option_text": "Kuzatish"
  },
  {
    "id": 103042,
    "question_id": 10304,
    "option_label": "B",
    "option_text": "Tarixiy usul"
  },
  {
    "id": 103043,
    "question_id": 10304,
    "option_label": "C",
    "option_text": "Tajriba"
  },
  {
    "id": 103044,
    "question_id": 10304,
    "option_label": "D",
    "option_text": "Taqqoslash"
  },
  {
    "id": 103051,
    "question_id": 10305,
    "option_label": "A",
    "option_text": "Tajriba usuli"
  },
  {
    "id": 103052,
    "question_id": 10305,
    "option_label": "B",
    "option_text": "Tarixiy usul"
  },
  {
    "id": 103053,
    "question_id": 10305,
    "option_label": "C",
    "option_text": "Kuzatish"
  },
  {
    "id": 103054,
    "question_id": 10305,
    "option_label": "D",
    "option_text": "Taqqoslash"
  },
  {
    "id": 103061,
    "question_id": 10306,
    "option_label": "A",
    "option_text": "Botaniklar"
  },
  {
    "id": 103062,
    "question_id": 10306,
    "option_label": "B",
    "option_text": "Paleontologlar"
  },
  {
    "id": 103063,
    "question_id": 10306,
    "option_label": "C",
    "option_text": "Zoologlar"
  },
  {
    "id": 103064,
    "question_id": 10306,
    "option_label": "D",
    "option_text": "Genetika"
  },
  {
    "id": 103071,
    "question_id": 10307,
    "option_label": "A",
    "option_text": "O‘simliklar ustida"
  },
  {
    "id": 103072,
    "question_id": 10307,
    "option_label": "B",
    "option_text": "Go‘sht bo‘laklari va pashshalar ustida"
  },
  {
    "id": 103073,
    "question_id": 10307,
    "option_label": "C",
    "option_text": "Bakteriyalar ustida"
  },
  {
    "id": 103074,
    "question_id": 10307,
    "option_label": "D",
    "option_text": "Quyonlar ustida"
  },
  {
    "id": 103081,
    "question_id": 10308,
    "option_label": "A",
    "option_text": "Go'shtdan o'z-o'zidan paydo bo'ldi"
  },
  {
    "id": 103082,
    "question_id": 10308,
    "option_label": "B",
    "option_text": "Pashshalar tuxum qo'ygani uchun"
  },
  {
    "id": 103083,
    "question_id": 10308,
    "option_label": "C",
    "option_text": "Havodan tushdi"
  },
  {
    "id": 103084,
    "question_id": 10308,
    "option_label": "D",
    "option_text": "Suvdan paydo bo'ldi"
  },
  {
    "id": 103091,
    "question_id": 10309,
    "option_label": "A",
    "option_text": "Tajriba"
  },
  {
    "id": 103092,
    "question_id": 10309,
    "option_label": "B",
    "option_text": "Kuzatish"
  },
  {
    "id": 103093,
    "question_id": 10309,
    "option_label": "C",
    "option_text": "Tarixiy"
  },
  {
    "id": 103094,
    "question_id": 10309,
    "option_label": "D",
    "option_text": "Kimyoviy"
  },
  {
    "id": 103101,
    "question_id": 10310,
    "option_label": "A",
    "option_text": "Kuzatish"
  },
  {
    "id": 103102,
    "question_id": 10310,
    "option_label": "B",
    "option_text": "Tajriba"
  },
  {
    "id": 103103,
    "question_id": 10310,
    "option_label": "C",
    "option_text": "Tarixiy"
  },
  {
    "id": 103104,
    "question_id": 10310,
    "option_label": "D",
    "option_text": "Taqqoslash"
  },
  {
    "id": 103111,
    "question_id": 10311,
    "option_label": "A",
    "option_text": "Kuzatish"
  },
  {
    "id": 103112,
    "question_id": 10311,
    "option_label": "B",
    "option_text": "Tajriba"
  },
  {
    "id": 103113,
    "question_id": 10311,
    "option_label": "C",
    "option_text": "Tarixiy"
  },
  {
    "id": 103114,
    "question_id": 10311,
    "option_label": "D",
    "option_text": "Taqqoslash"
  },
  {
    "id": 103121,
    "question_id": 10312,
    "option_label": "A",
    "option_text": "Kuzatish"
  },
  {
    "id": 103122,
    "question_id": 10312,
    "option_label": "B",
    "option_text": "Taqqoslash"
  },
  {
    "id": 103123,
    "question_id": 10312,
    "option_label": "C",
    "option_text": "Tajriba"
  },
  {
    "id": 103124,
    "question_id": 10312,
    "option_label": "D",
    "option_text": "Tarixiy"
  },
  {
    "id": 103131,
    "question_id": 10313,
    "option_label": "A",
    "option_text": "Faqat hozirgi turlar"
  },
  {
    "id": 103132,
    "question_id": 10313,
    "option_label": "B",
    "option_text": "Qadimgi turlar hozirgilar bilan"
  },
  {
    "id": 103133,
    "question_id": 10313,
    "option_label": "C",
    "option_text": "Bir xil yoshdagilar"
  },
  {
    "id": 103134,
    "question_id": 10313,
    "option_label": "D",
    "option_text": "Faqat o‘simliklar"
  },
  {
    "id": 103141,
    "question_id": 10314,
    "option_label": "A",
    "option_text": "Ikkita"
  },
  {
    "id": 103142,
    "question_id": 10314,
    "option_label": "B",
    "option_text": "Uchta"
  },
  {
    "id": 103143,
    "question_id": 10314,
    "option_label": "C",
    "option_text": "To‘rtta"
  },
  {
    "id": 103144,
    "question_id": 10314,
    "option_label": "D",
    "option_text": "Bitta"
  },
  {
    "id": 103151,
    "question_id": 10315,
    "option_label": "A",
    "option_text": "Kuzatish"
  },
  {
    "id": 103152,
    "question_id": 10315,
    "option_label": "B",
    "option_text": "Tajriba"
  },
  {
    "id": 103153,
    "question_id": 10315,
    "option_label": "C",
    "option_text": "Taqqoslash"
  },
  {
    "id": 103154,
    "question_id": 10315,
    "option_label": "D",
    "option_text": "Tarixiy"
  },
  {
    "id": 103161,
    "question_id": 10316,
    "option_label": "A",
    "option_text": "O‘tmishdagi hayot"
  },
  {
    "id": 103162,
    "question_id": 10316,
    "option_label": "B",
    "option_text": "Tashqi muhit ta’sirida organizmning o‘zgarishi"
  },
  {
    "id": 103163,
    "question_id": 10316,
    "option_label": "C",
    "option_text": "Faqat o‘lik tabiat"
  },
  {
    "id": 103164,
    "question_id": 10316,
    "option_label": "D",
    "option_text": "Kitoblardagi rasm"
  },
  {
    "id": 103171,
    "question_id": 10317,
    "option_label": "A",
    "option_text": "Qalin qopqoq"
  },
  {
    "id": 103172,
    "question_id": 10317,
    "option_label": "B",
    "option_text": "Doka"
  },
  {
    "id": 103173,
    "question_id": 10317,
    "option_label": "C",
    "option_text": "Hech narsa"
  },
  {
    "id": 103174,
    "question_id": 10317,
    "option_label": "D",
    "option_text": "Mum"
  },
  {
    "id": 103181,
    "question_id": 10318,
    "option_label": "A",
    "option_text": "Ha"
  },
  {
    "id": 103182,
    "question_id": 10318,
    "option_label": "B",
    "option_text": "Yo‘q"
  },
  {
    "id": 103183,
    "question_id": 10318,
    "option_label": "C",
    "option_text": "Faqat o‘simliklarda"
  },
  {
    "id": 103184,
    "question_id": 10318,
    "option_label": "D",
    "option_text": "Faqat hayvonlarda"
  },
  {
    "id": 103191,
    "question_id": 10319,
    "option_label": "A",
    "option_text": "Faqat o‘xshashliklar"
  },
  {
    "id": 103192,
    "question_id": 10319,
    "option_label": "B",
    "option_text": "Faqat farqlar"
  },
  {
    "id": 103193,
    "question_id": 10319,
    "option_label": "C",
    "option_text": "O‘xshashlik hamda farqlar"
  },
  {
    "id": 103194,
    "question_id": 10319,
    "option_label": "D",
    "option_text": "Kelib chiqishi"
  },
  {
    "id": 103201,
    "question_id": 10320,
    "option_label": "A",
    "option_text": "Hozirgi harakatni ko‘rish uchun"
  },
  {
    "id": 103202,
    "question_id": 10320,
    "option_label": "B",
    "option_text": "Organizmlarda qanday o‘zgarishlar bo‘lganini bilish uchun"
  },
  {
    "id": 103203,
    "question_id": 10320,
    "option_label": "C",
    "option_text": "Go‘shtni saqlash uchun"
  },
  {
    "id": 103204,
    "question_id": 10320,
    "option_label": "D",
    "option_text": "Kuzatishni osonlashtirish uchun"
  },
  {
    "id": 104011,
    "question_id": 10401,
    "option_label": "A",
    "option_text": "Organ"
  },
  {
    "id": 104012,
    "question_id": 10401,
    "option_label": "B",
    "option_text": "Hujayra"
  },
  {
    "id": 104013,
    "question_id": 10401,
    "option_label": "C",
    "option_text": "To‘qima"
  },
  {
    "id": 104014,
    "question_id": 10401,
    "option_label": "D",
    "option_text": "Skelet"
  },
  {
    "id": 104021,
    "question_id": 10402,
    "option_label": "A",
    "option_text": "Dumaloq"
  },
  {
    "id": 104022,
    "question_id": 10402,
    "option_label": "B",
    "option_text": "Ikki tomoni botiq"
  },
  {
    "id": 104023,
    "question_id": 10402,
    "option_label": "C",
    "option_text": "Soxta oyoqli"
  },
  {
    "id": 104024,
    "question_id": 10402,
    "option_label": "D",
    "option_text": "Uzunchoq"
  },
  {
    "id": 104031,
    "question_id": 10403,
    "option_label": "A",
    "option_text": "Eritrotsit"
  },
  {
    "id": 104032,
    "question_id": 10403,
    "option_label": "B",
    "option_text": "Leykotsit"
  },
  {
    "id": 104033,
    "question_id": 10403,
    "option_label": "C",
    "option_text": "Nerv hujayrasi"
  },
  {
    "id": 104034,
    "question_id": 10403,
    "option_label": "D",
    "option_text": "Spermatazoid"
  },
  {
    "id": 104041,
    "question_id": 10404,
    "option_label": "A",
    "option_text": "Leykotsit"
  },
  {
    "id": 104042,
    "question_id": 10404,
    "option_label": "B",
    "option_text": "Nerv hujayrasi"
  },
  {
    "id": 104043,
    "question_id": 10404,
    "option_label": "C",
    "option_text": "Eritrotsit"
  },
  {
    "id": 104044,
    "question_id": 10404,
    "option_label": "D",
    "option_text": "Barg hujayrasi"
  },
  {
    "id": 104051,
    "question_id": 10405,
    "option_label": "A",
    "option_text": "Eukariotlar"
  },
  {
    "id": 104052,
    "question_id": 10405,
    "option_label": "B",
    "option_text": "Prokariotlar"
  },
  {
    "id": 104053,
    "question_id": 10405,
    "option_label": "C",
    "option_text": "Bir hujayralilar"
  },
  {
    "id": 104054,
    "question_id": 10405,
    "option_label": "D",
    "option_text": "Ko‘p hujayralilar"
  },
  {
    "id": 104061,
    "question_id": 10406,
    "option_label": "A",
    "option_text": "Prokariotlar"
  },
  {
    "id": 104062,
    "question_id": 10406,
    "option_label": "B",
    "option_text": "Eukariotlar"
  },
  {
    "id": 104063,
    "question_id": 10406,
    "option_label": "C",
    "option_text": "Viruslar"
  },
  {
    "id": 104064,
    "question_id": 10406,
    "option_label": "D",
    "option_text": "Gifalar"
  },
  {
    "id": 104071,
    "question_id": 10407,
    "option_label": "A",
    "option_text": "Sitoplazma"
  },
  {
    "id": 104072,
    "question_id": 10407,
    "option_label": "B",
    "option_text": "Sitoplazmatik membrana"
  },
  {
    "id": 104073,
    "question_id": 10407,
    "option_label": "C",
    "option_text": "Yadro"
  },
  {
    "id": 104074,
    "question_id": 10407,
    "option_label": "D",
    "option_text": "Vakuola"
  },
  {
    "id": 104081,
    "question_id": 10408,
    "option_label": "A",
    "option_text": "Membrana"
  },
  {
    "id": 104082,
    "question_id": 10408,
    "option_label": "B",
    "option_text": "Sitoplazma"
  },
  {
    "id": 104083,
    "question_id": 10408,
    "option_label": "C",
    "option_text": "Yadro"
  },
  {
    "id": 104084,
    "question_id": 10408,
    "option_label": "D",
    "option_text": "Qobiq"
  },
  {
    "id": 104091,
    "question_id": 10409,
    "option_label": "A",
    "option_text": "Vakuola"
  },
  {
    "id": 104092,
    "question_id": 10409,
    "option_label": "B",
    "option_text": "Yadro"
  },
  {
    "id": 104093,
    "question_id": 10409,
    "option_label": "C",
    "option_text": "Plastida"
  },
  {
    "id": 104094,
    "question_id": 10409,
    "option_label": "D",
    "option_text": "Membrana"
  },
  {
    "id": 104101,
    "question_id": 10410,
    "option_label": "A",
    "option_text": "Membrana"
  },
  {
    "id": 104102,
    "question_id": 10410,
    "option_label": "B",
    "option_text": "Sellyuloza qobiq"
  },
  {
    "id": 104103,
    "question_id": 10410,
    "option_label": "C",
    "option_text": "Sitoplazma"
  },
  {
    "id": 104104,
    "question_id": 10410,
    "option_label": "D",
    "option_text": "Yadro"
  },
  {
    "id": 104111,
    "question_id": 10411,
    "option_label": "A",
    "option_text": "Xloroplast"
  },
  {
    "id": 104112,
    "question_id": 10411,
    "option_label": "B",
    "option_text": "Xromoplast"
  },
  {
    "id": 104113,
    "question_id": 10411,
    "option_label": "C",
    "option_text": "Leykoplast"
  },
  {
    "id": 104114,
    "question_id": 10411,
    "option_label": "D",
    "option_text": "Vakuola"
  },
  {
    "id": 104121,
    "question_id": 10412,
    "option_label": "A",
    "option_text": "Xloroplast"
  },
  {
    "id": 104122,
    "question_id": 10412,
    "option_label": "B",
    "option_text": "Xromoplast"
  },
  {
    "id": 104123,
    "question_id": 10412,
    "option_label": "C",
    "option_text": "Leykoplast"
  },
  {
    "id": 104124,
    "question_id": 10412,
    "option_label": "D",
    "option_text": "Membrana"
  },
  {
    "id": 104131,
    "question_id": 10413,
    "option_label": "A",
    "option_text": "Xloroplast"
  },
  {
    "id": 104132,
    "question_id": 10413,
    "option_label": "B",
    "option_text": "Xromoplast"
  },
  {
    "id": 104133,
    "question_id": 10413,
    "option_label": "C",
    "option_text": "Leykoplast"
  },
  {
    "id": 104134,
    "question_id": 10413,
    "option_label": "D",
    "option_text": "Sitoplazma"
  },
  {
    "id": 104141,
    "question_id": 10414,
    "option_label": "A",
    "option_text": "Yadro"
  },
  {
    "id": 104142,
    "question_id": 10414,
    "option_label": "B",
    "option_text": "Vakuola"
  },
  {
    "id": 104143,
    "question_id": 10414,
    "option_label": "C",
    "option_text": "Membrana"
  },
  {
    "id": 104144,
    "question_id": 10414,
    "option_label": "D",
    "option_text": "Plastida"
  },
  {
    "id": 104151,
    "question_id": 10415,
    "option_label": "A",
    "option_text": "Kichik bo‘ladi"
  },
  {
    "id": 104152,
    "question_id": 10415,
    "option_label": "B",
    "option_text": "Yirik bo‘ladi"
  },
  {
    "id": 104153,
    "question_id": 10415,
    "option_label": "C",
    "option_text": "Bo‘lmaydi"
  },
  {
    "id": 104154,
    "question_id": 10415,
    "option_label": "D",
    "option_text": "Yo‘qolib ketadi"
  },
  {
    "id": 104161,
    "question_id": 10416,
    "option_label": "A",
    "option_text": "Hazm vakuolasi"
  },
  {
    "id": 104162,
    "question_id": 10416,
    "option_label": "B",
    "option_text": "Qisqaruvchi vakuola"
  },
  {
    "id": 104163,
    "question_id": 10416,
    "option_label": "C",
    "option_text": "Yadro"
  },
  {
    "id": 104164,
    "question_id": 10416,
    "option_label": "D",
    "option_text": "Membrana"
  },
  {
    "id": 104171,
    "question_id": 10417,
    "option_label": "A",
    "option_text": "Hazm vakuolasi"
  },
  {
    "id": 104172,
    "question_id": 10417,
    "option_label": "B",
    "option_text": "Qisqaruvchi vakuola"
  },
  {
    "id": 104173,
    "question_id": 10417,
    "option_label": "C",
    "option_text": "Plastida"
  },
  {
    "id": 104174,
    "question_id": 10417,
    "option_label": "D",
    "option_text": "Qobiq"
  },
  {
    "id": 104181,
    "question_id": 10418,
    "option_label": "A",
    "option_text": "Organ"
  },
  {
    "id": 104182,
    "question_id": 10418,
    "option_label": "B",
    "option_text": "To‘qima"
  },
  {
    "id": 104183,
    "question_id": 10418,
    "option_label": "C",
    "option_text": "Organizm"
  },
  {
    "id": 104184,
    "question_id": 10418,
    "option_label": "D",
    "option_text": "Sistematika"
  },
  {
    "id": 104191,
    "question_id": 10419,
    "option_label": "A",
    "option_text": "Hujayrani"
  },
  {
    "id": 104192,
    "question_id": 10419,
    "option_label": "B",
    "option_text": "Organni"
  },
  {
    "id": 104193,
    "question_id": 10419,
    "option_label": "C",
    "option_text": "Organoidni"
  },
  {
    "id": 104194,
    "question_id": 10419,
    "option_label": "D",
    "option_text": "Sistematikani"
  },
  {
    "id": 104201,
    "question_id": 10420,
    "option_label": "A",
    "option_text": "Hujayra o‘lishini"
  },
  {
    "id": 104202,
    "question_id": 10420,
    "option_label": "B",
    "option_text": "Plastidalar bir-biriga aylanishini"
  },
  {
    "id": 104203,
    "question_id": 10420,
    "option_label": "C",
    "option_text": "Mevani chirishini"
  },
  {
    "id": 104204,
    "question_id": 10420,
    "option_label": "D",
    "option_text": "Vakuola yo‘qolishini"
  },
  {
    "id": 105011,
    "question_id": 10501,
    "option_label": "A",
    "option_text": "2 ta"
  },
  {
    "id": 105012,
    "question_id": 10501,
    "option_label": "B",
    "option_text": "3 ta"
  },
  {
    "id": 105013,
    "question_id": 10501,
    "option_label": "C",
    "option_text": "4 ta"
  },
  {
    "id": 105014,
    "question_id": 10501,
    "option_label": "D",
    "option_text": "5 ta"
  },
  {
    "id": 105021,
    "question_id": 10502,
    "option_label": "A",
    "option_text": "Bakteriyalar"
  },
  {
    "id": 105022,
    "question_id": 10502,
    "option_label": "B",
    "option_text": "Zamburug‘lar"
  },
  {
    "id": 105023,
    "question_id": 10502,
    "option_label": "C",
    "option_text": "Hayvonlar"
  },
  {
    "id": 105024,
    "question_id": 10502,
    "option_label": "D",
    "option_text": "Viruslar"
  },
  {
    "id": 105031,
    "question_id": 10503,
    "option_label": "A",
    "option_text": "Bakteriyalar"
  },
  {
    "id": 105032,
    "question_id": 10503,
    "option_label": "B",
    "option_text": "O‘simliklar"
  },
  {
    "id": 105033,
    "question_id": 10503,
    "option_label": "C",
    "option_text": "Hayvonlar"
  },
  {
    "id": 105034,
    "question_id": 10503,
    "option_label": "D",
    "option_text": "Zamburug‘lar"
  },
  {
    "id": 105041,
    "question_id": 10504,
    "option_label": "A",
    "option_text": "Rizoidlar"
  },
  {
    "id": 105042,
    "question_id": 10504,
    "option_label": "B",
    "option_text": "Gifalar"
  },
  {
    "id": 105043,
    "question_id": 10504,
    "option_label": "C",
    "option_text": "Ildizlar"
  },
  {
    "id": 105044,
    "question_id": 10504,
    "option_label": "D",
    "option_text": "Tallom"
  },
  {
    "id": 105051,
    "question_id": 10505,
    "option_label": "A",
    "option_text": "Fauna"
  },
  {
    "id": 105052,
    "question_id": 10505,
    "option_label": "B",
    "option_text": "Flora"
  },
  {
    "id": 105053,
    "question_id": 10505,
    "option_label": "C",
    "option_text": "Biotsenoz"
  },
  {
    "id": 105054,
    "question_id": 10505,
    "option_label": "D",
    "option_text": "Tallom"
  },
  {
    "id": 105061,
    "question_id": 10506,
    "option_label": "A",
    "option_text": "Flora"
  },
  {
    "id": 105062,
    "question_id": 10506,
    "option_label": "B",
    "option_text": "Fauna"
  },
  {
    "id": 105063,
    "question_id": 10506,
    "option_label": "C",
    "option_text": "Sistematika"
  },
  {
    "id": 105064,
    "question_id": 10506,
    "option_label": "D",
    "option_text": "Simbioz"
  },
  {
    "id": 105071,
    "question_id": 10507,
    "option_label": "A",
    "option_text": "Kislorod"
  },
  {
    "id": 105072,
    "question_id": 10507,
    "option_label": "B",
    "option_text": "Karbonat angidrid"
  },
  {
    "id": 105073,
    "question_id": 10507,
    "option_label": "C",
    "option_text": "Azot"
  },
  {
    "id": 105074,
    "question_id": 10507,
    "option_label": "D",
    "option_text": "Vodorod"
  },
  {
    "id": 105081,
    "question_id": 10508,
    "option_label": "A",
    "option_text": "Kislorod"
  },
  {
    "id": 105082,
    "question_id": 10508,
    "option_label": "B",
    "option_text": "Karbonat angidrid"
  },
  {
    "id": 105083,
    "question_id": 10508,
    "option_label": "C",
    "option_text": "Azot"
  },
  {
    "id": 105084,
    "question_id": 10508,
    "option_label": "D",
    "option_text": "Argon"
  },
  {
    "id": 105091,
    "question_id": 10509,
    "option_label": "A",
    "option_text": "Ko‘payishida"
  },
  {
    "id": 105092,
    "question_id": 10509,
    "option_label": "B",
    "option_text": "Nafas olishida"
  },
  {
    "id": 105093,
    "question_id": 10509,
    "option_label": "C",
    "option_text": "Nerv sistemasi va sezgi organlari borligida"
  },
  {
    "id": 105094,
    "question_id": 10509,
    "option_label": "D",
    "option_text": "Hujayradan tuzilganida"
  },
  {
    "id": 105101,
    "question_id": 10510,
    "option_label": "A",
    "option_text": "Bakteriya"
  },
  {
    "id": 105102,
    "question_id": 10510,
    "option_label": "B",
    "option_text": "Virus"
  },
  {
    "id": 105103,
    "question_id": 10510,
    "option_label": "C",
    "option_text": "Achitqi"
  },
  {
    "id": 105104,
    "question_id": 10510,
    "option_label": "D",
    "option_text": "Mikrob"
  },
  {
    "id": 105111,
    "question_id": 10511,
    "option_label": "A",
    "option_text": "Tashqi muhitda"
  },
  {
    "id": 105112,
    "question_id": 10511,
    "option_label": "B",
    "option_text": "Suvda"
  },
  {
    "id": 105113,
    "question_id": 10511,
    "option_label": "C",
    "option_text": "Hujayra ichiga kirganda"
  },
  {
    "id": 105114,
    "question_id": 10511,
    "option_label": "D",
    "option_text": "Tuproqda"
  },
  {
    "id": 105121,
    "question_id": 10512,
    "option_label": "A",
    "option_text": "Bakteriofag"
  },
  {
    "id": 105122,
    "question_id": 10512,
    "option_label": "B",
    "option_text": "Tamaki mozaikasi"
  },
  {
    "id": 105123,
    "question_id": 10512,
    "option_label": "C",
    "option_text": "Gripp"
  },
  {
    "id": 105124,
    "question_id": 10512,
    "option_label": "D",
    "option_text": "Gepatit"
  },
  {
    "id": 105131,
    "question_id": 10513,
    "option_label": "A",
    "option_text": "Gripp"
  },
  {
    "id": 105132,
    "question_id": 10513,
    "option_label": "B",
    "option_text": "Gepatit (A va B)"
  },
  {
    "id": 105133,
    "question_id": 10513,
    "option_label": "C",
    "option_text": "Gerpes"
  },
  {
    "id": 105134,
    "question_id": 10513,
    "option_label": "D",
    "option_text": "OITS"
  },
  {
    "id": 105141,
    "question_id": 10514,
    "option_label": "A",
    "option_text": "Gepatit"
  },
  {
    "id": 105142,
    "question_id": 10514,
    "option_label": "B",
    "option_text": "Gripp va koronavirus"
  },
  {
    "id": 105143,
    "question_id": 10514,
    "option_label": "C",
    "option_text": "Bakteriofag"
  },
  {
    "id": 105144,
    "question_id": 10514,
    "option_label": "D",
    "option_text": "Gerpes"
  },
  {
    "id": 105151,
    "question_id": 10515,
    "option_label": "A",
    "option_text": "Hayvonlarda"
  },
  {
    "id": 105152,
    "question_id": 10515,
    "option_label": "B",
    "option_text": "O‘simliklarda"
  },
  {
    "id": 105153,
    "question_id": 10515,
    "option_label": "C",
    "option_text": "Bakteriyalarda"
  },
  {
    "id": 105154,
    "question_id": 10515,
    "option_label": "D",
    "option_text": "Zamburug‘larda"
  },
  {
    "id": 105161,
    "question_id": 10516,
    "option_label": "A",
    "option_text": "Gripp"
  },
  {
    "id": 105162,
    "question_id": 10516,
    "option_label": "B",
    "option_text": "Gerpes"
  },
  {
    "id": 105163,
    "question_id": 10516,
    "option_label": "C",
    "option_text": "Gepatit"
  },
  {
    "id": 105164,
    "question_id": 10516,
    "option_label": "D",
    "option_text": "Ensefalit"
  },
  {
    "id": 105171,
    "question_id": 10517,
    "option_label": "A",
    "option_text": "Harorat ko‘tarilishi"
  },
  {
    "id": 105172,
    "question_id": 10517,
    "option_label": "B",
    "option_text": "Lanjlik"
  },
  {
    "id": 105173,
    "question_id": 10517,
    "option_label": "C",
    "option_text": "Ishtaha pasayishi"
  },
  {
    "id": 105174,
    "question_id": 10517,
    "option_label": "D",
    "option_text": "Suye suyak og‘rig‘i"
  },
  {
    "id": 105181,
    "question_id": 10518,
    "option_label": "A",
    "option_text": "Ko‘p suyuqlik ichirish va shifokorga murojaat qilish"
  },
  {
    "id": 105182,
    "question_id": 10518,
    "option_label": "B",
    "option_text": "Sport bilan shug‘ullantirish"
  },
  {
    "id": 105183,
    "question_id": 10518,
    "option_label": "C",
    "option_text": "Muzdek suv berish"
  },
  {
    "id": 105184,
    "question_id": 10518,
    "option_label": "D",
    "option_text": "Faqat uxlash"
  },
  {
    "id": 105191,
    "question_id": 10519,
    "option_label": "A",
    "option_text": "Bakteriya"
  },
  {
    "id": 105192,
    "question_id": 10519,
    "option_label": "B",
    "option_text": "Virus"
  },
  {
    "id": 105193,
    "question_id": 10519,
    "option_label": "C",
    "option_text": "Zamburug‘"
  },
  {
    "id": 105194,
    "question_id": 10519,
    "option_label": "D",
    "option_text": "Spora"
  },
  {
    "id": 105201,
    "question_id": 10520,
    "option_label": "A",
    "option_text": "Amyoba"
  },
  {
    "id": 105202,
    "question_id": 10520,
    "option_label": "B",
    "option_text": "Virus"
  },
  {
    "id": 105203,
    "question_id": 10520,
    "option_label": "C",
    "option_text": "Xlorella"
  },
  {
    "id": 105204,
    "question_id": 10520,
    "option_label": "D",
    "option_text": "Achitqi"
  },
  {
    "id": 106011,
    "question_id": 10601,
    "option_label": "A",
    "option_text": "Mikologiya"
  },
  {
    "id": 106012,
    "question_id": 10601,
    "option_label": "B",
    "option_text": "Mikrobiologiya"
  },
  {
    "id": 106013,
    "question_id": 10601,
    "option_label": "C",
    "option_text": "Sitologiya"
  },
  {
    "id": 106014,
    "question_id": 10601,
    "option_label": "D",
    "option_text": "Botanika"
  },
  {
    "id": 106021,
    "question_id": 10602,
    "option_label": "A",
    "option_text": "Kokk"
  },
  {
    "id": 106022,
    "question_id": 10602,
    "option_label": "B",
    "option_text": "Batsilla"
  },
  {
    "id": 106023,
    "question_id": 10602,
    "option_label": "C",
    "option_text": "Vibrion"
  },
  {
    "id": 106024,
    "question_id": 10602,
    "option_label": "D",
    "option_text": "Spirilla"
  },
  {
    "id": 106031,
    "question_id": 10603,
    "option_label": "A",
    "option_text": "Kokk"
  },
  {
    "id": 106032,
    "question_id": 10603,
    "option_label": "B",
    "option_text": "Batsilla"
  },
  {
    "id": 106033,
    "question_id": 10603,
    "option_label": "C",
    "option_text": "Spirilla"
  },
  {
    "id": 106034,
    "question_id": 10603,
    "option_label": "D",
    "option_text": "Vibrion"
  },
  {
    "id": 106041,
    "question_id": 10604,
    "option_label": "A",
    "option_text": "Kokk"
  },
  {
    "id": 106042,
    "question_id": 10604,
    "option_label": "B",
    "option_text": "Batsilla"
  },
  {
    "id": 106043,
    "question_id": 10604,
    "option_label": "C",
    "option_text": "Vibrion va spirilla"
  },
  {
    "id": 106044,
    "question_id": 10604,
    "option_label": "D",
    "option_text": "Prokariotlar"
  },
  {
    "id": 106051,
    "question_id": 10605,
    "option_label": "A",
    "option_text": "10-15"
  },
  {
    "id": 106052,
    "question_id": 10605,
    "option_label": "B",
    "option_text": "20-30"
  },
  {
    "id": 106053,
    "question_id": 10605,
    "option_label": "C",
    "option_text": "60"
  },
  {
    "id": 106054,
    "question_id": 10605,
    "option_label": "D",
    "option_text": "5-10"
  },
  {
    "id": 106061,
    "question_id": 10606,
    "option_label": "A",
    "option_text": "Gameta"
  },
  {
    "id": 106062,
    "question_id": 10606,
    "option_label": "B",
    "option_text": "Spora"
  },
  {
    "id": 106063,
    "question_id": 10606,
    "option_label": "C",
    "option_text": "Kurtak"
  },
  {
    "id": 106064,
    "question_id": 10606,
    "option_label": "D",
    "option_text": "Meva"
  },
  {
    "id": 106071,
    "question_id": 10607,
    "option_label": "A",
    "option_text": "Faqat 0 daraja"
  },
  {
    "id": 106072,
    "question_id": 10607,
    "option_label": "B",
    "option_text": "+140°C dan -253°C gacha"
  },
  {
    "id": 106073,
    "question_id": 10607,
    "option_label": "C",
    "option_text": "Faqat qaynoq suvda"
  },
  {
    "id": 106074,
    "question_id": 10607,
    "option_label": "D",
    "option_text": "Faqat muzlikda"
  },
  {
    "id": 106081,
    "question_id": 10608,
    "option_label": "A",
    "option_text": "Chirituvchi"
  },
  {
    "id": 106082,
    "question_id": 10608,
    "option_label": "B",
    "option_text": "Achituvchi"
  },
  {
    "id": 106083,
    "question_id": 10608,
    "option_label": "C",
    "option_text": "Tugunak"
  },
  {
    "id": 106084,
    "question_id": 10608,
    "option_label": "D",
    "option_text": "Parazit"
  },
  {
    "id": 106091,
    "question_id": 10609,
    "option_label": "A",
    "option_text": "Sut kislotasi hosil qiluvchi bakteriyalar"
  },
  {
    "id": 106092,
    "question_id": 10609,
    "option_label": "B",
    "option_text": "Quyosh nuri"
  },
  {
    "id": 106093,
    "question_id": 10609,
    "option_label": "C",
    "option_text": "Suv"
  },
  {
    "id": 106094,
    "question_id": 10609,
    "option_label": "D",
    "option_text": "Shakar"
  },
  {
    "id": 106101,
    "question_id": 10610,
    "option_label": "A",
    "option_text": "Achituvchi"
  },
  {
    "id": 106102,
    "question_id": 10610,
    "option_label": "B",
    "option_text": "Chirituvchi"
  },
  {
    "id": 106103,
    "question_id": 10610,
    "option_label": "C",
    "option_text": "Tugunak"
  },
  {
    "id": 106104,
    "question_id": 10610,
    "option_label": "D",
    "option_text": "Parazit"
  },
  {
    "id": 106111,
    "question_id": 10611,
    "option_label": "A",
    "option_text": "Achituvchi"
  },
  {
    "id": 106112,
    "question_id": 10611,
    "option_label": "B",
    "option_text": "Tugunak"
  },
  {
    "id": 106113,
    "question_id": 10611,
    "option_label": "C",
    "option_text": "Chirituvchi"
  },
  {
    "id": 106114,
    "question_id": 10611,
    "option_label": "D",
    "option_text": "Sil tayoqchasi"
  },
  {
    "id": 106121,
    "question_id": 10612,
    "option_label": "A",
    "option_text": "Kislorod"
  },
  {
    "id": 106122,
    "question_id": 10612,
    "option_label": "B",
    "option_text": "Azot"
  },
  {
    "id": 106123,
    "question_id": 10612,
    "option_label": "C",
    "option_text": "Karbonat angidrid"
  },
  {
    "id": 106124,
    "question_id": 10612,
    "option_label": "D",
    "option_text": "Vodorod"
  },
  {
    "id": 106131,
    "question_id": 10613,
    "option_label": "A",
    "option_text": "Parazitizm"
  },
  {
    "id": 106132,
    "question_id": 10613,
    "option_label": "B",
    "option_text": "Simbioz"
  },
  {
    "id": 106133,
    "question_id": 10613,
    "option_label": "C",
    "option_text": "Epidemiya"
  },
  {
    "id": 106134,
    "question_id": 10613,
    "option_label": "D",
    "option_text": "Karantin"
  },
  {
    "id": 106141,
    "question_id": 10614,
    "option_label": "A",
    "option_text": "Gripp"
  },
  {
    "id": 106142,
    "question_id": 10614,
    "option_label": "B",
    "option_text": "Sil (vabo, o‘lat)"
  },
  {
    "id": 106143,
    "question_id": 10614,
    "option_label": "C",
    "option_text": "Gepatit"
  },
  {
    "id": 106144,
    "question_id": 10614,
    "option_label": "D",
    "option_text": "OITS"
  },
  {
    "id": 106151,
    "question_id": 10615,
    "option_label": "A",
    "option_text": "Simbioz"
  },
  {
    "id": 106152,
    "question_id": 10615,
    "option_label": "B",
    "option_text": "Epidemiya"
  },
  {
    "id": 106153,
    "question_id": 10615,
    "option_label": "C",
    "option_text": "Fitonsid"
  },
  {
    "id": 106154,
    "question_id": 10615,
    "option_label": "D",
    "option_text": "Fotosintez"
  },
  {
    "id": 106161,
    "question_id": 10616,
    "option_label": "A",
    "option_text": "Karantin"
  },
  {
    "id": 106162,
    "question_id": 10616,
    "option_label": "B",
    "option_text": "Fotosintez"
  },
  {
    "id": 106163,
    "question_id": 10616,
    "option_label": "C",
    "option_text": "Tullash"
  },
  {
    "id": 106164,
    "question_id": 10616,
    "option_label": "D",
    "option_text": "Spora"
  },
  {
    "id": 106171,
    "question_id": 10617,
    "option_label": "A",
    "option_text": "Archa, terak"
  },
  {
    "id": 106172,
    "question_id": 10617,
    "option_label": "B",
    "option_text": "Bug‘doy, makkajo‘xori"
  },
  {
    "id": 106173,
    "question_id": 10617,
    "option_label": "C",
    "option_text": "Olma, o‘rik"
  },
  {
    "id": 106174,
    "question_id": 10617,
    "option_label": "D",
    "option_text": "Paxta, zig‘ir"
  },
  {
    "id": 106181,
    "question_id": 10618,
    "option_label": "A",
    "option_text": "Gormon"
  },
  {
    "id": 106182,
    "question_id": 10618,
    "option_label": "B",
    "option_text": "Fitonsid"
  },
  {
    "id": 106183,
    "question_id": 10618,
    "option_label": "C",
    "option_text": "Pigment"
  },
  {
    "id": 106184,
    "question_id": 10618,
    "option_label": "D",
    "option_text": "Vitamin"
  },
  {
    "id": 106191,
    "question_id": 10619,
    "option_label": "A",
    "option_text": "To‘g‘ri nay"
  },
  {
    "id": 106192,
    "question_id": 10619,
    "option_label": "B",
    "option_text": "\"S\" shaklidagi nay"
  },
  {
    "id": 106193,
    "question_id": 10619,
    "option_label": "C",
    "option_text": "Spiral nay"
  },
  {
    "id": 106194,
    "question_id": 10619,
    "option_label": "D",
    "option_text": "Qisqa nay"
  },
  {
    "id": 106201,
    "question_id": 10620,
    "option_label": "A",
    "option_text": "Suvdan"
  },
  {
    "id": 106202,
    "question_id": 10620,
    "option_label": "B",
    "option_text": "Havo bilan bakteriyalar tushgani uchun"
  },
  {
    "id": 106203,
    "question_id": 10620,
    "option_label": "C",
    "option_text": "Issiqdan"
  },
  {
    "id": 106204,
    "question_id": 10620,
    "option_label": "D",
    "option_text": "Go‘sht yomon bo‘lgani uchun"
  },
  {
    "id": 107011,
    "question_id": 10701,
    "option_label": "A",
    "option_text": "Botanika"
  },
  {
    "id": 107012,
    "question_id": 10701,
    "option_label": "B",
    "option_text": "Mikologiya"
  },
  {
    "id": 107013,
    "question_id": 10701,
    "option_label": "C",
    "option_text": "Zoologiya"
  },
  {
    "id": 107014,
    "question_id": 10701,
    "option_label": "D",
    "option_text": "Fiziologiya"
  },
  {
    "id": 107021,
    "question_id": 10702,
    "option_label": "A",
    "option_text": "Avtotrof"
  },
  {
    "id": 107022,
    "question_id": 10702,
    "option_label": "B",
    "option_text": "Geterotrof"
  },
  {
    "id": 107023,
    "question_id": 10702,
    "option_label": "C",
    "option_text": "Produtsent"
  },
  {
    "id": 107024,
    "question_id": 10702,
    "option_label": "D",
    "option_text": "O‘simlik"
  },
  {
    "id": 107031,
    "question_id": 10703,
    "option_label": "A",
    "option_text": "Ozuqa"
  },
  {
    "id": 107032,
    "question_id": 10703,
    "option_label": "B",
    "option_text": "Namlik"
  },
  {
    "id": 107033,
    "question_id": 10703,
    "option_label": "C",
    "option_text": "Harorat"
  },
  {
    "id": 107034,
    "question_id": 10703,
    "option_label": "D",
    "option_text": "Yorug‘lik"
  },
  {
    "id": 107041,
    "question_id": 10704,
    "option_label": "A",
    "option_text": "Mog‘or"
  },
  {
    "id": 107042,
    "question_id": 10704,
    "option_label": "B",
    "option_text": "Achitqi"
  },
  {
    "id": 107043,
    "question_id": 10704,
    "option_label": "C",
    "option_text": "Qorakuya"
  },
  {
    "id": 107044,
    "question_id": 10704,
    "option_label": "D",
    "option_text": "Muxomor"
  },
  {
    "id": 107051,
    "question_id": 10705,
    "option_label": "A",
    "option_text": "Spora bilan"
  },
  {
    "id": 107052,
    "question_id": 10705,
    "option_label": "B",
    "option_text": "Kurtaklanib"
  },
  {
    "id": 107053,
    "question_id": 10705,
    "option_label": "C",
    "option_text": "Ildizpoya bilan"
  },
  {
    "id": 107054,
    "question_id": 10705,
    "option_label": "D",
    "option_text": "Meva orqali"
  },
  {
    "id": 107061,
    "question_id": 10706,
    "option_label": "A",
    "option_text": "Achitqi"
  },
  {
    "id": 107062,
    "question_id": 10706,
    "option_label": "B",
    "option_text": "Mog‘or"
  },
  {
    "id": 107063,
    "question_id": 10706,
    "option_label": "C",
    "option_text": "Qalpoqchali"
  },
  {
    "id": 107064,
    "question_id": 10706,
    "option_label": "D",
    "option_text": "Parazit"
  },
  {
    "id": 107071,
    "question_id": 10707,
    "option_label": "A",
    "option_text": "Qizil"
  },
  {
    "id": 107072,
    "question_id": 10707,
    "option_label": "B",
    "option_text": "Oq"
  },
  {
    "id": 107073,
    "question_id": 10707,
    "option_label": "C",
    "option_text": "Yashil yoki qoramtir"
  },
  {
    "id": 107074,
    "question_id": 10707,
    "option_label": "D",
    "option_text": "Sariq"
  },
  {
    "id": 107081,
    "question_id": 10708,
    "option_label": "A",
    "option_text": "Vitamin"
  },
  {
    "id": 107082,
    "question_id": 10708,
    "option_label": "B",
    "option_text": "Antibiotik"
  },
  {
    "id": 107083,
    "question_id": 10708,
    "option_label": "C",
    "option_text": "Gormon"
  },
  {
    "id": 107084,
    "question_id": 10708,
    "option_label": "D",
    "option_text": "Zardob"
  },
  {
    "id": 107091,
    "question_id": 10709,
    "option_label": "A",
    "option_text": "Qizil muxomor"
  },
  {
    "id": 107092,
    "question_id": 10709,
    "option_label": "B",
    "option_text": "Qo‘zidumba (shampinion)"
  },
  {
    "id": 107093,
    "question_id": 10709,
    "option_label": "C",
    "option_text": "Sariq soxta qo‘ziqorin"
  },
  {
    "id": 107094,
    "question_id": 10709,
    "option_label": "D",
    "option_text": "Zang"
  },
  {
    "id": 107101,
    "question_id": 10710,
    "option_label": "A",
    "option_text": "Qalpoqchali"
  },
  {
    "id": 107102,
    "question_id": 10710,
    "option_label": "B",
    "option_text": "Parazit"
  },
  {
    "id": 107103,
    "question_id": 10710,
    "option_label": "C",
    "option_text": "Achitqi"
  },
  {
    "id": 107104,
    "question_id": 10710,
    "option_label": "D",
    "option_text": "Mog‘or"
  },
  {
    "id": 107111,
    "question_id": 10711,
    "option_label": "A",
    "option_text": "Faqat yuvish"
  },
  {
    "id": 107112,
    "question_id": 10711,
    "option_label": "B",
    "option_text": "5-7 daqiqa qaynatib, suvini to‘kib yuborish"
  },
  {
    "id": 107113,
    "question_id": 10711,
    "option_label": "C",
    "option_text": "Muzlatish"
  },
  {
    "id": 107114,
    "question_id": 10711,
    "option_label": "D",
    "option_text": "Shakar sepish"
  },
  {
    "id": 107121,
    "question_id": 10712,
    "option_label": "A",
    "option_text": "Qo‘zidumba"
  },
  {
    "id": 107122,
    "question_id": 10712,
    "option_label": "B",
    "option_text": "Qizil muxomor"
  },
  {
    "id": 107123,
    "question_id": 10712,
    "option_label": "C",
    "option_text": "Oq qo‘ziqorin"
  },
  {
    "id": 107124,
    "question_id": 10712,
    "option_label": "D",
    "option_text": "Penitsill"
  },
  {
    "id": 107131,
    "question_id": 10713,
    "option_label": "A",
    "option_text": "Qorakuya"
  },
  {
    "id": 107132,
    "question_id": 10713,
    "option_label": "B",
    "option_text": "Vilt"
  },
  {
    "id": 107133,
    "question_id": 10713,
    "option_label": "C",
    "option_text": "Zang"
  },
  {
    "id": 107134,
    "question_id": 10713,
    "option_label": "D",
    "option_text": "Mog‘or"
  },
  {
    "id": 107141,
    "question_id": 10714,
    "option_label": "A",
    "option_text": "Vertitsillium zamburug‘i"
  },
  {
    "id": 107142,
    "question_id": 10714,
    "option_label": "B",
    "option_text": "Achitqi"
  },
  {
    "id": 107143,
    "question_id": 10714,
    "option_label": "C",
    "option_text": "Fitonsid"
  },
  {
    "id": 107144,
    "question_id": 10714,
    "option_label": "D",
    "option_text": "Azot"
  },
  {
    "id": 107151,
    "question_id": 10715,
    "option_label": "A",
    "option_text": "Qorakuya"
  },
  {
    "id": 107152,
    "question_id": 10715,
    "option_label": "B",
    "option_text": "Zang zamburug‘i"
  },
  {
    "id": 107153,
    "question_id": 10715,
    "option_label": "C",
    "option_text": "Achitqi"
  },
  {
    "id": 107154,
    "question_id": 10715,
    "option_label": "D",
    "option_text": "Muxomor"
  },
  {
    "id": 107161,
    "question_id": 10716,
    "option_label": "A",
    "option_text": "Prokariot"
  },
  {
    "id": 107162,
    "question_id": 10716,
    "option_label": "B",
    "option_text": "Eukariot"
  },
  {
    "id": 107163,
    "question_id": 10716,
    "option_label": "C",
    "option_text": "Hujayrasiz"
  },
  {
    "id": 107164,
    "question_id": 10716,
    "option_label": "D",
    "option_text": "Virus"
  },
  {
    "id": 107171,
    "question_id": 10717,
    "option_label": "A",
    "option_text": "Urug‘"
  },
  {
    "id": 107172,
    "question_id": 10717,
    "option_label": "B",
    "option_text": "Spora"
  },
  {
    "id": 107173,
    "question_id": 10717,
    "option_label": "C",
    "option_text": "Gameta"
  },
  {
    "id": 107174,
    "question_id": 10717,
    "option_label": "D",
    "option_text": "Ildiz"
  },
  {
    "id": 107181,
    "question_id": 10718,
    "option_label": "A",
    "option_text": "Fotosintez qilgani uchun"
  },
  {
    "id": 107182,
    "question_id": 10718,
    "option_label": "B",
    "option_text": "Erkin harakatlana olmagani uchun"
  },
  {
    "id": 107183,
    "question_id": 10718,
    "option_label": "C",
    "option_text": "Tayyor oziq yegani uchun"
  },
  {
    "id": 107184,
    "question_id": 10718,
    "option_label": "D",
    "option_text": "Hujayrasiz bo‘lgani uchun"
  },
  {
    "id": 107191,
    "question_id": 10719,
    "option_label": "A",
    "option_text": "Dori"
  },
  {
    "id": 107192,
    "question_id": 10719,
    "option_label": "B",
    "option_text": "Ozuqa"
  },
  {
    "id": 107193,
    "question_id": 10719,
    "option_label": "C",
    "option_text": "O‘g‘it"
  },
  {
    "id": 107194,
    "question_id": 10719,
    "option_label": "D",
    "option_text": "Qurilish materiali"
  },
  {
    "id": 107201,
    "question_id": 10720,
    "option_label": "A",
    "option_text": "Yeyiladigan"
  },
  {
    "id": 107202,
    "question_id": 10720,
    "option_label": "B",
    "option_text": "Zaharli"
  },
  {
    "id": 107203,
    "question_id": 10720,
    "option_label": "C",
    "option_text": "Foydali"
  },
  {
    "id": 107204,
    "question_id": 10720,
    "option_label": "D",
    "option_text": "Bir hujayrali"
  },
  {
    "id": 108011,
    "question_id": 10801,
    "option_label": "A",
    "option_text": "Generativ"
  },
  {
    "id": 108012,
    "question_id": 10801,
    "option_label": "B",
    "option_text": "Vegetativ"
  },
  {
    "id": 108013,
    "question_id": 10801,
    "option_label": "C",
    "option_text": "Asosiy"
  },
  {
    "id": 108014,
    "question_id": 10801,
    "option_label": "D",
    "option_text": "Jinsiy"
  },
  {
    "id": 108021,
    "question_id": 10802,
    "option_label": "A",
    "option_text": "Gul"
  },
  {
    "id": 108022,
    "question_id": 10802,
    "option_label": "B",
    "option_text": "Ildiz (poya, barg)"
  },
  {
    "id": 108023,
    "question_id": 10802,
    "option_label": "C",
    "option_text": "Meva"
  },
  {
    "id": 108024,
    "question_id": 10802,
    "option_label": "D",
    "option_text": "Urug‘"
  },
  {
    "id": 108031,
    "question_id": 10803,
    "option_label": "A",
    "option_text": "Vegetativ"
  },
  {
    "id": 108032,
    "question_id": 10803,
    "option_label": "B",
    "option_text": "Generativ"
  },
  {
    "id": 108033,
    "question_id": 10803,
    "option_label": "C",
    "option_text": "O‘tkazuvchi"
  },
  {
    "id": 108034,
    "question_id": 10803,
    "option_label": "D",
    "option_text": "Mexanik"
  },
  {
    "id": 108041,
    "question_id": 10804,
    "option_label": "A",
    "option_text": "Ildiz va poya"
  },
  {
    "id": 108042,
    "question_id": 10804,
    "option_label": "B",
    "option_text": "Gul, meva, urug‘"
  },
  {
    "id": 108043,
    "question_id": 10804,
    "option_label": "C",
    "option_text": "Barg va kurtak"
  },
  {
    "id": 108044,
    "question_id": 10804,
    "option_label": "D",
    "option_text": "To‘qima va hujayra"
  },
  {
    "id": 108051,
    "question_id": 10805,
    "option_label": "A",
    "option_text": "Konsument"
  },
  {
    "id": 108052,
    "question_id": 10805,
    "option_label": "B",
    "option_text": "Produtsent"
  },
  {
    "id": 108053,
    "question_id": 10805,
    "option_label": "C",
    "option_text": "Redutsent"
  },
  {
    "id": 108054,
    "question_id": 10805,
    "option_label": "D",
    "option_text": "Parchalovchi"
  },
  {
    "id": 108061,
    "question_id": 10806,
    "option_label": "A",
    "option_text": "Lui Paster"
  },
  {
    "id": 108062,
    "question_id": 10806,
    "option_label": "B",
    "option_text": "Karl Linney"
  },
  {
    "id": 108063,
    "question_id": 10806,
    "option_label": "C",
    "option_text": "Abu Rayhon Beruniy"
  },
  {
    "id": 108064,
    "question_id": 10806,
    "option_label": "D",
    "option_text": "O‘ktam Pratov"
  },
  {
    "id": 108071,
    "question_id": 10807,
    "option_label": "A",
    "option_text": "Dunyo"
  },
  {
    "id": 108072,
    "question_id": 10807,
    "option_label": "B",
    "option_text": "Tur"
  },
  {
    "id": 108073,
    "question_id": 10807,
    "option_label": "C",
    "option_text": "Oila"
  },
  {
    "id": 108074,
    "question_id": 10807,
    "option_label": "D",
    "option_text": "Bo‘lim"
  },
  {
    "id": 108081,
    "question_id": 10808,
    "option_label": "A",
    "option_text": "Bitta turga"
  },
  {
    "id": 108082,
    "question_id": 10808,
    "option_label": "B",
    "option_text": "Har xil oilaga"
  },
  {
    "id": 108083,
    "question_id": 10808,
    "option_label": "C",
    "option_text": "Turli bo‘limga"
  },
  {
    "id": 108084,
    "question_id": 10808,
    "option_label": "D",
    "option_text": "Dunyoga"
  },
  {
    "id": 108091,
    "question_id": 10809,
    "option_label": "A",
    "option_text": "Tur -> Turkum -> Oila -> Sinf -> Bo‘lim -> Dunyo"
  },
  {
    "id": 108092,
    "question_id": 10809,
    "option_label": "B",
    "option_text": "Dunyo -> Tur -> Oila"
  },
  {
    "id": 108093,
    "question_id": 10809,
    "option_label": "C",
    "option_text": "Oila -> Sinf -> Tur"
  },
  {
    "id": 108094,
    "question_id": 10809,
    "option_label": "D",
    "option_text": "Bo‘lim -> Oila -> Sinf"
  },
  {
    "id": 108101,
    "question_id": 10810,
    "option_label": "A",
    "option_text": "Qoqio‘tdoshlar"
  },
  {
    "id": 108102,
    "question_id": 10810,
    "option_label": "B",
    "option_text": "Bug‘doydoshlar"
  },
  {
    "id": 108103,
    "question_id": 10810,
    "option_label": "C",
    "option_text": "Ra’nodoshlar"
  },
  {
    "id": 108104,
    "question_id": 10810,
    "option_label": "D",
    "option_text": "Loladoshlar"
  },
  {
    "id": 108111,
    "question_id": 10811,
    "option_label": "A",
    "option_text": "Ikki urug‘pallalilar"
  },
  {
    "id": 108112,
    "question_id": 10811,
    "option_label": "B",
    "option_text": "Bir urug‘pallalilar"
  },
  {
    "id": 108113,
    "question_id": 10811,
    "option_label": "C",
    "option_text": "Suvo‘tlar"
  },
  {
    "id": 108114,
    "question_id": 10811,
    "option_label": "D",
    "option_text": "Yo‘sinlar"
  },
  {
    "id": 108121,
    "question_id": 10812,
    "option_label": "A",
    "option_text": "Yuksak"
  },
  {
    "id": 108122,
    "question_id": 10812,
    "option_label": "B",
    "option_text": "Tuban (tallomli)"
  },
  {
    "id": 108123,
    "question_id": 10812,
    "option_label": "C",
    "option_text": "Sporali"
  },
  {
    "id": 108124,
    "question_id": 10812,
    "option_label": "D",
    "option_text": "Urug‘li"
  },
  {
    "id": 108131,
    "question_id": 10813,
    "option_label": "A",
    "option_text": "Ildizpoya"
  },
  {
    "id": 108132,
    "question_id": 10813,
    "option_label": "B",
    "option_text": "Tallom yoki qattana"
  },
  {
    "id": 108133,
    "question_id": 10813,
    "option_label": "C",
    "option_text": "Sorus"
  },
  {
    "id": 108134,
    "question_id": 10813,
    "option_label": "D",
    "option_text": "Qubba"
  },
  {
    "id": 108141,
    "question_id": 10814,
    "option_label": "A",
    "option_text": "Yo‘sinlar"
  },
  {
    "id": 108142,
    "question_id": 10814,
    "option_label": "B",
    "option_text": "Suvo‘tlar"
  },
  {
    "id": 108143,
    "question_id": 10814,
    "option_label": "C",
    "option_text": "Qirqquloqlar"
  },
  {
    "id": 108144,
    "question_id": 10814,
    "option_label": "D",
    "option_text": "Archa"
  },
  {
    "id": 108151,
    "question_id": 10815,
    "option_label": "A",
    "option_text": "Faqat gulli"
  },
  {
    "id": 108152,
    "question_id": 10815,
    "option_label": "B",
    "option_text": "Sporali va urug‘li"
  },
  {
    "id": 108153,
    "question_id": 10815,
    "option_label": "C",
    "option_text": "Faqat daraxtlar"
  },
  {
    "id": 108154,
    "question_id": 10815,
    "option_label": "D",
    "option_text": "Suvo‘tlar va zamburug‘lar"
  },
  {
    "id": 108161,
    "question_id": 10816,
    "option_label": "A",
    "option_text": "Yo‘sin, qirqbo‘g‘im, qirqquloq"
  },
  {
    "id": 108162,
    "question_id": 10816,
    "option_label": "B",
    "option_text": "Archa, qarag‘ay"
  },
  {
    "id": 108163,
    "question_id": 10816,
    "option_label": "C",
    "option_text": "Olma, o‘rik"
  },
  {
    "id": 108164,
    "question_id": 10816,
    "option_label": "D",
    "option_text": "Suvo‘tlar"
  },
  {
    "id": 108171,
    "question_id": 10817,
    "option_label": "A",
    "option_text": "Ochiq urug‘lilar va yopiq urug‘lilar"
  },
  {
    "id": 108172,
    "question_id": 10817,
    "option_label": "B",
    "option_text": "Suvo‘tlar va yo‘sinlar"
  },
  {
    "id": 108173,
    "question_id": 10817,
    "option_label": "C",
    "option_text": "Bir va ikki yilliklar"
  },
  {
    "id": 108174,
    "question_id": 10817,
    "option_label": "D",
    "option_text": "Madaniy va yovvoyi"
  },
  {
    "id": 108181,
    "question_id": 10818,
    "option_label": "A",
    "option_text": "Sporali"
  },
  {
    "id": 108182,
    "question_id": 10818,
    "option_label": "B",
    "option_text": "Gulli o‘simliklar"
  },
  {
    "id": 108183,
    "question_id": 10818,
    "option_label": "C",
    "option_text": "Tuban o‘simliklar"
  },
  {
    "id": 108184,
    "question_id": 10818,
    "option_label": "D",
    "option_text": "Tallomlilar"
  },
  {
    "id": 108191,
    "question_id": 10819,
    "option_label": "A",
    "option_text": "Nafas olib"
  },
  {
    "id": 108192,
    "question_id": 10819,
    "option_label": "B",
    "option_text": "Suv bug‘latish (transpiratsiya) orqali"
  },
  {
    "id": 108193,
    "question_id": 10819,
    "option_label": "C",
    "option_text": "Ildiz otib"
  },
  {
    "id": 108194,
    "question_id": 10819,
    "option_label": "D",
    "option_text": "Gullab"
  },
  {
    "id": 108201,
    "question_id": 10820,
    "option_label": "A",
    "option_text": "Ochiq urug‘lilar"
  },
  {
    "id": 108202,
    "question_id": 10820,
    "option_label": "B",
    "option_text": "Yopiq urug‘lilar"
  },
  {
    "id": 108203,
    "question_id": 10820,
    "option_label": "C",
    "option_text": "Sporali o‘simliklar"
  },
  {
    "id": 108204,
    "question_id": 10820,
    "option_label": "D",
    "option_text": "Tuban o‘simliklar"
  },
  {
    "id": 109011,
    "question_id": 10901,
    "option_label": "A",
    "option_text": "Yuksak"
  },
  {
    "id": 109012,
    "question_id": 10901,
    "option_label": "B",
    "option_text": "Tuban (tallomli)"
  },
  {
    "id": 109013,
    "question_id": 10901,
    "option_label": "C",
    "option_text": "Gulli"
  },
  {
    "id": 109014,
    "question_id": 10901,
    "option_label": "D",
    "option_text": "Sporali"
  },
  {
    "id": 109021,
    "question_id": 10902,
    "option_label": "A",
    "option_text": "Yadro"
  },
  {
    "id": 109022,
    "question_id": 10902,
    "option_label": "B",
    "option_text": "Vakuola"
  },
  {
    "id": 109023,
    "question_id": 10902,
    "option_label": "C",
    "option_text": "Xromatofor"
  },
  {
    "id": 109024,
    "question_id": 10902,
    "option_label": "D",
    "option_text": "Sitoplazma"
  },
  {
    "id": 109031,
    "question_id": 10903,
    "option_label": "A",
    "option_text": "Xlamidomonada"
  },
  {
    "id": 109032,
    "question_id": 10903,
    "option_label": "B",
    "option_text": "Xlorella"
  },
  {
    "id": 109033,
    "question_id": 10903,
    "option_label": "C",
    "option_text": "Ulotriks"
  },
  {
    "id": 109034,
    "question_id": 10903,
    "option_label": "D",
    "option_text": "Spirogira"
  },
  {
    "id": 109041,
    "question_id": 10904,
    "option_label": "A",
    "option_text": "Xlorella"
  },
  {
    "id": 109042,
    "question_id": 10904,
    "option_label": "B",
    "option_text": "Xlamidomonada"
  },
  {
    "id": 109043,
    "question_id": 10904,
    "option_label": "C",
    "option_text": "Porfira"
  },
  {
    "id": 109044,
    "question_id": 10904,
    "option_label": "D",
    "option_text": "Laminariya"
  },
  {
    "id": 109051,
    "question_id": 10905,
    "option_label": "A",
    "option_text": "Xivchin"
  },
  {
    "id": 109052,
    "question_id": 10905,
    "option_label": "B",
    "option_text": "Qizil ko‘zcha"
  },
  {
    "id": 109053,
    "question_id": 10905,
    "option_label": "C",
    "option_text": "Xromatofor"
  },
  {
    "id": 109054,
    "question_id": 10905,
    "option_label": "D",
    "option_text": "Yadro"
  },
  {
    "id": 109061,
    "question_id": 10906,
    "option_label": "A",
    "option_text": "Ulotriks"
  },
  {
    "id": 109062,
    "question_id": 10906,
    "option_label": "B",
    "option_text": "Spirogira"
  },
  {
    "id": 109063,
    "question_id": 10906,
    "option_label": "C",
    "option_text": "Porfira"
  },
  {
    "id": 109064,
    "question_id": 10906,
    "option_label": "D",
    "option_text": "Xlorella"
  },
  {
    "id": 109071,
    "question_id": 10907,
    "option_label": "A",
    "option_text": "Ildizpoya"
  },
  {
    "id": 109072,
    "question_id": 10907,
    "option_label": "B",
    "option_text": "Rizoid"
  },
  {
    "id": 109073,
    "question_id": 10907,
    "option_label": "C",
    "option_text": "Tallom"
  },
  {
    "id": 109074,
    "question_id": 10907,
    "option_label": "D",
    "option_text": "Sorus"
  },
  {
    "id": 109081,
    "question_id": 10908,
    "option_label": "A",
    "option_text": "Ikki"
  },
  {
    "id": 109082,
    "question_id": 10908,
    "option_label": "B",
    "option_text": "To‘rt"
  },
  {
    "id": 109083,
    "question_id": 10908,
    "option_label": "C",
    "option_text": "Bir"
  },
  {
    "id": 109084,
    "question_id": 10908,
    "option_label": "D",
    "option_text": "Sakkiz"
  },
  {
    "id": 109091,
    "question_id": 10909,
    "option_label": "A",
    "option_text": "Zoospora"
  },
  {
    "id": 109092,
    "question_id": 10909,
    "option_label": "B",
    "option_text": "Izogametalar"
  },
  {
    "id": 109093,
    "question_id": 10909,
    "option_label": "C",
    "option_text": "Zigota"
  },
  {
    "id": 109094,
    "question_id": 10909,
    "option_label": "D",
    "option_text": "Spora"
  },
  {
    "id": 109101,
    "question_id": 10910,
    "option_label": "A",
    "option_text": "Ulotriks"
  },
  {
    "id": 109102,
    "question_id": 10910,
    "option_label": "B",
    "option_text": "Spirogira"
  },
  {
    "id": 109103,
    "question_id": 10910,
    "option_label": "C",
    "option_text": "Laminariya"
  },
  {
    "id": 109104,
    "question_id": 10910,
    "option_label": "D",
    "option_text": "Porfira"
  },
  {
    "id": 109111,
    "question_id": 10911,
    "option_label": "A",
    "option_text": "Belbog‘simon"
  },
  {
    "id": 109112,
    "question_id": 10911,
    "option_label": "B",
    "option_text": "Spiralsimon buralgan"
  },
  {
    "id": 109113,
    "question_id": 10911,
    "option_label": "C",
    "option_text": "Kosachasimon"
  },
  {
    "id": 109114,
    "question_id": 10911,
    "option_label": "D",
    "option_text": "Sharsimon"
  },
  {
    "id": 109121,
    "question_id": 10912,
    "option_label": "A",
    "option_text": "Laminariya"
  },
  {
    "id": 109122,
    "question_id": 10912,
    "option_label": "B",
    "option_text": "Porfira"
  },
  {
    "id": 109123,
    "question_id": 10912,
    "option_label": "C",
    "option_text": "Spirogira"
  },
  {
    "id": 109124,
    "question_id": 10912,
    "option_label": "D",
    "option_text": "Xlorella"
  },
  {
    "id": 109131,
    "question_id": 10913,
    "option_label": "A",
    "option_text": "Xlorofill"
  },
  {
    "id": 109132,
    "question_id": 10913,
    "option_label": "B",
    "option_text": "Antotsian"
  },
  {
    "id": 109133,
    "question_id": 10913,
    "option_label": "C",
    "option_text": "Karotin"
  },
  {
    "id": 109134,
    "question_id": 10913,
    "option_label": "D",
    "option_text": "Leykoplast"
  },
  {
    "id": 109141,
    "question_id": 10914,
    "option_label": "A",
    "option_text": "Porfira"
  },
  {
    "id": 109142,
    "question_id": 10914,
    "option_label": "B",
    "option_text": "Laminariya"
  },
  {
    "id": 109143,
    "question_id": 10914,
    "option_label": "C",
    "option_text": "Ulotriks"
  },
  {
    "id": 109144,
    "question_id": 10914,
    "option_label": "D",
    "option_text": "Xlamidomonada"
  },
  {
    "id": 109151,
    "question_id": 10915,
    "option_label": "A",
    "option_text": "Temir"
  },
  {
    "id": 109152,
    "question_id": 10915,
    "option_label": "B",
    "option_text": "Yod"
  },
  {
    "id": 109153,
    "question_id": 10915,
    "option_label": "C",
    "option_text": "Kalsiy"
  },
  {
    "id": 109154,
    "question_id": 10915,
    "option_label": "D",
    "option_text": "Magniy"
  },
  {
    "id": 109161,
    "question_id": 10916,
    "option_label": "A",
    "option_text": "Chorva mollari uchun ozuqa sifatida"
  },
  {
    "id": 109162,
    "question_id": 10916,
    "option_label": "B",
    "option_text": "Qurilishda"
  },
  {
    "id": 109163,
    "question_id": 10916,
    "option_label": "C",
    "option_text": "Qog‘oz olishda"
  },
  {
    "id": 109164,
    "question_id": 10916,
    "option_label": "D",
    "option_text": "Yoqilg‘i sifatida"
  },
  {
    "id": 109171,
    "question_id": 10917,
    "option_label": "A",
    "option_text": "Xlamidomonada"
  },
  {
    "id": 109172,
    "question_id": 10917,
    "option_label": "B",
    "option_text": "Spirogira"
  },
  {
    "id": 109173,
    "question_id": 10917,
    "option_label": "C",
    "option_text": "Porfira"
  },
  {
    "id": 109174,
    "question_id": 10917,
    "option_label": "D",
    "option_text": "Ulotriks"
  },
  {
    "id": 109181,
    "question_id": 10918,
    "option_label": "A",
    "option_text": "Ildizli tana"
  },
  {
    "id": 109182,
    "question_id": 10918,
    "option_label": "B",
    "option_text": "Organlarga bo‘linmagan tana"
  },
  {
    "id": 109183,
    "question_id": 10918,
    "option_label": "C",
    "option_text": "Gulli tana"
  },
  {
    "id": 109184,
    "question_id": 10918,
    "option_label": "D",
    "option_text": "Yashil hujayra"
  },
  {
    "id": 109191,
    "question_id": 10919,
    "option_label": "A",
    "option_text": "Azot"
  },
  {
    "id": 109192,
    "question_id": 10919,
    "option_label": "B",
    "option_text": "Kislorod"
  },
  {
    "id": 109193,
    "question_id": 10919,
    "option_label": "C",
    "option_text": "Vodorod"
  },
  {
    "id": 109194,
    "question_id": 10919,
    "option_label": "D",
    "option_text": "Karbonat angidrid"
  },
  {
    "id": 109201,
    "question_id": 10920,
    "option_label": "A",
    "option_text": "Zoospora bilan"
  },
  {
    "id": 109202,
    "question_id": 10920,
    "option_label": "B",
    "option_text": "Tallomining bo‘laklarga bo‘linishi bilan"
  },
  {
    "id": 109203,
    "question_id": 10920,
    "option_label": "C",
    "option_text": "Urug‘ bilan"
  },
  {
    "id": 109204,
    "question_id": 10920,
    "option_label": "D",
    "option_text": "Meva orqali"
  },
  {
    "id": 110011,
    "question_id": 11001,
    "option_label": "A",
    "option_text": "Faqat poya"
  },
  {
    "id": 110012,
    "question_id": 11001,
    "option_label": "B",
    "option_text": "Faqat barg"
  },
  {
    "id": 110013,
    "question_id": 11001,
    "option_label": "C",
    "option_text": "Ildiz, poya va barg"
  },
  {
    "id": 110014,
    "question_id": 11001,
    "option_label": "D",
    "option_text": "Faqat tallom"
  },
  {
    "id": 110021,
    "question_id": 11002,
    "option_label": "A",
    "option_text": "Archa, qarag‘ay"
  },
  {
    "id": 110022,
    "question_id": 11002,
    "option_label": "B",
    "option_text": "Yo‘sin, qirqbo‘g‘im, qirqquloq"
  },
  {
    "id": 110023,
    "question_id": 11002,
    "option_label": "C",
    "option_text": "Olma, o‘rik"
  },
  {
    "id": 110024,
    "question_id": 11002,
    "option_label": "D",
    "option_text": "Suvo‘tlar"
  },
  {
    "id": 110031,
    "question_id": 11003,
    "option_label": "A",
    "option_text": "Funariya yo‘sini"
  },
  {
    "id": 110032,
    "question_id": 11003,
    "option_label": "B",
    "option_text": "Dala qirqbo‘g‘imi"
  },
  {
    "id": 110033,
    "question_id": 11003,
    "option_label": "C",
    "option_text": "Erkak qirqquloq"
  },
  {
    "id": 110034,
    "question_id": 11003,
    "option_label": "D",
    "option_text": "Suv qaroqchisi"
  },
  {
    "id": 110041,
    "question_id": 11004,
    "option_label": "A",
    "option_text": "Qubbada"
  },
  {
    "id": 110042,
    "question_id": 11004,
    "option_label": "B",
    "option_text": "Sorusda"
  },
  {
    "id": 110043,
    "question_id": 11004,
    "option_label": "C",
    "option_text": "Ko‘sakchalarda"
  },
  {
    "id": 110044,
    "question_id": 11004,
    "option_label": "D",
    "option_text": "Boshoqda"
  },
  {
    "id": 110051,
    "question_id": 11005,
    "option_label": "A",
    "option_text": "Funariya"
  },
  {
    "id": 110052,
    "question_id": 11005,
    "option_label": "B",
    "option_text": "Dala qirqbo‘g‘imi"
  },
  {
    "id": 110053,
    "question_id": 11005,
    "option_label": "C",
    "option_text": "Erkak qirqquloq"
  },
  {
    "id": 110054,
    "question_id": 11005,
    "option_label": "D",
    "option_text": "Archa"
  },
  {
    "id": 110061,
    "question_id": 11006,
    "option_label": "A",
    "option_text": "Bahorgi qo‘ng‘ir"
  },
  {
    "id": 110062,
    "question_id": 11006,
    "option_label": "B",
    "option_text": "Yozgi yashil"
  },
  {
    "id": 110063,
    "question_id": 11006,
    "option_label": "C",
    "option_text": "Ikkala poyasi ham"
  },
  {
    "id": 110064,
    "question_id": 11006,
    "option_label": "D",
    "option_text": "Hech biri"
  },
  {
    "id": 110071,
    "question_id": 11007,
    "option_label": "A",
    "option_text": "Rizoid"
  },
  {
    "id": 110072,
    "question_id": 11007,
    "option_label": "B",
    "option_text": "Sorus"
  },
  {
    "id": 110073,
    "question_id": 11007,
    "option_label": "C",
    "option_text": "Qubba"
  },
  {
    "id": 110074,
    "question_id": 11007,
    "option_label": "D",
    "option_text": "Ko‘sakcha"
  },
  {
    "id": 110081,
    "question_id": 11008,
    "option_label": "A",
    "option_text": "Yo‘sinlar"
  },
  {
    "id": 110082,
    "question_id": 11008,
    "option_label": "B",
    "option_text": "Suvo‘tlar"
  },
  {
    "id": 110083,
    "question_id": 11008,
    "option_label": "C",
    "option_text": "Daraxtsimon qirqquloqlar"
  },
  {
    "id": 110084,
    "question_id": 11008,
    "option_label": "D",
    "option_text": "Archalar"
  },
  {
    "id": 110091,
    "question_id": 11009,
    "option_label": "A",
    "option_text": "Yo‘sin"
  },
  {
    "id": 110092,
    "question_id": 11009,
    "option_label": "B",
    "option_text": "Qirqquloq"
  },
  {
    "id": 110093,
    "question_id": 11009,
    "option_label": "C",
    "option_text": "Qarag‘ay"
  },
  {
    "id": 110094,
    "question_id": 11009,
    "option_label": "D",
    "option_text": "Terak"
  },
  {
    "id": 110101,
    "question_id": 11010,
    "option_label": "A",
    "option_text": "Yopiq urug‘lilar"
  },
  {
    "id": 110102,
    "question_id": 11010,
    "option_label": "B",
    "option_text": "Ochiq urug‘lilar"
  },
  {
    "id": 110103,
    "question_id": 11010,
    "option_label": "C",
    "option_text": "Sporali o‘simliklar"
  },
  {
    "id": 110104,
    "question_id": 11010,
    "option_label": "D",
    "option_text": "Tuban o‘simliklar"
  },
  {
    "id": 110111,
    "question_id": 11011,
    "option_label": "A",
    "option_text": "Sut"
  },
  {
    "id": 110112,
    "question_id": 11011,
    "option_label": "B",
    "option_text": "Smola"
  },
  {
    "id": 110113,
    "question_id": 11011,
    "option_label": "C",
    "option_text": "Suv"
  },
  {
    "id": 110114,
    "question_id": 11011,
    "option_label": "D",
    "option_text": "Shira"
  },
  {
    "id": 110121,
    "question_id": 11012,
    "option_label": "A",
    "option_text": "Olmos"
  },
  {
    "id": 110122,
    "question_id": 11012,
    "option_label": "B",
    "option_text": "Kahrabo toshi"
  },
  {
    "id": 110123,
    "question_id": 11012,
    "option_label": "C",
    "option_text": "Toshko‘mir"
  },
  {
    "id": 110124,
    "question_id": 11012,
    "option_label": "D",
    "option_text": "Ohaktosh"
  },
  {
    "id": 110131,
    "question_id": 11013,
    "option_label": "A",
    "option_text": "Qarag‘ay"
  },
  {
    "id": 110132,
    "question_id": 11013,
    "option_label": "B",
    "option_text": "Archa"
  },
  {
    "id": 110133,
    "question_id": 11013,
    "option_label": "C",
    "option_text": "Terak"
  },
  {
    "id": 110134,
    "question_id": 11013,
    "option_label": "D",
    "option_text": "O‘rik"
  },
  {
    "id": 110141,
    "question_id": 11014,
    "option_label": "A",
    "option_text": "Gormon"
  },
  {
    "id": 110142,
    "question_id": 11014,
    "option_label": "B",
    "option_text": "Fitonsid"
  },
  {
    "id": 110143,
    "question_id": 11014,
    "option_label": "C",
    "option_text": "Vitamin"
  },
  {
    "id": 110144,
    "question_id": 11014,
    "option_label": "D",
    "option_text": "Shakar"
  },
  {
    "id": 110151,
    "question_id": 11015,
    "option_label": "A",
    "option_text": "Shamol"
  },
  {
    "id": 110152,
    "question_id": 11015,
    "option_label": "B",
    "option_text": "Chang"
  },
  {
    "id": 110153,
    "question_id": 11015,
    "option_label": "C",
    "option_text": "Suv"
  },
  {
    "id": 110154,
    "question_id": 11015,
    "option_label": "D",
    "option_text": "Havo"
  },
  {
    "id": 110161,
    "question_id": 11016,
    "option_label": "A",
    "option_text": "Ochiq urug‘lilar"
  },
  {
    "id": 110162,
    "question_id": 11016,
    "option_label": "B",
    "option_text": "Yopiq urug‘lilar (Gulli)"
  },
  {
    "id": 110163,
    "question_id": 11016,
    "option_label": "C",
    "option_text": "Sporali"
  },
  {
    "id": 110164,
    "question_id": 11016,
    "option_label": "D",
    "option_text": "Tallomli"
  },
  {
    "id": 110171,
    "question_id": 11017,
    "option_label": "A",
    "option_text": "O‘rik"
  },
  {
    "id": 110172,
    "question_id": 11017,
    "option_label": "B",
    "option_text": "Olma"
  },
  {
    "id": 110173,
    "question_id": 11017,
    "option_label": "C",
    "option_text": "Behi"
  },
  {
    "id": 110174,
    "question_id": 11017,
    "option_label": "D",
    "option_text": "Anor"
  },
  {
    "id": 110181,
    "question_id": 11018,
    "option_label": "A",
    "option_text": "Archa"
  },
  {
    "id": 110182,
    "question_id": 11018,
    "option_label": "B",
    "option_text": "Terak"
  },
  {
    "id": 110183,
    "question_id": 11018,
    "option_label": "C",
    "option_text": "Qarag‘ay"
  },
  {
    "id": 110184,
    "question_id": 11018,
    "option_label": "D",
    "option_text": "O‘rik"
  },
  {
    "id": 110191,
    "question_id": 11019,
    "option_label": "A",
    "option_text": "Allergiya"
  },
  {
    "id": 110192,
    "question_id": 11019,
    "option_label": "B",
    "option_text": "Yo‘tal"
  },
  {
    "id": 110193,
    "question_id": 11019,
    "option_label": "C",
    "option_text": "Uyquchanlik"
  },
  {
    "id": 110194,
    "question_id": 11019,
    "option_label": "D",
    "option_text": "Ishtahasizlik"
  },
  {
    "id": 110201,
    "question_id": 11020,
    "option_label": "A",
    "option_text": "Dovuchcha"
  },
  {
    "id": 110202,
    "question_id": 11020,
    "option_label": "B",
    "option_text": "Turshak"
  },
  {
    "id": 110203,
    "question_id": 11020,
    "option_label": "C",
    "option_text": "Mag‘iz"
  },
  {
    "id": 110204,
    "question_id": 11020,
    "option_label": "D",
    "option_text": "Soki"
  },
  {
    "id": 111011,
    "question_id": 11101,
    "option_label": "A",
    "option_text": "Isiriq"
  },
  {
    "id": 111012,
    "question_id": 11101,
    "option_label": "B",
    "option_text": "Yalpiz"
  },
  {
    "id": 111013,
    "question_id": 11101,
    "option_label": "C",
    "option_text": "Shirinmiya"
  },
  {
    "id": 111014,
    "question_id": 11101,
    "option_label": "D",
    "option_text": "Aloe"
  },
  {
    "id": 111021,
    "question_id": 11102,
    "option_label": "A",
    "option_text": "Yalpiz"
  },
  {
    "id": 111022,
    "question_id": 11102,
    "option_label": "B",
    "option_text": "Na’matak"
  },
  {
    "id": 111023,
    "question_id": 11102,
    "option_label": "C",
    "option_text": "Bangidevona"
  },
  {
    "id": 111024,
    "question_id": 11102,
    "option_label": "D",
    "option_text": "Tok"
  },
  {
    "id": 111031,
    "question_id": 11103,
    "option_label": "A",
    "option_text": "Shirinmiya"
  },
  {
    "id": 111032,
    "question_id": 11103,
    "option_label": "B",
    "option_text": "Isiriq"
  },
  {
    "id": 111033,
    "question_id": 11103,
    "option_label": "C",
    "option_text": "Ayiqtovon"
  },
  {
    "id": 111034,
    "question_id": 11103,
    "option_label": "D",
    "option_text": "Kanakunjut"
  },
  {
    "id": 111041,
    "question_id": 11104,
    "option_label": "A",
    "option_text": "Yalpiz"
  },
  {
    "id": 111042,
    "question_id": 11104,
    "option_label": "B",
    "option_text": "Isiriq"
  },
  {
    "id": 111043,
    "question_id": 11104,
    "option_label": "C",
    "option_text": "Shirinmiya (Qizilmiya)"
  },
  {
    "id": 111044,
    "question_id": 11104,
    "option_label": "D",
    "option_text": "Safsan xurmosi"
  },
  {
    "id": 111051,
    "question_id": 11105,
    "option_label": "A",
    "option_text": "Aloe"
  },
  {
    "id": 111052,
    "question_id": 11105,
    "option_label": "B",
    "option_text": "Kanakunjut"
  },
  {
    "id": 111053,
    "question_id": 11105,
    "option_label": "C",
    "option_text": "Mingdevona"
  },
  {
    "id": 111054,
    "question_id": 11105,
    "option_label": "D",
    "option_text": "Tok"
  },
  {
    "id": 111061,
    "question_id": 11106,
    "option_label": "A",
    "option_text": "Bangidevona"
  },
  {
    "id": 111062,
    "question_id": 11106,
    "option_label": "B",
    "option_text": "Kanakunjut"
  },
  {
    "id": 111063,
    "question_id": 11106,
    "option_label": "C",
    "option_text": "Isiriq"
  },
  {
    "id": 111064,
    "question_id": 11106,
    "option_label": "D",
    "option_text": "Yalpiz"
  },
  {
    "id": 111071,
    "question_id": 11107,
    "option_label": "A",
    "option_text": "Yo‘talga"
  },
  {
    "id": 111072,
    "question_id": 11107,
    "option_label": "B",
    "option_text": "Soch va kipriklarni mustahkamlashga"
  },
  {
    "id": 111073,
    "question_id": 11107,
    "option_label": "C",
    "option_text": "Immunitetga"
  },
  {
    "id": 111074,
    "question_id": 11107,
    "option_label": "D",
    "option_text": "Ko‘zga"
  },
  {
    "id": 111081,
    "question_id": 11108,
    "option_label": "A",
    "option_text": "Mingdevona"
  },
  {
    "id": 111082,
    "question_id": 11108,
    "option_label": "B",
    "option_text": "Bangidevona"
  },
  {
    "id": 111083,
    "question_id": 11108,
    "option_label": "C",
    "option_text": "Ayiqtovon"
  },
  {
    "id": 111084,
    "question_id": 11108,
    "option_label": "D",
    "option_text": "Isiriq"
  },
  {
    "id": 111091,
    "question_id": 11109,
    "option_label": "A",
    "option_text": "Ovqat hazm qilish"
  },
  {
    "id": 111092,
    "question_id": 11109,
    "option_label": "B",
    "option_text": "Asab tizimiga"
  },
  {
    "id": 111093,
    "question_id": 11109,
    "option_label": "C",
    "option_text": "Qon aylanish"
  },
  {
    "id": 111094,
    "question_id": 11109,
    "option_label": "D",
    "option_text": "Limfaga"
  },
  {
    "id": 111101,
    "question_id": 11110,
    "option_label": "A",
    "option_text": "Mingdevona"
  },
  {
    "id": 111102,
    "question_id": 11110,
    "option_label": "B",
    "option_text": "Bangidevona"
  },
  {
    "id": 111103,
    "question_id": 11110,
    "option_label": "C",
    "option_text": "Yovvoyi tok"
  },
  {
    "id": 111104,
    "question_id": 11110,
    "option_label": "D",
    "option_text": "Na’matak"
  },
  {
    "id": 111111,
    "question_id": 11111,
    "option_label": "A",
    "option_text": "Mingdevona"
  },
  {
    "id": 111112,
    "question_id": 11111,
    "option_label": "B",
    "option_text": "Zaharli ayiqtovon"
  },
  {
    "id": 111113,
    "question_id": 11111,
    "option_label": "C",
    "option_text": "Kanakunjut"
  },
  {
    "id": 111114,
    "question_id": 11111,
    "option_label": "D",
    "option_text": "Shirinmiya"
  },
  {
    "id": 111121,
    "question_id": 11112,
    "option_label": "A",
    "option_text": "1983"
  },
  {
    "id": 111122,
    "question_id": 11112,
    "option_label": "B",
    "option_text": "1979"
  },
  {
    "id": 111123,
    "question_id": 11112,
    "option_label": "C",
    "option_text": "1984"
  },
  {
    "id": 111124,
    "question_id": 11112,
    "option_label": "D",
    "option_text": "2000"
  },
  {
    "id": 111131,
    "question_id": 11113,
    "option_label": "A",
    "option_text": "Umurtqasizlar"
  },
  {
    "id": 111132,
    "question_id": 11113,
    "option_label": "B",
    "option_text": "Umurtqali hayvonlar"
  },
  {
    "id": 111133,
    "question_id": 11113,
    "option_label": "C",
    "option_text": "Hasharotlar"
  },
  {
    "id": 111134,
    "question_id": 11113,
    "option_label": "D",
    "option_text": "Faqat qushlar"
  },
  {
    "id": 111141,
    "question_id": 11114,
    "option_label": "A",
    "option_text": "Safsan xurmosi"
  },
  {
    "id": 111142,
    "question_id": 11114,
    "option_label": "B",
    "option_text": "Yovvoyi tok"
  },
  {
    "id": 111143,
    "question_id": 11114,
    "option_label": "C",
    "option_text": "Xolmon isirg‘aguli"
  },
  {
    "id": 111144,
    "question_id": 11114,
    "option_label": "D",
    "option_text": "Archa"
  },
  {
    "id": 111151,
    "question_id": 11115,
    "option_label": "A",
    "option_text": "Xolmon isirg‘aguli"
  },
  {
    "id": 111152,
    "question_id": 11115,
    "option_label": "B",
    "option_text": "Yovvoyi tok"
  },
  {
    "id": 111153,
    "question_id": 11115,
    "option_label": "C",
    "option_text": "Na’matak"
  },
  {
    "id": 111154,
    "question_id": 11115,
    "option_label": "D",
    "option_text": "Safsan xurmosi"
  },
  {
    "id": 111161,
    "question_id": 11116,
    "option_label": "A",
    "option_text": "O‘rik"
  },
  {
    "id": 111162,
    "question_id": 11116,
    "option_label": "B",
    "option_text": "Safsan xurmosi"
  },
  {
    "id": 111163,
    "question_id": 11116,
    "option_label": "C",
    "option_text": "Terak"
  },
  {
    "id": 111164,
    "question_id": 11116,
    "option_label": "D",
    "option_text": "Qarag‘ay"
  },
  {
    "id": 111171,
    "question_id": 11117,
    "option_label": "A",
    "option_text": "Yo‘rg‘a tuvaloq"
  },
  {
    "id": 111172,
    "question_id": 11117,
    "option_label": "B",
    "option_text": "Buxoro bug‘usi"
  },
  {
    "id": 111173,
    "question_id": 11117,
    "option_label": "C",
    "option_text": "Ilvirs"
  },
  {
    "id": 111174,
    "question_id": 11117,
    "option_label": "D",
    "option_text": "Qo‘ng‘ir ayiq"
  },
  {
    "id": 111181,
    "question_id": 11118,
    "option_label": "A",
    "option_text": "Burgut"
  },
  {
    "id": 111182,
    "question_id": 11118,
    "option_label": "B",
    "option_text": "Yo‘rg‘a tuvaloq"
  },
  {
    "id": 111183,
    "question_id": 11118,
    "option_label": "C",
    "option_text": "Kaptar"
  },
  {
    "id": 111184,
    "question_id": 11118,
    "option_label": "D",
    "option_text": "Tovus"
  },
  {
    "id": 111191,
    "question_id": 11119,
    "option_label": "A",
    "option_text": "Ko‘p suyuqlik ichirib qustirish"
  },
  {
    "id": 111192,
    "question_id": 11119,
    "option_label": "B",
    "option_text": "Faqat uxlash"
  },
  {
    "id": 111193,
    "question_id": 11119,
    "option_label": "C",
    "option_text": "Issiq choy ichirish"
  },
  {
    "id": 111194,
    "question_id": 11119,
    "option_label": "D",
    "option_text": "Sport bilan shug‘ullanish"
  },
  {
    "id": 111201,
    "question_id": 11120,
    "option_label": "A",
    "option_text": "Piyolada"
  },
  {
    "id": 111202,
    "question_id": 11120,
    "option_label": "B",
    "option_text": "Termosda"
  },
  {
    "id": 111203,
    "question_id": 11120,
    "option_label": "C",
    "option_text": "Qozonda"
  },
  {
    "id": 111204,
    "question_id": 11120,
    "option_label": "D",
    "option_text": "Ochiq idishda"
  },
  {
    "id": 112011,
    "question_id": 11201,
    "option_label": "A",
    "option_text": "Avtotrof"
  },
  {
    "id": 112012,
    "question_id": 11201,
    "option_label": "B",
    "option_text": "Geterotrof"
  },
  {
    "id": 112013,
    "question_id": 11201,
    "option_label": "C",
    "option_text": "Produtsent"
  },
  {
    "id": 112014,
    "question_id": 11201,
    "option_label": "D",
    "option_text": "O‘simlik"
  },
  {
    "id": 112021,
    "question_id": 11202,
    "option_label": "A",
    "option_text": "Flora"
  },
  {
    "id": 112022,
    "question_id": 11202,
    "option_label": "B",
    "option_text": "Fauna"
  },
  {
    "id": 112023,
    "question_id": 11202,
    "option_label": "C",
    "option_text": "Tallom"
  },
  {
    "id": 112024,
    "question_id": 11202,
    "option_label": "D",
    "option_text": "Biotsenoz"
  },
  {
    "id": 112031,
    "question_id": 11203,
    "option_label": "A",
    "option_text": "Yomg‘ir chuvalchangi, go‘ng qo‘ng‘izi"
  },
  {
    "id": 112032,
    "question_id": 11203,
    "option_label": "B",
    "option_text": "Baliq, baqa"
  },
  {
    "id": 112033,
    "question_id": 11203,
    "option_label": "C",
    "option_text": "Shilliqqurt, sakkizoyoq"
  },
  {
    "id": 112034,
    "question_id": 11203,
    "option_label": "D",
    "option_text": "Kapalak, asalari"
  },
  {
    "id": 112041,
    "question_id": 11204,
    "option_label": "A",
    "option_text": "Baliqlar"
  },
  {
    "id": 112042,
    "question_id": 11204,
    "option_label": "B",
    "option_text": "Ikki pallali mollyuskalar"
  },
  {
    "id": 112043,
    "question_id": 11204,
    "option_label": "C",
    "option_text": "Meduzalar"
  },
  {
    "id": 112044,
    "question_id": 11204,
    "option_label": "D",
    "option_text": "Zuluklar"
  },
  {
    "id": 112051,
    "question_id": 11205,
    "option_label": "A",
    "option_text": "Ilon zahari, bo‘rsiq yog‘i"
  },
  {
    "id": 112052,
    "question_id": 11205,
    "option_label": "B",
    "option_text": "Pat, jun"
  },
  {
    "id": 112053,
    "question_id": 11205,
    "option_label": "C",
    "option_text": "Go‘sht, tuxum"
  },
  {
    "id": 112054,
    "question_id": 11205,
    "option_label": "D",
    "option_text": "Chig‘anoq"
  },
  {
    "id": 112061,
    "question_id": 11206,
    "option_label": "A",
    "option_text": "3 ta"
  },
  {
    "id": 112062,
    "question_id": 11206,
    "option_label": "B",
    "option_text": "2 ta (Umurtqali va umurtqasiz)"
  },
  {
    "id": 112063,
    "question_id": 11206,
    "option_label": "C",
    "option_text": "5 ta"
  },
  {
    "id": 112064,
    "question_id": 11206,
    "option_label": "D",
    "option_text": "4 ta"
  },
  {
    "id": 112071,
    "question_id": 11207,
    "option_label": "A",
    "option_text": "Bitta (Xordalilar)"
  },
  {
    "id": 112072,
    "question_id": 11207,
    "option_label": "B",
    "option_text": "Ikkita"
  },
  {
    "id": 112073,
    "question_id": 11207,
    "option_label": "C",
    "option_text": "Beshta"
  },
  {
    "id": 112074,
    "question_id": 11207,
    "option_label": "D",
    "option_text": "To‘rtta"
  },
  {
    "id": 112081,
    "question_id": 11208,
    "option_label": "A",
    "option_text": "Dunyo"
  },
  {
    "id": 112082,
    "question_id": 11208,
    "option_label": "B",
    "option_text": "Tur"
  },
  {
    "id": 112083,
    "question_id": 11208,
    "option_label": "C",
    "option_text": "Oila"
  },
  {
    "id": 112084,
    "question_id": 11208,
    "option_label": "D",
    "option_text": "Tip"
  },
  {
    "id": 112091,
    "question_id": 11209,
    "option_label": "A",
    "option_text": "Sut emizuvchilar"
  },
  {
    "id": 112092,
    "question_id": 11209,
    "option_label": "B",
    "option_text": "Yirtqichlar"
  },
  {
    "id": 112093,
    "question_id": 11209,
    "option_label": "C",
    "option_text": "Ayiqsimonlar"
  },
  {
    "id": 112094,
    "question_id": 11209,
    "option_label": "D",
    "option_text": "Xordalilar"
  },
  {
    "id": 112101,
    "question_id": 11210,
    "option_label": "A",
    "option_text": "Ayiqsimonlar"
  },
  {
    "id": 112102,
    "question_id": 11210,
    "option_label": "B",
    "option_text": "Mushuksimonlar"
  },
  {
    "id": 112103,
    "question_id": 11210,
    "option_label": "C",
    "option_text": "Yirtqichlar"
  },
  {
    "id": 112104,
    "question_id": 11210,
    "option_label": "D",
    "option_text": "Xordalilar"
  },
  {
    "id": 112111,
    "question_id": 11211,
    "option_label": "A",
    "option_text": "Pashsha, chivin"
  },
  {
    "id": 112112,
    "question_id": 11211,
    "option_label": "B",
    "option_text": "Asalari, kapalak"
  },
  {
    "id": 112113,
    "question_id": 11211,
    "option_label": "C",
    "option_text": "It, ot"
  },
  {
    "id": 112114,
    "question_id": 11211,
    "option_label": "D",
    "option_text": "Baliq, baqa"
  },
  {
    "id": 112121,
    "question_id": 11212,
    "option_label": "A",
    "option_text": "Produtsent"
  },
  {
    "id": 112122,
    "question_id": 11212,
    "option_label": "B",
    "option_text": "Konsument"
  },
  {
    "id": 112123,
    "question_id": 11212,
    "option_label": "C",
    "option_text": "Redutsent"
  },
  {
    "id": 112124,
    "question_id": 11212,
    "option_label": "D",
    "option_text": "Parchalovchi"
  },
  {
    "id": 112131,
    "question_id": 11213,
    "option_label": "A",
    "option_text": "Hazm qilish"
  },
  {
    "id": 112132,
    "question_id": 11213,
    "option_label": "B",
    "option_text": "Nerv sistemasi"
  },
  {
    "id": 112133,
    "question_id": 11213,
    "option_label": "C",
    "option_text": "Ayirish"
  },
  {
    "id": 112134,
    "question_id": 11213,
    "option_label": "D",
    "option_text": "Jinsiy"
  },
  {
    "id": 112141,
    "question_id": 11214,
    "option_label": "A",
    "option_text": "Olmaxon, qushlar"
  },
  {
    "id": 112142,
    "question_id": 11214,
    "option_label": "B",
    "option_text": "Baliqlar"
  },
  {
    "id": 112143,
    "question_id": 11214,
    "option_label": "C",
    "option_text": "Meduzalar"
  },
  {
    "id": 112144,
    "question_id": 11214,
    "option_label": "D",
    "option_text": "Zuluklar"
  },
  {
    "id": 112151,
    "question_id": 11215,
    "option_label": "A",
    "option_text": "Qo‘y, qushlar"
  },
  {
    "id": 112152,
    "question_id": 11215,
    "option_label": "B",
    "option_text": "Baliqlar"
  },
  {
    "id": 112153,
    "question_id": 11215,
    "option_label": "C",
    "option_text": "Mollyuskalar"
  },
  {
    "id": 112154,
    "question_id": 11215,
    "option_label": "D",
    "option_text": "Baqalar"
  },
  {
    "id": 112161,
    "question_id": 11216,
    "option_label": "A",
    "option_text": "Ot, eshak"
  },
  {
    "id": 112162,
    "question_id": 11216,
    "option_label": "B",
    "option_text": "It, mushuk"
  },
  {
    "id": 112163,
    "question_id": 11216,
    "option_label": "C",
    "option_text": "Qushlar"
  },
  {
    "id": 112164,
    "question_id": 11216,
    "option_label": "D",
    "option_text": "Baliqlar"
  },
  {
    "id": 112171,
    "question_id": 11217,
    "option_label": "A",
    "option_text": "Bars"
  },
  {
    "id": 112172,
    "question_id": 11217,
    "option_label": "B",
    "option_text": "Ayiq"
  },
  {
    "id": 112173,
    "question_id": 11217,
    "option_label": "C",
    "option_text": "Yirtqich"
  },
  {
    "id": 112174,
    "question_id": 11217,
    "option_label": "D",
    "option_text": "Xordali"
  },
  {
    "id": 112181,
    "question_id": 11218,
    "option_label": "A",
    "option_text": "Tur -> Urug‘ -> Oila -> Turkum -> Sinf -> Tip -> Dunyo"
  },
  {
    "id": 112182,
    "question_id": 11218,
    "option_label": "B",
    "option_text": "Dunyo -> Tur -> Oila"
  },
  {
    "id": 112183,
    "question_id": 11218,
    "option_label": "C",
    "option_text": "Tip -> Sinf -> Tur"
  },
  {
    "id": 112184,
    "question_id": 11218,
    "option_label": "D",
    "option_text": "Oila -> Tur -> Tip"
  },
  {
    "id": 112191,
    "question_id": 11219,
    "option_label": "A",
    "option_text": "Terisi"
  },
  {
    "id": 112192,
    "question_id": 11219,
    "option_label": "B",
    "option_text": "Umurtqa"
  },
  {
    "id": 112193,
    "question_id": 11219,
    "option_label": "C",
    "option_text": "Muskul"
  },
  {
    "id": 112194,
    "question_id": 11219,
    "option_label": "D",
    "option_text": "Jigar"
  },
  {
    "id": 112201,
    "question_id": 11220,
    "option_label": "A",
    "option_text": "Baliqlar"
  },
  {
    "id": 112202,
    "question_id": 11220,
    "option_label": "B",
    "option_text": "Asalari, kapalak"
  },
  {
    "id": 112203,
    "question_id": 11220,
    "option_label": "C",
    "option_text": "Chuvalchanglar"
  },
  {
    "id": 112204,
    "question_id": 11220,
    "option_label": "D",
    "option_text": "Mollyuskalar"
  },
  {
    "id": 113011,
    "question_id": 11301,
    "option_label": "A",
    "option_text": "Bo‘shliqichlilar"
  },
  {
    "id": 113012,
    "question_id": 11301,
    "option_label": "B",
    "option_text": "Sodda hayvonlar"
  },
  {
    "id": 113013,
    "question_id": 11301,
    "option_label": "C",
    "option_text": "Chuvalchanglar"
  },
  {
    "id": 113014,
    "question_id": 11301,
    "option_label": "D",
    "option_text": "Mollyuskalar"
  },
  {
    "id": 113021,
    "question_id": 11302,
    "option_label": "A",
    "option_text": "Amyoba"
  },
  {
    "id": 113022,
    "question_id": 11302,
    "option_label": "B",
    "option_text": "Yashil evglena"
  },
  {
    "id": 113023,
    "question_id": 11302,
    "option_label": "C",
    "option_text": "Tufelka"
  },
  {
    "id": 113024,
    "question_id": 11302,
    "option_label": "D",
    "option_text": "Gidra"
  },
  {
    "id": 113031,
    "question_id": 11303,
    "option_label": "A",
    "option_text": "Amyoba"
  },
  {
    "id": 113032,
    "question_id": 11303,
    "option_label": "B",
    "option_text": "Tufelka"
  },
  {
    "id": 113033,
    "question_id": 11303,
    "option_label": "C",
    "option_text": "Evglena"
  },
  {
    "id": 113034,
    "question_id": 11303,
    "option_label": "D",
    "option_text": "Meduza"
  },
  {
    "id": 113041,
    "question_id": 11304,
    "option_label": "A",
    "option_text": "Sodda hayvonlar"
  },
  {
    "id": 113042,
    "question_id": 11304,
    "option_label": "B",
    "option_text": "Bo‘shliqichlilar"
  },
  {
    "id": 113043,
    "question_id": 11304,
    "option_label": "C",
    "option_text": "Chuvalchanglar"
  },
  {
    "id": 113044,
    "question_id": 11304,
    "option_label": "D",
    "option_text": "Bo‘g‘imoyoqlilar"
  },
  {
    "id": 113051,
    "question_id": 11305,
    "option_label": "A",
    "option_text": "Fotosintez"
  },
  {
    "id": 113052,
    "question_id": 11305,
    "option_label": "B",
    "option_text": "Regeneratsiya"
  },
  {
    "id": 113053,
    "question_id": 11305,
    "option_label": "C",
    "option_text": "Metabolizm"
  },
  {
    "id": 113054,
    "question_id": 11305,
    "option_label": "D",
    "option_text": "Simbioz"
  },
  {
    "id": 113061,
    "question_id": 11306,
    "option_label": "A",
    "option_text": "Gidra"
  },
  {
    "id": 113062,
    "question_id": 11306,
    "option_label": "B",
    "option_text": "Meduza"
  },
  {
    "id": 113063,
    "question_id": 11306,
    "option_label": "C",
    "option_text": "Aktiniya"
  },
  {
    "id": 113064,
    "question_id": 11306,
    "option_label": "D",
    "option_text": "Amyoba"
  },
  {
    "id": 113071,
    "question_id": 11307,
    "option_label": "A",
    "option_text": "Yassi chuvalchanglar"
  },
  {
    "id": 113072,
    "question_id": 11307,
    "option_label": "B",
    "option_text": "To‘garak chuvalchanglar"
  },
  {
    "id": 113073,
    "question_id": 11307,
    "option_label": "C",
    "option_text": "Halqali chuvalchanglar"
  },
  {
    "id": 113074,
    "question_id": 11307,
    "option_label": "D",
    "option_text": "Mollyuskalar"
  },
  {
    "id": 113081,
    "question_id": 11308,
    "option_label": "A",
    "option_text": "Oq planariya"
  },
  {
    "id": 113082,
    "question_id": 11308,
    "option_label": "B",
    "option_text": "Jigar qurti"
  },
  {
    "id": 113083,
    "question_id": 11308,
    "option_label": "C",
    "option_text": "Yomg‘ir chuvalchangi"
  },
  {
    "id": 113084,
    "question_id": 11308,
    "option_label": "D",
    "option_text": "Zuluk"
  },
  {
    "id": 113091,
    "question_id": 11309,
    "option_label": "A",
    "option_text": "Yassi"
  },
  {
    "id": 113092,
    "question_id": 11309,
    "option_label": "B",
    "option_text": "To‘garak chuvalchanglar"
  },
  {
    "id": 113093,
    "question_id": 11309,
    "option_label": "C",
    "option_text": "Halqali"
  },
  {
    "id": 113094,
    "question_id": 11309,
    "option_label": "D",
    "option_text": "Zuluklar"
  },
  {
    "id": 113101,
    "question_id": 11310,
    "option_label": "A",
    "option_text": "Oq planariya"
  },
  {
    "id": 113102,
    "question_id": 11310,
    "option_label": "B",
    "option_text": "Askarida"
  },
  {
    "id": 113103,
    "question_id": 11310,
    "option_label": "C",
    "option_text": "Rishta"
  },
  {
    "id": 113104,
    "question_id": 11310,
    "option_label": "D",
    "option_text": "Zuluk"
  },
  {
    "id": 113111,
    "question_id": 11311,
    "option_label": "A",
    "option_text": "Yassi"
  },
  {
    "id": 113112,
    "question_id": 11311,
    "option_label": "B",
    "option_text": "To‘garak"
  },
  {
    "id": 113113,
    "question_id": 11311,
    "option_label": "C",
    "option_text": "Mollyuskalar"
  },
  {
    "id": 113114,
    "question_id": 11311,
    "option_label": "D",
    "option_text": "Meduzalar"
  },
  {
    "id": 113121,
    "question_id": 11312,
    "option_label": "A",
    "option_text": "Yassi chuvalchangda"
  },
  {
    "id": 113122,
    "question_id": 11312,
    "option_label": "B",
    "option_text": "Halqali chuvalchangda"
  },
  {
    "id": 113123,
    "question_id": 11312,
    "option_label": "C",
    "option_text": "To‘garak chuvalchangda"
  },
  {
    "id": 113124,
    "question_id": 11312,
    "option_label": "D",
    "option_text": "Sodda hayvonlarda"
  },
  {
    "id": 113131,
    "question_id": 11313,
    "option_label": "A",
    "option_text": "Askarida"
  },
  {
    "id": 113132,
    "question_id": 11313,
    "option_label": "B",
    "option_text": "Yomg‘ir chuvalchangi"
  },
  {
    "id": 113133,
    "question_id": 11313,
    "option_label": "C",
    "option_text": "Shilliqqurt"
  },
  {
    "id": 113134,
    "question_id": 11313,
    "option_label": "D",
    "option_text": "Sakkizoyoq"
  },
  {
    "id": 113141,
    "question_id": 11314,
    "option_label": "A",
    "option_text": "Nereida"
  },
  {
    "id": 113142,
    "question_id": 11314,
    "option_label": "B",
    "option_text": "Tibbiyot zulugi"
  },
  {
    "id": 113143,
    "question_id": 11314,
    "option_label": "C",
    "option_text": "Yomg‘ir chuvalchangi"
  },
  {
    "id": 113144,
    "question_id": 11314,
    "option_label": "D",
    "option_text": "Rishta"
  },
  {
    "id": 113151,
    "question_id": 11315,
    "option_label": "A",
    "option_text": "Chuvalchanglar"
  },
  {
    "id": 113152,
    "question_id": 11315,
    "option_label": "B",
    "option_text": "Mollyuskalar"
  },
  {
    "id": 113153,
    "question_id": 11315,
    "option_label": "C",
    "option_text": "Bo‘g‘imoyoqlilar"
  },
  {
    "id": 113154,
    "question_id": 11315,
    "option_label": "D",
    "option_text": "Meduzalar"
  },
  {
    "id": 113161,
    "question_id": 11316,
    "option_label": "A",
    "option_text": "Baqachanoq"
  },
  {
    "id": 113162,
    "question_id": 11316,
    "option_label": "B",
    "option_text": "Sakkizoyoq"
  },
  {
    "id": 113163,
    "question_id": 11316,
    "option_label": "C",
    "option_text": "Shilliqqurt"
  },
  {
    "id": 113164,
    "question_id": 11316,
    "option_label": "D",
    "option_text": "Gidra"
  },
  {
    "id": 113171,
    "question_id": 11317,
    "option_label": "A",
    "option_text": "Mollyuskalar"
  },
  {
    "id": 113172,
    "question_id": 11317,
    "option_label": "B",
    "option_text": "Bo‘g‘imoyoqlilar"
  },
  {
    "id": 113173,
    "question_id": 11317,
    "option_label": "C",
    "option_text": "Chuvalchanglar"
  },
  {
    "id": 113174,
    "question_id": 11317,
    "option_label": "D",
    "option_text": "Meduzalar"
  },
  {
    "id": 113181,
    "question_id": 11318,
    "option_label": "A",
    "option_text": "Xonqizi"
  },
  {
    "id": 113182,
    "question_id": 11318,
    "option_label": "B",
    "option_text": "Butli o‘rgimchak"
  },
  {
    "id": 113183,
    "question_id": 11318,
    "option_label": "C",
    "option_text": "Daryo qisqichbaqasi"
  },
  {
    "id": 113184,
    "question_id": 11318,
    "option_label": "D",
    "option_text": "Asalari"
  },
  {
    "id": 113191,
    "question_id": 11319,
    "option_label": "A",
    "option_text": "Suvarak"
  },
  {
    "id": 113192,
    "question_id": 11319,
    "option_label": "B",
    "option_text": "Xonqizi"
  },
  {
    "id": 113193,
    "question_id": 11319,
    "option_label": "C",
    "option_text": "Chivin"
  },
  {
    "id": 113194,
    "question_id": 11319,
    "option_label": "D",
    "option_text": "Pashsha"
  },
  {
    "id": 113201,
    "question_id": 11320,
    "option_label": "A",
    "option_text": "Yeyiladigan"
  },
  {
    "id": 113202,
    "question_id": 11320,
    "option_label": "B",
    "option_text": "Parazit"
  },
  {
    "id": 113203,
    "question_id": 11320,
    "option_label": "C",
    "option_text": "Foydali"
  },
  {
    "id": 113204,
    "question_id": 11320,
    "option_label": "D",
    "option_text": "Erkin yashovchi"
  },
  {
    "id": 114011,
    "question_id": 11401,
    "option_label": "A",
    "option_text": "Baqa"
  },
  {
    "id": 114012,
    "question_id": 11401,
    "option_label": "B",
    "option_text": "Baliq"
  },
  {
    "id": 114013,
    "question_id": 11401,
    "option_label": "C",
    "option_text": "Kaltakesak"
  },
  {
    "id": 114014,
    "question_id": 11401,
    "option_label": "D",
    "option_text": "Qush"
  },
  {
    "id": 114021,
    "question_id": 11402,
    "option_label": "A",
    "option_text": "O‘pka"
  },
  {
    "id": 114022,
    "question_id": 11402,
    "option_label": "B",
    "option_text": "Jabra"
  },
  {
    "id": 114023,
    "question_id": 11402,
    "option_label": "C",
    "option_text": "Teri"
  },
  {
    "id": 114024,
    "question_id": 11402,
    "option_label": "D",
    "option_text": "Traxeya"
  },
  {
    "id": 114031,
    "question_id": 11403,
    "option_label": "A",
    "option_text": "Issiqqonli"
  },
  {
    "id": 114032,
    "question_id": 11403,
    "option_label": "B",
    "option_text": "Sovuqqonli"
  },
  {
    "id": 114033,
    "question_id": 11403,
    "option_label": "C",
    "option_text": "Sut emizuvchilar"
  },
  {
    "id": 114034,
    "question_id": 11403,
    "option_label": "D",
    "option_text": "Qushlar"
  },
  {
    "id": 114041,
    "question_id": 11404,
    "option_label": "A",
    "option_text": "2 kamerali"
  },
  {
    "id": 114042,
    "question_id": 11404,
    "option_label": "B",
    "option_text": "3 kamerali"
  },
  {
    "id": 114043,
    "question_id": 11404,
    "option_label": "C",
    "option_text": "4 kamerali"
  },
  {
    "id": 114044,
    "question_id": 11404,
    "option_label": "D",
    "option_text": "1 kamerali"
  },
  {
    "id": 114051,
    "question_id": 11405,
    "option_label": "A",
    "option_text": "Baliqlar"
  },
  {
    "id": 114052,
    "question_id": 11405,
    "option_label": "B",
    "option_text": "Suvda hamda quruqlikda yashovchilar (Amfibiyalar)"
  },
  {
    "id": 114053,
    "question_id": 11405,
    "option_label": "C",
    "option_text": "Sudralib yuruvchilar"
  },
  {
    "id": 114054,
    "question_id": 11405,
    "option_label": "D",
    "option_text": "Sut emizuvchilar"
  },
  {
    "id": 114061,
    "question_id": 11406,
    "option_label": "A",
    "option_text": "Faqat jabra"
  },
  {
    "id": 114062,
    "question_id": 11406,
    "option_label": "B",
    "option_text": "Teri va o‘pka orqali"
  },
  {
    "id": 114063,
    "question_id": 11406,
    "option_label": "C",
    "option_text": "Faqat teri"
  },
  {
    "id": 114064,
    "question_id": 11406,
    "option_label": "D",
    "option_text": "Faqat o‘pka"
  },
  {
    "id": 114071,
    "question_id": 11407,
    "option_label": "A",
    "option_text": "Baliqlar"
  },
  {
    "id": 114072,
    "question_id": 11407,
    "option_label": "B",
    "option_text": "Baqalar"
  },
  {
    "id": 114073,
    "question_id": 11407,
    "option_label": "C",
    "option_text": "Sudralib yuruvchilar (Reptiliyalar)"
  },
  {
    "id": 114074,
    "question_id": 11407,
    "option_label": "D",
    "option_text": "Qushlar"
  },
  {
    "id": 114081,
    "question_id": 11408,
    "option_label": "A",
    "option_text": "2 ta"
  },
  {
    "id": 114082,
    "question_id": 11408,
    "option_label": "B",
    "option_text": "3 ta"
  },
  {
    "id": 114083,
    "question_id": 11408,
    "option_label": "C",
    "option_text": "4 ta"
  },
  {
    "id": 114084,
    "question_id": 11408,
    "option_label": "D",
    "option_text": "1 ta"
  },
  {
    "id": 114091,
    "question_id": 11409,
    "option_label": "A",
    "option_text": "Sut emizuvchilar"
  },
  {
    "id": 114092,
    "question_id": 11409,
    "option_label": "B",
    "option_text": "Qushlar"
  },
  {
    "id": 114093,
    "question_id": 11409,
    "option_label": "C",
    "option_text": "Kaltakesaklar"
  },
  {
    "id": 114094,
    "question_id": 11409,
    "option_label": "D",
    "option_text": "Baqalar"
  },
  {
    "id": 114101,
    "question_id": 11410,
    "option_label": "A",
    "option_text": "2 ta"
  },
  {
    "id": 114102,
    "question_id": 11410,
    "option_label": "B",
    "option_text": "3 ta"
  },
  {
    "id": 114103,
    "question_id": 11410,
    "option_label": "C",
    "option_text": "4 ta"
  },
  {
    "id": 114104,
    "question_id": 11410,
    "option_label": "D",
    "option_text": "5 ta"
  },
  {
    "id": 114111,
    "question_id": 11411,
    "option_label": "A",
    "option_text": "Sovuqqonli"
  },
  {
    "id": 114112,
    "question_id": 11411,
    "option_label": "B",
    "option_text": "Issiqqonli"
  },
  {
    "id": 114113,
    "question_id": 11411,
    "option_label": "C",
    "option_text": "Parazit"
  },
  {
    "id": 114114,
    "question_id": 11411,
    "option_label": "D",
    "option_text": "Prokariot"
  },
  {
    "id": 114121,
    "question_id": 11412,
    "option_label": "A",
    "option_text": "Qushlar"
  },
  {
    "id": 114122,
    "question_id": 11412,
    "option_label": "B",
    "option_text": "Sut emizuvchilar"
  },
  {
    "id": 114123,
    "question_id": 11412,
    "option_label": "C",
    "option_text": "Sudralib yuruvchilar"
  },
  {
    "id": 114124,
    "question_id": 11412,
    "option_label": "D",
    "option_text": "Baliqlar"
  },
  {
    "id": 114131,
    "question_id": 11413,
    "option_label": "A",
    "option_text": "Itbaliq"
  },
  {
    "id": 114132,
    "question_id": 11413,
    "option_label": "B",
    "option_text": "Zoospora"
  },
  {
    "id": 114133,
    "question_id": 11413,
    "option_label": "C",
    "option_text": "G‘umbak"
  },
  {
    "id": 114134,
    "question_id": 11413,
    "option_label": "D",
    "option_text": "Batsilla"
  },
  {
    "id": 114141,
    "question_id": 11414,
    "option_label": "A",
    "option_text": "Oldingi"
  },
  {
    "id": 114142,
    "question_id": 11414,
    "option_label": "B",
    "option_text": "Orqa"
  },
  {
    "id": 114143,
    "question_id": 11414,
    "option_label": "C",
    "option_text": "Ikkalasi baravar"
  },
  {
    "id": 114144,
    "question_id": 11414,
    "option_label": "D",
    "option_text": "Oyog‘i bo‘lmaydi"
  },
  {
    "id": 114151,
    "question_id": 11415,
    "option_label": "A",
    "option_text": "Urg‘ochi"
  },
  {
    "id": 114152,
    "question_id": 11415,
    "option_label": "B",
    "option_text": "Erkak"
  },
  {
    "id": 114153,
    "question_id": 11415,
    "option_label": "C",
    "option_text": "Ikkalasi ham"
  },
  {
    "id": 114154,
    "question_id": 11415,
    "option_label": "D",
    "option_text": "Yosh nihol"
  },
  {
    "id": 114161,
    "question_id": 11416,
    "option_label": "A",
    "option_text": "Tumshuq"
  },
  {
    "id": 114162,
    "question_id": 11416,
    "option_label": "B",
    "option_text": "Havo xaltachalari"
  },
  {
    "id": 114163,
    "question_id": 11416,
    "option_label": "C",
    "option_text": "Patlar"
  },
  {
    "id": 114164,
    "question_id": 11416,
    "option_label": "D",
    "option_text": "Yurak"
  },
  {
    "id": 114171,
    "question_id": 11417,
    "option_label": "A",
    "option_text": "Qushlar"
  },
  {
    "id": 114172,
    "question_id": 11417,
    "option_label": "B",
    "option_text": "Baliq va baqalar"
  },
  {
    "id": 114173,
    "question_id": 11417,
    "option_label": "C",
    "option_text": "Ilonlar"
  },
  {
    "id": 114174,
    "question_id": 11417,
    "option_label": "D",
    "option_text": "Sut emizuvchilar"
  },
  {
    "id": 114181,
    "question_id": 11418,
    "option_label": "A",
    "option_text": "Arterial"
  },
  {
    "id": 114182,
    "question_id": 11418,
    "option_label": "B",
    "option_text": "Venoz"
  },
  {
    "id": 114183,
    "question_id": 11418,
    "option_label": "C",
    "option_text": "Aralash"
  },
  {
    "id": 114184,
    "question_id": 11418,
    "option_label": "D",
    "option_text": "Limfa"
  },
  {
    "id": 114191,
    "question_id": 11419,
    "option_label": "A",
    "option_text": "Shilimshiq"
  },
  {
    "id": 114192,
    "question_id": 11419,
    "option_label": "B",
    "option_text": "Qattiq po‘choq"
  },
  {
    "id": 114193,
    "question_id": 11419,
    "option_label": "C",
    "option_text": "Pat"
  },
  {
    "id": 114194,
    "question_id": 11419,
    "option_label": "D",
    "option_text": "Jun"
  },
  {
    "id": 114201,
    "question_id": 11420,
    "option_label": "A",
    "option_text": "Baliq"
  },
  {
    "id": 114202,
    "question_id": 11420,
    "option_label": "B",
    "option_text": "Baqa"
  },
  {
    "id": 114203,
    "question_id": 11420,
    "option_label": "C",
    "option_text": "Ilon"
  },
  {
    "id": 114204,
    "question_id": 11420,
    "option_label": "D",
    "option_text": "Ot"
  },
  {
    "id": 115011,
    "question_id": 11501,
    "option_label": "A",
    "option_text": "Organ"
  },
  {
    "id": 115012,
    "question_id": 11501,
    "option_label": "B",
    "option_text": "To‘qima"
  },
  {
    "id": 115013,
    "question_id": 11501,
    "option_label": "C",
    "option_text": "Hujayra"
  },
  {
    "id": 115014,
    "question_id": 11501,
    "option_label": "D",
    "option_text": "Sistema"
  },
  {
    "id": 115021,
    "question_id": 11502,
    "option_label": "A",
    "option_text": "Faqat bosh"
  },
  {
    "id": 115022,
    "question_id": 11502,
    "option_label": "B",
    "option_text": "Bosh, tana, qo‘l va oyoq"
  },
  {
    "id": 115023,
    "question_id": 11502,
    "option_label": "C",
    "option_text": "Faqat muskul"
  },
  {
    "id": 115024,
    "question_id": 11502,
    "option_label": "D",
    "option_text": "Faqat teri"
  },
  {
    "id": 115031,
    "question_id": 11503,
    "option_label": "A",
    "option_text": "2 ta"
  },
  {
    "id": 115032,
    "question_id": 11503,
    "option_label": "B",
    "option_text": "3 ta"
  },
  {
    "id": 115033,
    "question_id": 11503,
    "option_label": "C",
    "option_text": "4 ta"
  },
  {
    "id": 115034,
    "question_id": 11503,
    "option_label": "D",
    "option_text": "1 ta"
  },
  {
    "id": 115041,
    "question_id": 11504,
    "option_label": "A",
    "option_text": "Vena"
  },
  {
    "id": 115042,
    "question_id": 11504,
    "option_label": "B",
    "option_text": "Arteriya"
  },
  {
    "id": 115043,
    "question_id": 11504,
    "option_label": "C",
    "option_text": "Kapillyar"
  },
  {
    "id": 115044,
    "question_id": 11504,
    "option_label": "D",
    "option_text": "Limfa"
  },
  {
    "id": 115051,
    "question_id": 11505,
    "option_label": "A",
    "option_text": "Arteriya"
  },
  {
    "id": 115052,
    "question_id": 11505,
    "option_label": "B",
    "option_text": "Vena"
  },
  {
    "id": 115053,
    "question_id": 11505,
    "option_label": "C",
    "option_text": "Kapillyar"
  },
  {
    "id": 115054,
    "question_id": 11505,
    "option_label": "D",
    "option_text": "Alveola"
  },
  {
    "id": 115061,
    "question_id": 11506,
    "option_label": "A",
    "option_text": "Arteriya"
  },
  {
    "id": 115062,
    "question_id": 11506,
    "option_label": "B",
    "option_text": "Vena"
  },
  {
    "id": 115063,
    "question_id": 11506,
    "option_label": "C",
    "option_text": "Kapillyar"
  },
  {
    "id": 115064,
    "question_id": 11506,
    "option_label": "D",
    "option_text": "Bronx"
  },
  {
    "id": 115071,
    "question_id": 11507,
    "option_label": "A",
    "option_text": "Oshqozondan"
  },
  {
    "id": 115072,
    "question_id": 11507,
    "option_label": "B",
    "option_text": "Og‘iz bo‘shlig‘idan"
  },
  {
    "id": 115073,
    "question_id": 11507,
    "option_label": "C",
    "option_text": "Ichakdan"
  },
  {
    "id": 115074,
    "question_id": 11507,
    "option_label": "D",
    "option_text": "Qizilo‘ngachdan"
  },
  {
    "id": 115081,
    "question_id": 11508,
    "option_label": "A",
    "option_text": "Nerv tugunlari"
  },
  {
    "id": 115082,
    "question_id": 11508,
    "option_label": "B",
    "option_text": "Bosh miya va orqa miya"
  },
  {
    "id": 115083,
    "question_id": 11508,
    "option_label": "C",
    "option_text": "Faqat sezgi organlari"
  },
  {
    "id": 115084,
    "question_id": 11508,
    "option_label": "D",
    "option_text": "Muskullar"
  },
  {
    "id": 115091,
    "question_id": 11509,
    "option_label": "A",
    "option_text": "Burunda"
  },
  {
    "id": 115092,
    "question_id": 11509,
    "option_label": "B",
    "option_text": "Traxeyada"
  },
  {
    "id": 115093,
    "question_id": 11509,
    "option_label": "C",
    "option_text": "O‘pka alveolalarida"
  },
  {
    "id": 115094,
    "question_id": 11509,
    "option_label": "D",
    "option_text": "Oshqozonda"
  },
  {
    "id": 115101,
    "question_id": 11510,
    "option_label": "A",
    "option_text": "Karbonat angidrid"
  },
  {
    "id": 115102,
    "question_id": 11510,
    "option_label": "B",
    "option_text": "Kislorod"
  },
  {
    "id": 115103,
    "question_id": 11510,
    "option_label": "C",
    "option_text": "Azot"
  },
  {
    "id": 115104,
    "question_id": 11510,
    "option_label": "D",
    "option_text": "Argon"
  },
  {
    "id": 115111,
    "question_id": 11511,
    "option_label": "A",
    "option_text": "Hazm qilish"
  },
  {
    "id": 115112,
    "question_id": 11511,
    "option_label": "B",
    "option_text": "Limfa sistemasi"
  },
  {
    "id": 115113,
    "question_id": 11511,
    "option_label": "C",
    "option_text": "Tayanch"
  },
  {
    "id": 115114,
    "question_id": 11511,
    "option_label": "D",
    "option_text": "Muskul"
  },
  {
    "id": 115121,
    "question_id": 11512,
    "option_label": "A",
    "option_text": "Yurakda"
  },
  {
    "id": 115122,
    "question_id": 11512,
    "option_label": "B",
    "option_text": "Taloqda"
  },
  {
    "id": 115123,
    "question_id": 11512,
    "option_label": "C",
    "option_text": "Buyrakda"
  },
  {
    "id": 115124,
    "question_id": 11512,
    "option_label": "D",
    "option_text": "O‘pkada"
  },
  {
    "id": 115131,
    "question_id": 11513,
    "option_label": "A",
    "option_text": "Nerv sistemasi"
  },
  {
    "id": 115132,
    "question_id": 11513,
    "option_label": "B",
    "option_text": "Endokrin sistema"
  },
  {
    "id": 115133,
    "question_id": 11513,
    "option_label": "C",
    "option_text": "Ayirish sistemasi"
  },
  {
    "id": 115134,
    "question_id": 11513,
    "option_label": "D",
    "option_text": "Limfa"
  },
  {
    "id": 115141,
    "question_id": 11514,
    "option_label": "A",
    "option_text": "Ferment"
  },
  {
    "id": 115142,
    "question_id": 11514,
    "option_label": "B",
    "option_text": "Gormon"
  },
  {
    "id": 115143,
    "question_id": 11514,
    "option_label": "C",
    "option_text": "Vitamin"
  },
  {
    "id": 115144,
    "question_id": 11514,
    "option_label": "D",
    "option_text": "Shira"
  },
  {
    "id": 115151,
    "question_id": 11515,
    "option_label": "A",
    "option_text": "Insulin"
  },
  {
    "id": 115152,
    "question_id": 11515,
    "option_label": "B",
    "option_text": "Adrenalin"
  },
  {
    "id": 115153,
    "question_id": 11515,
    "option_label": "C",
    "option_text": "Tiroksin"
  },
  {
    "id": 115154,
    "question_id": 11515,
    "option_label": "D",
    "option_text": "Oqsillar"
  },
  {
    "id": 115161,
    "question_id": 11516,
    "option_label": "A",
    "option_text": "Bilakdan bukiladi"
  },
  {
    "id": 115162,
    "question_id": 11516,
    "option_label": "B",
    "option_text": "Yoziladi"
  },
  {
    "id": 115163,
    "question_id": 11516,
    "option_label": "C",
    "option_text": "Harakatlanmaydi"
  },
  {
    "id": 115164,
    "question_id": 11516,
    "option_label": "D",
    "option_text": "Aylantiriladi"
  },
  {
    "id": 115171,
    "question_id": 11517,
    "option_label": "A",
    "option_text": "Ochiq"
  },
  {
    "id": 115172,
    "question_id": 11517,
    "option_label": "B",
    "option_text": "Yopiq"
  },
  {
    "id": 115173,
    "question_id": 11517,
    "option_label": "C",
    "option_text": "Tallomli"
  },
  {
    "id": 115174,
    "question_id": 11517,
    "option_label": "D",
    "option_text": "Sporali"
  },
  {
    "id": 115181,
    "question_id": 11518,
    "option_label": "A",
    "option_text": "Yurakni"
  },
  {
    "id": 115182,
    "question_id": 11518,
    "option_label": "B",
    "option_text": "Bosh miyani"
  },
  {
    "id": 115183,
    "question_id": 11518,
    "option_label": "C",
    "option_text": "O‘pkani"
  },
  {
    "id": 115184,
    "question_id": 11518,
    "option_label": "D",
    "option_text": "Buyrakni"
  },
  {
    "id": 115191,
    "question_id": 11519,
    "option_label": "A",
    "option_text": "Qobig‘ida"
  },
  {
    "id": 115192,
    "question_id": 11519,
    "option_label": "B",
    "option_text": "Ko‘mik qismida"
  },
  {
    "id": 115193,
    "question_id": 11519,
    "option_label": "C",
    "option_text": "Bo‘g‘imida"
  },
  {
    "id": 115194,
    "question_id": 11519,
    "option_label": "D",
    "option_text": "Ustida"
  },
  {
    "id": 115201,
    "question_id": 11520,
    "option_label": "A",
    "option_text": "Bosh miya"
  },
  {
    "id": 115202,
    "question_id": 11520,
    "option_label": "B",
    "option_text": "Orqa miya"
  },
  {
    "id": 115203,
    "question_id": 11520,
    "option_label": "C",
    "option_text": "Yurak"
  },
  {
    "id": 115204,
    "question_id": 11520,
    "option_label": "D",
    "option_text": "O‘pka"
  },
  {
    "id": 116011,
    "question_id": 11601,
    "option_label": "A",
    "option_text": "Biotsenoz"
  },
  {
    "id": 116012,
    "question_id": 11601,
    "option_label": "B",
    "option_text": "Ekologik omillar"
  },
  {
    "id": 116013,
    "question_id": 11601,
    "option_label": "C",
    "option_text": "Fotosintez"
  },
  {
    "id": 116014,
    "question_id": 11601,
    "option_label": "D",
    "option_text": "Evolyutsiya"
  },
  {
    "id": 116021,
    "question_id": 11602,
    "option_label": "A",
    "option_text": "Biotik"
  },
  {
    "id": 116022,
    "question_id": 11602,
    "option_label": "B",
    "option_text": "Abiotik"
  },
  {
    "id": 116023,
    "question_id": 11602,
    "option_label": "C",
    "option_text": "Antropogen"
  },
  {
    "id": 116024,
    "question_id": 11602,
    "option_label": "D",
    "option_text": "Ijtimoiy"
  },
  {
    "id": 116031,
    "question_id": 11603,
    "option_label": "A",
    "option_text": "Abiotik"
  },
  {
    "id": 116032,
    "question_id": 11603,
    "option_label": "B",
    "option_text": "Biotik"
  },
  {
    "id": 116033,
    "question_id": 11603,
    "option_label": "C",
    "option_text": "Antropogen"
  },
  {
    "id": 116034,
    "question_id": 11603,
    "option_label": "D",
    "option_text": "Tarixiy"
  },
  {
    "id": 116041,
    "question_id": 11604,
    "option_label": "A",
    "option_text": "Abiotik"
  },
  {
    "id": 116042,
    "question_id": 11604,
    "option_label": "B",
    "option_text": "Biotik"
  },
  {
    "id": 116043,
    "question_id": 11604,
    "option_label": "C",
    "option_text": "Antropogen"
  },
  {
    "id": 116044,
    "question_id": 11604,
    "option_label": "D",
    "option_text": "Tabiiy"
  },
  {
    "id": 116051,
    "question_id": 11605,
    "option_label": "A",
    "option_text": "Tallom"
  },
  {
    "id": 116052,
    "question_id": 11605,
    "option_label": "B",
    "option_text": "Biotsenoz"
  },
  {
    "id": 116053,
    "question_id": 11605,
    "option_label": "C",
    "option_text": "Populyatsiya"
  },
  {
    "id": 116054,
    "question_id": 11605,
    "option_label": "D",
    "option_text": "Flora"
  },
  {
    "id": 116061,
    "question_id": 11606,
    "option_label": "A",
    "option_text": "Produtsent"
  },
  {
    "id": 116062,
    "question_id": 11606,
    "option_label": "B",
    "option_text": "Consument"
  },
  {
    "id": 116063,
    "question_id": 11606,
    "option_label": "C",
    "option_text": "Redutsent"
  },
  {
    "id": 116064,
    "question_id": 11606,
    "option_label": "D",
    "option_text": "Parchalovchi"
  },
  {
    "id": 116071,
    "question_id": 11607,
    "option_label": "A",
    "option_text": "Produtsent"
  },
  {
    "id": 116072,
    "question_id": 11607,
    "option_label": "B",
    "option_text": "Konsumentlar"
  },
  {
    "id": 116073,
    "question_id": 11607,
    "option_label": "C",
    "option_text": "Redutsentlar"
  },
  {
    "id": 116074,
    "question_id": 11607,
    "option_label": "D",
    "option_text": "Avtotroflar"
  },
  {
    "id": 116081,
    "question_id": 11608,
    "option_label": "A",
    "option_text": "Produtsent"
  },
  {
    "id": 116082,
    "question_id": 11608,
    "option_label": "B",
    "option_text": "Konsument"
  },
  {
    "id": 116083,
    "question_id": 11608,
    "option_label": "C",
    "option_text": "Redutsentlar"
  },
  {
    "id": 116084,
    "question_id": 11608,
    "option_label": "D",
    "option_text": "Simbioz"
  },
  {
    "id": 116091,
    "question_id": 11609,
    "option_label": "A",
    "option_text": "Oziq zanjiri"
  },
  {
    "id": 116092,
    "question_id": 11609,
    "option_label": "B",
    "option_text": "Hayot sikli"
  },
  {
    "id": 116093,
    "question_id": 11609,
    "option_label": "C",
    "option_text": "Sistematika"
  },
  {
    "id": 116094,
    "question_id": 11609,
    "option_label": "D",
    "option_text": "Simbioz"
  },
  {
    "id": 116101,
    "question_id": 11610,
    "option_label": "A",
    "option_text": "Hayvon"
  },
  {
    "id": 116102,
    "question_id": 11610,
    "option_label": "B",
    "option_text": "Yashil o‘simlik"
  },
  {
    "id": 116103,
    "question_id": 11610,
    "option_label": "C",
    "option_text": "Bakteriya"
  },
  {
    "id": 116104,
    "question_id": 11610,
    "option_label": "D",
    "option_text": "Zamburug‘"
  },
  {
    "id": 116111,
    "question_id": 11611,
    "option_label": "A",
    "option_text": "Produtsent"
  },
  {
    "id": 116112,
    "question_id": 11611,
    "option_label": "B",
    "option_text": "Konsument"
  },
  {
    "id": 116113,
    "question_id": 11611,
    "option_label": "C",
    "option_text": "Redutsent"
  },
  {
    "id": 116114,
    "question_id": 11611,
    "option_label": "D",
    "option_text": "Parchalovchi"
  },
  {
    "id": 116121,
    "question_id": 11612,
    "option_label": "A",
    "option_text": "Birinchi"
  },
  {
    "id": 116122,
    "question_id": 11612,
    "option_label": "B",
    "option_text": "O‘rta (Iste’molchi)"
  },
  {
    "id": 116123,
    "question_id": 11612,
    "option_label": "C",
    "option_text": "Oxirgi"
  },
  {
    "id": 116124,
    "question_id": 11612,
    "option_label": "D",
    "option_text": "Boshlang‘ich"
  },
  {
    "id": 116131,
    "question_id": 11613,
    "option_label": "A",
    "option_text": "Biotsenoz"
  },
  {
    "id": 116132,
    "question_id": 11613,
    "option_label": "B",
    "option_text": "Yashash muhiti"
  },
  {
    "id": 116133,
    "question_id": 11613,
    "option_label": "C",
    "option_text": "Oziq zanjiri"
  },
  {
    "id": 116134,
    "question_id": 11613,
    "option_label": "D",
    "option_text": "Tallom"
  },
  {
    "id": 116141,
    "question_id": 11614,
    "option_label": "A",
    "option_text": "Havoga"
  },
  {
    "id": 116142,
    "question_id": 11614,
    "option_label": "B",
    "option_text": "Suv qarshiligini yengishga"
  },
  {
    "id": 116143,
    "question_id": 11614,
    "option_label": "C",
    "option_text": "Issiqqa"
  },
  {
    "id": 116144,
    "question_id": 11614,
    "option_label": "D",
    "option_text": "Yirtqichga"
  },
  {
    "id": 116151,
    "question_id": 11615,
    "option_label": "A",
    "option_text": "Salbiy ta’sir qiladi"
  },
  {
    "id": 116152,
    "question_id": 11615,
    "option_label": "B",
    "option_text": "Foyda beradi"
  },
  {
    "id": 116153,
    "question_id": 11615,
    "option_label": "C",
    "option_text": "Ta’sir qilmaydi"
  },
  {
    "id": 116154,
    "question_id": 11615,
    "option_label": "D",
    "option_text": "O‘simlik ko‘payadi"
  },
  {
    "id": 116161,
    "question_id": 11616,
    "option_label": "A",
    "option_text": "Chigirtkaga"
  },
  {
    "id": 116162,
    "question_id": 11616,
    "option_label": "B",
    "option_text": "Ilonga"
  },
  {
    "id": 116163,
    "question_id": 11616,
    "option_label": "C",
    "option_text": "Bug‘doyga"
  },
  {
    "id": 116164,
    "question_id": 11616,
    "option_label": "D",
    "option_text": "Bakteriyaga"
  },
  {
    "id": 116171,
    "question_id": 11617,
    "option_label": "A",
    "option_text": "Oziq zanjiri halqasining uzilishi"
  },
  {
    "id": 116172,
    "question_id": 11617,
    "option_label": "B",
    "option_text": "Insonning salbiy ta’siri"
  },
  {
    "id": 116173,
    "question_id": 11617,
    "option_label": "C",
    "option_text": "Hayvonlar ko‘payishi"
  },
  {
    "id": 116174,
    "question_id": 11617,
    "option_label": "D",
    "option_text": "Barcha javoblar to‘g‘ri"
  },
  {
    "id": 116181,
    "question_id": 11618,
    "option_label": "A",
    "option_text": "2 ta"
  },
  {
    "id": 116182,
    "question_id": 11618,
    "option_label": "B",
    "option_text": "3 ta (Produtsent, konsument, redutsent)"
  },
  {
    "id": 116183,
    "question_id": 11618,
    "option_label": "C",
    "option_text": "5 ta"
  },
  {
    "id": 116184,
    "question_id": 11618,
    "option_label": "D",
    "option_text": "1 ta"
  },
  {
    "id": 116191,
    "question_id": 11619,
    "option_label": "A",
    "option_text": "Boshida"
  },
  {
    "id": 116192,
    "question_id": 11619,
    "option_label": "B",
    "option_text": "Oxirida (Parchalovchi)"
  },
  {
    "id": 116193,
    "question_id": 11619,
    "option_label": "C",
    "option_text": "O‘rtasida"
  },
  {
    "id": 116194,
    "question_id": 11619,
    "option_label": "D",
    "option_text": "Ishtirok etmaydi"
  },
  {
    "id": 116201,
    "question_id": 11620,
    "option_label": "A",
    "option_text": "Bug‘doy"
  },
  {
    "id": 116202,
    "question_id": 11620,
    "option_label": "B",
    "option_text": "Baqa"
  },
  {
    "id": 116203,
    "question_id": 11620,
    "option_label": "C",
    "option_text": "Burgut"
  },
  {
    "id": 116204,
    "question_id": 11620,
    "option_label": "D",
    "option_text": "Ilon"
  },
  {
    "id": 117011,
    "question_id": 11701,
    "option_label": "A",
    "option_text": "Daraxt kesish"
  },
  {
    "id": 117012,
    "question_id": 11701,
    "option_label": "B",
    "option_text": "Yangi nav va zotlar yaratish"
  },
  {
    "id": 117013,
    "question_id": 11701,
    "option_label": "C",
    "option_text": "Suvni ifloslash"
  },
  {
    "id": 117014,
    "question_id": 11701,
    "option_label": "D",
    "option_text": "Ov qilish"
  },
  {
    "id": 117021,
    "question_id": 11702,
    "option_label": "A",
    "option_text": "Yovvoyi hayvonlarni ko‘plab ovlash"
  },
  {
    "id": 117022,
    "question_id": 11702,
    "option_label": "B",
    "option_text": "Bog‘ yaratish"
  },
  {
    "id": 117023,
    "question_id": 11702,
    "option_label": "C",
    "option_text": "O‘simlik ekish"
  },
  {
    "id": 117024,
    "question_id": 11702,
    "option_label": "D",
    "option_text": "Qo‘riqxona ochish"
  },
  {
    "id": 117031,
    "question_id": 11703,
    "option_label": "A",
    "option_text": "Yomg‘ir yog‘magani"
  },
  {
    "id": 117032,
    "question_id": 11703,
    "option_label": "B",
    "option_text": "Daryo suvlarining g‘o‘za sug‘orishga ko‘p ishlatilishi"
  },
  {
    "id": 117033,
    "question_id": 11703,
    "option_label": "C",
    "option_text": "Quyosh issiqligi"
  },
  {
    "id": 117034,
    "question_id": 11703,
    "option_label": "D",
    "option_text": "Baliq ovlash"
  },
  {
    "id": 117041,
    "question_id": 11704,
    "option_label": "A",
    "option_text": "Sovuq tushishiga"
  },
  {
    "id": 117042,
    "question_id": 11704,
    "option_label": "B",
    "option_text": "Havo harorati ko‘tarilishiga (Global isish)"
  },
  {
    "id": 117043,
    "question_id": 11704,
    "option_label": "C",
    "option_text": "Kislorod ko‘payishiga"
  },
  {
    "id": 117044,
    "question_id": 11704,
    "option_label": "D",
    "option_text": "Yomg‘ir ko‘p yog‘ishiga"
  },
  {
    "id": 117051,
    "question_id": 11705,
    "option_label": "A",
    "option_text": "Qurg‘oqchilik"
  },
  {
    "id": 117052,
    "question_id": 11705,
    "option_label": "B",
    "option_text": "Suv toshqinlari"
  },
  {
    "id": 117053,
    "question_id": 11705,
    "option_label": "C",
    "option_text": "Shamol esishi"
  },
  {
    "id": 117054,
    "question_id": 11705,
    "option_label": "D",
    "option_text": "Muz ko‘payishi"
  },
  {
    "id": 117061,
    "question_id": 11706,
    "option_label": "A",
    "option_text": "Abiotik qatlam"
  },
  {
    "id": 117062,
    "question_id": 11706,
    "option_label": "B",
    "option_text": "Ozon qatlami"
  },
  {
    "id": 117063,
    "question_id": 11706,
    "option_label": "C",
    "option_text": "Kislorod qatlami"
  },
  {
    "id": 117064,
    "question_id": 11706,
    "option_label": "D",
    "option_text": "Bulut"
  },
  {
    "id": 117071,
    "question_id": 11707,
    "option_label": "A",
    "option_text": "Velosiped"
  },
  {
    "id": 117072,
    "question_id": 11707,
    "option_label": "B",
    "option_text": "Muzlatkich va konditsioner"
  },
  {
    "id": 117073,
    "question_id": 11707,
    "option_label": "C",
    "option_text": "Kompyuter"
  },
  {
    "id": 117074,
    "question_id": 11707,
    "option_label": "D",
    "option_text": "Kitob"
  },
  {
    "id": 117081,
    "question_id": 11708,
    "option_label": "A",
    "option_text": "Foydali nurlar"
  },
  {
    "id": 117082,
    "question_id": 11708,
    "option_label": "B",
    "option_text": "Zararli quyosh nurlari"
  },
  {
    "id": 117083,
    "question_id": 11708,
    "option_label": "C",
    "option_text": "Oy nuri"
  },
  {
    "id": 117084,
    "question_id": 11708,
    "option_label": "D",
    "option_text": "Hech qanday nur"
  },
  {
    "id": 117091,
    "question_id": 11709,
    "option_label": "A",
    "option_text": "Gripp"
  },
  {
    "id": 117092,
    "question_id": 11709,
    "option_label": "B",
    "option_text": "Terining xavfli o‘sma kasalligi"
  },
  {
    "id": 117093,
    "question_id": 11709,
    "option_label": "C",
    "option_text": "Ko‘z og‘rig‘i"
  },
  {
    "id": 117094,
    "question_id": 11709,
    "option_label": "D",
    "option_text": "Ishtahasizlik"
  },
  {
    "id": 117101,
    "question_id": 11710,
    "option_label": "A",
    "option_text": "Ekologik muvozanat buziladi"
  },
  {
    "id": 117102,
    "question_id": 11710,
    "option_label": "B",
    "option_text": "Hayvonlar ko‘payadi"
  },
  {
    "id": 117103,
    "question_id": 11710,
    "option_label": "C",
    "option_text": "Suv tozaladi"
  },
  {
    "id": 117104,
    "question_id": 11710,
    "option_label": "D",
    "option_text": "Havo soviydi"
  },
  {
    "id": 117111,
    "question_id": 11711,
    "option_label": "A",
    "option_text": "Matematika"
  },
  {
    "id": 117112,
    "question_id": 11711,
    "option_label": "B",
    "option_text": "Biologiya"
  },
  {
    "id": 117113,
    "question_id": 11711,
    "option_label": "C",
    "option_text": "Tarix"
  },
  {
    "id": 117114,
    "question_id": 11711,
    "option_label": "D",
    "option_text": "Ona tili"
  },
  {
    "id": 117121,
    "question_id": 11712,
    "option_label": "A",
    "option_text": "Quyoshdan"
  },
  {
    "id": 117122,
    "question_id": 11712,
    "option_label": "B",
    "option_text": "Olovdan"
  },
  {
    "id": 117123,
    "question_id": 11712,
    "option_label": "C",
    "option_text": "Elektrdan"
  },
  {
    "id": 117124,
    "question_id": 11712,
    "option_label": "D",
    "option_text": "Gazdan"
  },
  {
    "id": 117131,
    "question_id": 11713,
    "option_label": "A",
    "option_text": "Kislorod va ozuqa"
  },
  {
    "id": 117132,
    "question_id": 11713,
    "option_label": "B",
    "option_text": "Faqat suv"
  },
  {
    "id": 117133,
    "question_id": 11713,
    "option_label": "C",
    "option_text": "Faqat oltin"
  },
  {
    "id": 117134,
    "question_id": 11713,
    "option_label": "D",
    "option_text": "Faqat tosh"
  },
  {
    "id": 117141,
    "question_id": 11714,
    "option_label": "A",
    "option_text": "Faqat ijobiy"
  },
  {
    "id": 117142,
    "question_id": 11714,
    "option_label": "B",
    "option_text": "Daryo va dengizlarning qurishiga olib kelishi mumkin"
  },
  {
    "id": 117143,
    "question_id": 11714,
    "option_label": "C",
    "option_text": "Hech qanday ta’sir qilmaydi"
  },
  {
    "id": 117144,
    "question_id": 11714,
    "option_label": "D",
    "option_text": "Yomg‘irni ko‘paytiradi"
  },
  {
    "id": 117151,
    "question_id": 11715,
    "option_label": "A",
    "option_text": "Havo haroratini"
  },
  {
    "id": 117152,
    "question_id": 11715,
    "option_label": "B",
    "option_text": "Faqat yer ostini"
  },
  {
    "id": 117153,
    "question_id": 11715,
    "option_label": "C",
    "option_text": "Faqat okeanni"
  },
  {
    "id": 117154,
    "question_id": 11715,
    "option_label": "D",
    "option_text": "Faqat kitoblarni"
  },
  {
    "id": 117161,
    "question_id": 11716,
    "option_label": "A",
    "option_text": "Salbiy"
  },
  {
    "id": 117162,
    "question_id": 11716,
    "option_label": "B",
    "option_text": "Ijobiy"
  },
  {
    "id": 117163,
    "question_id": 11716,
    "option_label": "C",
    "option_text": "Antropogen salbiy"
  },
  {
    "id": 117164,
    "question_id": 11716,
    "option_label": "D",
    "option_text": "Abiotik"
  },
  {
    "id": 117171,
    "question_id": 11717,
    "option_label": "A",
    "option_text": "Salbiy antropogen ta’sir"
  },
  {
    "id": 117172,
    "question_id": 11717,
    "option_label": "B",
    "option_text": "Ijobiy ta’sir"
  },
  {
    "id": 117173,
    "question_id": 11717,
    "option_label": "C",
    "option_text": "Biotik omil"
  },
  {
    "id": 117174,
    "question_id": 11717,
    "option_label": "D",
    "option_text": "Tabiatni asrash"
  },
  {
    "id": 117181,
    "question_id": 11718,
    "option_label": "A",
    "option_text": "Tabiat boyliklaridan oqilona foydalanish"
  },
  {
    "id": 117182,
    "question_id": 11718,
    "option_label": "B",
    "option_text": "Hamma daraxtni kesish"
  },
  {
    "id": 117183,
    "question_id": 11718,
    "option_label": "C",
    "option_text": "Avtomobillarni ko‘paytirish"
  },
  {
    "id": 117184,
    "question_id": 11718,
    "option_label": "D",
    "option_text": "Suvni ko‘p isrof qilish"
  },
  {
    "id": 117191,
    "question_id": 11719,
    "option_label": "A",
    "option_text": "Oq"
  },
  {
    "id": 117192,
    "question_id": 11719,
    "option_label": "B",
    "option_text": "Qora"
  },
  {
    "id": 117193,
    "question_id": 11719,
    "option_label": "C",
    "option_text": "Yashil"
  },
  {
    "id": 117194,
    "question_id": 11719,
    "option_label": "D",
    "option_text": "Sariq"
  },
  {
    "id": 117201,
    "question_id": 11720,
    "option_label": "A",
    "option_text": "Faqat uxlash"
  },
  {
    "id": 117202,
    "question_id": 11720,
    "option_label": "B",
    "option_text": "Tabiatga ta’sir ko‘rsatadi"
  },
  {
    "id": 117203,
    "question_id": 11720,
    "option_label": "C",
    "option_text": "Hech narsa qilmaydi"
  },
  {
    "id": 117204,
    "question_id": 11720,
    "option_label": "D",
    "option_text": "Faqat kitob o‘qiydi"
  },
  {
    "id": 118011,
    "question_id": 11801,
    "option_label": "A",
    "option_text": "Milliy bog‘"
  },
  {
    "id": 118012,
    "question_id": 11801,
    "option_label": "B",
    "option_text": "Qo‘riqxona"
  },
  {
    "id": 118013,
    "question_id": 11801,
    "option_label": "C",
    "option_text": "Buyurtmaxona"
  },
  {
    "id": 118014,
    "question_id": 11801,
    "option_label": "D",
    "option_text": "Maktab"
  },
  {
    "id": 118021,
    "question_id": 11802,
    "option_label": "A",
    "option_text": "Sayr qilish"
  },
  {
    "id": 118022,
    "question_id": 11802,
    "option_label": "B",
    "option_text": "Mol boqish va hayvon ovlash"
  },
  {
    "id": 118023,
    "question_id": 11802,
    "option_label": "C",
    "option_text": "Suratga olish"
  },
  {
    "id": 118024,
    "question_id": 11802,
    "option_label": "D",
    "option_text": "Kuzatish"
  },
  {
    "id": 118031,
    "question_id": 11803,
    "option_label": "A",
    "option_text": "Qo‘riqxona"
  },
  {
    "id": 118032,
    "question_id": 11803,
    "option_label": "B",
    "option_text": "Buyurtmaxona"
  },
  {
    "id": 118033,
    "question_id": 11803,
    "option_label": "C",
    "option_text": "Milliy bog‘"
  },
  {
    "id": 118034,
    "question_id": 11803,
    "option_label": "D",
    "option_text": "Sharshara"
  },
  {
    "id": 118041,
    "question_id": 11804,
    "option_label": "A",
    "option_text": "Qo‘riqxona"
  },
  {
    "id": 118042,
    "question_id": 11804,
    "option_label": "B",
    "option_text": "Buyurtmaxona"
  },
  {
    "id": 118043,
    "question_id": 11804,
    "option_label": "C",
    "option_text": "Milliy bog‘"
  },
  {
    "id": 118044,
    "question_id": 11804,
    "option_label": "D",
    "option_text": "Buloq"
  },
  {
    "id": 118051,
    "question_id": 11805,
    "option_label": "A",
    "option_text": "Milliy bog‘"
  },
  {
    "id": 118052,
    "question_id": 11805,
    "option_label": "B",
    "option_text": "Tabiat yodgorliklari"
  },
  {
    "id": 118053,
    "question_id": 11805,
    "option_label": "C",
    "option_text": "Qo‘riqxona"
  },
  {
    "id": 118054,
    "question_id": 11805,
    "option_label": "D",
    "option_text": "Tomorqa"
  },
  {
    "id": 118061,
    "question_id": 11806,
    "option_label": "A",
    "option_text": "Sotish uchun"
  },
  {
    "id": 118062,
    "question_id": 11806,
    "option_label": "B",
    "option_text": "Yo‘qolib ketayotgan turlarni saqlash va ogohlantirish uchun"
  },
  {
    "id": 118063,
    "question_id": 11806,
    "option_label": "C",
    "option_text": "Faqat rasm ko‘rish uchun"
  },
  {
    "id": 118064,
    "question_id": 11806,
    "option_label": "D",
    "option_text": "O‘simlik ekish uchun"
  },
  {
    "id": 118071,
    "question_id": 11807,
    "option_label": "A",
    "option_text": "1979"
  },
  {
    "id": 118072,
    "question_id": 11807,
    "option_label": "B",
    "option_text": "1983 (Hayvonlar uchun)"
  },
  {
    "id": 118073,
    "question_id": 11807,
    "option_label": "C",
    "option_text": "1984 (O‘simliklar uchun)"
  },
  {
    "id": 118074,
    "question_id": 11807,
    "option_label": "D",
    "option_text": "2000"
  },
  {
    "id": 118081,
    "question_id": 11808,
    "option_label": "A",
    "option_text": "Safsan xurmosi"
  },
  {
    "id": 118082,
    "question_id": 11808,
    "option_label": "B",
    "option_text": "Yovvoyi tok"
  },
  {
    "id": 118083,
    "question_id": 11808,
    "option_label": "C",
    "option_text": "Xolmon isirg‘aguli"
  },
  {
    "id": 118084,
    "question_id": 11808,
    "option_label": "D",
    "option_text": "Archa"
  },
  {
    "id": 118091,
    "question_id": 11809,
    "option_label": "A",
    "option_text": "Yovvoyi tok"
  },
  {
    "id": 118092,
    "question_id": 11809,
    "option_label": "B",
    "option_text": "Xolmon isirg‘aguli"
  },
  {
    "id": 118093,
    "question_id": 11809,
    "option_label": "C",
    "option_text": "Safsan xurmosi"
  },
  {
    "id": 118094,
    "question_id": 11809,
    "option_label": "D",
    "option_text": "Na’matak"
  },
  {
    "id": 118101,
    "question_id": 11810,
    "option_label": "A",
    "option_text": "Faqat cho‘lda"
  },
  {
    "id": 118102,
    "question_id": 11810,
    "option_label": "B",
    "option_text": "To‘qayzor va qumli cho‘llarda"
  },
  {
    "id": 118103,
    "question_id": 11810,
    "option_label": "C",
    "option_text": "Faqat tog‘da"
  },
  {
    "id": 118104,
    "question_id": 11810,
    "option_label": "D",
    "option_text": "Okeanda"
  },
  {
    "id": 118111,
    "question_id": 11811,
    "option_label": "A",
    "option_text": "Shoxi bo‘lmaydi"
  },
  {
    "id": 118112,
    "question_id": 11811,
    "option_label": "B",
    "option_text": "Shoxi juda katta"
  },
  {
    "id": 118113,
    "question_id": 11811,
    "option_label": "C",
    "option_text": "Suvda yashaydi"
  },
  {
    "id": 118114,
    "question_id": 11811,
    "option_label": "D",
    "option_text": "Faqat go‘sht yeydi"
  },
  {
    "id": 118121,
    "question_id": 11812,
    "option_label": "A",
    "option_text": "Kaptar"
  },
  {
    "id": 118122,
    "question_id": 11812,
    "option_label": "B",
    "option_text": "Yo‘rg‘a tuvaloq"
  },
  {
    "id": 118123,
    "question_id": 11812,
    "option_label": "C",
    "option_text": "Burgut"
  },
  {
    "id": 118124,
    "question_id": 11812,
    "option_label": "D",
    "option_text": "Tovus"
  },
  {
    "id": 118131,
    "question_id": 11813,
    "option_label": "A",
    "option_text": "Dori uchun"
  },
  {
    "id": 118132,
    "question_id": 11813,
    "option_label": "B",
    "option_text": "Qurilish va o‘tin uchun"
  },
  {
    "id": 118133,
    "question_id": 11813,
    "option_label": "C",
    "option_text": "Gul uchun"
  },
  {
    "id": 118134,
    "question_id": 11813,
    "option_label": "D",
    "option_text": "Hech narsa uchun"
  },
  {
    "id": 118141,
    "question_id": 11814,
    "option_label": "A",
    "option_text": "Tog‘ nomlari"
  },
  {
    "id": 118142,
    "question_id": 11814,
    "option_label": "B",
    "option_text": "Davlat qo‘riqxonalari"
  },
  {
    "id": 118143,
    "question_id": 11814,
    "option_label": "C",
    "option_text": "Milliy bog‘lar"
  },
  {
    "id": 118144,
    "question_id": 11814,
    "option_label": "D",
    "option_text": "Shahar nomlari"
  },
  {
    "id": 118151,
    "question_id": 11815,
    "option_label": "A",
    "option_text": "Obirahmat"
  },
  {
    "id": 118152,
    "question_id": 11815,
    "option_label": "B",
    "option_text": "Teshiktosh"
  },
  {
    "id": 118153,
    "question_id": 11815,
    "option_label": "C",
    "option_text": "Xo‘jakent"
  },
  {
    "id": 118154,
    "question_id": 11815,
    "option_label": "D",
    "option_text": "Hisor"
  },
  {
    "id": 118161,
    "question_id": 11816,
    "option_label": "A",
    "option_text": "Xo‘jakentda"
  },
  {
    "id": 118162,
    "question_id": 11816,
    "option_label": "B",
    "option_text": "Toshkentda"
  },
  {
    "id": 118163,
    "question_id": 11816,
    "option_label": "C",
    "option_text": "Farg‘onada"
  },
  {
    "id": 118164,
    "question_id": 11816,
    "option_label": "D",
    "option_text": "Xivada"
  },
  {
    "id": 118171,
    "question_id": 11817,
    "option_label": "A",
    "option_text": "Fizika instituti"
  },
  {
    "id": 118172,
    "question_id": 11817,
    "option_label": "B",
    "option_text": "Zoologiya va Botanika institutlari"
  },
  {
    "id": 118173,
    "question_id": 11817,
    "option_label": "C",
    "option_text": "Tarix instituti"
  },
  {
    "id": 118174,
    "question_id": 11817,
    "option_label": "D",
    "option_text": "Adabiyot instituti"
  },
  {
    "id": 118181,
    "question_id": 11818,
    "option_label": "A",
    "option_text": "Qo‘riqxona"
  },
  {
    "id": 118182,
    "question_id": 11818,
    "option_label": "B",
    "option_text": "Milliy bog‘"
  },
  {
    "id": 118183,
    "question_id": 11818,
    "option_label": "C",
    "option_text": "Sanoat zonasi"
  },
  {
    "id": 118184,
    "question_id": 11818,
    "option_label": "D",
    "option_text": "Cho‘l"
  },
  {
    "id": 118191,
    "question_id": 11819,
    "option_label": "A",
    "option_text": "Yanvar"
  },
  {
    "id": 118192,
    "question_id": 11819,
    "option_label": "B",
    "option_text": "Iyun-iyul"
  },
  {
    "id": 118193,
    "question_id": 11819,
    "option_label": "C",
    "option_text": "Dekabr"
  },
  {
    "id": 118194,
    "question_id": 11819,
    "option_label": "D",
    "option_text": "Sentyabr"
  },
  {
    "id": 118201,
    "question_id": 11820,
    "option_label": "A",
    "option_text": "«Tabiatni muhofaza qilish to‘g‘risida»gi qonunga"
  },
  {
    "id": 118202,
    "question_id": 11820,
    "option_label": "B",
    "option_text": "Hech qanday qonunga"
  },
  {
    "id": 118203,
    "question_id": 11820,
    "option_label": "C",
    "option_text": "Faqat maktab qoidasiga"
  },
  {
    "id": 118204,
    "question_id": 11820,
    "option_label": "D",
    "option_text": "Faqat ota-ona so‘ziga"
  },

  // 6-Sinf options
  { id: 301, question_id: 201, option_label: "A", option_text: "Grekcha 'botane' (ko'kat, o't)" },
  { id: 302, question_id: 201, option_label: "B", option_text: "Lotincha 'flora' (o'simlik)" },
  { id: 303, question_id: 201, option_label: "C", option_text: "Arabcha 'nabotot' (o'simlik)" },
  { id: 304, question_id: 201, option_label: "D", option_text: "Inglizcha 'plant' (o'simlik)" },

  { id: 305, question_id: 202, option_label: "A", option_text: "Daraxt" },
  { id: 306, question_id: 202, option_label: "B", option_text: "Buta" },
  { id: 307, question_id: 202, option_label: "C", option_text: "O't" },
  { id: 308, question_id: 202, option_label: "D", option_text: "Liana" },

  { id: 309, question_id: 203, option_label: "A", option_text: "Havo" },
  { id: 310, question_id: 203, option_label: "B", option_text: "Yog' kislotalari" },
  { id: 311, question_id: 203, option_label: "C", option_text: "Hujayra sharbati (suv va erigan oziqlar)" },
  { id: 312, question_id: 203, option_label: "D", option_text: "Kraxlmal to'plami" },

  { id: 313, question_id: 204, option_label: "A", option_text: "Hosil qiluvchi to'qima (meristema)" },
  { id: 314, question_id: 204, option_label: "B", option_text: "Mexanik to'qima" },
  { id: 315, question_id: 204, option_label: "C", option_text: "Qoplovchi to'qima" },
  { id: 316, question_id: 204, option_label: "D", option_text: "O'tkazuvchi to'qima" },

  { id: 317, question_id: 205, option_label: "A", option_text: "O'q ildiz tizimi" },
  { id: 318, question_id: 205, option_label: "B", option_text: "Popuk ildiz tizimi" },
  { id: 319, question_id: 205, option_label: "C", option_text: "Qo'shimcha ildiz tizimi" },
  { id: 320, question_id: 205, option_label: "D", option_text: "Ildizpoya" },

  { id: 321, question_id: 206, option_label: "A", option_text: "Po'stloq" },
  { id: 322, question_id: 206, option_label: "B", option_text: "Kambiy" },
  { id: 323, question_id: 206, option_label: "C", option_text: "Yog'ochlik" },
  { id: 324, question_id: 206, option_label: "D", option_text: "O'zak" },

  { id: 325, question_id: 207, option_label: "A", option_text: "Changchilarda" },
  { id: 326, question_id: 207, option_label: "B", option_text: "Urug'chida" },
  { id: 327, question_id: 207, option_label: "C", option_text: "Gulkosada" },
  { id: 328, question_id: 207, option_label: "D", option_text: "Gultojida" },

  { id: 329, question_id: 208, option_label: "A", option_text: "Ildiz bosimi" },
  { id: 330, question_id: 208, option_label: "B", option_text: "Transpiratsiya tortish kuchi" },
  { id: 331, question_id: 208, option_label: "C", option_text: "Osmos kuchi" },
  { id: 332, question_id: 208, option_label: "D", option_text: "Kaping hisobiga" },

  { id: 333, question_id: 209, option_label: "A", option_text: "Mitoxondriyada" },
  { id: 334, question_id: 209, option_label: "B", option_text: "Yadroda" },
  { id: 335, question_id: 209, option_label: "C", option_text: "Xloroplastlarda" },
  { id: 336, question_id: 209, option_label: "D", option_text: "Vakuolada" },

  { id: 337, question_id: 210, option_label: "A", option_text: "Ch.Darvin" },
  { id: 338, question_id: 210, option_label: "B", option_text: "S.G.Navashin" },
  { id: 339, question_id: 210, option_label: "C", option_text: "I.V.Michurin" },
  { id: 340, question_id: 210, option_label: "D", option_text: "G.Mendel" },

  { id: 341, question_id: 211, option_label: "A", option_text: "Xlamidomonada" },
  { id: 342, question_id: 211, option_label: "B", option_text: "Xlorella" },
  { id: 343, question_id: 211, option_label: "C", option_text: "Ulotriks" },
  { id: 344, question_id: 211, option_label: "D", option_text: "Spirogira" },

  { id: 345, question_id: 212, option_label: "A", option_text: "Ildizlar" },
  { id: 346, question_id: 212, option_label: "B", option_text: "Rizoidlar" },
  { id: 347, question_id: 212, option_label: "C", option_text: "Sporalar" },
  { id: 348, question_id: 212, option_label: "D", option_text: "Tallom" },

  { id: 349, question_id: 213, option_label: "A", option_text: "Archa" },
  { id: 350, question_id: 213, option_label: "B", option_text: "Olma" },
  { id: 351, question_id: 213, option_label: "C", option_text: "Terak" },
  { id: 352, question_id: 213, option_label: "D", option_text: "Qirqquloq" },

  { id: 353, question_id: 214, option_label: "A", option_text: "Achitqi bakteriyalari" },
  { id: 354, question_id: 214, option_label: "B", option_text: "Saprofitlar" },
  { id: 355, question_id: 214, option_label: "C", option_text: "Tugunak bakteriyalari" },
  { id: 356, question_id: 214, option_label: "D", option_text: "Kasallik tarqatuvchilar" },

  { id: 357, question_id: 215, option_label: "A", option_text: "Yog'ochlashgan poya" },
  { id: 358, question_id: 215, option_label: "B", option_text: "Somon poya" },
  { id: 359, question_id: 215, option_label: "C", option_text: "Sudraluvchi poya" },
  { id: 360, question_id: 215, option_label: "D", option_text: "Chirmashuvchi poya" },

  // 7-Sinf Zoologiya Options
  { id: 501, question_id: 301, option_label: "A", option_text: "O'simliklarni" },
  { id: 502, question_id: 301, option_label: "B", option_text: "Hayvonlarni" },
  { id: 503, question_id: 301, option_label: "C", option_text: "Zamburug'larni" },
  { id: 504, question_id: 301, option_label: "D", option_text: "Bakteriyalarni" },
  { id: 505, question_id: 302, option_label: "A", option_text: "Kiprikchalar" },
  { id: 506, question_id: 302, option_label: "B", option_text: "Xivchinlar" },
  { id: 507, question_id: 302, option_label: "C", option_text: "Soxta oyoqlar" },
  { id: 508, question_id: 302, option_label: "D", option_text: "Qanotlar" },
  { id: 509, question_id: 303, option_label: "A", option_text: "1 ta" },
  { id: 510, question_id: 303, option_label: "B", option_text: "2 ta" },
  { id: 511, question_id: 303, option_label: "C", option_text: "3 ta" },
  { id: 512, question_id: 303, option_label: "D", option_text: "4 ta" },
  { id: 513, question_id: 304, option_label: "A", option_text: "Tuproqni ishlaydi va unumdorligini oshiradi" },
  { id: 514, question_id: 304, option_label: "B", option_text: "Hasharotlarni yeydi" },
  { id: 515, question_id: 304, option_label: "C", option_text: "O'simliklarni changlatadi" },
  { id: 516, question_id: 304, option_label: "D", option_text: "Suvni tozalaydi" },
  { id: 517, question_id: 305, option_label: "A", option_text: "8 ta" },
  { id: 518, question_id: 305, option_label: "B", option_text: "6 ta" },
  { id: 519, question_id: 305, option_label: "C", option_text: "4 ta" },
  { id: 520, question_id: 305, option_label: "D", option_text: "10 ta" },
  { id: 521, question_id: 306, option_label: "A", option_text: "Jabra orqali" },
  { id: 522, question_id: 306, option_label: "B", option_text: "O'pka orqali" },
  { id: 523, question_id: 306, option_label: "C", option_text: "Teri orqali" },
  { id: 524, question_id: 306, option_label: "D", option_text: "Traxeya orqali" },
  { id: 525, question_id: 307, option_label: "A", option_text: "Tangachalar" },
  { id: 526, question_id: 307, option_label: "B", option_text: "Pat va parlar" },
  { id: 527, question_id: 307, option_label: "C", option_text: "Jun" },
  { id: 528, question_id: 307, option_label: "D", option_text: "Tikan" },
  { id: 529, question_id: 308, option_label: "A", option_text: "Bolasini tirik tug'ib, sut bilan boqishi" },
  { id: 530, question_id: 308, option_label: "B", option_text: "Tuxum qo'yishi" },
  { id: 531, question_id: 308, option_label: "C", option_text: "Suvda yashashi" },
  { id: 532, question_id: 308, option_label: "D", option_text: "Uchishi" },

  // 8-Sinf Odam va uning salomatligi Options
  { id: 601, question_id: 401, option_label: "A", option_text: "2 ta" },
  { id: 602, question_id: 401, option_label: "B", option_text: "3 ta" },
  { id: 603, question_id: 401, option_label: "C", option_text: "4 ta" },
  { id: 604, question_id: 401, option_label: "D", option_text: "5 ta" },
  { id: 605, question_id: 402, option_label: "A", option_text: "Buyrak va jigar" },
  { id: 606, question_id: 402, option_label: "B", option_text: "Bosh miya va orqa miya" },
  { id: 607, question_id: 402, option_label: "C", option_text: "Nervlar va tugunlar" },
  { id: 608, question_id: 402, option_label: "D", option_text: "Ko'z va quloq" },
  { id: 609, question_id: 403, option_label: "A", option_text: "106 ta" },
  { id: 610, question_id: 403, option_label: "B", option_text: "206 ta" },
  { id: 611, question_id: 403, option_label: "C", option_text: "306 ta" },
  { id: 612, question_id: 403, option_label: "D", option_text: "156 ta" },
  { id: 613, question_id: 404, option_label: "A", option_text: "Eritrositlar" },
  { id: 614, question_id: 404, option_label: "B", option_text: "Leykositlar" },
  { id: 615, question_id: 404, option_label: "C", option_text: "Trombotsitlar" },
  { id: 616, question_id: 404, option_label: "D", option_text: "Plazma" },
  { id: 617, question_id: 405, option_label: "A", option_text: "2 ta" },
  { id: 618, question_id: 405, option_label: "B", option_text: "3 ta" },
  { id: 619, question_id: 405, option_label: "C", option_text: "4 ta" },
  { id: 620, question_id: 405, option_label: "D", option_text: "6 ta" },
  { id: 621, question_id: 406, option_label: "A", option_text: "2 ta" },
  { id: 622, question_id: 406, option_label: "B", option_text: "3 ta" },
  { id: 623, question_id: 406, option_label: "C", option_text: "4 ta" },
  { id: 624, question_id: 406, option_label: "D", option_text: "5 ta" },
  { id: 625, question_id: 407, option_label: "A", option_text: "A vitamini" },
  { id: 626, question_id: 407, option_label: "B", option_text: "B vitamini" },
  { id: 627, question_id: 407, option_label: "C", option_text: "C vitamini" },
  { id: 628, question_id: 407, option_label: "D", option_text: "D vitamini" },
  { id: 629, question_id: 408, option_label: "A", option_text: "Bosh miya po'stlog'ida" },
  { id: 630, question_id: 408, option_label: "B", option_text: "Orqa miyada" },
  { id: 631, question_id: 408, option_label: "C", option_text: "Miyachada" },
  { id: 632, question_id: 408, option_label: "D", option_text: "Uzunchoq miyada" },

  // 9-Sinf Sitologiya va Genetika Options
  { id: 701, question_id: 501, option_label: "A", option_text: "R.Guk va A.Levenguk" },
  { id: 702, question_id: 501, option_label: "B", option_text: "M.Shleyden va T.Shvann" },
  { id: 703, question_id: 501, option_label: "C", option_text: "Ch.Darvin va G.Mendel" },
  { id: 704, question_id: 501, option_label: "D", option_text: "R.Virxov va L.Paster" },
  { id: 705, question_id: 502, option_label: "A", option_text: "DNK" },
  { id: 706, question_id: 502, option_label: "B", option_text: "RNK" },
  { id: 707, question_id: 502, option_label: "C", option_text: "ATF" },
  { id: 708, question_id: 502, option_label: "D", option_text: "Oqsil" },
  { id: 709, question_id: 503, option_label: "A", option_text: "Ribosomada" },
  { id: 710, question_id: 503, option_label: "B", option_text: "Mitoxondriyada" },
  { id: 711, question_id: 503, option_label: "C", option_text: "Yadroda" },
  { id: 712, question_id: 503, option_label: "D", option_text: "Lizosomada" },
  { id: 713, question_id: 504, option_label: "A", option_text: "2 ta" },
  { id: 714, question_id: 504, option_label: "B", option_text: "4 ta" },
  { id: 715, question_id: 504, option_label: "C", option_text: "8 ta" },
  { id: 716, question_id: 504, option_label: "D", option_text: "1 ta" },
  { id: 717, question_id: 505, option_label: "A", option_text: "2 ta" },
  { id: 718, question_id: 505, option_label: "B", option_text: "3 ta" },
  { id: 719, question_id: 505, option_label: "C", option_text: "4 ta" },
  { id: 720, question_id: 505, option_label: "D", option_text: "8 ta" },
  { id: 721, question_id: 506, option_label: "A", option_text: "1:1" },
  { id: 722, question_id: 506, option_label: "B", option_text: "3:1" },
  { id: 723, question_id: 506, option_label: "C", option_text: "9:3:3:1" },
  { id: 724, question_id: 506, option_label: "D", option_text: "1:2:1" },
  { id: 725, question_id: 507, option_label: "A", option_text: "XX" },
  { id: 726, question_id: 507, option_label: "B", option_text: "XY" },
  { id: 727, question_id: 507, option_label: "C", option_text: "YY" },
  { id: 728, question_id: 507, option_label: "D", option_text: "XO" },
  { id: 729, question_id: 508, option_label: "A", option_text: "N.I.Vavilov" },
  { id: 730, question_id: 508, option_label: "B", option_text: "G.Mendel" },
  { id: 731, question_id: 508, option_label: "C", option_text: "Ch.Darvin" },
  { id: 732, question_id: 508, option_label: "D", option_text: "I.V.Michurin" },

  // 10-Sinf options
  { id: 801, question_id: 601, option_label: "A", option_text: "Molekulyar darajada" },
  { id: 802, question_id: 601, option_label: "B", option_text: "Hujayra darajasida" },
  { id: 803, question_id: 601, option_label: "C", option_text: "Organizm darajasida" },
  { id: 804, question_id: 601, option_label: "D", option_text: "Biosfera darajasida" },
  
  { id: 805, question_id: 602, option_label: "A", option_text: "Peptid bog'" },
  { id: 806, question_id: 602, option_label: "B", option_text: "Vodorod bog'" },
  { id: 807, question_id: 602, option_label: "C", option_text: "Ion bog'" },
  { id: 808, question_id: 602, option_label: "D", option_text: "Kovalent bog'" },

  // 11-Sinf options
  { id: 901, question_id: 701, option_label: "A", option_text: "Organizmlarning mutatsiyaga uchrashi" },
  { id: 902, question_id: 701, option_label: "B", option_text: "Organizmlarning muhitga moslashishi" },
  { id: 903, question_id: 701, option_label: "C", option_text: "Yangi turlarning yo'q bo'lib ketishi" },
  { id: 904, question_id: 701, option_label: "D", option_text: "Jinsiy ko'payishning tezlashishi" },

  { id: 905, question_id: 702, option_label: "A", option_text: "Produtsentlar" },
  { id: 906, question_id: 702, option_label: "B", option_text: "Konsumentlar" },
  { id: 907, question_id: 702, option_label: "C", option_text: "Redutsentlar" },
  { id: 908, question_id: 702, option_label: "D", option_text: "Avtotroflar" }
];

const initialUsers = [
  { id: "admin-id", email: "admin@biosmart.uz", phone: "+998901234567", password: "admin123" },
  { id: "user-id", email: "user@biosmart.uz", phone: "+998907654321", password: "user123" }
];

const initialProfiles = [
  { id: "admin-id", full_name: "Admin E-Learning", role: "admin", grade: "11-sinf", is_pro: true, created_at: new Date().toISOString() },
  { id: "user-id", full_name: "Tolibjon Olimov", role: "user", grade: "5-sinf", is_pro: false, created_at: new Date().toISOString() }
];

// Seed function — merges initial seed data without overwriting user-created records
const seedLocalDB = () => {
  if (localStorage.getItem("biosmart_seeded_v4") === "true") {
    return;
  }
  localStorage.setItem("biosmart_did_you_know", JSON.stringify(initialFacts));
  localStorage.setItem("biosmart_grades", JSON.stringify(initialGrades));
  localStorage.setItem("biosmart_subjects", JSON.stringify(initialSubjects));
  localStorage.setItem("biosmart_topics", JSON.stringify(initialTopics));
  localStorage.setItem("biosmart_questions", JSON.stringify(initialQuestions));
  localStorage.setItem("biosmart_question_options", JSON.stringify(initialQuestionOptions));

  // Merge users: ensure seed accounts exist but don't overwrite user-registered accounts
  const existingUsers = JSON.parse(localStorage.getItem("biosmart_users") || '[]');
  const mergedUsers = [...existingUsers];
  initialUsers.forEach(seed => {
    if (!mergedUsers.some(u => u.id === seed.id)) {
      mergedUsers.push(seed);
    }
  });
  localStorage.setItem("biosmart_users", JSON.stringify(mergedUsers));

  // Merge profiles: same approach — keep user-created profiles intact
  const existingProfiles = JSON.parse(localStorage.getItem("biosmart_profiles") || '[]');
  const mergedProfiles = [...existingProfiles];
  initialProfiles.forEach(seed => {
    if (!mergedProfiles.some(p => p.id === seed.id)) {
      mergedProfiles.push(seed);
    }
  });
  localStorage.setItem("biosmart_profiles", JSON.stringify(mergedProfiles));

  if (!localStorage.getItem("biosmart_test_attempts")) {
    localStorage.setItem("biosmart_test_attempts", JSON.stringify([]));
  }
  if (!localStorage.getItem("biosmart_certificates")) {
    localStorage.setItem("biosmart_certificates", JSON.stringify([]));
  }
  if (!localStorage.getItem("biosmart_user_progress")) {
    localStorage.setItem("biosmart_user_progress", JSON.stringify([]));
  }
  localStorage.setItem("biosmart_seeded_v4", "true");
};

seedLocalDB();

// Dynamic Question Generator producing 100 unique questions per topic on-the-fly
function generate100QuestionsForTopic(topicId) {
  const topics = JSON.parse(localStorage.getItem('biosmart_topics') || '[]');
  const topic = topics.find(t => t.id === topicId) || { title: "Biologiya", subject_id: 1 };
  const title = topic.title || "Biologiya";
  const subId = topic.subject_id;

  let category = "general";
  if (subId === 2 || /o'simlik|botanika|ildiz|poya|barg|gul|meva|urug'|suvo't|yo'sin|oila|karam|ra'no|bug'doy/i.test(title)) {
    category = "botany";
  } else if (subId === 3 || /hayvon|zoologiya|amyoba|baliq|qush|sutemizuvchi|bo'g'imoyoq|chuvalchang/i.test(title)) {
    category = "zoology";
  } else if (subId === 4 || /odam|suyak|skelet|mushak|qon|yurak|nafas|hazm|vitamin|teri|sezgi|nerv|miya/i.test(title)) {
    category = "anatomy";
  } else if (subId === 5 || subId === 6 || /genetika|gen|hujayra|mitoz|meyoz|dnk|rnk|oqsil|organoid|fotosintez/i.test(title)) {
    category = "genetics";
  }

  // Linear Congruential Generator (Deterministic PRNG)
  function sRandom(seed) {
    let x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  }

  const categoryData = {
    botany: {
      terms: [
        { term: "Ildiz", def: "suv va mineral moddalarni shimish hamda o'simlikni tuproqqa mahkamlash" },
        { term: "Poya", def: "barg va kurtaklarni ko'tarib turish va moddalarni o'tkazish" },
        { term: "Barg", def: "fotosintez, transpiratsiya (suv bug'latish) va gaz almashinuvi organi" },
        { term: "Gul", def: "changlanish, urug'lanish va ko'payish vazifasini bajaruvchi organ" },
        { term: "Meva", def: "urug'ni tashqi ta'sirlardan himoya qilish va tarqalishiga yordam berish" },
        { term: "Urug'", def: "yangi o'simlik murtagini saqlaydigan va ko'payishga xizmat qiladigan qism" },
        { term: "Kurtak", def: "kelajakda barg yoki gul hosil qiluvchi murtak poya" },
        { term: "Xloroplast", def: "fotosintez jarayonini yorug'likda amalga oshiruvchi yashil organoid" },
        { term: "Vakuola", def: "hujayra sharbatini to'plovchi va turgor bosimini ta'minlovchi bo'shliq" },
        { term: "Fotosintez", def: "noorganik moddalardan yorug'lik yordamida organik modda sintez qilish" },
        { term: "Transpiratsiya", def: "o'simlik barglari orqali suvni bug'latish jarayoni" },
        { term: "Kambiy", def: "poyaning yo'g'onlashishini (qalinlashishini) ta'minlovchi hosil qiluvchi to'qima" },
        { term: "Ksiloma", def: "suv va erigan mineral moddalarni yuqoriga o'tkazuvchi yog'ochlik naylari" },
        { term: "Floema", def: "tayyor organik ozuqalarni pastga o'tkazuvchi elaksimon naylar" },
        { term: "Tallom", def: "tuban o'simliklarning organlarga ajralmagan tanasi" },
        { term: "Rizoid", def: "yo'sinlarning ildiz o'rniga ishlaydigan soxta iplari" },
        { term: "Sporangiy", def: "sporalar yetiladigan va saqlanadigan maxsus organ" },
        { term: "Murtak", def: "urug' tarkibidagi yosh o'simlik boshlang'ichi" },
        { term: "Moychechak", def: "dorivor xususiyatga ega gulxayridoshlar yoki qoqo'tdoshlar oilasi vakili" },
        { term: "Karpat yo'sini", def: "nam joylarda o'suvchi yuksak sporalik o'simlik" }
      ],
      templates: [
        { q: "O'simliklar biologiyasida [term]ning asosiy vazifasi nima?", exp: "[term] o'simlik hayotida [def] funksiyasini bajaradi." },
        { q: "Quyidagilardan qaysi biri [def] vazifasini bajaradi?", exp: "Ushbu vazifa [term]ga tegishli." },
        { q: "[term] haqida qaysi ma'lumot ilmiy jihatdan to'g'ri?", exp: "[term] [def] uchun javobgardir." },
        { q: "O'simliklar dunyosida [def] jarayoni yoki qismi nima deb ataladi?", exp: "Bu [term] deb ataladi." }
      ]
    },
    zoology: {
      terms: [
        { term: "Amyoba", def: "soxta oyoqlari orqali harakatlanuvchi sodda bir hujayrali organizm" },
        { term: "Yashil evglena", def: "ham avtotrof (yorug'likda) ham geterotrof oziqlanuvchi mikroskopik organizm" },
        { term: "Infuzoriya tufelka", def: "kiprikchalarga ega va shakli doimiy bo'lgan bir hujayrali jonivor" },
        { term: "Meduza", def: "bo'shliqichlilar tipiga kiruvchi va soyabon shakliga ega dengiz organizmi" },
        { term: "Oq planariya", def: "erkin yashovchi, regeneratsiya qobiliyati kuchli yassi chuvalchang" },
        { term: "Jigar qo'ng'izi", def: "odam va chorva hayvonlarining jigarida parazitlik qiluvchi chuvalchang" },
        { term: "Askarida", def: "odamning ingichka ichagida yashovchi parazit to'garak chuvalchang" },
        { term: "Yomg'ir chuvalchangi", def: "tuproqni yumshatish va chirindi hosil qilishda qatnashuvchi halqali chuvalchang" },
        { term: "Zuluk", def: "tibbiyotda qon so'rish orqali davolashda ishlatiladigan halqali chuvalchang" },
        { term: "Kalmar", def: "boshoyoqli molyuskalar guruhiga kiruvchi tez suzar dengiz hayvoni" },
        { term: "Hasharotlar", def: "tanasi uch bo'limli, uch juft oyoqli va qanotli bo'g'imoyoqlilar" },
        { term: "Baliqlar", def: "suvda yashovchi, jabra bilan nafas oluvchi umurtqali hayvonlar" },
        { term: "Amfibiyalar", def: "suvda va quruqlikda yashovchi, lichinkasi jabra bilan nafas oluvchi hayvonlar" },
        { term: "Reptiliyalar", def: "quruqlikda yashashga moslashgan, tanasi tangachali sovuq qonli hayvonlar" },
        { term: "Qushlar", def: "issiq qonli, tanasi patlar bilan qoplangan va ucha oladigan umurtqalilar" },
        { term: "Sutemizuvchilar", def: "bolalarini tirik tug'ib, sut bilan boquvchi eng yuksak rivojlangan sinf" },
        { term: "Gidra", def: "tana devori ikki qavatli bo'lgan chuchuk suv bo'shliqichli vakili" },
        { term: "Bo'g'imoyoqlilar", def: "tana va oyoqlari segmentlarga bo'lingan, xitin qobiqli eng ko'p sonli tip" }
      ],
      templates: [
        { q: "Zoologiyada [term] qanday ta'riflanadi?", exp: "[term] [def] xususiyatiga ega." },
        { q: "Qaysi hayvon [def] sifatida tasniflanadi?", exp: "Bu ta'rif [term]ga tegishli." },
        { q: "[term] hayvonot olamidagi qaysi xususiyati bilan ajralib turadi?", exp: "U [def] xususiyatiga ko'ra ajralib turadi." },
        { q: "Quyidagilardan qaysi biri [def] hisoblanadi?", exp: "[term] [def] hisoblanadi." }
      ]
    },
    anatomy: {
      terms: [
        { term: "Epiteliy", def: "tanani qoplovchi va himoya qiluvchi jips joylashgan to'qima turi" },
        { term: "Biriktiruvchi to'qima", def: "tayanch, himoya va oziqlantirish vazifasini bajaruvchi (suyak, qon) to'qima" },
        { term: "Skelet", def: "tanani tutib turuvchi, organlarni himoyalovchi suyaklar tizimi" },
        { term: "Mushaklar", def: "qisqarish xususiyatiga ega bo'lib, harakatni ta'minlovchi a'zolar" },
        { term: "Eritrositlar", def: "kislorod va karbonat angidrid tashuvchi qizil qon hujayralari" },
        { term: "Leykositlar", def: "himoya va immunitetni ta'minlovchi oq qon hujayralari" },
        { term: "Trombotsitlar", def: "qon ivishida ishtirok etuvchi yassi qon plastinkalari" },
        { term: "Yurak", def: "to'rt kamerali bo'lib, qonni tomirlarga haydovchi muskulli organ" },
        { term: "Arteriya", def: "yurakdan chiquvchi va qonni organlarga olib boruvchi qalin tomirlar" },
        { term: "Vena", def: "qonni organlardan yurakka qaytaruvchi ingichka devorli klapanli tomirlar" },
        { term: "Nafas yo'llari", def: "havoni o'pkalarga o'tkazuvchi va tozalovchi burun bo'shlig'i, hiqildoq, traxeyadir" },
        { term: "Buyraklar", def: "qonni filtrlash orqali siydik hosil qiluvchi juft organ" },
        { term: "Teri", def: "tanani tashqi muhitdan himoya qiluvchi, sezgi va haroratni boshqaruvchi qobiq" },
        { term: "Gipofiz", def: "bosh miya ostidagi asosiy ichki sekretsiya bezi" },
        { term: "Qalqonsimon bez", def: "tarkibida yod saqlovchi tiroksin gormonini ishlab chiqaruvchi bez" },
        { term: "Refleks", def: "tashqi ta'sirlarga nerv tizimi ishtirokidagi javob reaksiyasi" },
        { term: "Retseptorlar", def: "tashqi signallarni qabul qiluvchi maxsus nerv oxirlari" },
        { term: "Vitamin C", def: "skorbut kasalligining oldini oluvchi, immunitetni oshiruvchi vitamin" }
      ],
      templates: [
        { q: "Odam anatomiyasida [term]ning asosiy roli nima?", exp: "[term] inson tanasida [def] funksiyasini bajaradi." },
        { q: "Quyidagi qismlardan qaysi biri [def] uchun javobgardir?", exp: "Bu funksiya [term] tomonidan amalga oshiriladi." },
        { q: "[term] haqidagi to'g'ri biologik fikrni toping.", exp: "[term] [def] uchun xizmat qiladi." },
        { q: "Odam tanasida [def] a'zosi yoki tizimi nima deb ataladi?", exp: "Bu [term] deb ataladi." }
      ]
    },
    genetics: {
      terms: [
        { term: "Hujayra nazariyasi", def: "barcha tirik mavhudotlarning tuzilish birligi hujayra ekanligi haqidagi ta'limot" },
        { term: "DNK", def: "irsiy axborotni saqlaydigan va nasldan-naslga o'tkazadigan qo'sh zanjirli makromolekula" },
        { term: "RNK", def: "oqsil sintezida qatnashuvchi bir zanjirli nuklein kislotasi" },
        { term: "Oqsillar", def: "aminokislotalardan tashkil topgan biologik polimer moddalar" },
        { term: "Mitoxondriya", def: "organik moddalarni parchalab ATF ko'rinishida energiya beruvchi organoid" },
        { term: "Ribosoma", def: "oqsil zanjirlarini sintez qiluvchi membranasiz kichik hujayra strukturasi" },
        { term: "Mitoz bo'linish", def: "somatik hujayralarning xromosomalar sonini o'zgartirmay ko'payish usuli" },
        { term: "Meyoz bo'linish", def: "jinsiy hujayralarning xromosoma to'plamini 2 barobar kamaytirib bo'linish usuli" },
        { term: "Gen", def: "ma'lum bir belgi yoki oqsil tuzilishi haqidagi irsiy axborot bo'lagi" },
        { term: "Genotip", def: "organizmning barcha genlari yig'indisi" },
        { term: "Fenotip", def: "organizmning namoyon bo'ladigan tashqi va ichki belgilari yig'indisi" },
        { term: "Dominantlik", def: "bir allel genning ikkinchi gen ustidan hukmronlik qilishi" },
        { term: "Geteroziqota", def: "har xil allel genlarga ega bo'lgan durgay organizm (Aa)" },
        { term: "Gomoziqota", def: "bir xil allel genlarga ega bo'lgan organizm (AA yoki aa)" },
        { term: "Mutatsiya", def: "genotipning to'satdan va qaytmas o'zgarishi" },
        { term: "Biotexnologiya", def: "tirik organizmlar yordamida foydali mahsulotlar olish sohasi" },
        { term: "Klonlash", def: "organizmlarning aynan bir xil nusxasini sun'iy yaratish" },
        { term: "Xromosoma", def: "yadroda joyhazm bo'lgan, genlarni saqlaydigan va uzatadigan spiral tuzilma" }
      ],
      templates: [
        { q: "Genetika va sitologiyada [term] deganda nima tushuniladi?", exp: "[term] – [def]." },
        { q: "Irsiyat qonuniyatlariga ko'ra, [def] atamasi nima?", exp: "Bu [term] hisoblanadi." },
        { q: "[term]ning hujayra darajasidagi ahamiyati nima?", exp: "[term] hujayrada [def] vazifasini bajaradi." },
        { q: "Quyidagilardan qaysi biri [def] hisoblanadi?", exp: "[term] – bu [def]." }
      ]
    },
    general: {
      terms: [
        { term: "Biologiya", def: "tirik tabiat, organizmlar va ularning rivojlanish qonuniyatlarini o'rganuvchi fan" },
        { term: "Ekologiya", def: "organizmlarning o'zaro va atrof-muhit bilan munosabatlarini o'rganuvchi fan" },
        { term: "Abiotik omillar", def: "jonsiz tabiat ta'sirlari (harorat, yorug'lik, suv kabi)" },
        { term: "Biotik omillar", def: "tirik organizmlarning bir-biriga ko'rsatadigan o'zaro ta'sirlari" },
        { term: "Antropogen omil", def: "inson faoliyatining tabiatga ko'rsatadigan barcha ta'sirlari" },
        { term: "Biosfera", def: "Yer sayyorasining hayot tarqalgan umumiy qobig'i" },
        { term: "Populyatsiya", def: "bir turga mansub, ma'lum hududda uzoq vaqt yashovchi organizmlar guruhi" },
        { term: "Qizil kitob", def: "noyob va yo'qolib ketish xavfidagi turlar ro'yxati yozilgan hujjat" },
        { term: "Qo'riqxona", def: "tabiatni va undagi turlarni saqlab qolish uchun ajratilgan daxlsiz hudud" },
        { term: "Avtotroflar", def: "yorug'lik yordamida o'ziga organik modda tayyorlaydigan o'simliklar" },
        { term: "Geterotroflar", def: "tayyor organik moddalar bilan oziqlanadigan hayvon va zamburug'lar" },
        { term: "Produtsentlar", def: "ekotizimda organik moddalarni birinchi bo'lib yaratuvchi organizmlar" },
        { term: "Konsumentlar", def: "tayyor organik modda bilan oziqlanuvchi iste'molchilar" },
        { term: "Redutsentlar", def: "organik qoldiqlarni minerallargacha parchalovchi mikroorganizmlar" },
        { term: "Simbioz", def: "har ikki taraf uchun foydali bo'lgan birgalikda yashash shakli" },
        { term: "Parazitizm", def: "bir organizm ikkinchisi hisobiga yashab unga zarar yetkazishi" }
      ],
      templates: [
        { q: "Umumiy biologiyada [term] qanday ta'riflanadi?", exp: "[term] deganda [def] tushuniladi." },
        { q: "Ekotizimda [def] jarayoni yoki guruhi nima deb ataladi?", exp: "Bu [term] deb nomlanadi." },
        { q: "[term] atamasining to'g'ri biologik tavsifi qaysi?", exp: "[term] [def] uchun qo'llaniladi." },
        { q: "Quyidagilardan qaysi biri [def] hisoblanadi?", exp: "[term] [def]dir." }
      ]
    }
  };

  const pool = categoryData[category] || categoryData.general;
  const terms = pool.terms;
  const templates = pool.templates;
  const questionsList = [];

  for (let i = 1; i <= 100; i++) {
    const seed = topicId * 1000 + i;
    const isTopicSpecific = i > 70;
    
    let questionText = "";
    let correctAnswer = "";
    let explanation = "";
    let optionsList = [];

    const labels = ["A", "B", "C", "D"];
    const correctLabel = labels[Math.floor(sRandom(seed + 3) * 4)];

    if (!isTopicSpecific) {
      const termIdx = Math.floor(sRandom(seed) * terms.length);
      const tempIdx = Math.floor(sRandom(seed + 1) * templates.length);
      
      const mainTerm = terms[termIdx];
      const template = templates[tempIdx];
      
      const isQuestionAskingForDef = template.q.includes("[term]");
      
      questionText = template.q.replace("[term]", mainTerm.term).replace("[def]", mainTerm.def);
      explanation = template.exp.replace("[term]", mainTerm.term).replace("[def]", mainTerm.def);
      
      const distractors = [];
      let attempts = 0;
      while (distractors.length < 3 && attempts < 100) {
        attempts++;
        const dIdx = Math.floor(sRandom(seed + 10 + distractors.length + attempts) * terms.length);
        if (dIdx !== termIdx && !distractors.includes(dIdx)) {
          distractors.push(dIdx);
        }
      }

      for (let l of labels) {
        if (l === correctLabel) {
          optionsList.push({
            id: seed * 10 + labels.indexOf(l),
            question_id: seed,
            option_label: l,
            option_text: isQuestionAskingForDef ? mainTerm.def : mainTerm.term
          });
        } else {
          const dTerm = terms[distractors.pop() || 0];
          optionsList.push({
            id: seed * 10 + labels.indexOf(l),
            question_id: seed,
            option_label: l,
            option_text: isQuestionAskingForDef ? dTerm.def : dTerm.term
          });
        }
      }
      correctAnswer = correctLabel;
    } else {
      const topicTemplates = [
        { q: "Mavzu: '[title]'. Ushbu bo'limning asosiy o'rganish obyekti nima?", exp: "Bu mavzu [subject] fanining tarkibiy qismi bo'lib, tiriklikni o'rganadi." },
        { q: "'[title]' mavzusiga tegishli eng muhim tayanch tushunchani aniqlang.", exp: "Ushbu mavzuda asosiy e'tibor [term] tushunchasiga qaratiladi." },
        { q: "Agar siz '[title]' darsini mukammal o'zlashtirsangiz, qaysi savolga javob topasiz?", exp: "Bu mavzu bizga [def] haqida ma'lumot beradi." },
        { q: "'[title]' darsi biologiyaning qaysi muhim bo'limiga kiradi?", exp: "Ushbu mavzu biologiyaning shu yo'nalishiga daxldor." }
      ];
      
      const tIdx = Math.floor(sRandom(seed) * topicTemplates.length);
      const termIdx = Math.floor(sRandom(seed + 1) * terms.length);
      const mainTerm = terms[termIdx];
      
      let subjectName = "Biologiya";
      if (category === "botany") subjectName = "Botanika";
      else if (category === "zoology") subjectName = "Zoologiya";
      else if (category === "anatomy") subjectName = "Odam va uning salomatligi";
      else if (category === "genetics") subjectName = "Sitologiya va Genetika";

      const tTemp = topicTemplates[tIdx];
      questionText = tTemp.q.replace("[title]", title).replace("[term]", mainTerm.term).replace("[def]", mainTerm.def);
      explanation = tTemp.exp.replace("[subject]", subjectName).replace("[term]", mainTerm.term).replace("[def]", mainTerm.def);

      const distractors = [];
      let attempts = 0;
      while (distractors.length < 3 && attempts < 100) {
        attempts++;
        const dIdx = Math.floor(sRandom(seed + 10 + distractors.length + attempts) * terms.length);
        if (dIdx !== termIdx && !distractors.includes(dIdx)) {
          distractors.push(dIdx);
        }
      }

      for (let l of labels) {
        if (l === correctLabel) {
          let text = "";
          if (tIdx === 0) text = subjectName;
          else if (tIdx === 1) text = mainTerm.term;
          else if (tIdx === 2) text = mainTerm.def;
          else text = "Hujayraviy va ekologik daraja";

          optionsList.push({
            id: seed * 10 + labels.indexOf(l),
            question_id: seed,
            option_label: l,
            option_text: text
          });
        } else {
          let text = "";
          const dTerm = terms[distractors.pop() || 0];
          if (tIdx === 0) text = "Fizika yoki Kimyo";
          else if (tIdx === 1) text = dTerm.term;
          else if (tIdx === 2) text = dTerm.def;
          else text = "Faqat sun'iy muhit sharoitlari";

          optionsList.push({
            id: seed * 10 + labels.indexOf(l),
            question_id: seed,
            option_label: l,
            option_text: text
          });
        }
      }
      correctAnswer = correctLabel;
    }

    questionsList.push({
      id: seed,
      topic_id: topicId,
      question_text: questionText,
      correct_answer: correctAnswer,
      explanation: explanation,
      question_options: optionsList
    });
  }

  return questionsList;
}

// Mock query builder mimicking Supabase syntax
class MockQueryBuilder {
  constructor(table) {
    this.table = table;
    this.data = JSON.parse(localStorage.getItem(`biosmart_${table}`) || '[]');
    this.filters = [];
    this.orderField = null;
    this.orderAscending = true;
    this.limitVal = null;
    this.isSingle = false;
    this.isMaybeSingle = false;
    this.eqFilters = {};
  }

  select(fields, options = {}) {
    this.fields = fields;
    this.options = options;
    return this;
  }

  eq(field, val) {
    this.filters.push((item) => String(item[field]) === String(val));
    this.eqFilters = this.eqFilters || {};
    this.eqFilters[field] = val;
    return this;
  }

  in(field, valuesArray) {
    this.inFilters = this.inFilters || {};
    this.inFilters[field] = valuesArray;
    this.filters.push((item) => valuesArray.map(v => String(v)).includes(String(item[field])));
    return this;
  }

  order(field, { ascending = true } = {}) {
    this.orderField = field;
    this.orderAscending = ascending;
    return this;
  }

  limit(val) {
    this.limitVal = val;
    return this;
  }

  single() {
    this.isSingle = true;
    return this;
  }

  maybeSingle() {
    this.isMaybeSingle = true;
    return this;
  }

  async then(onfulfilled) {
    try {
      if (this.action === 'update') {
        let updatedData = [...this.data];
        const itemsToUpdate = updatedData.filter(item => {
          return this.filters.every(filter => filter(item));
        });
        itemsToUpdate.forEach(item => {
          const idx = updatedData.findIndex(d => d.id === item.id);
          if (idx > -1) {
            updatedData[idx] = { ...updatedData[idx], ...this.updateData };
          }
        });
        localStorage.setItem(`biosmart_${this.table}`, JSON.stringify(updatedData));
        return onfulfilled({ data: this.updateData, error: null });
      }

      if (this.action === 'delete') {
        let updatedData = [...this.data];
        const filtered = updatedData.filter(item => {
          return !this.filters.every(filter => filter(item));
        });
        localStorage.setItem(`biosmart_${this.table}`, JSON.stringify(filtered));
        return onfulfilled({ data: null, error: null });
      }

      let result;

      if (this.table === 'questions') {
        const topicIdVal = this.eqFilters && this.eqFilters['topic_id'];
        const topicIdIn = this.inFilters && this.inFilters['topic_id'];
        if (topicIdVal) {
          const topicIdInt = parseInt(topicIdVal);
          const isGrade5 = topicIdInt >= 101 && topicIdInt <= 118;
          const generated = isGrade5 ? [] : generate100QuestionsForTopic(topicIdInt);
          const custom = this.data.filter(q => String(q.topic_id) === String(topicIdVal));
          result = [...custom, ...generated];
        } else if (topicIdIn && Array.isArray(topicIdIn)) {
          let allGenerated = [];
          topicIdIn.forEach(tid => {
            const topicIdInt = parseInt(tid);
            const isGrade5 = topicIdInt >= 101 && topicIdInt <= 118;
            if (!isGrade5) {
              allGenerated.push(...generate100QuestionsForTopic(topicIdInt));
            }
          });
          const custom = this.data.filter(q => topicIdIn.map(v => String(v)).includes(String(q.topic_id)));
          result = [...custom, ...allGenerated];
        } else {
          result = [...this.data];
        }
      } else {
        result = [...this.data];
      }

      for (const filter of this.filters) {
        result = result.filter(filter);
      }

      if (this.orderField) {
        result.sort((a, b) => {
          let valA = a[this.orderField];
          let valB = b[this.orderField];
          if (typeof valA === 'string') {
            return this.orderAscending ? valA.localeCompare(valB) : valB.localeCompare(valA);
          }
          return this.orderAscending ? valA - valB : valB - valA;
        });
      }

      if (this.limitVal !== null) {
        result = result.slice(0, this.limitVal);
      }

      // Populate relations (joins)
      result = result.map(item => {
        const itemCopy = { ...item };
        
        if (this.table === 'user_progress') {
          const topics = JSON.parse(localStorage.getItem('biosmart_topics') || '[]');
          const subjects = JSON.parse(localStorage.getItem('biosmart_subjects') || '[]');
          const grades = JSON.parse(localStorage.getItem('biosmart_grades') || '[]');
          
          const topic = topics.find(t => t.id === itemCopy.topic_id);
          if (topic) {
            const subject = subjects.find(s => s.id === topic.subject_id);
            const grade = subject ? grades.find(g => g.id === subject.grade_id) : null;
            itemCopy.topics = {
              ...topic,
              subjects: subject ? {
                ...subject,
                grades: grade ? { ...grade } : null
              } : null
            };
          }
        }

        if (this.table === 'topics') {
          const subjects = JSON.parse(localStorage.getItem('biosmart_subjects') || '[]');
          const grades = JSON.parse(localStorage.getItem('biosmart_grades') || '[]');
          const subject = subjects.find(s => s.id === itemCopy.subject_id);
          const grade = subject ? grades.find(g => g.id === subject.grade_id) : null;
          itemCopy.subjects = subject ? {
            ...subject,
            grades: grade ? { ...grade } : null
          } : null;
        }

        if (this.table === 'questions') {
          if (!itemCopy.question_options || itemCopy.question_options.length === 0) {
            const options = JSON.parse(localStorage.getItem('biosmart_question_options') || '[]');
            itemCopy.question_options = options.filter(o => o.question_id === itemCopy.id);
          }
        }

        if (this.table === 'certificates') {
          const topics = JSON.parse(localStorage.getItem('biosmart_topics') || '[]');
          itemCopy.topics = topics.find(t => t.id === itemCopy.topic_id) || null;
        }

        return itemCopy;
      });

      if (this.options && this.options.count === 'exact') {
        return onfulfilled({ data: null, error: null, count: result.length });
      }

      if (this.isSingle) {
        if (result.length === 0) {
          return onfulfilled({ data: null, error: new Error('No record found'), count: 0 });
        }
        return onfulfilled({ data: result[0], error: null, count: 1 });
      }

      if (this.isMaybeSingle) {
        return onfulfilled({ data: result[0] || null, error: null, count: result.length });
      }

      return onfulfilled({ data: result, error: null, count: result.length });
    } catch (e) {
      return onfulfilled({ data: null, error: e, count: 0 });
    }
  }

  async insert(insertData) {
    const dataList = Array.isArray(insertData) ? insertData : [insertData];
    const updatedData = [...this.data];
    
    const insertedItems = dataList.map(item => {
      const newItem = {
        id: item.id || Math.floor(Math.random() * 1000000) + 1,
        ...item,
        created_at: item.created_at || new Date().toISOString(),
        completed_at: item.completed_at || new Date().toISOString(),
        earned_at: item.earned_at || new Date().toISOString()
      };
      updatedData.push(newItem);
      return newItem;
    });

    localStorage.setItem(`biosmart_${this.table}`, JSON.stringify(updatedData));
    
    return {
      select: () => {
        return {
          single: () => ({ data: insertedItems[0], error: null }),
          maybeSingle: () => ({ data: insertedItems[0], error: null }),
          data: insertedItems,
          error: null
        }
      },
      data: insertedItems,
      error: null
    };
  }

  async upsert(upsertData) {
    const updatedData = [...this.data];
    const keyFields = this.table === 'user_progress' ? ['user_id', 'topic_id'] : ['id'];
    const item = Array.isArray(upsertData) ? upsertData[0] : upsertData;
    
    const existingIndex = updatedData.findIndex(d => {
      return keyFields.every(field => String(d[field]) === String(item[field]));
    });

    if (existingIndex > -1) {
      updatedData[existingIndex] = { ...updatedData[existingIndex], ...item, last_accessed: new Date().toISOString() };
    } else {
      updatedData.push({
        id: Math.floor(Math.random() * 1000000) + 1,
        ...item,
        created_at: new Date().toISOString(),
        last_accessed: new Date().toISOString()
      });
    }

    localStorage.setItem(`biosmart_${this.table}`, JSON.stringify(updatedData));
    return { data: upsertData, error: null };
  }

  update(updateData) {
    this.action = 'update';
    this.updateData = updateData;
    return this;
  }

  delete() {
    this.action = 'delete';
    return this;
  }
}

// Mock auth interface
const mockAuth = {
  listeners: [],
  session: JSON.parse(localStorage.getItem('biosmart_session') || 'null'),
  
  getSession: async () => {
    return { data: { session: mockAuth.session }, error: null };
  },
  
  onAuthStateChange: (callback) => {
    mockAuth.listeners.push(callback);
    callback('INITIAL_SESSION', mockAuth.session);
    return {
      data: {
        subscription: {
          unsubscribe: () => {
            mockAuth.listeners = mockAuth.listeners.filter(cb => cb !== callback);
          }
        }
      }
    };
  },
  
  signUp: async ({ phone, email, password, options }) => {
    const users = JSON.parse(localStorage.getItem('biosmart_users') || '[]');
    const userPhone = phone || options?.phone;
    const userEmail = email || (userPhone ? `${userPhone}@biosmart.uz` : null);

    if (userPhone && users.some(u => u.phone === userPhone)) {
      throw new Error('Ushbu telefon raqami bilan avval ro\'yxatdan o\'tilgan.');
    }
    if (userEmail && users.some(u => u.email === userEmail)) {
      throw new Error('Ushbu email bilan avval ro\'yxatdan o\'tilgan.');
    }
    
    const newUser = {
      id: Math.random().toString(36).substring(2, 9),
      phone: userPhone,
      email: userEmail,
      created_at: new Date().toISOString()
    };
    users.push({ ...newUser, password });
    localStorage.setItem('biosmart_users', JSON.stringify(users));

    const profiles = JSON.parse(localStorage.getItem('biosmart_profiles') || '[]');
    const newProfile = {
      id: newUser.id,
      full_name: options?.data?.full_name || (userPhone || userEmail || 'Foydalanuvchi'),
      role: 'user',
      grade: '6-sinf',
      is_pro: false,
      created_at: new Date().toISOString()
    };
    profiles.push(newProfile);
    localStorage.setItem('biosmart_profiles', JSON.stringify(profiles));

    return { data: { user: newUser }, error: null };
  },
  
  signInWithPassword: async ({ phone, email, password }) => {
    const identifier = phone || email;
    const users = JSON.parse(localStorage.getItem('biosmart_users') || '[]');
    const user = users.find(u => 
      (u.phone === identifier || u.email === identifier) && u.password === password
    );
    if (!user) {
      throw new Error('Telefon raqami yoki parol noto\'g\'ri.');
    }
    
    const session = {
      user: { id: user.id, email: user.email, phone: user.phone },
      access_token: 'mock-jwt-token',
      expires_at: Math.floor(Date.now() / 1000) + 3600 * 24 * 365 * 100 // 100 years!
    };
    
    mockAuth.session = session;
    localStorage.setItem('biosmart_session', JSON.stringify(session));
    mockAuth.listeners.forEach(cb => cb('SIGNED_IN', session));
    
    return { data: { session, user: session.user }, error: null };
  },
  
  signOut: async () => {
    mockAuth.session = null;
    localStorage.removeItem('biosmart_session');
    mockAuth.listeners.forEach(cb => cb('SIGNED_OUT', null));
    return { error: null };
  }
};

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const isRealSupabaseConfigured = 
  supabaseUrl && 
  supabaseUrl !== '' && 
  !supabaseUrl.includes('mock.supabase.co') &&
  !supabaseUrl.includes('Sizning_Supabase_URLingiz') &&
  supabaseAnonKey &&
  supabaseAnonKey !== '' &&
  !supabaseAnonKey.includes('mock_anon_key') &&
  !supabaseAnonKey.includes('Sizning_Supabase_Anon_Kalitingiz');

let realSupabaseClient = null;
if (isRealSupabaseConfigured) {
  realSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);
}

const customRealAuth = realSupabaseClient ? {
  ...realSupabaseClient.auth,
  signUp: async ({ phone, email, password, options }) => {
    const userPhone = phone || options?.phone;
    const userEmail = email || (userPhone ? `${userPhone}@biosmart.uz` : null);
    
    const signUpParams = {
      email: userEmail,
      password,
      options: {
        data: {
          full_name: options?.data?.full_name || (userPhone || userEmail || 'Foydalanuvchi'),
          phone: userPhone,
          role: 'user',
          grade: '6-sinf'
        }
      }
    };
    
    const response = await realSupabaseClient.auth.signUp(signUpParams);
    if (response.error) throw response.error;
    
    try {
      const { data: { user } } = response;
      if (user) {
        await realSupabaseClient.from('profiles').insert({
          id: user.id,
          full_name: options?.data?.full_name || (userPhone || userEmail || 'Foydalanuvchi'),
          role: 'user',
          grade: '6-sinf',
          is_pro: false,
          email: userEmail
        });
      }
    } catch (e) {
      console.warn("Profile auto-creation error:", e);
    }
    
    return response;
  },
  
  signInWithPassword: async ({ phone, email, password }) => {
    const identifier = phone || email;
    const userEmail = (identifier && !identifier.includes('@')) ? `${identifier}@biosmart.uz` : identifier;
    
    const response = await realSupabaseClient.auth.signInWithPassword({
      email: userEmail,
      password
    });
    if (response.error) throw response.error;
    return response;
  }
} : null;

export const supabase = isRealSupabaseConfigured ? {
  ...realSupabaseClient,
  auth: customRealAuth,
  from: (table) => realSupabaseClient.from(table)
} : {
  auth: mockAuth,
  from: (table) => new MockQueryBuilder(table)
};
