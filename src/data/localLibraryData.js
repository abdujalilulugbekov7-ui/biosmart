// =============================================
// BioSmart — Local Fallback Library Data
// Full biology content for grades 5-11
// =============================================

export const localGrades = [
  { id: 1, name: '5-sinf', display_order: 1 },
  { id: 2, name: '6-sinf', display_order: 2 },
  { id: 3, name: '7-sinf', display_order: 3 },
  { id: 4, name: '8-sinf', display_order: 4 },
  { id: 5, name: '9-sinf', display_order: 5 },
  { id: 6, name: '10-sinf', display_order: 6 },
  { id: 7, name: '11-sinf', display_order: 7 },
];

export const localSubjects = [
  { id: 1, grade_id: 1, name: 'Tabiyatshunoslik', description: 'Tirik tabiat haqida umumiy tushunchalar' },
  { id: 2, grade_id: 2, name: 'Botanika', description: 'O\'simliklar dunyosi' },
  { id: 3, grade_id: 3, name: 'Zoologiya', description: 'Hayvonot dunyosi' },
  { id: 4, grade_id: 4, name: 'Odam va uning salomatligi', description: 'Inson anatomiyasi va fiziologiyasi' },
  { id: 5, grade_id: 5, name: 'Biologiya', description: 'Umumiy biologiya asoslari' },
  { id: 6, grade_id: 6, name: 'Biologiya', description: 'Genetika va evolyutsiya' },
  { id: 7, grade_id: 7, name: 'Biologiya', description: 'Molekulyar biologiya' },
];

export const localTopics = [
  // ===== 5-SINF: Tabiyatshunoslik (subject_id: 1) =====
  {
    id: 1, subject_id: 1, title: 'Tabiyatshunoslik faniga kirish',
    reading_time: 20, difficulty: 'Easy', display_order: 1,
    content: `Tabiyatshunoslik — bu tabiatni, undagi hodisa va jarayonlarni o'rganuvchi fanlar majmuasi. Bu fanga biologiya, geografiya, fizika, kimyo kabi fanlar kiradi. Tabiyatshunoslik inson hayotida muhim o'rin tutadi, chunki u bizni o'rab turgan dunyoni tushunishga yordam beradi.

Tabiyatda tirik va jonsiz ob'ektlar mavjud. Tirik tabiatga o'simliklar, hayvonlar, zamburug'lar, bakteriyalar kiradi. Jonsiz tabiatga esa suv, havo, tuproq, tog' jinslari kiradi. Tirik organizmlar nafas oladi, oziqlanadi, ko'payadi va o'sadi.

Tabiyatshunoslik fanining rivojlanish tarixi juda qadimiy bo'lib, qadimgi yunon olimlari Aristotel va Gippokrat bu fanning asoschilari hisoblanadi. O'rta Osiyolik buyuk olimlar Abu Ali ibn Sino va Abu Rayhon Beruniy ham tabiyatshunoslik faniga katta hissa qo'shganlar.`
  },
  {
    id: 2, subject_id: 1, title: 'Tirik va jonsiz tabiat',
    reading_time: 20, difficulty: 'Easy', display_order: 2,
    content: `Tabiat ikki qismga bo'linadi: tirik tabiat va jonsiz tabiat. Tirik tabiatga barcha jonli organizmlar — o'simliklar, hayvonlar, zamburug'lar, bakteriyalar va odamlar kiradi. Jonsiz tabiatga esa suv, havo, tuproq, quyosh nuri, minerallar kiradi.

Tirik organizmlarning asosiy xususiyatlari: nafas olish, oziqlanish, ko'payish, o'sish va rivojlanish, tashqi muhitga moslashish. Har bir tirik organizm hujayralardan tashkil topgan. Hujayra — hayotning eng kichik strukturaviy va funksional birligi.

Tirik va jonsiz tabiat o'zaro chambarchas bog'liq. O'simliklar tuproqdan mineral moddalarni oladi, quyosh nuridan energiya yig'adi. Hayvonlar o'simliklar bilan oziqlanadi. Bakteriyalar o'lik organizmlarni parchalab, tuproqni boyitadi. Shu tariqa tabiatda moddalar aylanishi ro'y beradi.`
  },
  {
    id: 3, subject_id: 1, title: 'Hujayra — hayotning asosiy birligi',
    reading_time: 25, difficulty: 'Medium', display_order: 3,
    content: `Hujayra — barcha tirik organizmlarning tuzilish va hayot faoliyati birligi. Hujayrani birinchi marta 1665-yilda ingliz olimi Robert Guk mikroskop yordamida ko'rgan. Hujayralar juda mayda bo'lib, ularni faqat mikroskop yordamida ko'rish mumkin.

Hujayra tashqi tomondan hujayra membranasi (qobig'i) bilan o'ralgan. Membrana hujayrani tashqi muhitdan ajratadi va moddalarning kirib-chiqishini tartibga soladi. Hujayra ichida sitoplazma joylashgan — bu yarim suyuq modda bo'lib, unda hujayra organoidlari suzib yuradi.

Hujayraning eng muhim qismi — yadro. Yadroda irsiy axborot saqlanadi. Yadroda xromosomalar joylashgan bo'lib, ularda genlar mavjud. Genlar organizmning barcha belgilarini belgilaydi. Mitoxondriyalar energiya ishlab chiqaradi, ribosomalar oqsil sintez qiladi, Golji apparati moddalarni saralaydi va tashiydi.`
  },
  {
    id: 4, subject_id: 1, title: 'O\'simliklar haqida umumiy ma\'lumot',
    reading_time: 20, difficulty: 'Easy', display_order: 4,
    content: `O'simliklar — tirik organizmlarning eng katta guruhlaridan biri. Yer yuzida 350 000 dan ortiq o'simlik turi mavjud. O'simliklar fotosintez jarayoni orqali quyosh energiyasini organik moddalarga aylantiradi va kislorod ajratib chiqaradi.

O'simliklarning asosiy organlari: ildiz, poya, barg, gul, meva va urug'. Ildiz tuproqdan suv va mineral moddalarni so'radi. Poya suv va oziq moddalarni tashiydi. Barg fotosintez jarayonini amalga oshiradi. Gul ko'payish organi hisoblanadi.

O'simliklar ekotizimda muhim o'rin tutadi. Ular hayvonlar va odamlar uchun kislorod ishlab chiqaradi, oziq-ovqat manbai bo'ladi, tuproq eroziyasini oldini oladi. O'simliksiz Yer yuzida hayot mavjud bo'lmas edi.`
  },
  {
    id: 5, subject_id: 1, title: 'Hayvonlar haqida umumiy ma\'lumot',
    reading_time: 20, difficulty: 'Easy', display_order: 5,
    content: `Hayvonlar — geterotrof organizmlar bo'lib, ular tayyor organik moddalar bilan oziqlanadi. Yer yuzida 1,5 milliondan ortiq hayvon turi aniqlangan. Hayvonlar umurtqali va umurtqasiz guruhlarga bo'linadi.

Umurtqasiz hayvonlarga sodda hayvonlar, chuvalchanglar, mollyuskalar, bo'g'imoyoqlilar kiradi. Bo'g'imoyoqlilar hayvonlar orasida eng ko'p turga ega guruh bo'lib, ularga hasharotlar, o'rgimchaksimonlar, qisqichbaqasimonlar kiradi.

Umurtqali hayvonlarga baliqlar, amfibiyalar (suvda-quruqlikda yashovchilar), reptiliyalar (sudralib yuruvchilar), qushlar va sutemizuvchilar kiradi. Sutemizuvchilar hayvonot dunyosining eng rivojlangan vakillari hisoblanadi. Hayvonlar tabiatda moddalar aylanishida, o'simliklarning changlanishida va biologik muvozanatni saqlashda muhim rol o'ynaydi.`
  },
  {
    id: 6, subject_id: 1, title: 'Zamburug\'lar va bakteriyalar',
    reading_time: 25, difficulty: 'Medium', display_order: 6,
    content: `Zamburug'lar — o'simlik ham, hayvon ham bo'lmagan alohida organizm guruhi. Ular o'simliklarga o'xshab bir joyga birikkan holda o'sadi, lekin hayvonlarga o'xshab tayyor organik moddalar bilan oziqlanadi. Zamburug'larga achitqi, mog'or, qalpoqchali zamburug'lar kiradi.

Bakteriyalar — eng sodda bir hujayrali organizmlar. Ular shunchalik kichikki, faqat kuchli mikroskop bilan ko'rish mumkin. Bakteriyalar tabiatda juda keng tarqalgan — tuproqda, suvda, havoda, hatto odamlar tanasida ham yashaydi. Ba'zi bakteriyalar foydali — ular sut mahsulotlarini tayyorlashda, dorilar ishlab chiqarishda ishlatiladi.

Zararli bakteriyalar kasalliklar keltirib chiqaradi: sil, vabo, o'lat va boshqalar. Gigiyena qoidalariga rioya qilish, qo'llarni yuvish, oziq-ovqatni toza saqlash bakterial kasalliklarning oldini olishga yordam beradi.`
  },
  {
    id: 7, subject_id: 1, title: 'Ekologiya asoslari',
    reading_time: 25, difficulty: 'Medium', display_order: 7,
    content: `Ekologiya — organizmlarning bir-biri va atrof-muhit bilan o'zaro munosabatlarini o'rganuvchi fan. Bu atama 1866-yilda nemis biologi Ernst Gekkel tomonidan kiritilgan. Ekologiya so'zi yunoncha "oykos" (uy) va "logos" (fan) so'zlaridan olingan.

Ekotizim — muayyan hududdagi barcha tirik organizmlar va ularning jonsiz muhiti birligi. Ekotizimda energiya va moddalar almashinuvi doimo ro'y beradi. Oziq zanjiri — bu organizmlarning oziqlanish aloqalari. Masalan: o't → qo'y → bo'ri. Har bir bo'gin keyingi bo'gin uchun oziq manbai hisoblanadi.

Bugungi kunda ekologik muammolar jiddiy tus olmoqda. Havo va suv ifloslanishi, o'rmonlarning kesilishi, hayvon turlarining yo'q bo'lib ketishi — bularning barchasi inson faoliyati natijasi. Tabiatni muhofaza qilish har bir insonning burchi va vazifasidir.`
  },
  {
    id: 8, subject_id: 1, title: 'Tabiatni muhofaza qilish',
    reading_time: 20, difficulty: 'Easy', display_order: 8,
    content: `Tabiatni muhofaza qilish — bu tabiat boyliklarini tejamkorlik bilan ishlatish va kelajak avlodlar uchun saqlash demakdir. O'zbekistonda tabiatni muhofaza qilish davlat siyosatining muhim yo'nalishlaridan biri hisoblanadi.

O'zbekistonda bir nechta davlat qo'riqxonalari mavjud: Chatqol, Nurota, Zaamin, Surxon-Sherobot va boshqalar. Bu qo'riqxonalarda noyob o'simlik va hayvon turlari muhofaza qilinadi. "Qizil kitob"ga kiritilgan turlar maxsus himoya ostida.

Tabiatni muhofaza qilish faqat davlat vazifasi emas. Har bir inson tabiatga ehtiyotkorona munosabatda bo'lishi, chiqindilarni tozalashi, daraxt ekishi va suvni tejashi kerak. Ekologik madaniyatni oshirish orqali biz kelajak avlodlarga toza va go'zal tabiatni meros qoldirishimiz mumkin.`
  },

  // ===== 6-SINF: Botanika (subject_id: 2) =====
  {
    id: 9, subject_id: 2, title: 'O\'simliklarning tuzilishi',
    reading_time: 25, difficulty: 'Easy', display_order: 1,
    content: `O'simliklar turli organlarga ega murakkab organizmlardir. Ularning asosiy organlari: ildiz, poya, barg, gul, meva va urug'. Har bir organ o'ziga xos vazifani bajaradi va ular birgalikda o'simlik hayotini ta'minlaydi.

Vegetativ organlar — ildiz, poya va barg o'simlikning o'sishi va oziqlanishini ta'minlaydi. Generativ organlar — gul, meva va urug' ko'payish vazifasini bajaradi. O'simliklar tashqi muhitga moslashgan holda turli shakl va o'lchamlarga ega bo'ladi.

O'simliklar to'qimalardan tuzilgan. To'qima — bu tuzilishi va vazifasi bir xil bo'lgan hujayralar guruhi. Qoplovchi to'qima o'simlikni tashqi ta'sirlardan himoya qiladi. O'tkazuvchi to'qima suv va mineral moddalarni tashiydi. Asosiy to'qima fotosintez va oziq moddalar to'plash vazifasini bajaradi.`
  },
  {
    id: 10, subject_id: 2, title: 'O\'simlik hujayrasining tuzilishi',
    reading_time: 25, difficulty: 'Medium', display_order: 2,
    content: `O'simlik hujayrasi hayvon hujayrasidan bir necha muhim xususiyatlari bilan farq qiladi. O'simlik hujayrasida hujayra devori (tsellyuloza qobiq), xloroplastlar va vakuol mavjud — bu tuzilmalar hayvon hujayralarida topilmaydi.

Hujayra devori hujayrani mustahkam qiladi va unga shakl beradi. Xloroplastlarda xlorofill pigmenti joylashgan bo'lib, u yashil rang beradi va fotosintez jarayonini amalga oshiradi. Vakuol hujayra shirasi bilan to'lgan bo'lib, u oziq moddalar, tuzlar va ranglar saqlaydi.

O'simlik hujayrasi tarkibida yadro, mitoxondriyalar, endoplazmatik to'r, Golji apparati va ribosomalar ham mavjud. Yadro irsiy axborotni saqlaydi va hujayra bo'linishini boshqaradi. Mitoxondriyalar nafas olish jarayonida energiya ishlab chiqaradi. Barcha organoidlar birgalikda hujayraning hayot faoliyatini ta'minlaydi.`
  },
  {
    id: 11, subject_id: 2, title: 'Ildiz va uning vazifalari',
    reading_time: 20, difficulty: 'Easy', display_order: 3,
    content: `Ildiz — o'simlikning yer ostidagi organi bo'lib, u bir nechta muhim vazifalarni bajaradi. Ildiz o'simlikni tuproqqa mustahkam biriktiradi, tuproqdan suv va mineral moddalarni so'rib oladi, ba'zi o'simliklarda oziq moddalar to'playdi.

Ildiz tizimi ikki xil bo'ladi: o'q ildiz tizimi va popuk ildiz tizimi. O'q ildiz tizimida asosiy ildiz boshqalaridan ancha yo'g'on bo'lib, chuqurga o'sadi. Popuk ildiz tizimida esa barcha ildizlar taxminan bir xil yo'g'onlikda bo'ladi.

Ildizning uchi ildiz qalpoqchasi bilan himoyalangan. Ildiz tuklari suv va mineral moddalarni so'rish vazifasini bajaradi. O'simlikning tuproqdan olgan oziq moddalari ildiz orqali poyaga, barglarga va boshqa organlarga tashiladi. Sabzi, lavlagi, turnips kabi o'simliklarda ildiz oziq modda to'playdi — buni ildizmeva deb ataladi.`
  },
  {
    id: 12, subject_id: 2, title: 'Poya va uning tuzilishi',
    reading_time: 20, difficulty: 'Easy', display_order: 4,
    content: `Poya — o'simlikning yer ustki qismidagi asosiy o'qi bo'lib, u barglarni, gullarni va mevalarni ko'taradi. Poya suv va mineral moddalarni ildizdan barglarga, organik moddalarni esa barglardan boshqa organlarga tashiydi.

Poyaning ichki tuzilishi bir necha qatlamdan iborat. Tashqi tomondan po'stloq bilan qoplangan. Po'stloq ostida kambiy qatlami joylashgan — bu qatlam poyaning yo'g'onlashuvini ta'minlaydi. Poyaning o'rtasida o'zak joylashgan, u oziq moddalarni to'playdi.

Poyalar tik o'suvchi (bug'doy, terak), o'rmalovchi (tok, uzum), sudralib yuruvchi (tarvuz, qovun) va boshqa turlarga bo'linadi. Daraxtlarda poya yog'och modda bilan mustahkamlangan va ko'p yillar davomida o'sib boradi. Poya halqalari bo'yicha daraxtning yoshini aniqlash mumkin.`
  },
  {
    id: 13, subject_id: 2, title: 'Barg va fotosintez',
    reading_time: 30, difficulty: 'Medium', display_order: 5,
    content: `Barg — o'simlikning eng muhim organi bo'lib, u fotosintez jarayonini amalga oshiradi. Fotosintez — bu o'simlikning quyosh energiyasi yordamida karbonat angidrid va suvdan organik moddalar (glukoza) hosil qilishi va kislorod ajratishi jarayoni.

Bargning tashqi qismi epidermis (teri) bilan qoplangan. Epidermisda og'izchalar (ustitsalar) mavjud bo'lib, ular gaz almashinuvini boshqaradi. Bargning ichki qismi mezofill (barg go'shti) deb ataladi va u ikki qatlamdan iborat: ustunsimon va g'ovasimon to'qima.

Fotosintez tenglamasi: 6CO₂ + 6H₂O + yorug'lik energiyasi → C₆H₁₂O₆ + 6O₂. Bu jarayon Yer yuzidagi hayot uchun muhim — u atmosferani kislorod bilan boyitadi va barcha tirik organizmlar uchun oziq moddalar ishlab chiqaradi. O'simliklar yiliga 150 milliard tonna organik modda ishlab chiqaradi.`
  },
  {
    id: 14, subject_id: 2, title: 'Gul va urug\'lanish',
    reading_time: 25, difficulty: 'Medium', display_order: 6,
    content: `Gul — o'simlikning ko'payish organi. Gulning asosiy qismlari: gulkosa, gulbarg, changchi va urug'chi. Changchi erkak ko'payish organi bo'lib, changdon va changip dan iborat. Urug'chi urg'ochi ko'payish organi bo'lib, tuxumdon, ustuncha va tumshuqchadan iborat.

Changlanish — bu changning changdondan urug'chining tumshuqchasiga tushishi jarayoni. Changlanish shamol, hasharotlar, qushlar yoki suv yordamida ro'y beradi. Hasharotlar orqali changlanadigan gullar yorqin rangga va yoqimli hidga ega. Shamol orqali changlanadigan gullar esa oddiy va ko'rimsiz bo'ladi.

Urug'lanish — changning urug'chi tuxumdonidagi tuxum hujayrasi bilan qo'shilishi. Urug'lanishdan keyin tuxumdondan meva, tuxum hujayradan esa urug' rivojlanadi. Qo'sh urug'lanish — bu gulli o'simliklarga xos xususiyat bo'lib, uni rus olimi S.G. Navashin 1898-yilda kashf etgan.`
  },
  {
    id: 15, subject_id: 2, title: 'Meva va urug\'lar',
    reading_time: 20, difficulty: 'Easy', display_order: 7,
    content: `Meva — urug'lanishdan keyin tuxumdondan rivojlanadigan organ. Meva urug'ni himoya qiladi va uni tarqalishiga yordam beradi. Mevalar quruq va sersuv turlarga bo'linadi. Sersuv mevalarga olma, uzum, pomidor, quruq mevalarga esa don, yong'oq, dukkak kiradi.

Urug' — yangi o'simlik rivojlanadigan tuzilma. Urug' tarkibida murtak, endosperm (oziq modda) va urug' po'sti mavjud. Murtak — bu kelajakdagi o'simlikning kichik nusxasi. Qulay sharoit (namlik, issiqlik, havo) yetarli bo'lganda urug' unib chiqadi.

Meva va urug'larning tarqalish usullari turlicha: shamol (qayin, zarang), suv (kokos), hayvonlar (yong'oq, gilos), o'z-o'zidan (no'xat, loviya). Bu tabiatning ajoyib mexanizmi bo'lib, o'simliklarning yangi hududlarga tarqalishini ta'minlaydi.`
  },
  {
    id: 16, subject_id: 2, title: 'O\'simliklar sistematikasi',
    reading_time: 30, difficulty: 'Hard', display_order: 8,
    content: `O'simliklar sistematikasi — o'simliklarni turkumlash va nomlash fani. Zamonaviy sistematikaning asoschisi shved olimi Karl Linney (1707-1778) hisoblanadi. U o'simliklarni ikki nomli nomenklatura bilan ataydigan tizimni ishlab chiqqan.

O'simliklar quyidagi sistematik guruhlarga bo'linadi (kattadan kichikka): bo'lim, sinf, turkum, oila, urug', tur. Masalan, bug'doyning sistematik o'rni: Gulli o'simliklar bo'limi → Bir pallali sinf → Boshoqlilar turkumi → Boshoqlilar oilasi → Bug'doy urug'i → Yumshoq bug'doy turi.

O'simliklar dunyosi bir necha yirik guruhlarga bo'linadi: suv o'tlari, yo'sinlar, qirqbo'g'inlar, paporotniklar, ochiq urug'lilar (ignabargli daraxtlar) va yopiq urug'lilar (gulli o'simliklar). Gulli o'simliklar eng rivojlangan va eng ko'p turga ega guruh hisoblanadi — ular 250 000 dan ortiq turni o'z ichiga oladi.`
  },

  // ===== 7-SINF: Zoologiya (subject_id: 3) =====
  {
    id: 17, subject_id: 3, title: 'Hayvonot dunyosining xilma-xilligi',
    reading_time: 25, difficulty: 'Easy', display_order: 1,
    content: `Hayvonot dunyosi juda xilma-xildir. Yer yuzida 1,5 milliondan ortiq hayvon turi mavjud. Ular bir hujayrali va ko'p hujayrali organizmlarga bo'linadi. Hayvonlar o'simliklardan farqli ravishda tayyor organik moddalar bilan oziqlanadi, ya'ni geterotrof organizmlarga kiradi.

Hayvonlar tuzilishining murakkabligiga qarab umurtqasiz va umurtqali guruhlarga bo'linadi. Umurtqasiz hayvonlar barcha hayvon turlarining 95 foizini tashkil etadi. Umurtqali hayvonlar esa tuzilishi murakkab va rivojlangan organizmlardir.

Hayvonlar tabiatda muhim o'rin tutadi: o'simliklarni changlantiradi, urug'larni tarqatadi, tuproq hosil qilishda ishtirok etadi, oziq zanjirining tarkibiy qismi hisoblanadi. Inson ham hayvonot dunyosining bir a'zosi bo'lib, sutemizuvchilar sinfiga kiradi.`
  },
  {
    id: 18, subject_id: 3, title: 'Sodda hayvonlar — bir hujayralilar',
    reading_time: 25, difficulty: 'Medium', display_order: 2,
    content: `Sodda hayvonlar — bitta hujayradan tashkil topgan organizmlar. Ularga amyoba, infuzoriya-tufelka, evglena yashil va boshqalar kiradi. Ularning tanasi bitta hujayradan iborat bo'lsa-da, bu hujayra barcha hayotiy jarayonlarni — nafas olish, oziqlanish, ko'payish, harakat qilishni bajaradi.

Amyoba — eng sodda bir hujayrali hayvon. U doimiy shaklga ega emas va soxta oyoqlar yordamida harakat qiladi. Amyoba bakteriyalar va mayda organizmlar bilan oziqlanadi. U ikki bo'linish yo'li bilan ko'payadi.

Infuzoriya-tufelka amyobadan murakkab tuzilishga ega. Uning tanasi kiprikchalar bilan qoplangan va ular yordamida harakat qiladi. Infuzoriyada ikkita yadro bor: katta yadro hujayra hayotini boshqaradi, kichik yadro esa ko'payishda ishtirok etadi. Evglena yashil — o'simlik va hayvon xususiyatlarini birlashtirgan organizm bo'lib, u yorug'likda fotosintez qiladi, qorong'ilikda esa tayyor organik moddalar bilan oziqlanadi.`
  },
  {
    id: 19, subject_id: 3, title: 'Bo\'shliqichlilar tipi',
    reading_time: 20, difficulty: 'Medium', display_order: 3,
    content: `Bo'shliqichlilar — ikki qavatli ko'p hujayrali hayvonlar. Ularga gidra, meduza, korallar va aktiniyalar kiradi. Ularning tanasi ichki va tashqi qatlamdan iborat bo'lib, o'rtada bo'shliq joylashgan.

Chuchuk suv gidrasi — bo'shliqichlilarning eng mashhur vakili. U suvdagi o'simliklarga yopishib yashaydi va paypaslagichlari yordamida ovqat tutadi. Gidraning paypaslagichlarida neshtarli hujayralar mavjud bo'lib, ular zahar chiqaradi va o'ljani falaj qiladi.

Gidraning ajoyib xususiyati — u tiklanish (regeneratsiya) qobiliyatiga ega. Agar gidra bir necha qismga kesilsa, har bir qismdan yangi gidra o'sib chiqadi. Bu hodisani birinchi bo'lib frantsuz olimi Abraham Trembl kashf etgan. Bo'shliqichlilar dengiz ekotizimlarida muhim o'rin tutadi — korallar riflarni hosil qiladi va minglab dengiz organizmlariga yashash joyi beradi.`
  },
  {
    id: 20, subject_id: 3, title: 'Chuvalchanglar',
    reading_time: 25, difficulty: 'Medium', display_order: 4,
    content: `Chuvalchanglar — tana bo'shlig'iga ega ko'p hujayrali hayvonlar. Ular uch turga bo'linadi: yassi chuvalchanglar, to'garak chuvalchanglar va halqali chuvalchanglar. Har bir tur o'ziga xos tuzilish va hayot tarziga ega.

Yassi chuvalchanglarga silliq chuvalchang (planariya), tasmasimon chuvalchanglar (tasma chuvalchang, exinokokk) kiradi. Ularning tanasi yassi bo'lib, nafas olish va qon aylanish tizimlari mavjud emas. Ko'pchiligi parazit hayot kechirib, boshqa organizmlar tanasida yashaydi.

Halqali chuvalchanglar — chuvalchanglarning eng rivojlangan guruhi. Yomg'ir chuvalchangi — bu guruhning eng mashhur vakili. U tuproqda yashaydi va tuproqni yumshatibi, unamdorligini oshiradi. Charlz Darvin yomg'ir chuvalchanglarini "tabiatning dastlabki dehqonlari" deb atagan.`
  },
  {
    id: 21, subject_id: 3, title: 'Bo\'g\'imoyoqlilar',
    reading_time: 30, difficulty: 'Hard', display_order: 5,
    content: `Bo'g'imoyoqlilar — hayvonot dunyosidagi eng katta tip bo'lib, 1 milliondan ortiq turni o'z ichiga oladi. Ular barcha hayvon turlarining 80 foizini tashkil etadi. Bo'g'imoyoqlilarning tanasi bo'g'imli oyoqlarga ega va xitin qobiqdagi ekzoskelet bilan himoyalangan.

Bo'g'imoyoqlilar bir necha sinfga bo'linadi: qisqichbaqasimonlar (qisqichbaqa, krab), o'rgimchaksimonlar (o'rgimchak, kana, chayon), hasharotlar (kapalak, ari, chumoli, qo'ng'iz). Hasharotlar — eng ko'p turga ega sinf bo'lib, 900 000 dan ortiq turi ma'lum.

Hasharotlarning rivojlanishi to'liq yoki to'liqsiz o'zgarish bilan boradi. To'liq o'zgarishda: tuxum → lichinka → g'umbak → voyaga yetgan hasharot. To'liqsiz o'zgarishda g'umbak bosqichi bo'lmaydi. Hasharotlar tabiatda changlatuvchi sifatida, oziq zanjirida va tuproq hosil qilishda muhim ahamiyatga ega.`
  },
  {
    id: 22, subject_id: 3, title: 'Baliqlar sinfi',
    reading_time: 25, difficulty: 'Easy', display_order: 6,
    content: `Baliqlar — suvda yashovchi umurtqali hayvonlar. Ular jabralar yordamida nafas oladi va suzgichlar yordamida harakat qiladi. Yer yuzida 30 000 dan ortiq baliq turi mavjud. Baliqlar suyakli va tog'ayli guruhlarga bo'linadi.

Balikning tanasi qisman boshi, tanasi va dumi qismlaridan iborat. Tana tangachalar bilan qoplangan va shilimshiq modda bilan qoplanib, suvda oson harakatlanishni ta'minlaydi. Baliqning yon chiziq organi suv tebranishlarini sezadi va to'siqlarni aniqlaydi.

Baliqlar issiq qonli emas — ularning tana harorati atrof-muhit haroratiga bog'liq. Ko'pchilik baliqlar tuxum orqali ko'payadi. Ba'zi baliqlar, masalan, losos baliqlar, ko'payish uchun minglab kilometr masofaga ko'chib o'tadi. Baliqlar inson uchun muhim oziq-ovqat manbai va ekotizimning tarkibiy qismi hisoblanadi.`
  },
  {
    id: 23, subject_id: 3, title: 'Qushlar sinfi',
    reading_time: 30, difficulty: 'Medium', display_order: 7,
    content: `Qushlar — issiq qonli, tuxum qo'yuvchi umurtqali hayvonlar. Ularning tanasi patlar bilan qoplangan, oldingi oyoqlari qanotlarga aylangan. Dunyoda 10 000 dan ortiq qush turi mavjud. Qushlarning tana harorati doimiy 40-42°C atrofida.

Qushlar tuzilishi uchishga moslashgan: g'ovak suyaklar (yengil), kuchli ko'krak mushaklari, havo xaltachalari (samarali nafas olish), pat qoplami (issiqlik saqlash va aerodinamik shakl). Qushlarning ko'rish qobiliyati juda yaxshi rivojlangan.

Qushlar tabiatda muhim ahamiyatga ega: zararkunanda hasharotlarni yo'q qiladi, o'simlik urug'larini tarqatadi, gullarni changlantiradi. Ba'zi qushlar inson xo'jaligida foydalaniladi: tovuq, o'rdak, g'oz, kurka. Qushlarning ko'chib yurishi tabiatning eng ajoyib hodisalaridan biri — ba'zi qushlar minglab kilometrga uchib boradi va qaytib keladi.`
  },
  {
    id: 24, subject_id: 3, title: 'Sutemizuvchilar sinfi',
    reading_time: 25, difficulty: 'Hard', display_order: 8,
    content: `Sutemizuvchilar — eng rivojlangan hayvonlar sinfi. Ular bolalarini sut bilan boqadi, tanasi jun bilan qoplangan, issiq qonli hayvonlardir. Sutemizuvchilar 20 dan ortiq turkumga bo'linadi. Yer yuzida 6 000 dan ortiq sutemizuvchi turi mavjud.

Sutemizuvchilarning asosiy xususiyatlari: issiq qon, bola tug'ish va sut bilan boqish, yaxshi rivojlangan bosh miya, tana junlari bilan qoplangan. Ularning nafas olish organlari o'pka bo'lib, diafragma mushak yordamida nafas oladi. Yuragi to'rt kamerali.

Sutemizuvchilar turli muhitlarda yashaydi: quruqlikda (fil, sher), suvda (kit, delfin), havoda (ko'rshapalak). Inson ham sutemizuvchilar sinfiga kiradi va hayvonot dunyosining eng rivojlangan vakili hisoblanadi. Sutemizuvchilar inson xo'jaligida katta ahamiyatga ega — ulardan oziq-ovqat, kiyim-kechak, transport vositasi sifatida foydalaniladi.`
  },

  // ===== 8-SINF: Odam va uning salomatligi (subject_id: 4) =====
  {
    id: 25, subject_id: 4, title: 'Inson organizmi haqida umumiy ma\'lumot',
    reading_time: 25, difficulty: 'Easy', display_order: 1,
    content: `Inson organizmi — tabiatdagi eng murakkab va mukammal tizimlardan biri. U 37,2 trillion hujayradan tashkil topgan bo'lib, bu hujayralar to'qimalar, organlar va organ tizimlarini hosil qiladi. Inson tanasida 78 ta organ mavjud.

Inson organizmidagi asosiy organ tizimlari: tayanch-harakat tizimi, qon aylanish tizimi, nafas olish tizimi, ovqat hazm qilish tizimi, nerv tizimi, endokrin tizim, ayirish tizimi, ko'payish tizimi. Har bir tizim o'ziga xos vazifalarni bajaradi va boshqa tizimlar bilan o'zaro bog'langan.

Inson tanasining asosiy kimyoviy tarkibi: suv (60-70%), oqsillar (15-20%), yog'lar (10-15%), minerallar (5%), uglevodlar (1-2%). Organizm faoliyatini boshqaruvchi ikki tizim mavjud: nerv tizimi (tez, elektr signallari orqali) va endokrin tizim (sekin, gormonlar orqali).`
  },
  {
    id: 26, subject_id: 4, title: 'Tayanch-harakat tizimi',
    reading_time: 25, difficulty: 'Medium', display_order: 2,
    content: `Tayanch-harakat tizimi skelet va mushaklardan iborat. Inson skeletida 206 ta suyak mavjud. Skelet tanaga shakl beradi, ichki organlarni himoya qiladi va harakatni ta'minlaydi. Skelet suyaklari bog'lamlar va bo'g'inlar yordamida bir-biriga birikkan.

Suyak tarkibida organik va mineral moddalar mavjud. Organik moddalar suyakka egiluvchanlik beradi, mineral moddalar (kalsiy, fosfor) esa mustahkamlik beradi. Yosh odamlarda organik moddalar ko'p bo'lgani uchun suyaklar egiluvchan, keksalarda mineral moddalar ko'p bo'lgani uchun suyaklar mo'rt bo'ladi.

Inson tanasida 600 dan ortiq mushak mavjud. Mushaklar tana massasining 40-50 foizini tashkil etadi. Mushaklar uch turga bo'linadi: skelet (ko'ndalang-targ'il) mushaklari — ixtiyoriy boshqariladi, silliq mushaklar — ichki organlarda joylashgan, yurak mushagi — faqat yurakda uchraydi va umr bo'yi ishlaydi.`
  },
  {
    id: 27, subject_id: 4, title: 'Qon va qon aylanish tizimi',
    reading_time: 30, difficulty: 'Hard', display_order: 3,
    content: `Qon — organizmda doimo harakatda bo'lgan suyuq biriktiruvchi to'qima. Inson tanasida taxminan 5-6 litr qon mavjud. Qon tarkibi: plazma (55%) va shaklli elementlar (45%) — eritrotsitlar, leykotsitlar va trombotsitlar.

Eritrotsitlar — qizil qon tanachalari bo'lib, ular kislorod va karbonat angidridni tashiydi. Leykotsitlar — oq qon tanachalari, ular organizmni kasalliklardan himoya qiladi. Trombotsitlar — qon ivishi jarayonida muhim rol o'ynaydi va jarohatlarda qon to'xtashini ta'minlaydi.

Yurak — qon aylanish tizimining markaziy organi. U to'rt kameradan (2 bo'lmacha va 2 qorincha) iborat. Yurak minutiga 60-80 marta urib, kuniga 100 000 marta qisqaradi. Qon aylanishning katta va kichik doiralari mavjud. Katta doira — qonni butun tanaga tarqatadi, kichik doira — o'pkada qonni kislorod bilan boyitadi.`
  },
  {
    id: 28, subject_id: 4, title: 'Nafas olish tizimi',
    reading_time: 25, difficulty: 'Medium', display_order: 4,
    content: `Nafas olish — organizmning kislorod olishi va karbonat angidridni chiqarishi jarayoni. Nafas olish tizimi organlari: burun bo'shlig'i, halqum, hiqildoq, traxeya, bronxlar va o'pkalar. Havo burun orqali kirganda isiydi, namlanadi va changdan tozalanadi.

O'pkalar nafas olish tizimining asosiy organlari hisoblanadi. O'ng o'pkada 3 ta, chap o'pkada 2 ta bo'lak mavjud. O'pkalar ichida bronxlar tarmoqlanib, bronxiolalarga aylanadi va ularning oxirida alveolalar joylashgan. Alveolalar — gaz almashinuvi sodir bo'ladigan mayda pufakchalar.

Inson tinch holatda minutiga 16-20 marta nafas oladi. Jismoniy ish paytida nafas olish tezlashadi. Har bir nafas olishda taxminan 500 ml havo o'pkaga kiradi. O'pkalarning umumiy yuzasi taxminan 100 m² — bu tennis maydonchasining yuzasiga teng. Chekish o'pkaga jiddiy zarar yetkazadi va ko'plab kasalliklar sababchisi bo'ladi.`
  },
  {
    id: 29, subject_id: 4, title: 'Ovqat hazm qilish tizimi',
    reading_time: 30, difficulty: 'Medium', display_order: 5,
    content: `Ovqat hazm qilish — oziq moddalarni organizm o'zlashtira oladigan oddiy moddalarga parchalash jarayoni. Hazm qilish tizimi organlari: og'iz bo'shlig'i, qizilo'ngach, oshqozon, ingichka ichak, yo'g'on ichak va yordamchi organlar (jigar, oshqozon osti bezi).

Ovqat hazm qilish og'iz bo'shlig'ida boshlanadi. Tishlar ovqatni maydalaydi, so'lak bezlari so'lak ishlab chiqaradi. So'lakdagi amilaza fermenti kraxmalni parchalay boshlaydi. Ovqat qizilo'ngach orqali oshqozonga tushadi. Oshqozonda xlorid kislota va pepsin fermenti ta'sirida oqsillar parchalanadi.

Ingichka ichak — ovqat hazm qilishning asosiy joyi. Bu yerda jigar o'ti va oshqozon osti bezi shiralari ta'sirida yog'lar, oqsillar va uglevodlar to'liq parchalanadi. So'rilgan oziq moddalar qon orqali butun organizmga tarqaladi. Yo'g'on ichakda suv so'riladi va hazm bo'lmagan qoldiqlar tashqariga chiqariladi.`
  },
  {
    id: 30, subject_id: 4, title: 'Nerv tizimi',
    reading_time: 30, difficulty: 'Hard', display_order: 6,
    content: `Nerv tizimi — organizmning boshqaruv markazi. U markaziy nerv tizimi (bosh miya va orqa miya) va periferiya nerv tizimidan (nervlar va nerv tugunlari) iborat. Nerv tizimi organizmning barcha organ va tizimlarini boshqaradi, tashqi muhit ta'sirlariga javob beradi.

Bosh miya — nerv tizimining eng muhim organi. U 100 milliard neyrondan tashkil topgan. Bosh miya katta yarim sharlar, miyacha, o'rta miya, ko'prik va uzunchoq miyadan iborat. Katta yarim sharlar po'stlog'i tafakkur, xotira, nutq, iroda va boshqa oliy nerv faoliyatini boshqaradi.

Neyron — nerv tizimining asosiy hujayrasi. U tana, dendritlar (qisqa o'simtalar) va akson (uzun o'simta) dan iborat. Neyronlar o'rtasida sinaps orqali nerv impulslari uzatiladi. Nerv impulsi tezligi 120 m/s ga yetishi mumkin. Refleks — nerv tizimining tashqi ta'sirga javob berishi. Reflekslar shartsiz (tug'ma) va shartli (orttirilgan) turlarga bo'linadi.`
  },
  {
    id: 31, subject_id: 4, title: 'Sezgi organlari',
    reading_time: 25, difficulty: 'Medium', display_order: 7,
    content: `Sezgi organlari organizmga tashqi muhit haqida ma'lumot beradi. Inson beshta asosiy sezgi organiga ega: ko'rish (ko'z), eshitish (quloq), hid bilish (burun), ta'm bilish (til), teri sezgisi (teri). Har bir sezgi organi maxsus retseptorlar orqali ta'sirlanishni qabul qiladi.

Ko'z — eng muhim sezgi organi bo'lib, inson atrof-muhit haqidagi ma'lumotlarning 80 foizini ko'rish orqali oladi. Ko'z olmasi qattiq pardasi (sklera), tomirli parda va to'r parda (retina) dan iborat. Retinadagi tayoqcha hujayralar yorug'lik va qorong'ilikni, kolbacha hujayralar esa ranglarni ajratadi.

Quloq — eshitish va muvozanat organi. U tashqi quloq, o'rta quloq va ichki quloq qismlaridan iborat. Ovoz to'lqinlari tashqi quloq orqali nog'ora pardaga yetib keladi. O'rta quloqdagi suyakchalar (bolg'a, sandon, uzangi) tovush tebranishlarini kuchaytiradi. Ichki quloqdagi chig'anoq organi tovushni nerv impulslariga aylantiradi. Yarim doira kanallari muvozanatni saqlashda ishtirok etadi.`
  },
  {
    id: 32, subject_id: 4, title: 'Endokrin tizim',
    reading_time: 25, difficulty: 'Hard', display_order: 8,
    content: `Endokrin tizim — gormonlar ishlab chiqaruvchi bezlar tizimi. Gormonlar qonga tushib, organizmning ko'plab jarayonlarini boshqaradi: o'sish, moddalar almashinuvi, ko'payish, stressga javob berish. Endokrin bezlar: gipofiz, qalqonsimon bez, buyrak usti bezlari, oshqozon osti bezi va boshqalar.

Gipofiz — bosh miyaning pastki qismida joylashgan kichik bez. U "bezlarning bezi" deb ataladi, chunki boshqa bezlarning faoliyatini boshqaradi. Gipofiz o'sish gormoni, prolaktin va boshqa gormonlarni ishlab chiqaradi. O'sish gormonining yetishmasligi pakanalikka, ortiqchaligi esa gigantizmga olib keladi.

Qalqonsimon bez bo'yinda joylashgan bo'lib, tiroksin gormoni ishlab chiqaradi. Tiroksin moddalar almashinuvi tezligini boshqaradi. Tiroksin yetishmasligi — tanqislik kasalligi (miksedema), ortiqchaligi esa Bazedov kasalligiga olib keladi. Oshqozon osti bezi insulin gormoni ishlab chiqaradi — u qondagi qand miqdorini boshqaradi. Insulin yetishmasligi qandli diabet kasalligiga olib keladi.`
  },

  // ===== 9-SINF PRO: Biologiya (subject_id: 5) =====
  {
    id: 500, subject_id: 5, title: 'Hujayra biologiyasi',
    reading_time: 30, difficulty: 'Medium', display_order: 1,
    content: `Hujayra biologiyasi (sitologiya) — hujayraning tuzilishi, funksiyalari va hayot sikli bilan shug'ullanuvchi fan. Barcha tirik organizmlar hujayralardan tashkil topgan — bu hujayra nazariyasining asosiy qoidasi. Hujayra nazariyasi 1838-39-yillarda M. Shleyden va T. Shvann tomonidan yaratilgan.

Prokariot hujayralar (bakteriyalar) va eukariot hujayralar (o'simlik, hayvon, zamburug') o'rtasida katta farq mavjud. Prokariatlarda yadro membranasi yo'q, DNK sitoplazma ichida erkin holda joylashgan. Eukariotlarda yadro aniq membrana bilan o'ralgan va hujayraning boshqaruv markazi hisoblanadi.

Hujayra organoidlari: yadro (genetik markaz), mitoxondriyalar (energiya stantsiyasi), ribosomalar (oqsil fabrikasi), endoplazmatik to'r (moddalar sintezi va tashish), Golji kompleksi (saralash va qadoqlash), lizosomalar (hazm qilish), hujayra markazi (bo'linish). O'simlik hujayrasida qo'shimcha ravishda xloroplastlar, hujayra devori va vakuol mavjud.`
  },
  {
    id: 501, subject_id: 5, title: 'Hujayra kimyosi',
    reading_time: 30, difficulty: 'Hard', display_order: 2,
    content: `Hujayra kimyoviy moddalardan tashkil topgan. Noorganik moddalar — suv va mineral tuzlar. Organik moddalar — oqsillar, yog'lar, uglevodlar va nuklein kislotalar. Suv hujayra massasining 60-80 foizini tashkil etadi va barcha kimyoviy reaktsiyalar uchun muhit bo'lib xizmat qiladi.

Oqsillar — hayotning asosiy moddasi. Ular aminokislotalardan tuzilgan. 20 xil aminokislota mavjud. Oqsillar fermentlar (katalizatorlar), gormonlar, antitanachalar, transport oqsillari va strukturaviy oqsillar vazifasini bajaradi. Oqsilning tuzilishi 4 ta darajada ko'riladi: birlamchi, ikkilamchi, uchlamchi va to'rtlamchi.

Nuklein kislotalar — irsiy axborotni saqlovchi va uzatuvchi moddalar. DNK (dezoksiribonuklein kislota) — ikki zanjirli spiral, u genlarni saqlaydi. RNK (ribonuklein kislota) — bir zanjirli, u oqsil sintezida ishtirok etadi. DNK nukleotidlarining juftlanish qoidasi: adenin-timin (A-T), guanin-sitozin (G-C).`
  },
  {
    id: 502, subject_id: 5, title: 'Moddalar almashinuvi',
    reading_time: 25, difficulty: 'Medium', display_order: 3,
    content: `Moddalar almashinuvi (metabolizm) — hujayrada sodir bo'ladigan barcha kimyoviy reaktsiyalarning yig'indisi. Metabolizm ikki jarayondan iborat: assimilyatsiya (anabolizm) va dissimilyatsiya (katabolizm). Assimilyatsiyada oddiy moddalardan murakkab moddalar sintez qilinadi, dissimilyatsiyada esa murakkab moddalar parchalanib, energiya ajraladi.

Energiya almashinuvining uch bosqichi: tayyorlov bosqichi (polimer → monomer), kislorodsiz bosqich (glikoliz — glukoza → piruvat + 2 ATF) va kislorodli bosqich (Krebs sikli — piruvat → CO₂ + H₂O + 36 ATF). Jami bitta glukoza molekulasidan 38 ATF hosil bo'ladi.

ATF (adenozintrifosfat) — hujayraning universal energiya valyutasi. ATF molekulasi adenin, riboza va uchta fosfat guruhidan iborat. Oxirgi fosfat guruhi uzilganda energiya ajraladi va bu energiya hujayradagi barcha jarayonlar uchun ishlatiladi. ATF→ADF+F+energiya.`
  },
  {
    id: 503, subject_id: 5, title: 'Genetika asoslari',
    reading_time: 30, difficulty: 'Hard', display_order: 4,
    content: `Genetika — irsiyat va o'zgaruvchanlik haqidagi fan. Genetikaning asoschisi — chex rohibi Gregor Mendel (1822-1884). U no'xat o'simliklari ustida tajribalar o'tkazib, irsiyatning asosiy qonuniyatlarini kashf etgan.

Mendelning birinchi qonuni (dominantlik qonuni): birinchi avlod duragaylari bir xil bo'lib, ota-onadan birining belgisiga o'xshaydi. Ikkinchi qonuni (ajralish qonuni): ikkinchi avlod duragaylarida belgilar 3:1 nisbatda ajraladi. Uchinchi qonuni (mustaqil taqsimlanish): turli belgilar bir-biridan mustaqil ravishda irsiylanadi.

Gen — irsiy axborotning elementar birligi, DNK molekulasining ma'lum qismi. Genotip — organizmdagi genlarning yig'indisi. Fenotip — tashqi ko'rinadigan belgilar yig'indisi. Gomozigotalar (AA yoki aa) faqat bir xil gametalarga ega, geterozigotalar (Aa) esa ikki xil gametalarga ega. Dominant gen (A) retsessiv gen (a) ustidan hukmronlik qiladi.`
  },
  {
    id: 504, subject_id: 5, title: 'Irsiyat va o\'zgaruvchanlik',
    reading_time: 25, difficulty: 'Medium', display_order: 5,
    content: `Irsiyat — organizmning o'z belgilarini keyingi avlodlarga uzatish xususiyati. O'zgaruvchanlik — bir tur ichidagi organizmlarning bir-biridan farq qilishi. Irsiyat va o'zgaruvchanlik tirik organizmlarning eng muhim xususiyatlari bo'lib, evolyutsiyaning harakatlantiruvchi kuchlaridan biridir.

O'zgaruvchanlik ikki turga bo'linadi: modifikatsion (irsiylanmaydigan) va mutatsion (irsiylanadigan). Modifikatsion o'zgaruvchanlik tashqi muhit ta'sirida yuzaga keladi va keyingi avlodlarga o'tmaydi. Masalan, quyoshda qorayish. Mutatsion o'zgaruvchanlik genlar yoki xromosomalar o'zgarishi natijasida yuzaga keladi va irsiylanadi.

Mutatsiyalar gen, xromosoma va genom mutatsiyalarga bo'linadi. Gen mutatsiyasi — genning nukleotid ketma-ketligining o'zgarishi. Xromosoma mutatsiyasi — xromosoma tuzilishining o'zgarishi. Genom mutatsiyasi — xromosomalar sonining o'zgarishi (masalan, Daun sindromi — 21-xromosomaning uchlamchi bo'lishi).`
  },
  {
    id: 505, subject_id: 5, title: 'Selektsiya asoslari',
    reading_time: 25, difficulty: 'Medium', display_order: 6,
    content: `Selektsiya — o'simlik navlari, hayvon zotlari va mikroorganizm shtammlarini yaratish va takomillashtirish fani. Selektsiyaning nazariy asosi genetika hisoblanadi. Selektsiyaning asosiy usullari: sun'iy tanlanish, duragaylash va mutatsiyaga duchor qilish.

Sun'iy tanlanish — inson tomonidan kerakli belgilarga ega organizmlarni tanlab, ularni ko'paytirish. Darvin sun'iy tanlanishni evolyutsiya nazariyasining muhim qismi sifatida ta'riflagan. Ommaviy tanlanishda — ko'p organizm orasidan eng yaxshilari tanlanadi. Individual tanlanishda — alohida organizmning avlodlari tekshiriladi.

N.I. Vavilov — buyuk rus selektsioneri va genetigi. U madaniy o'simliklarning kelib chiqish markazlari haqidagi ta'limotni yaratgan. Vavilov 8 ta kelib chiqish markazi aniqlagan: Janubiy Osiyo, Sharqiy Osiyo, Janubi-g'arbiy Osiyo, O'rta yer dengizi, Efiopiya, Markaziy Amerika, Janubiy Amerika (Andlar), Janubiy Amerika (Braziliya).`
  },
  {
    id: 506, subject_id: 5, title: 'Evolyutsiya ta\'limoti',
    reading_time: 30, difficulty: 'Hard', display_order: 7,
    content: `Evolyutsiya — tirik organizmlarning uzoq vaqt davomida o'zgarishi va yangi turlarning paydo bo'lishi. Evolyutsiya nazariyasining asoschisi Charlz Darvin (1809-1882). U 1859-yilda "Turlarning kelib chiqishi" asarini nashr etgan.

Darvin nazariyasining asosiy qoidalari: 1) Barcha organizmlar o'zgaruvchan. 2) Yashash uchun kurash mavjud (tur ichida, turlar orasida, tabiy sharoitga qarshi). 3) Tabiiy tanlanish — muhitga eng moslashgan organizmlar yashab qoladi va ko'payadi. 4) Moslashuvchanlik — tabiiy tanlanish natijasida organizmlar muhitga moslashadi.

Evolyutsiyaning dalillari: paleontologik (qazilma qoldiqlar), embriologik (turli organizmlar muralari o'xshashligi), qiyosiy-anatomik (gomolog va analog organlar), molekulyar-genetik (DNK o'xshashligi). Masalan, odamning qo'li, kitning suzgichi, ko'rshapalakning qanoti — bular gomolog organlar, ular bir asosdan kelib chiqqan.`
  },
  {
    id: 507, subject_id: 5, title: 'Ekologiya va biosfera',
    reading_time: 25, difficulty: 'Medium', display_order: 8,
    content: `Biosfera — Yer sayyorasidagi barcha tirik organizmlar yashash maydoni. Bu tushunchani V.I. Vernadskiy ishlab chiqqan. Biosfera atmosferaning pastki qatlami, gidrosfera va litosferaning yuqori qatlamlarini o'z ichiga oladi.

Ekologik omillar — organizmga ta'sir ko'rsatuvchi tashqi muhit sharoitlari. Ular uch guruhga bo'linadi: abiotik (harorat, namlik, yorug'lik), biotik (tirik organizmlar ta'siri), antropogen (inson faoliyati ta'siri). Har bir organizm muayyan sharoitlarga moslashgan — bu ekologik niша deb ataladi.

Tabiatda moddalar va energiya aylanishi doimo sodir bo'ladi. Produsentlar (o'simliklar) — organik moddalar ishlab chiqaradi. Konsumentlar (hayvonlar) — tayyor organik moddalar bilan oziqlanadi. Redusentlar (bakteriyalar, zamburug'lar) — o'lik organik moddalarni parchalaydi. Shu tariqa moddalar doimo aylanib turadi va ekotizimlar muvozanatini saqlaydi.`
  },

  // ===== 10-SINF PRO: Biologiya (subject_id: 6) =====
  {
    id: 508, subject_id: 6, title: 'Genetika va gen injeneriyasi',
    reading_time: 30, difficulty: 'Hard', display_order: 1,
    content: `Gen injeneriyasi — organizmlarning genetik materialini sun'iy ravishda o'zgartirish usullari majmuasi. Bu soha 1970-yillarda paydo bo'lgan va bugungi kunda tibbiyot, qishloq xo'jaligi va sanoatda keng qo'llanilmoqda.

Gen injeneriyasining asosiy bosqichlari: kerakli genni aniqlash va ajratish, genni vektor (plazmid yoki virus) ga biriktirish, rekombinant DNKni qabul qiluvchi organizmga kiritish, transgen organizmni tanlash va tekshirish. Restriksiya fermentlari DNKni ma'lum joylarda kesadi, ligaza fermenti esa qismlarni biriktiradi.

GMO (genetik modifikatsiyalangan organizmlar) — gen injeneriyasi usullari bilan o'zgartirilgan organizmlar. Masalan, zararkunandalarga chidamli paxta, quruqchilikka bardoshli bug'doy, vitaminlar miqdori oshirilgan guruch ("oltin guruch"). GMO xavfsizligi haqida ilmiy munozaralar davom etmoqda, lekin ko'plab tadqiqotlar ularning xavfsiz ekanini tasdiqlagan.`
  },
  {
    id: 509, subject_id: 6, title: 'DNK replikatsiyasi',
    reading_time: 25, difficulty: 'Hard', display_order: 2,
    content: `DNK replikatsiyasi — DNK molekulasining o'z nusxasini yaratish jarayoni. Bu jarayon hujayra bo'linishidan oldin sodir bo'ladi, natijada har bir yangi hujayra to'liq genetik axborotga ega bo'ladi. Replikatsiya yarim konservativ usulda amalga oshadi — har bir yangi molekula bir eski va bir yangi zanjirdan iborat.

Replikatsiya jarayoni: 1) Gelikaza fermenti DNK ikki zanjirini ajratadi. 2) Praymaza fermenti boshlang'ich primer qo'yadi. 3) DNK-polimeraza fermenti yangi zanjirni sintez qiladi, har bir nukleotidga komplementar nukleotidni qo'shib boradi (A-T, G-C). 4) Ligaza fermenti Okazaki fragmentlarini biriktiradi.

Replikatsiyaning aniqligi juda yuqori — har milliard nukleotidda atigi 1 ta xatolik sodir bo'ladi. Bu aniqlikkni DNK-polimerazaning tekshirish (proofreading) qobiliyati ta'minlaydi. Bakteriyada butun genom 20-40 daqiqada replikatsiya bo'ladi, inson hujayrasida esa bu jarayon 6-8 soat davom etadi.`
  },
  {
    id: 510, subject_id: 6, title: 'Oqsillar biosintezi',
    reading_time: 30, difficulty: 'Hard', display_order: 3,
    content: `Oqsillar biosintezi — DNKdagi genetik axborotning oqsil molekulasiga aylanishi jarayoni. Bu jarayon ikki bosqichda amalga oshadi: transkripsiya va translyatsiya. Markaziy dogma: DNK → RNK → Oqsil.

Transkripsiya — DNK matritsa zanjiri asosida iRNK (informatsion RNK) sintez qilish. Bu jarayon yadroda sodir bo'ladi. RNK-polimeraza fermenti DNKning ma'lum qismini (genni) o'qib, komplementar iRNK zanjirini sintez qiladi. iRNK yadroda ishlov olganidan keyin sitoplazmaga chiqadi.

Translyatsiya — iRNKdagi axborot asosida oqsil sintez qilish. Bu jarayon ribosomada sodir bo'ladi. tRNK (transport RNK) aminokislotalarni ribosomaga tashiydi. Ribosom iRNKning har bir kodonini (3 nukleotid) o'qib, mos aminokislotani oqsil zanjiriga qo'shadi. Genetik kod universal va degeneratlangan — 64 ta kodon 20 ta aminokislotani kodlaydi.`
  },
  {
    id: 511, subject_id: 6, title: 'Hujayra bo\'linishi — mitoz va meyoz',
    reading_time: 30, difficulty: 'Hard', display_order: 4,
    content: `Hujayra bo'linishi — hujayralarning ko'payish usuli. Asosiy ikki turi mavjud: mitoz (somatik bo'linish) va meyoz (gametalardagi bo'linish). Bo'linishdan oldin hujayra interfaza davrida DNKni ikki baravar ko'paytiradi.

Mitoz — bitta diploid hujayradan ikkita genetik jihatdan bir xil diploid hujayra hosil bo'lishi. Mitoz 4 fazadan iborat: profaza (xromosomalar ko'rinadi, yadro qobig'i erib ketadi), metafaza (xromosomalar ekvator tekisligida joylashadi), anafaza (xromatidlar qutblarga tortiladi), telofaza (yadro qayta hosil bo'ladi, hujayra ikkiga bo'linadi).

Meyoz — diploid hujayradan to'rtta gaploid hujayra (gameta) hosil bo'lishi. Meyoz ikkita ketma-ket bo'linishdan iborat. Birinchi bo'linishda gomolog xromosomalar ajraladi (reduktsion bo'linish — xromosoma soni yarmiga tushadi). Ikkinchi bo'linish mitozga o'xshash. Meyozda krossingover (genetik material almashinuvi) sodir bo'lib, genetik xilma-xillikni ta'minlaydi.`
  },
  {
    id: 512, subject_id: 6, title: 'Organizmlarning ko\'payishi',
    reading_time: 25, difficulty: 'Medium', display_order: 5,
    content: `Ko'payish — tirik organizmlarning eng muhim xususiyatlaridan biri. Ko'payish tufayli turlar saqlanib qoladi va avloddan avlodga genetik axborot uzatiladi. Ko'payish ikki asosiy turga bo'linadi: jinsiy va jinssiz ko'payish.

Jinssiz ko'payish — bitta organizmdan yangi organizm hosil bo'lishi. Usullari: bo'linish (bakteriyalar, sodda hayvonlar), vegetativ ko'payish (o'simliklar — ildiz, poya, barg orqali), kurtak hosil qilish (gidra, achitqi zamburug'i), sporalar yordamida ko'payish (zamburug'lar, yo'sinlar). Jinssiz ko'payishda avlodlar genetik jihatdan ota-onaga bir xil bo'ladi.

Jinsiy ko'payish — erkak va urg'ochi jinsiy hujayralar (gametalar) qo'shilishi natijasida yangi organizm hosil bo'lishi. Spermatozoid (erkak gameta) va tuxum hujayra (urg'ochi gameta) qo'shilishi — urug'lanish deyiladi. Jinsiy ko'payishning afzalligi — avlodlarda genetik xilma-xillik hosil bo'ladi, bu evolyutsiya uchun muhim.`
  },
  {
    id: 513, subject_id: 6, title: 'Individual rivojlanish — ontogenez',
    reading_time: 25, difficulty: 'Medium', display_order: 6,
    content: `Ontogenez — organizmning individual rivojlanishi, zigotadan to hayotining oxirigacha bo'lgan davr. Ontogenez ikki davrga bo'linadi: embrional (tug'ilgunga qadar) va postembrional (tug'ilganidan keyin).

Embrional rivojlanishning asosiy bosqichlari: zigota → bo'linish (morula → blastula) → gastrulyatsiya (2 qavatli murtak) → organ hosil bo'lishi (organogenez). Gastrulyatsiyada uchta murtak varaqalari hosil bo'ladi: ektoderma (tashqi — teri, nerv tizimi), mezoderma (o'rta — mushaklar, suyaklar, qon), entoderma (ichki — hazm va nafas organlari).

Postembrional rivojlanish to'g'ridan-to'g'ri (sut emizuvchilar — ota-onaga o'xshash bolalar tug'iladi) va bilvosita (hasharotlar, amfibiyalar — lichinka bosqichida) bo'lishi mumkin. Masalan, baqa rivojlanishi: tuxum → it baliq (jabra bilan nafas oladi) → metamorfoz → voyaga yetgan baqa (o'pka bilan nafas oladi).`
  },
  {
    id: 514, subject_id: 6, title: 'Evolyutsion biologiya',
    reading_time: 30, difficulty: 'Hard', display_order: 7,
    content: `Evolyutsion biologiya — tirik organizmlarning tarixiy rivojlanishini o'rganuvchi fan. Zamonaviy evolyutsion nazariya (sintetik evolyutsiya nazariyasi) Darvin ta'limotini genetika bilan birlashtiradi. Bu nazariya 1930-40-yillarda shakllangan.

Evolyutsiyaning harakatlantiruvchi kuchlari: mutatsiyalar (genetik material o'zgarishi), populyatsiya to'lqinlari (son o'zgarishi), izolyatsiya (geografik, ekologik, reproduktiv), tabiiy tanlanish (eng moslashganlarning yashab qolishi), drift (tasodifiy o'zgarishlar). Tur hosil bo'lish — evolyutsiyaning muhim natijasi.

Makroevolyutsiya — yirik sistematik guruhlar (turkum, sinf, tip) darajasidagi o'zgarishlar. Aro-moroz (tashkiliy darajaning ko'tarilishi), idioadaptatsiya (muayyan sharoitga moslashish), umumiy degeneratsiya (parazit hayot tarziga o'tishda soddalashtirish) — evolyutsiyaning asosiy yo'nalishlari.`
  },
  {
    id: 515, subject_id: 6, title: 'Populyatsiya genetikasi',
    reading_time: 25, difficulty: 'Hard', display_order: 8,
    content: `Populyatsiya — muayyan hududda yashovchi bir turga mansub organizmlar guruhi. Populyatsiya genetikasi — populyatsiyadagi genlar taqsimlanishi va o'zgarishini o'rganadi. Populyatsiya evolyutsiyaning elementar birligi hisoblanadi.

Xardi-Vaynberg qonuni: ideal populyatsiyada (katta hajm, tasodifiy juftlashish, mutatsiya, seleksiya va migratsiya yo'q) genotiplar chastotasi avloddan avlodga o'zgarmay qoladi. Formula: p² + 2pq + q² = 1, bu yerda p — dominant allel chastotasi, q — retsessiv allel chastotasi.

Amalda ideal populyatsiya mavjud emas — evolyutsion omillar doimo ta'sir ko'rsatadi. Genetik drift — kichik populyatsiyalarda tasodifiy genlar chastotasining o'zgarishi. "Muassislar effekti" — kichik guruh yangi hududga ko'chib o'tganda, ular umumiy populyatsiyadan farqli gen fondiga ega bo'ladi. Populyatsiya genetikasi tibbiyotda, selektsiyada va tabiatni muhofaza qilishda qo'llaniladi.`
  },

  // ===== 11-SINF PRO: Biologiya (subject_id: 7) =====
  {
    id: 516, subject_id: 7, title: 'Molekulyar biologiya asoslari',
    reading_time: 30, difficulty: 'Hard', display_order: 1,
    content: `Molekulyar biologiya — tirik organizmlarning molekulyar darajadagi tuzilishi va funksiyalarini o'rganuvchi fan. Bu fan DNK tuzilishining kashf etilishi (1953, Uotson va Krik) bilan yangi bosqichga ko'tarildi.

Molekulyar biologiyaning asosiy tadqiqot ob'ektlari: nuklein kislotalar (DNK, RNK), oqsillar, lipidlar va ularning o'zaro ta'siri. Gen ekspressiyasi — gendan oqsilgacha bo'lgan jarayon — molekulyar biologiyaning markaziy mavzusi. Gen regulyatsiyasi turli darajalarda amalga oshadi: transkripsion, posttranskripsion, translyatsion va posttranslyatsion.

Zamonaviy molekulyar biologiyaning muhim usullari: PZR (polimeraz zanjir reaktsiyasi) — DNKni ko'paytirish, gel-elektroforez — DNK va oqsillarni ajratish, Western/Southern/Northern blotting — spetsifik molekulalarni aniqlash, CRISPR-Cas9 — gen tahrirlash texnologiyasi. Bu usullar tibbiyot, kriminalistika va biotexnologiyada keng qo'llanilmoqda.`
  },
  {
    id: 517, subject_id: 7, title: 'Biotexnologiya',
    reading_time: 25, difficulty: 'Medium', display_order: 2,
    content: `Biotexnologiya — tirik organizmlar yoki ularning qismlaridan foydalanib, mahsulot va texnologiyalar yaratish. Biotexnologiya qadimiy fan — non yopish, vino tayyorlash, pishloq tayyorlash — bular ham biotexnologiyaning dastlabki shakllari.

Zamonaviy biotexnologiyaning yo'nalishlari: tibbiy biotexnologiya (insulin, vaktsinalar, antitanachalar ishlab chiqarish), qishloq xo'jalik biotexnologiyasi (GM ekinlar, biologik o'g'itlar), sanoat biotexnologiyasi (bioetanol, bioplastik), ekologik biotexnologiya (bioremediatsiya — ifloslanishni tozalash).

Hujayra madaniyati — laboratoriya sharoitida hujayralarni o'stirish. Bu usul orqali o'simliklar klonlanadi, yangi navlar yaratiladi, dori-darmonlar sinovdan o'tkaziladi. Stvolali hujayralar — maxsus hujayralar bo'lib, ular organizmning istalgan hujayrasiga aylanish qobiliyatiga ega. Stvolali hujayralar regenerativ tibbiyotda katta istiqbolga ega.`
  },
  {
    id: 518, subject_id: 7, title: 'Immunologiya',
    reading_time: 30, difficulty: 'Hard', display_order: 3,
    content: `Immunologiya — organizmning o'zini himoya qilish tizimi — immunitetni o'rganuvchi fan. Immunitet — organizmning infektsiyalarga va yot moddalarga qarshi turish qobiliyati. Immunitet tug'ma (nospetsifik) va orttirilgan (spetsifik) turlarga bo'linadi.

Tug'ma immunitet: teri va shilliq qavatlar (to'siq), fagotsitlar (yot jismlarni yutadi), komplement tizimi (bakteriyalarni parchalaydi), interferon (viruslarga qarshi). Orttirilgan immunitet: gumoral (antitanachalar — B-limfotsitlar ishlab chiqaradi) va hujayraviy (T-limfotsitlar — zararlangan hujayralarni yo'q qiladi).

Vaktsinatsiya — sun'iy immunitetni hosil qilish. Vaktsina tarkibida kuchsizlantirilgan yoki o'ldirilgan patogenlar bo'lib, ular organizmda antitanachalar ishlab chiqarishni rag'batlantiradi. Edvard Jenner 1796-yilda birinchi vaktsinani (chechakka qarshi) yaratgan. Bugungi kunda vaktsinalar ko'plab xavfli kasalliklarni oldini oladi: poliomielit, qizamiq, gepatit, gripp va boshqalar.`
  },
  {
    id: 519, subject_id: 7, title: 'Virusologiya',
    reading_time: 25, difficulty: 'Medium', display_order: 4,
    content: `Viruslar — hujayrali tuzilishga ega bo'lmagan juda mayda infektsion agentlar. Ular faqat tirik hujayra ichida ko'payishi mumkin — shuning uchun ularni "obligat parazitlar" deb atashadi. Viruslarni birinchi bo'lib 1892-yilda rus olimi D.I. Ivanovskiy kashf etgan.

Virus tuzilishi juda oddiy: nuklein kislota (DNK yoki RNK) va oqsil qobiq (kapsid). Ba'zi viruslarda lipid qobiq ham mavjud. Viruslar o'z-o'zidan ko'paya olmaydi — ular xo'jayin hujayrasiga kirib, uning apparatini o'z nusxalarini yaratish uchun ishlatadi.

Virusli kasalliklar: gripp, COVID-19, OITS (VICh), gepatit, qizamiq, terlama va boshqalar. Antibiotiklar viruslarga ta'sir qilmaydi — virusli kasalliklarga qarshi antivirus preparatlar va vaktsinalar ishlatiladi. Bakteriofaglar — bakteriyalarni zararlaydi va ular tibbiyotda antibiotiklarga alternativa sifatida tadqiq qilinmoqda.`
  },
  {
    id: 520, subject_id: 7, title: 'Bioinformatika asoslari',
    reading_time: 25, difficulty: 'Hard', display_order: 5,
    content: `Bioinformatika — biologik ma'lumotlarni kompyuter yordamida tahlil qilish fani. Bu soha biologiya, matematika va informatikaning kesishgan joyida paydo bo'lgan. Inson genomi loyihasi (2003) bioinformatikaning rivojlanishiga kuchli turtki berdi.

Bioinformatikaning asosiy vazifalari: DNK va oqsil ketma-ketliklarini tahlil qilish, genlarni aniqlash, oqsillarning uch o'lchamli tuzilishini bashorat qilish, evolyutsion taqqoslash, dori-darmon yaratish uchun maqsadli molekulalarni topish. Ma'lumotlar bazalari — GenBank, UniProt, PDB — milliardlab ketma-ketliklarni saqlaydi.

Sun'iy intellekt va mashinaviy o'qitish bioinformatikada inqilob yasadi. AlphaFold dasturi (Google DeepMind) oqsillarning uch o'lchamli tuzilishini oldindan ayta oladi. CRISPR texnologiyasi bilan birgalikda bioinformatika personalizatsiyalangan tibbiyot, gen terapiyasi va yangi dorilar ishlab chiqarishda muhim rol o'ynamoqda.`
  },
  {
    id: 521, subject_id: 7, title: 'Nerv tizimi fiziologiyasi',
    reading_time: 30, difficulty: 'Hard', display_order: 6,
    content: `Nerv tizimi fiziologiyasi — neyronlarning ishlash mexanizmi, nerv impulslarining uzatilishi va miya faoliyatini o'rganadi. Neyron — nerv tizimining funksional birligi. Tinch holatdagi neyronning membranasida -70 mV potentsial farq (tinchlik potentsiali) mavjud.

Harakat potentsiali — neyron qo'zg'alganda membranada sodir bo'ladigan elektrik o'zgarish. Na+ ionlari hujayra ichiga kirib, membranani depolyarizatsiya qiladi (+30 mV gacha). Keyin K+ ionlari tashqariga chiqib, repolyarizatsiya sodir bo'ladi. Bu jarayon 1-2 millisekund davom etadi va nerv impulsi sifatida akson bo'ylab tarqaladi.

Sinaps — neyronlar o'rtasidagi aloqa joyi. Nerv impulsi sinapsga yetganda, sinaptik vezikulalardan neyromediatorlar (atsetilxolin, dofamin, serotonin) ajraladi. Mediatorlar keyingi neyronning retseptorlariga ta'sir qiladi va yangi impulsni hosil qiladi. Sinapslar qo'zg'atuvchi va tormozlovchi bo'ladi — bu miya faoliyatining nozik regulyatsiyasini ta'minlaydi.`
  },
  {
    id: 522, subject_id: 7, title: 'Biosfera va inson',
    reading_time: 25, difficulty: 'Medium', display_order: 7,
    content: `Biosfera — Yer sayyorasidagi barcha tirik organizmlarning yashash maydoni. V.I. Vernadskiy biosferani "tirik modda bilan shakllangan Yer qobig'i" deb ta'riflagan. Biosfera atmosferaning pastki 25 km, gidrosferaning butun qalinligi va litosferaning yuqori 5 km qatlamini qamrab oladi.

Inson faoliyati biosferaga kuchli ta'sir ko'rsatmoqda. Sanoat inqilobidan buyon atmosferadagi CO₂ miqdori 280 ppm dan 420 ppm ga oshdi. Iqlim o'zgarishi, o'rmonlar kesilishi, okean ifloslanishi, biologik xilma-xillikning kamayishi — bular zamonaviy ekologik muammolar.

Barqaror rivojlanish — kelajak avlodlarning ehtiyojlarini qondirish imkoniyatini saqlab qolgan holda, bugungi ehtiyojlarni qondirish. BMTning Barqaror Rivojlanish Maqsadlari (2015-2030) 17 ta yo'nalishni o'z ichiga oladi. Vernadskiy "noosfera" (aql-idrok sferasi) tushunchasini kiritgan — bu inson ongli ravishda biosferani boshqaradigan davr.`
  },
  {
    id: 523, subject_id: 7, title: 'Zamonaviy biologiya muammolari',
    reading_time: 30, difficulty: 'Hard', display_order: 8,
    content: `Zamonaviy biologiya tez sur'atlar bilan rivojlanmoqda va ko'plab yangi imkoniyatlar hamda muammolarni keltirib chiqarmoqda. CRISPR-Cas9 gen tahrirlash texnologiyasi — genlarni aniq joyda kesish va o'zgartirish imkonini beradi. Bu texnologiya irsiy kasalliklarni davolash, mahsuldor ekinlar yaratish va yangi dorilar ishlab chiqarishda inqilob qilmoqda.

Personalizatsiyalangan tibbiyot — har bir bemorning genetik xususiyatlariga mos davolash. Farmakogenomika — genlar dori preparatlarga ta'sirini o'rganadi. Onkogenomika — saraton kasalliklarining genetik asoslarini tadqiq qiladi. Rejenerativ tibbiyot — stvolali hujayralar va to'qimalar injeneriyasi yordamida shikastlangan organlarni tiklash.

Bioaxloq (bioetika) — biologiya va tibbiyotdagi axloqiy muammolar bilan shug'ullanadi. Klonlash, GMO, gen terapiyasi, embrion tadqiqotlari — bular jamiyatda munozarali masalalar. Inson genini tahrirlash — kelajakda irsiy kasalliklarni yo'q qilish imkonini berishi mumkin, lekin "loyihalashtirilgan chaqaloqlar" masalasi jiddiy axloqiy muammo tug'diradi.`
  },
];

// ===== QUESTIONS =====
let qId = 1;
let oId = 1;

const createQuestion = (topicId, text, correct, diff, explanation, options) => {
  const q = { id: qId, topic_id: topicId, question_text: text, correct_answer: correct, difficulty: diff, explanation };
  const opts = options.map((o, i) => ({
    id: oId + i,
    question_id: qId,
    option_label: ['A', 'B', 'C', 'D'][i],
    option_text: o
  }));
  qId++;
  oId += 4;
  return { question: q, options: opts };
};

const allQA = [
  // 5-sinf questions
  createQuestion(1, 'Tabiyatshunoslik nima?', 'A', 'Easy', 'Tabiyatshunoslik tabiatni o\'rganuvchi fanlar majmuasi.',
    ['Tabiatni o\'rganuvchi fanlar majmuasi', 'Faqat hayvonlarni o\'rganuvchi fan', 'Faqat o\'simliklarni o\'rganuvchi fan', 'Kosmosni o\'rganuvchi fan']),
  createQuestion(1, 'Quyidagi olimlardan qaysi biri O\'rta Osiyolik?', 'B', 'Easy', 'Abu Ali ibn Sino O\'rta Osiyolik buyuk olim.',
    ['Aristotel', 'Abu Ali ibn Sino', 'Karl Linney', 'Charlz Darvin']),
  createQuestion(1, 'Jonsiz tabiatga nima kiradi?', 'C', 'Easy', 'Suv jonsiz tabiatning tarkibiy qismi.',
    ['Hayvonlar', 'O\'simliklar', 'Suv', 'Bakteriyalar']),
  createQuestion(1, 'Tabiyatshunoslik fanining qadimgi asoschisi kim?', 'A', 'Medium', 'Aristotel tabiyatshunoslik fanining qadimgi asoschisi hisoblanadi.',
    ['Aristotel', 'Nyuton', 'Eynshteyn', 'Mendel']),

  createQuestion(2, 'Tirik organizmlarning asosiy xususiyatlaridan biri qaysi?', 'A', 'Easy', 'Nafas olish tirik organizmlarning asosiy xususiyati.',
    ['Nafas olish', 'Erish', 'Qotish', 'Yonish']),
  createQuestion(2, 'Tabiatda moddalar aylanishida qaysi organizmlar qatnashadi?', 'D', 'Medium', 'Barcha organizmlar moddalar aylanishida qatnashadi.',
    ['Faqat o\'simliklar', 'Faqat hayvonlar', 'Faqat bakteriyalar', 'Barchasi']),
  createQuestion(2, 'Hujayra nima?', 'B', 'Easy', 'Hujayra hayotning eng kichik birligi.',
    ['Eng katta organ', 'Hayotning eng kichik birligi', 'Mineral modda', 'Suv molekulasi']),
  createQuestion(2, 'Jonsiz tabiatga quyidagilardan qaysi biri kiradi?', 'C', 'Easy', 'Tuproq jonsiz tabiatning qismi.',
    ['Gul', 'Daraxt', 'Tuproq', 'Qush']),

  createQuestion(3, 'Hujayraning eng muhim qismi nima?', 'A', 'Medium', 'Yadro hujayraning boshqaruv markazi.',
    ['Yadro', 'Membrana', 'Sitoplazma', 'Vakuol']),
  createQuestion(3, 'Hujayralarni birinchi marta kim ko\'rgan?', 'B', 'Easy', 'Robert Guk 1665-yilda hujayralarni birinchi marta ko\'rgan.',
    ['Mendel', 'Robert Guk', 'Darvin', 'Linney']),
  createQuestion(3, 'Mitoxondriyalarning vazifasi nima?', 'C', 'Medium', 'Mitoxondriyalar energiya ishlab chiqaradi.',
    ['Oqsil sintezi', 'Irsiy axborot saqlash', 'Energiya ishlab chiqarish', 'Moddalarni saralash']),
  createQuestion(3, 'Xromosomalar qayerda joylashgan?', 'A', 'Easy', 'Xromosomalar yadroda joylashgan.',
    ['Yadroda', 'Sitoplazmada', 'Membranada', 'Vakuolda']),

  createQuestion(4, 'Yer yuzida qancha o\'simlik turi mavjud?', 'B', 'Easy', 'Yer yuzida 350 000 dan ortiq o\'simlik turi mavjud.',
    ['100 000', '350 000 dan ortiq', '50 000', '1 million']),
  createQuestion(4, 'Fotosintez qaysi organda amalga oshiriladi?', 'C', 'Easy', 'Fotosintez bargda amalga oshiriladi.',
    ['Ildiz', 'Poya', 'Barg', 'Gul']),
  createQuestion(4, 'O\'simliklar qanday oziqlanadi?', 'A', 'Easy', 'O\'simliklar avtotrof bo\'lib, o\'zi oziq modda ishlab chiqaradi.',
    ['Avtotrof', 'Geterotrof', 'Parazit', 'Xemotrof']),
  createQuestion(4, 'O\'simlikning ko\'payish organi qaysi?', 'D', 'Easy', 'Gul o\'simlikning ko\'payish organi.',
    ['Ildiz', 'Poya', 'Barg', 'Gul']),

  createQuestion(5, 'Hayvonlar qanday oziqlanadi?', 'B', 'Easy', 'Hayvonlar geterotrof organizmlar.',
    ['Avtotrof', 'Geterotrof', 'Fototrof', 'Xemotrof']),
  createQuestion(5, 'Yer yuzida qancha hayvon turi mavjud?', 'A', 'Easy', '1,5 milliondan ortiq hayvon turi aniqlangan.',
    ['1,5 milliondan ortiq', '500 ming', '100 ming', '10 million']),
  createQuestion(5, 'Hayvonlarning eng ko\'p turli guruhi qaysi?', 'C', 'Medium', 'Bo\'g\'imoyoqlilar eng ko\'p turga ega.',
    ['Baliqlar', 'Qushlar', 'Bo\'g\'imoyoqlilar', 'Sutemizuvchilar']),
  createQuestion(5, 'Eng rivojlangan hayvonlar sinfi qaysi?', 'D', 'Easy', 'Sutemizuvchilar eng rivojlangan sinf.',
    ['Baliqlar', 'Reptiliyalar', 'Qushlar', 'Sutemizuvchilar']),

  createQuestion(6, 'Zamburug\'lar qanday oziqlanadi?', 'B', 'Easy', 'Zamburug\'lar geterotrof organizmlar.',
    ['Avtotrof', 'Geterotrof', 'Fototrof', 'Xemotrof']),
  createQuestion(6, 'Bakteriyalarning hajmi qanday?', 'A', 'Easy', 'Bakteriyalar juda mayda, faqat mikroskopda ko\'rinadi.',
    ['Juda mayda, faqat mikroskopda ko\'rinadi', 'Ko\'z bilan ko\'rish mumkin', 'Juda katta', 'O\'rta hajmli']),
  createQuestion(6, 'Foydali bakteriyalardan qayerda foydalaniladi?', 'C', 'Medium', 'Bakteriyalardan sut mahsulotlari tayyorlashda foydalaniladi.',
    ['Kosmosda', 'Qurilishda', 'Sut mahsulotlari tayyorlashda', 'Metallurgiyada']),
  createQuestion(6, 'Bakterial kasalliklar oldini olish uchun nima kerak?', 'D', 'Easy', 'Gigiyena qoidalariga rioya qilish bakterial kasalliklar oldini oladi.',
    ['Uyqusizlik', 'Sport mashqlari', 'Musiqa tinglash', 'Gigiyena qoidalariga rioya qilish']),

  createQuestion(7, 'Ekologiya so\'zi qaysi tildan olingan?', 'A', 'Easy', 'Ekologiya so\'zi yunon tilidan olingan.',
    ['Yunon', 'Lotin', 'Arab', 'Ingliz']),
  createQuestion(7, 'Oziq zanjirida birinchi bo\'g\'in nima?', 'B', 'Easy', 'O\'simliklar oziq zanjirining birinchi bo\'g\'ini.',
    ['Hayvonlar', 'O\'simliklar', 'Bakteriyalar', 'Zamburug\'lar']),
  createQuestion(7, 'Ekotizim nima?', 'C', 'Medium', 'Ekotizim — tirik organizmlar va jonsiz muhit birligi.',
    ['Faqat hayvonlar guruhi', 'Faqat o\'simliklar', 'Tirik organizmlar va jonsiz muhit birligi', 'Faqat tuproq']),
  createQuestion(7, 'Ekologiya fanini kim asos solgan?', 'A', 'Medium', 'Ernst Gekkel ekologiya atamasini kiritgan.',
    ['Ernst Gekkel', 'Charlz Darvin', 'Karl Linney', 'Gregor Mendel']),

  createQuestion(8, 'O\'zbekistondagi qo\'riqxonalarga qaysi kiradi?', 'B', 'Easy', 'Chatqol O\'zbekistondagi davlat qo\'riqxonasi.',
    ['Yellowstone', 'Chatqol', 'Amazonka', 'Serengeti']),
  createQuestion(8, 'Qizil kitob nima?', 'A', 'Easy', 'Qizil kitob — noyob turlarni ro\'yxatga olgan kitob.',
    ['Noyob turlarni ro\'yxatga olgan kitob', 'Darslik', 'Lug\'at', 'She\'rlar to\'plami']),
  createQuestion(8, 'Tabiatni muhofaza qilish uchun nima qilish kerak?', 'D', 'Easy', 'Daraxt ekish tabiatni muhofaza qilishga yordam beradi.',
    ['Chiqindi tashlash', 'Suv isrof qilish', 'O\'rmon kesish', 'Daraxt ekish']),
  createQuestion(8, 'Ekologik madaniyat deganda nima tushuniladi?', 'C', 'Medium', 'Tabiatga ehtiyotkorona munosabat ekologik madaniyat.',
    ['Faqat sport', 'Faqat san\'at', 'Tabiatga ehtiyotkorona munosabat', 'Faqat texnologiya']),

  // 6-sinf questions
  createQuestion(9, 'O\'simliklarning vegetativ organlari qaysi?', 'A', 'Easy', 'Ildiz, poya va barg vegetativ organlar.',
    ['Ildiz, poya, barg', 'Gul, meva, urug\'', 'Faqat ildiz', 'Faqat gul']),
  createQuestion(9, 'To\'qima nima?', 'B', 'Medium', 'To\'qima bir xil hujayralar guruhi.',
    ['Bitta hujayra', 'Tuzilishi va vazifasi bir xil hujayralar guruhi', 'Organ', 'Organizm']),
  createQuestion(9, 'Qoplovchi to\'qimaning vazifasi nima?', 'C', 'Easy', 'Qoplovchi to\'qima himoya vazifasini bajaradi.',
    ['Oziqlanish', 'Suv tashish', 'Himoya qilish', 'Energiya ishlab chiqarish']),
  createQuestion(9, 'Generativ organlar qaysi?', 'D', 'Easy', 'Gul, meva va urug\' generativ organlar.',
    ['Ildiz', 'Poya', 'Barg', 'Gul, meva, urug\'']),

  createQuestion(10, 'O\'simlik hujayrasida nima bor, hayvon hujayrasida yo\'q?', 'A', 'Medium', 'Xloroplastlar faqat o\'simlik hujayrasida mavjud.',
    ['Xloroplast va hujayra devori', 'Yadro', 'Mitoxondriya', 'Membrana']),
  createQuestion(10, 'Xlorofillning rangi qanday?', 'B', 'Easy', 'Xlorofill yashil rangga ega.',
    ['Qizil', 'Yashil', 'Sariq', 'Ko\'k']),
  createQuestion(10, 'Vakuolning vazifasi nima?', 'C', 'Easy', 'Vakuol hujayra shirasini saqlaydi.',
    ['Energiya ishlab chiqarish', 'Oqsil sintezi', 'Hujayra shirasini saqlash', 'DNK saqlash']),
  createQuestion(10, 'Hujayra devori nimadan tashkil topgan?', 'A', 'Medium', 'Hujayra devori tsellyulozadan tashkil topgan.',
    ['Tsellyuloza', 'Oqsil', 'Yog\'', 'Kraxmal']),

  createQuestion(11, 'Ildizning asosiy vazifalari qaysi?', 'D', 'Easy', 'Ildiz suv so\'radi va o\'simlikni mustahkamlaydi.',
    ['Fotosintez', 'Nafas olish', 'Ko\'payish', 'Suv so\'rish va mustahkamlash']),
  createQuestion(11, 'O\'q ildiz tizimiga qaysi o\'simlik misol bo\'la oladi?', 'A', 'Medium', 'Lavlagi o\'q ildiz tizimiga ega.',
    ['Lavlagi', 'Bug\'doy', 'Piyoz', 'Makkajo\'xori']),
  createQuestion(11, 'Ildiz tuklari qayerda joylashgan?', 'B', 'Easy', 'Ildiz tuklari ildizning so\'rish zonasida joylashgan.',
    ['Ildiz uchida', 'Ildizning so\'rish zonasida', 'Ildiz qalpoqchasida', 'Ildiz markazida']),
  createQuestion(11, 'Ildizmeva deganda nima tushuniladi?', 'C', 'Medium', 'Ildizmeva — oziq modda to\'plagan ildiz.',
    ['Ildizning shakli', 'Ildizning rangi', 'Oziq modda to\'plagan ildiz', 'Ildizning uzi']),

  createQuestion(12, 'Poyaning asosiy vazifasi nima?', 'A', 'Easy', 'Poya suv va moddalarni tashiydi.',
    ['Suv va moddalarni tashish', 'Fotosintez', 'Ko\'payish', 'Urug\' saqlash']),
  createQuestion(12, 'Kambiy nima?', 'B', 'Medium', 'Kambiy poyaning yo\'g\'onlashuvini ta\'minlaydi.',
    ['Ildiz qismi', 'Poya yo\'g\'onlashuvini ta\'minlaydigan qatlam', 'Barg qismi', 'Gul qismi']),
  createQuestion(12, 'Daraxtning yoshini qanday aniqlash mumkin?', 'C', 'Easy', 'Poya halqalari yordamida daraxt yoshini aniqlash mumkin.',
    ['Balandligi bo\'yicha', 'Barglari bo\'yicha', 'Poya halqalari bo\'yicha', 'Ildizi bo\'yicha']),
  createQuestion(12, 'Tok o\'simligi qaysi turdagi poyaga ega?', 'D', 'Easy', 'Tok o\'rmalovchi poyaga ega.',
    ['Tik o\'suvchi', 'Sudralib yuruvchi', 'Suvda suzuvchi', 'O\'rmalovchi']),

  createQuestion(13, 'Fotosintez qaysi organda sodir bo\'ladi?', 'A', 'Easy', 'Fotosintez bargda sodir bo\'ladi.',
    ['Bargda', 'Ildizda', 'Poyada', 'Gulda']),
  createQuestion(13, 'Fotosintezda qaysi gaz ajralib chiqadi?', 'B', 'Easy', 'Fotosintezda kislorod ajralib chiqadi.',
    ['Azot', 'Kislorod', 'Vodorod', 'Karbonat angidrid']),
  createQuestion(13, 'Ustitsalar qayerda joylashgan?', 'C', 'Medium', 'Ustitsalar barg epidermisida joylashgan.',
    ['Ildizda', 'Poyada', 'Barg epidermisida', 'Gulda']),
  createQuestion(13, 'Fotosintez uchun nima kerak?', 'D', 'Medium', 'Fotosintez uchun yorug\'lik, suv va CO₂ kerak.',
    ['Faqat suv', 'Faqat yorug\'lik', 'Faqat CO₂', 'Yorug\'lik, suv va CO₂']),

  createQuestion(14, 'Changchi qaysi organning qismi?', 'A', 'Easy', 'Changchi gulning erkak ko\'payish organi.',
    ['Gulning', 'Bargning', 'Ildizning', 'Poyaning']),
  createQuestion(14, 'Qo\'sh urug\'lanishni kim kashf etgan?', 'B', 'Hard', 'S.G. Navashin qo\'sh urug\'lanishni kashf etgan.',
    ['Darvin', 'Navashin', 'Mendel', 'Linney']),
  createQuestion(14, 'Changlanishda hasharotlar nima qiladi?', 'C', 'Easy', 'Hasharotlar changni bir guldan boshqasiga tashiydi.',
    ['Gulni yeydi', 'Gulni kesadi', 'Changni tashiydi', 'Gulni yashiradi']),
  createQuestion(14, 'Shamol orqali changlanadigan gullar qanday bo\'ladi?', 'A', 'Medium', 'Shamol orqali changlanadigan gullar oddiy va ko\'rimsiz bo\'ladi.',
    ['Oddiy va ko\'rimsiz', 'Yorqin va hidli', 'Juda katta', 'Juda mayda']),

  createQuestion(15, 'Meva nimadan rivojlanadi?', 'B', 'Easy', 'Meva tuxumdondan rivojlanadi.',
    ['Changchidan', 'Tuxumdondan', 'Changdondan', 'Bargdan']),
  createQuestion(15, 'Sersuv mevalarga qaysi kiradi?', 'A', 'Easy', 'Olma sersuv meva.',
    ['Olma', 'Yong\'oq', 'Bug\'doy', 'No\'xat']),
  createQuestion(15, 'Urug\' tarkibida nima bor?', 'C', 'Medium', 'Urug\'da murtak, endosperm va urug\' po\'sti bor.',
    ['Faqat suv', 'Faqat mineral', 'Murtak, endosperm va urug\' po\'sti', 'Faqat havo']),
  createQuestion(15, 'Kokos urug\'i qanday tarqaladi?', 'D', 'Easy', 'Kokos urug\'i suv orqali tarqaladi.',
    ['Shamol', 'Hayvonlar', 'O\'z-o\'zidan', 'Suv']),

  createQuestion(16, 'O\'simliklar sistematikasining asoschisi kim?', 'A', 'Easy', 'Karl Linney sistematikaning asoschisi.',
    ['Karl Linney', 'Charlz Darvin', 'Gregor Mendel', 'Robert Guk']),
  createQuestion(16, 'Gulli o\'simliklar qancha turni o\'z ichiga oladi?', 'B', 'Medium', 'Gulli o\'simliklar 250 000 dan ortiq turga ega.',
    ['100 000', '250 000 dan ortiq', '50 000', '10 000']),
  createQuestion(16, 'Ikki nomli nomenklatura nima?', 'C', 'Hard', 'Har bir tur ikki lotin so\'zi bilan ataladi — urug\' va tur nomi.',
    ['Bitta nomdan iborat', 'Uch nomdan iborat', 'Urug\' va tur nomidan iborat', 'Raqamlardan iborat']),
  createQuestion(16, 'Eng rivojlangan o\'simliklar guruhi qaysi?', 'D', 'Easy', 'Gulli (yopiq urug\'li) o\'simliklar eng rivojlangan.',
    ['Suv o\'tlari', 'Yo\'sinlar', 'Paporotniklar', 'Gulli o\'simliklar']),

  // 7-sinf questions
  createQuestion(17, 'Yer yuzida qancha hayvon turi bor?', 'A', 'Easy', '1,5 milliondan ortiq hayvon turi aniqlangan.',
    ['1,5 milliondan ortiq', '500 ming', '100 ming', '50 ming']),
  createQuestion(17, 'Hayvonlar qanday oziqlanadi?', 'B', 'Easy', 'Hayvonlar geterotrof organizmlar.',
    ['Avtotrof', 'Geterotrof', 'Fototrof', 'Xemotrof']),
  createQuestion(17, 'Umurtqasiz hayvonlar barcha turlarning necha foizini tashkil etadi?', 'C', 'Medium', 'Umurtqasiz hayvonlar 95 foizni tashkil etadi.',
    ['50%', '75%', '95%', '30%']),
  createQuestion(17, 'Inson qaysi sinfga kiradi?', 'D', 'Easy', 'Inson sutemizuvchilar sinfiga kiradi.',
    ['Baliqlar', 'Qushlar', 'Reptiliyalar', 'Sutemizuvchilar']),

  createQuestion(18, 'Amyoba qanday harakat qiladi?', 'A', 'Easy', 'Amyoba soxta oyoqlar yordamida harakat qiladi.',
    ['Soxta oyoqlar yordamida', 'Kiprikchalar yordamida', 'Xivchin yordamida', 'Suzgichlar yordamida']),
  createQuestion(18, 'Infuzoriya-tufelkada nechta yadro bor?', 'B', 'Medium', 'Infuzoriyada ikkita yadro bor.',
    ['Bitta', 'Ikkita', 'Uchta', 'Yadrosi yo\'q']),
  createQuestion(18, 'Evglena yashil qanday xususiyatga ega?', 'C', 'Medium', 'Evglena ham o\'simlik, ham hayvon xususiyatlariga ega.',
    ['Faqat hayvon', 'Faqat o\'simlik', 'Ham o\'simlik, ham hayvon xususiyatlari', 'Faqat zamburug\'']),
  createQuestion(18, 'Amyoba qanday ko\'payadi?', 'A', 'Easy', 'Amyoba bo\'linish yo\'li bilan ko\'payadi.',
    ['Bo\'linish', 'Urug\'lanish', 'Kurtak hosil qilish', 'Sporalar']),

  createQuestion(19, 'Gidra qayerda yashaydi?', 'B', 'Easy', 'Gidra chuchuk suvda yashaydi.',
    ['Quruqlikda', 'Chuchuk suvda', 'Dengizda', 'Tuproqda']),
  createQuestion(19, 'Bo\'shliqichlilar necha qavatli?', 'A', 'Easy', 'Bo\'shliqichlilar ikki qavatli.',
    ['Ikki qavatli', 'Uch qavatli', 'Bir qavatli', 'To\'rt qavatli']),
  createQuestion(19, 'Gidraning qanday ajoyib xususiyati bor?', 'C', 'Medium', 'Gidra regeneratsiya qobiliyatiga ega.',
    ['Uchishi', 'Gapirishi', 'Regeneratsiya (tiklanish)', 'O\'zgarishi']),
  createQuestion(19, 'Korallar nima hosil qiladi?', 'D', 'Easy', 'Korallar riflarni hosil qiladi.',
    ['O\'rmonlar', 'Tog\'lar', 'Cho\'llar', 'Riflar']),

  createQuestion(20, 'Yomg\'ir chuvalchangi qanday foyda keltiradi?', 'A', 'Easy', 'U tuproqni yumshatibi unamdorligini oshiradi.',
    ['Tuproqni yumshatadi', 'Havoni tozalaydi', 'Suvni tozalaydi', 'Gullarni changlantiradi']),
  createQuestion(20, 'Yassi chuvalchanglarga nima kiradi?', 'B', 'Medium', 'Planariya yassi chuvalchanglarga kiradi.',
    ['Yomg\'ir chuvalchangi', 'Planariya', 'Askarid', 'Pijavka']),
  createQuestion(20, 'Halqali chuvalchanglar qaysi guruhning eng rivojlangani?', 'C', 'Easy', 'Halqali chuvalchanglar eng rivojlangan guruh.',
    ['Yassi chuvalchanglar', 'To\'garak chuvalchanglar', 'Halqali chuvalchanglar', 'Sodda hayvonlar']),
  createQuestion(20, 'Darvin yomg\'ir chuvalchanglarini nima deb atagan?', 'D', 'Hard', 'Darvin ularni "tabiatning dastlabki dehqonlari" deb atagan.',
    ['Eng kuchli hayvonlar', 'Eng tez hayvonlar', 'Tabiatning hukmdorlari', 'Tabiatning dastlabki dehqonlari']),

  createQuestion(21, 'Bo\'g\'imoyoqlilar barcha hayvon turlarining necha foizini tashkil etadi?', 'A', 'Medium', 'Bo\'g\'imoyoqlilar 80 foizni tashkil etadi.',
    ['80%', '50%', '30%', '95%']),
  createQuestion(21, 'Hasharotlarning nechta turi ma\'lum?', 'B', 'Easy', '900 000 dan ortiq hasharot turi ma\'lum.',
    ['100 000', '900 000 dan ortiq', '500 000', '50 000']),
  createQuestion(21, 'To\'liq o\'zgarishda qaysi bosqich bor?', 'C', 'Medium', 'To\'liq o\'zgarishda g\'umbak bosqichi mavjud.',
    ['Faqat tuxum', 'Faqat lichinka', 'G\'umbak', 'Faqat voyaga yetgan']),
  createQuestion(21, 'O\'rgimchak qaysi sinfga kiradi?', 'D', 'Easy', 'O\'rgimchak o\'rgimchaksimonlar sinfiga kiradi.',
    ['Hasharotlar', 'Qisqichbaqasimonlar', 'Chuvalchanglar', 'O\'rgimchaksimonlar']),

  createQuestion(22, 'Baliqlar nima yordamida nafas oladi?', 'A', 'Easy', 'Baliqlar jabralar yordamida nafas oladi.',
    ['Jabralar', 'O\'pkalar', 'Teri', 'Burun']),
  createQuestion(22, 'Yer yuzida qancha baliq turi bor?', 'B', 'Easy', '30 000 dan ortiq baliq turi mavjud.',
    ['10 000', '30 000 dan ortiq', '5 000', '100 000']),
  createQuestion(22, 'Baliqlarning yon chiziq organi nima qiladi?', 'C', 'Medium', 'Yon chiziq organi suv tebranishlarini sezadi.',
    ['Ranglarni ko\'radi', 'Ovoz eshitadi', 'Suv tebranishlarini sezadi', 'Hidni sezadi']),
  createQuestion(22, 'Baliqlar qanday hayvonlar?', 'A', 'Easy', 'Baliqlar sovuq qonli hayvonlar.',
    ['Sovuq qonli', 'Issiq qonli', 'Qonsiz', 'Qizil qonli']),

  createQuestion(23, 'Qushlarning tana harorati qancha?', 'B', 'Medium', 'Qushlarning tana harorati 40-42°C.',
    ['36-37°C', '40-42°C', '30-32°C', '50-55°C']),
  createQuestion(23, 'Dunyoda qancha qush turi mavjud?', 'A', 'Easy', '10 000 dan ortiq qush turi mavjud.',
    ['10 000 dan ortiq', '5 000', '1 000', '100 000']),
  createQuestion(23, 'Qushlarning suyaklari qanday?', 'C', 'Medium', 'Qushlar suyaklari g\'ovak va yengil.',
    ['Juda og\'ir', 'To\'liq mustahkam', 'G\'ovak va yengil', 'Elastik']),
  createQuestion(23, 'Qushlarning uchishi uchun nima muhim?', 'D', 'Easy', 'Ko\'krak mushaklari uchish uchun muhim.',
    ['Katta dumaloq bosh', 'Uzun oyoqlar', 'Katta ko\'z', 'Kuchli ko\'krak mushaklari']),

  createQuestion(24, 'Sutemizuvchilar bolalarini nima bilan boqadi?', 'A', 'Easy', 'Sutemizuvchilar bolalarini sut bilan boqadi.',
    ['Sut', 'O\'t', 'Don', 'Hasharot']),
  createQuestion(24, 'Yer yuzida qancha sutemizuvchi turi bor?', 'B', 'Easy', '6 000 dan ortiq sutemizuvchi turi mavjud.',
    ['1 000', '6 000 dan ortiq', '100 000', '500']),
  createQuestion(24, 'Suvda yashaydigan sutemizuvchiga misol?', 'C', 'Easy', 'Kit suvda yashaydigan sutemizuvchi.',
    ['Akula', 'Medusa', 'Kit', 'Krab']),
  createQuestion(24, 'Sutemizuvchilarning yuragida nechta kamera bor?', 'D', 'Medium', 'Sutemizuvchilarning yuragi 4 kamerali.',
    ['1', '2', '3', '4']),

  // 8-sinf questions
  createQuestion(25, 'Inson tanasida qancha hujayra bor?', 'A', 'Medium', 'Inson tanasida 37,2 trillion hujayra mavjud.',
    ['37,2 trillion', '1 million', '100 milliard', '1 000']),
  createQuestion(25, 'Organizmni boshqaruvchi tizimlar qaysi?', 'B', 'Medium', 'Nerv va endokrin tizimlar boshqaruvchi hisoblanadi.',
    ['Hazm va nafas', 'Nerv va endokrin', 'Tayanch va qon', 'Ayirish va ko\'payish']),
  createQuestion(25, 'Inson tanasidagi suvning miqdori qancha?', 'C', 'Easy', 'Inson tanasida 60-70% suv mavjud.',
    ['20-30%', '40-50%', '60-70%', '90-95%']),
  createQuestion(25, 'Inson tanasida nechta organ bor?', 'A', 'Easy', 'Inson tanasida 78 ta organ mavjud.',
    ['78', '200', '50', '10']),

  createQuestion(26, 'Inson skeletida nechta suyak bor?', 'B', 'Easy', 'Inson skeletida 206 ta suyak mavjud.',
    ['100', '206', '300', '500']),
  createQuestion(26, 'Inson tanasida nechta mushak bor?', 'C', 'Medium', 'Inson tanasida 600 dan ortiq mushak mavjud.',
    ['100', '300', '600 dan ortiq', '1000']),
  createQuestion(26, 'Yurak mushagi qanday?', 'A', 'Hard', 'Yurak mushagi faqat yurakda uchraydi va umr bo\'yi ishlaydi.',
    ['Faqat yurakda uchraydi', 'Barcha organlarda bor', 'Faqat suyaklarda', 'Faqat teriga tegishli']),
  createQuestion(26, 'Suyakka mustahkamlik nima beradi?', 'D', 'Medium', 'Mineral moddalar (kalsiy, fosfor) mustahkamlik beradi.',
    ['Suv', 'Oqsillar', 'Yog\'lar', 'Mineral moddalar']),

  createQuestion(27, 'Inson tanasida qancha qon bor?', 'A', 'Easy', 'Inson tanasida 5-6 litr qon mavjud.',
    ['5-6 litr', '1-2 litr', '10-15 litr', '20 litr']),
  createQuestion(27, 'Eritrotsitlarning vazifasi nima?', 'B', 'Easy', 'Eritrotsitlar kislorod tashiydi.',
    ['Himoya qilish', 'Kislorod tashish', 'Qon ivitish', 'Oziq tashish']),
  createQuestion(27, 'Yurak kuniga necha marta qisqaradi?', 'C', 'Medium', 'Yurak kuniga 100 000 marta qisqaradi.',
    ['10 000', '50 000', '100 000', '1 million']),
  createQuestion(27, 'Yurak nechta kameradan iborat?', 'D', 'Easy', 'Yurak 4 kameradan iborat.',
    ['1', '2', '3', '4']),

  createQuestion(28, 'Inson tinch holatda minutiga necha marta nafas oladi?', 'A', 'Easy', 'Minutiga 16-20 marta nafas olinadi.',
    ['16-20', '5-10', '30-40', '50-60']),
  createQuestion(28, 'Alveolalarda nima sodir bo\'ladi?', 'B', 'Medium', 'Alveolalarda gaz almashinuvi sodir bo\'ladi.',
    ['Ovqat hazm bo\'ladi', 'Gaz almashinuvi', 'Qon hosil bo\'ladi', 'Oqsil sintezi']),
  createQuestion(28, 'O\'pkalarning umumiy yuzasi qancha?', 'C', 'Hard', 'O\'pkalarning yuzasi 100 m² atrofida.',
    ['10 m²', '50 m²', '100 m²', '500 m²']),
  createQuestion(28, 'Chekish nimaga zarar yetkazadi?', 'A', 'Easy', 'Chekish o\'pkaga jiddiy zarar yetkazadi.',
    ['O\'pkaga', 'Faqat tishlarga', 'Faqat sochga', 'Hech narsaga zarar emas']),

  createQuestion(29, 'Oshqozonda qaysi kislota ishlab chiqariladi?', 'B', 'Medium', 'Oshqozonda xlorid kislota ishlab chiqariladi.',
    ['Sulfat kislota', 'Xlorid kislota', 'Fosfor kislota', 'Sut kislota']),
  createQuestion(29, 'Ovqat hazm qilish qayerda boshlanadi?', 'A', 'Easy', 'Ovqat hazm qilish og\'iz bo\'shlig\'ida boshlanadi.',
    ['Og\'iz bo\'shlig\'ida', 'Oshqozonda', 'Ingichka ichakda', 'Yo\'g\'on ichakda']),
  createQuestion(29, 'Jigar qanday vazifani bajaradi?', 'C', 'Medium', 'Jigar o\'t ishlab chiqaradi.',
    ['Insulin ishlab chiqaradi', 'Qon ishlab chiqaradi', 'O\'t ishlab chiqaradi', 'Kislorod ishlab chiqaradi']),
  createQuestion(29, 'Ingichka ichakda nima sodir bo\'ladi?', 'D', 'Medium', 'Ingichka ichakda oziq moddalar to\'liq parchalanadi va so\'riladi.',
    ['Qon hosil bo\'ladi', 'Nafas olish', 'Ovqat to\'planadi', 'Oziq moddalar parchalanadi va so\'riladi']),

  createQuestion(30, 'Bosh miya nechta neyrondan iborat?', 'A', 'Hard', 'Bosh miya 100 milliard neyrondan iborat.',
    ['100 milliard', '1 million', '10 ming', '1 milliard']),
  createQuestion(30, 'Neyronning uzun o\'simtasi nima deyiladi?', 'B', 'Medium', 'Neyronning uzun o\'simtasi akson deyiladi.',
    ['Dendrit', 'Akson', 'Sinaps', 'Soma']),
  createQuestion(30, 'Refleks nima?', 'C', 'Easy', 'Refleks — nerv tizimining tashqi ta\'sirga javob berishi.',
    ['Mushak qisqarishi', 'Yurak urishi', 'Tashqi ta\'sirga javob berish', 'Nafas olish']),
  createQuestion(30, 'Nerv impulsi tezligi qancha?', 'D', 'Hard', 'Nerv impulsi tezligi 120 m/s ga yetadi.',
    ['1 m/s', '10 m/s', '50 m/s', '120 m/s']),

  createQuestion(31, 'Inson qancha sezgi organiga ega?', 'A', 'Easy', 'Inson beshta asosiy sezgi organiga ega.',
    ['5', '3', '7', '10']),
  createQuestion(31, 'Ko\'z orqali axborotning necha foizi kelib tushadi?', 'B', 'Medium', 'Axborotning 80 foizi ko\'rish orqali kelib tushadi.',
    ['50%', '80%', '30%', '95%']),
  createQuestion(31, 'Quloqning ichki qismida nima joylashgan?', 'C', 'Medium', 'Ichki quloqda chig\'anoq organi joylashgan.',
    ['Nog\'ora parda', 'Suyakchalar', 'Chig\'anoq organi', 'Paypaslagich']),
  createQuestion(31, 'Retinadagi qaysi hujayralar ranglarni ajratadi?', 'A', 'Hard', 'Kolbacha hujayralar ranglarni ajratadi.',
    ['Kolbacha hujayralar', 'Tayoqcha hujayralar', 'Neyronlar', 'Epiteliy hujayralar']),

  createQuestion(32, 'Gipofiz qayerda joylashgan?', 'B', 'Medium', 'Gipofiz bosh miyaning pastki qismida joylashgan.',
    ['Bo\'yinda', 'Bosh miyaning pastki qismida', 'Qorinda', 'Ko\'krak qafasida']),
  createQuestion(32, 'Insulin qaysi bez ishlab chiqaradi?', 'A', 'Easy', 'Insulin oshqozon osti bezi ishlab chiqaradi.',
    ['Oshqozon osti bezi', 'Gipofiz', 'Qalqonsimon bez', 'Buyrak usti bezi']),
  createQuestion(32, 'Insulin yetishmasligi qaysi kasallikka olib keladi?', 'C', 'Easy', 'Insulin yetishmasligi qandli diabetga olib keladi.',
    ['Angina', 'Gripp', 'Qandli diabet', 'Sil']),
  createQuestion(32, 'Qalqonsimon bez qaysi gormonni ishlab chiqaradi?', 'D', 'Medium', 'Qalqonsimon bez tiroksin gormonini ishlab chiqaradi.',
    ['Insulin', 'Adrenalin', 'O\'sish gormoni', 'Tiroksin']),

  // 9-sinf PRO questions
  createQuestion(500, 'Hujayra nazariyasini kim yaratgan?', 'A', 'Medium', 'Shleyden va Shvann hujayra nazariyasini yaratgan.',
    ['Shleyden va Shvann', 'Darvin va Uolles', 'Mendel va Morgan', 'Uotson va Krik']),
  createQuestion(500, 'Prokariot hujayralarda nima yo\'q?', 'B', 'Easy', 'Prokariatlarda yadro membranasi yo\'q.',
    ['Sitoplazma', 'Yadro membranasi', 'DNK', 'Ribosomalar']),
  createQuestion(500, 'Mitoxondriya qanday vazifani bajaradi?', 'C', 'Easy', 'Mitoxondriya energiya ishlab chiqaradi.',
    ['Oqsil sintezi', 'DNK saqlash', 'Energiya ishlab chiqarish', 'Fotosintez']),
  createQuestion(500, 'Lizosomalar nima qiladi?', 'D', 'Medium', 'Lizosomalar hujayra ichida moddalarni hazm qiladi.',
    ['Energiya ishlab chiqarish', 'Oqsil sintezi', 'Fotosintez', 'Moddalarni hazm qilish']),

  createQuestion(501, 'DNK qanday tuzilishga ega?', 'A', 'Easy', 'DNK ikki zanjirli spiral.',
    ['Ikki zanjirli spiral', 'Bir zanjirli', 'Halqa shakl', 'Yulduz shakl']),
  createQuestion(501, 'Oqsillar nechta aminokislotadan tuziladi?', 'B', 'Easy', '20 xil aminokislota mavjud.',
    ['10', '20', '50', '100']),
  createQuestion(501, 'DNKda adenin qaysi baza bilan juftlanadi?', 'C', 'Medium', 'Adenin timin bilan juftlanadi.',
    ['Guanin', 'Sitozin', 'Timin', 'Uratsilь']),
  createQuestion(501, 'Suv hujayra massasining necha foizini tashkil etadi?', 'A', 'Easy', 'Suv 60-80 foizni tashkil etadi.',
    ['60-80%', '10-20%', '90-95%', '30-40%']),

  createQuestion(502, 'ATF nima?', 'B', 'Easy', 'ATF — hujayraning universal energiya valyutasi.',
    ['Nuklein kislota', 'Energiya valyutasi', 'Oqsil', 'Yog\''],),
  createQuestion(502, 'Glikoliz nima?', 'A', 'Medium', 'Glikoliz — glukozaning kislorodsiz parchalanishi.',
    ['Glukozaning kislorodsiz parchalanishi', 'Oqsil sintezi', 'DNK replikatsiyasi', 'Fotosintez']),
  createQuestion(502, 'Bitta glukozadan nechta ATF hosil bo\'ladi?', 'C', 'Hard', 'Bitta glukozadan 38 ATF hosil bo\'ladi.',
    ['2', '20', '38', '100']),
  createQuestion(502, 'Krebs sikli qayerda sodir bo\'ladi?', 'D', 'Hard', 'Krebs sikli mitoxondriyada sodir bo\'ladi.',
    ['Yadroda', 'Ribosomada', 'Sitoplazmada', 'Mitoxondriyada']),

  createQuestion(503, 'Genetikaning asoschisi kim?', 'A', 'Easy', 'Gregor Mendel genetikaning asoschisi.',
    ['Gregor Mendel', 'Charlz Darvin', 'Karl Linney', 'Robert Guk']),
  createQuestion(503, 'Mendelning birinchi qonuni nima?', 'B', 'Medium', 'Birinchi avlod duragaylari bir xil bo\'ladi.',
    ['Ajralish qonuni', 'Dominantlik qonuni', 'Bog\'lanish qonuni', 'Mustaqillik qonuni']),
  createQuestion(503, 'Genotip nima?', 'C', 'Easy', 'Genotip — genlarning yig\'indisi.',
    ['Tashqi ko\'rinish', 'Xulq-atvor', 'Genlarning yig\'indisi', 'Hujayra tuzilishi']),
  createQuestion(503, 'Geterozigota qanday belgilanadi?', 'A', 'Medium', 'Geterozigota Aa deb belgilanadi.',
    ['Aa', 'AA', 'aa', 'BB']),

  createQuestion(504, 'Modifikatsion o\'zgaruvchanlik irsiylanadimi?', 'B', 'Easy', 'Modifikatsion o\'zgaruvchanlik irsiylanmaydi.',
    ['Ha', 'Yo\'q', 'Ba\'zan', 'Har doim']),
  createQuestion(504, 'Daun sindromi nimadan kelib chiqadi?', 'A', 'Hard', 'Daun sindromi 21-xromosomaning uchlamchi bo\'lishidan kelib chiqadi.',
    ['21-xromosomaning uchlamchi bo\'lishi', 'Gen mutatsiyasi', 'Virusli infektsiya', 'Oziqlantirish xatoligi']),
  createQuestion(504, 'Mutatsiyalar irsiylanadimi?', 'C', 'Easy', 'Mutatsiyalar irsiylanadi.',
    ['Yo\'q', 'Ba\'zan', 'Ha', 'Hech qachon']),
  createQuestion(504, 'Quyosh nurida qorayish qaysi o\'zgaruvchanlik?', 'D', 'Easy', 'Qorayish modifikatsion o\'zgaruvchanlik.',
    ['Mutatsion', 'Genetik', 'Xromosomali', 'Modifikatsion']),

  createQuestion(505, 'Selektsiyaning nazariy asosi nima?', 'A', 'Easy', 'Genetika selektsiyaning nazariy asosi.',
    ['Genetika', 'Ekologiya', 'Anatomiya', 'Fiziologiya']),
  createQuestion(505, 'N.I. Vavilov nechta kelib chiqish markazi aniqlagan?', 'B', 'Medium', 'Vavilov 8 ta kelib chiqish markazi aniqlagan.',
    ['5', '8', '12', '3']),
  createQuestion(505, 'Sun\'iy tanlanish nima?', 'C', 'Easy', 'Sun\'iy tanlanish — kerakli organizmlarni tanlab ko\'paytirish.',
    ['Tabiatda bo\'ladigan jarayon', 'Tasodifiy hodisa', 'Kerakli organizmlarni tanlab ko\'paytirish', 'Kasallik']),
  createQuestion(505, 'Selektsiyaning asosiy usullari qaysi?', 'D', 'Medium', 'Tanlanish, duragaylash va mutatsiyaga duchor qilish.',
    ['Faqat tanlanish', 'Faqat duragaylash', 'Faqat mutatsiya', 'Tanlanish, duragaylash va mutatsiyaga duchor qilish']),

  createQuestion(506, 'Evolyutsiya nazariyasining asoschisi kim?', 'A', 'Easy', 'Charlz Darvin evolyutsiya nazariyasi asoschisi.',
    ['Charlz Darvin', 'Gregor Mendel', 'Karl Linney', 'Lui Paster']),
  createQuestion(506, 'Tabiiy tanlanish nima?', 'B', 'Medium', 'Muhitga eng moslashgan organizmlar yashab qoladi.',
    ['Sun\'iy tanlash', 'Muhitga moslashganlar yashab qolishi', 'Tasodifiy o\'zgarish', 'Mutatsiya']),
  createQuestion(506, 'Gomolog organlar nima?', 'C', 'Hard', 'Bir asosdan kelib chiqqan, lekin turli vazifali organlar.',
    ['Bir xil vazifali, turli kelib chiqishli', 'Rudiment organlar', 'Bir asosdan kelib chiqqan, turli vazifali', 'Atavizm organlar']),
  createQuestion(506, 'Darvinning asosiy asari qaysi?', 'A', 'Easy', '"Turlarning kelib chiqishi" Darvinning asosiy asari.',
    ['"Turlarning kelib chiqishi"', '"Hujayra nazariyasi"', '"Genetika asoslari"', '"Ekologiya"']),

  createQuestion(507, 'Biosfera tushunchasini kim ishlab chiqqan?', 'B', 'Easy', 'V.I. Vernadskiy biosfera tushunchasini ishlab chiqqan.',
    ['Darvin', 'Vernadskiy', 'Mendel', 'Linney']),
  createQuestion(507, 'Produsentlar nima?', 'A', 'Easy', 'Produsentlar — organik moddalar ishlab chiqaruvchi organizmlar.',
    ['Organik modda ishlab chiqaruvchilar', 'Iste\'molchilar', 'Parchalovchilar', 'Parazitlar']),
  createQuestion(507, 'Abiotik omillarga nima kiradi?', 'C', 'Medium', 'Harorat abiotik omilga kiradi.',
    ['Yirtqichlar', 'Kasalliklar', 'Harorat va namlik', 'Inson faoliyati']),
  createQuestion(507, 'Antropogen omil nima?', 'D', 'Easy', 'Antropogen omil — inson faoliyati ta\'siri.',
    ['Harorat', 'Namlik', 'Yoritilganlik', 'Inson faoliyati ta\'siri']),

  // 10-sinf PRO questions (shorter)
  createQuestion(508, 'GMO nima?', 'A', 'Easy', 'GMO — genetik modifikatsiyalangan organizmlar.',
    ['Genetik modifikatsiyalangan organizmlar', 'Genetik mutatsiya operatsiyasi', 'Global monitoring organizatsiyasi', 'General modifikatsiya ob\'ekti']),
  createQuestion(508, 'CRISPR-Cas9 nima?', 'B', 'Hard', 'CRISPR-Cas9 — gen tahrirlash texnologiyasi.',
    ['Dori preparati', 'Gen tahrirlash texnologiyasi', 'Mikroskop turi', 'Laboratoriya usuli']),
  createQuestion(508, 'Restriksiya fermentlari nima qiladi?', 'C', 'Medium', 'Restriksiya fermentlari DNKni ma\'lum joylarda kesadi.',
    ['DNKni ko\'chiradi', 'Oqsilni sintez qiladi', 'DNKni kesadi', 'RNKni yo\'q qiladi']),
  createQuestion(508, '"Oltin guruch" nima?', 'D', 'Medium', 'Oltin guruch — vitamin A miqdori oshirilgan GM guruch.',
    ['Eng qimmat guruch', 'Oltin rangdagi guruch', 'Qadimiy guruch navi', 'Vitamin A miqdori oshirilgan GM guruch']),

  createQuestion(509, 'DNK replikatsiyasi qanday usulda amalga oshadi?', 'A', 'Medium', 'Replikatsiya yarim konservativ usulda amalga oshadi.',
    ['Yarim konservativ', 'To\'liq konservativ', 'Dispersiv', 'Tasodifiy']),
  createQuestion(509, 'Gelikaza fermenti nima qiladi?', 'B', 'Hard', 'Gelikaza DNK zanjirlarini ajratadi.',
    ['DNK sintez qiladi', 'DNK zanjirlarini ajratadi', 'Oqsil sintez qiladi', 'RNK yaratadi']),
  createQuestion(509, 'DNK-polimeraza nima?', 'C', 'Medium', 'DNK-polimeraza yangi DNK zanjirini sintez qiladi.',
    ['DNKni kesadi', 'DNKni parchalaydi', 'Yangi DNK zanjirini sintez qiladi', 'DNKni o\'chiradi']),
  createQuestion(509, 'Replikatsiyada xatolik qanchalik kam?', 'A', 'Hard', 'Har milliard nukleotidda 1 xatolik.',
    ['Har milliard nukleotidda 1', 'Har 100 nukleotidda 1', 'Har 1000 nukleotidda 1', 'Xatolik bo\'lmaydi']),

  createQuestion(510, 'Markaziy dogma nima?', 'B', 'Medium', 'Markaziy dogma: DNK→RNK→Oqsil.',
    ['RNK→DNK→Oqsil', 'DNK→RNK→Oqsil', 'Oqsil→RNK→DNK', 'DNK→Oqsil→RNK']),
  createQuestion(510, 'Transkripsiya qayerda sodir bo\'ladi?', 'A', 'Easy', 'Transkripsiya yadroda sodir bo\'ladi.',
    ['Yadroda', 'Ribosomada', 'Mitoxondriyada', 'Sitoplazmada']),
  createQuestion(510, 'Translyatsiya qayerda sodir bo\'ladi?', 'C', 'Easy', 'Translyatsiya ribosomada sodir bo\'ladi.',
    ['Yadroda', 'Mitoxondriyada', 'Ribosomada', 'Golji apparatida']),
  createQuestion(510, 'Genetik kodda nechta kodon bor?', 'D', 'Medium', 'Genetik kodda 64 ta kodon bor.',
    ['20', '32', '48', '64']),

  createQuestion(511, 'Mitozda nechta hujayra hosil bo\'ladi?', 'A', 'Easy', 'Mitozda 2 ta hujayra hosil bo\'ladi.',
    ['2', '4', '8', '1']),
  createQuestion(511, 'Meyozda nechta hujayra hosil bo\'ladi?', 'B', 'Easy', 'Meyozda 4 ta hujayra hosil bo\'ladi.',
    ['2', '4', '8', '16']),
  createQuestion(511, 'Krossingover nima?', 'C', 'Hard', 'Krossingover — gomolog xromosomalar orasida genetik material almashinuvi.',
    ['Hujayra bo\'linishi', 'Mutatsiya', 'Genetik material almashinuvi', 'DNK replikatsiyasi']),
  createQuestion(511, 'Mitoz qaysi fazalardan iborat?', 'D', 'Medium', 'Profaza, metafaza, anafaza, telofaza.',
    ['Faqat profaza', 'Profaza va metafaza', 'Profaza, metafaza, anafaza', 'Profaza, metafaza, anafaza, telofaza']),

  createQuestion(512, 'Jinssiz ko\'payishga nima kiradi?', 'A', 'Easy', 'Bo\'linish jinssiz ko\'payish usuli.',
    ['Bo\'linish', 'Urug\'lanish', 'Jinsiy jarayon', 'Changlanish']),
  createQuestion(512, 'Jinsiy ko\'payishning afzalligi nima?', 'B', 'Medium', 'Genetik xilma-xillik hosil bo\'ladi.',
    ['Tezroq ko\'payish', 'Genetik xilma-xillik', 'Arzonligi', 'Oddiyligi']),
  createQuestion(512, 'Spermatozoid nima?', 'C', 'Easy', 'Spermatozoid — erkak jinsiy hujayra.',
    ['Urg\'ochi gameta', 'Somatik hujayra', 'Erkak jinsiy hujayra', 'Nerv hujayrasi']),
  createQuestion(512, 'Urug\'lanish nima?', 'D', 'Easy', 'Urug\'lanish — jinsiy hujayralarning qo\'shilishi.',
    ['Hujayra bo\'linishi', 'DNK replikatsiyasi', 'Fotosintez', 'Jinsiy hujayralarning qo\'shilishi']),

  createQuestion(513, 'Ontogenez nima?', 'A', 'Easy', 'Ontogenez — organizmning individual rivojlanishi.',
    ['Individual rivojlanish', 'Turning rivojlanishi', 'Hujayra bo\'linishi', 'Evolyutsiya']),
  createQuestion(513, 'Gastrulyatsiyada nechta murtak varaqasi hosil bo\'ladi?', 'B', 'Medium', '3 ta murtak varaqasi hosil bo\'ladi.',
    ['2', '3', '4', '5']),
  createQuestion(513, 'Ektoderma nimaga aylanadi?', 'C', 'Hard', 'Ektoderma teri va nerv tizimiga aylanadi.',
    ['Mushaklar', 'Suyaklar', 'Teri va nerv tizimi', 'Hazm organlari']),
  createQuestion(513, 'Metamorfoz nima?', 'A', 'Medium', 'Metamorfoz — lichinkadan voyaga yetgan organizmga o\'tish.',
    ['Lichinkadan voyaga yetganga o\'tish', 'Hujayra bo\'linishi', 'Urug\'lanish', 'Mutatsiya']),

  createQuestion(514, 'Sintetik evolyutsiya nazariyasi nimani birlashtiradi?', 'B', 'Medium', 'Darvinizm va genetikani birlashtiradi.',
    ['Fizika va kimyo', 'Darvinizm va genetika', 'Botanika va zoologiya', 'Ekologiya va geografiya']),
  createQuestion(514, 'Aromoroz nima?', 'A', 'Hard', 'Aromoroz — tashkiliy darajaning ko\'tarilishi.',
    ['Tashkiliy darajaning ko\'tarilishi', 'Muayyan muhitga moslashish', 'Soddalashtirish', 'Parazitizm']),
  createQuestion(514, 'Tabiiy tanlanish qanday organizmlarni saqlab qoladi?', 'C', 'Easy', 'Muhitga eng moslashganlarni saqlab qoladi.',
    ['Eng kattalarni', 'Eng kichklarni', 'Muhitga eng moslashganlarni', 'Eng tezlarni']),
  createQuestion(514, 'Evolyutsiyaning elementar birligi nima?', 'D', 'Medium', 'Populyatsiya evolyutsiyaning elementar birligi.',
    ['Gen', 'Hujayra', 'Organizm', 'Populyatsiya']),

  createQuestion(515, 'Xardi-Vaynberg qonuni nimani ko\'rsatadi?', 'A', 'Hard', 'Ideal populyatsiyada genotiplar chastotasi o\'zgarmaydi.',
    ['Ideal populyatsiyada genotiplar chastotasi o\'zgarmaydi', 'Genlar mutatsiyaga uchraydi', 'Populyatsiya doimo o\'zgaradi', 'Selektsiya ta\'siri']),
  createQuestion(515, 'Genetik drift nima?', 'B', 'Hard', 'Kichik populyatsiyada tasodifiy genlar chastotasining o\'zgarishi.',
    ['Katta populyatsiyada o\'zgarish', 'Kichik populyatsiyada tasodifiy o\'zgarish', 'Sun\'iy tanlanish', 'Mutatsiya']),
  createQuestion(515, 'Populyatsiya nima?', 'C', 'Easy', 'Bir hududda yashovchi bir turdagi organizmlar guruhi.',
    ['Bitta organizm', 'Barcha organizmlar', 'Bir hududda yashovchi bir turdagi organizmlar', 'Faqat o\'simliklar']),
  createQuestion(515, 'Populyatsiya genetikasi qayerda qo\'llaniladi?', 'D', 'Medium', 'Tibbiyot, selektsiya va tabiatni muhofazada qo\'llaniladi.',
    ['Faqat tibbiyotda', 'Faqat qishloq xo\'jaligida', 'Faqat sanoatda', 'Tibbiyot, selektsiya va tabiatni muhofazada']),

  // 11-sinf PRO questions
  createQuestion(516, 'DNK tuzilishini kim kashf etgan?', 'A', 'Easy', 'Uotson va Krik 1953-yilda DNK tuzilishini kashf etgan.',
    ['Uotson va Krik', 'Mendel va Morgan', 'Shleyden va Shvann', 'Darvin va Uolles']),
  createQuestion(516, 'PZR nima?', 'B', 'Medium', 'PZR — polimeraz zanjir reaktsiyasi, DNKni ko\'paytirish usuli.',
    ['Protein zona reaktsiyasi', 'Polimeraz zanjir reaktsiyasi', 'Peptid zona reaktsiyasi', 'Plazmid zona replikatsiyasi']),
  createQuestion(516, 'AlphaFold nima qiladi?', 'C', 'Hard', 'AlphaFold oqsillarning 3D tuzilishini bashorat qiladi.',
    ['Genlarni tahrirlaydi', 'DNK ketma-ketligini o\'qiydi', 'Oqsillarning 3D tuzilishini bashorat qiladi', 'Viruslarni aniqlaydi']),
  createQuestion(516, 'Gen regulyatsiyasi necha darajada amalga oshadi?', 'D', 'Hard', 'Transkripsion, posttranskripsion, translyatsion, posttranslyatsion.',
    ['1 daraja', '2 daraja', '3 daraja', '4 daraja']),

  createQuestion(517, 'Biotexnologiyaning eng qadimiy shakli qaysi?', 'A', 'Easy', 'Non yopish biotexnologiyaning qadimiy shakli.',
    ['Non yopish', 'Gen injeneriyasi', 'Klonlash', 'PZR']),
  createQuestion(517, 'Stvolali hujayralar nima?', 'B', 'Medium', 'Istalgan hujayra turiga aylanish qobiliyatiga ega hujayralar.',
    ['Faqat qon hujayralari', 'Istalgan hujayra turiga aylanishi mumkin', 'Faqat nerv hujayralari', 'O\'lik hujayralar']),
  createQuestion(517, 'Bioremediatsiya nima?', 'C', 'Medium', 'Tirik organizmlar yordamida ifloslanishni tozalash.',
    ['Suvni isitish', 'Havoni sovutish', 'Tirik organizmlar yordamida ifloslanishni tozalash', 'Yerlarni sug\'orish']),
  createQuestion(517, 'Insulin qanday ishlab chiqariladi?', 'A', 'Medium', 'Biotexnologiya yordamida bakteriyalarda ishlab chiqariladi.',
    ['Bakteriyalarda biotexnologiya bilan', 'Kimyoviy sintez', 'O\'simliklardan', 'Hayvonlardan']),

  createQuestion(518, 'Immunitet nima?', 'B', 'Easy', 'Organizmning infektsiyalarga qarshi turish qobiliyati.',
    ['Kasallik turi', 'Infektsiyalarga qarshi turish qobiliyati', 'Dori turi', 'Vaksina nomi']),
  createQuestion(518, 'Vaktsinatsiyani birinchi kim qilgan?', 'A', 'Medium', 'Edvard Jenner 1796-yilda birinchi vaksinani yaratgan.',
    ['Edvard Jenner', 'Lui Paster', 'Robert Kox', 'Aleksandr Fleming']),
  createQuestion(518, 'Antitanachalar qaysi hujayralar ishlab chiqaradi?', 'C', 'Hard', 'B-limfotsitlar antitanachalar ishlab chiqaradi.',
    ['Eritrotsitlar', 'Trombotsitlar', 'B-limfotsitlar', 'Neyronlar']),
  createQuestion(518, 'Tug\'ma immunitetga nima kiradi?', 'D', 'Medium', 'Teri, shilliq qavatlar va fagotsitlar tug\'ma immunitetga kiradi.',
    ['Faqat antitanachalar', 'Faqat T-hujayralar', 'Faqat vaktsinalar', 'Teri, shilliq qavatlar, fagotsitlar']),

  createQuestion(519, 'Viruslarni birinchi kim kashf etgan?', 'A', 'Easy', 'D.I. Ivanovskiy 1892-yilda viruslarni kashf etgan.',
    ['Ivanovskiy', 'Paster', 'Kox', 'Fleming']),
  createQuestion(519, 'Viruslarning tuzilishi qanday?', 'B', 'Easy', 'Nuklein kislota va oqsil qobiqdan iborat.',
    ['Hujayra devorli', 'Nuklein kislota va oqsil qobiq', 'Ko\'p hujayrali', 'Yadro va sitoplazmali']),
  createQuestion(519, 'Antibiotiklar viruslarga ta\'sir qiladimi?', 'C', 'Easy', 'Antibiotiklar viruslarga ta\'sir qilmaydi.',
    ['Ha, juda samarali', 'Ba\'zan', 'Yo\'q, ta\'sir qilmaydi', 'Faqat katta dozada']),
  createQuestion(519, 'Bakteriofaglar nima?', 'D', 'Medium', 'Bakteriofaglar — bakteriyalarni zararlaydigai viruslar.',
    ['Oqsillar', 'Fermentlar', 'Gormonlar', 'Bakteriyalarni zararlaydigai viruslar']),

  createQuestion(520, 'Inson genomi loyihasi qachon tugallangan?', 'A', 'Medium', 'Inson genomi loyihasi 2003-yilda tugallangan.',
    ['2003', '1990', '2010', '2020']),
  createQuestion(520, 'GenBank nima?', 'B', 'Medium', 'GenBank — DNK ketma-ketliklarini saqlaydigan ma\'lumotlar bazasi.',
    ['Gen injeneriyasi usuli', 'DNK ketma-ketliklari bazasi', 'Oqsil ferment', 'Laboratoriya jihozi']),
  createQuestion(520, 'CRISPR texnologiyasi bioinformatikada nima uchun muhim?', 'C', 'Hard', 'Gen tahrirlash va maqsadli terapiya uchun muhim.',
    ['Faqat diagnostikada', 'Faqat tahlilda', 'Gen tahrirlash va maqsadli terapiyada', 'Faqat statistikada']),
  createQuestion(520, 'Bioinformatikada qaysi fanlar birlashadi?', 'D', 'Easy', 'Biologiya, matematika va informatika birlashadi.',
    ['Fizika va kimyo', 'Tarix va geografiya', 'Musiqa va san\'at', 'Biologiya, matematika va informatika']),

  createQuestion(521, 'Tinchlik potentsiali qancha?', 'A', 'Hard', 'Tinchlik potentsiali -70 mV.',
    ['-70 mV', '-30 mV', '+70 mV', '0 mV']),
  createQuestion(521, 'Harakat potentsiali vaqtida nima sodir bo\'ladi?', 'B', 'Hard', 'Na+ ionlari hujayra ichiga kiradi.',
    ['K+ ionlari kiradi', 'Na+ ionlari kiradi', 'Ca+ ionlari chiqadi', 'Hech narsa']),
  createQuestion(521, 'Sinapsda nima ajraladi?', 'C', 'Medium', 'Sinapsda neyromediatorlar ajraladi.',
    ['Qon', 'Limfa', 'Neyromediatorlar', 'Gormonlar']),
  createQuestion(521, 'Dofamin nima?', 'A', 'Medium', 'Dofamin — neyromediator, "zavq gormoni" deb ataladi.',
    ['Neyromediator', 'Gormon', 'Ferment', 'Vitamin']),

  createQuestion(522, 'Vernadskiy biosferani qanday ta\'riflagan?', 'B', 'Medium', 'Tirik modda bilan shakllangan Yer qobig\'i.',
    ['Faqat atmosfera', 'Tirik modda bilan shakllangan Yer qobig\'i', 'Faqat litosfera', 'Faqat gidrosfera']),
  createQuestion(522, 'Atmosferadagi CO₂ miqdori qancha oshdi?', 'A', 'Hard', '280 ppm dan 420 ppm ga oshdi.',
    ['280 → 420 ppm', '100 → 200 ppm', '500 → 1000 ppm', 'O\'zgarmadi']),
  createQuestion(522, 'Noosfera nima?', 'C', 'Hard', 'Noosfera — aql-idrok sferasi, inson ongli ravishda biosferani boshqaradigan davr.',
    ['Atmosfera qatlami', 'Suv qatlami', 'Aql-idrok sferasi', 'Yer yadrosi']),
  createQuestion(522, 'BMT Barqaror Rivojlanish Maqsadlari nechta yo\'nalishni o\'z ichiga oladi?', 'D', 'Medium', '17 ta yo\'nalish mavjud.',
    ['5', '10', '15', '17']),

  createQuestion(523, 'CRISPR-Cas9 nima imkonini beradi?', 'A', 'Medium', 'Genlarni aniq joyda kesish va o\'zgartirish imkonini beradi.',
    ['Genlarni kesish va o\'zgartirish', 'Faqat ko\'rish', 'Faqat ko\'chirish', 'Faqat o\'chirish']),
  createQuestion(523, 'Personalizatsiyalangan tibbiyot nima?', 'B', 'Medium', 'Har bir bemorning genetik xususiyatlariga mos davolash.',
    ['Hammaga bir xil davolash', 'Genetik xususiyatlarga mos davolash', 'Faqat dori berish', 'Faqat operatsiya']),
  createQuestion(523, 'Bioaxloq nima bilan shug\'ullanadi?', 'C', 'Easy', 'Biologiya va tibbiyotdagi axloqiy muammolar.',
    ['Faqat iqtisodiyot', 'Faqat siyosat', 'Biologiya va tibbiyotdagi axloqiy muammolar', 'Faqat ta\'lim']),
  createQuestion(523, 'Farmakogenomika nima?', 'D', 'Hard', 'Genlar dori preparatlarga ta\'sirini o\'rganuvchi fan.',
    ['Dori ishlab chiqarish', 'Kasalliklarni aniqlash', 'Vaktsinalar yaratish', 'Genlar dori preparatlarga ta\'sirini o\'rganish']),
];

export const localQuestions = allQA.map(qa => qa.question);
export const localQuestionOptions = allQA.flatMap(qa => qa.options);

export const localDidYouKnow = [
  { id: 1, fact_text: 'Asal hech qachon buzilmaydi. Arxeologlar Misr piramidalaridan 3000 yillik asal topishgan va u hali ham iste\'mol qilish mumkin edi!' },
  { id: 2, fact_text: 'Oktopusning 3 ta yuragi bor. Ikkitasi qonni oyoqlarga, bittasi esa tanaga qon yuboradi.' },
  { id: 3, fact_text: 'Inson tanasida taxminan 37,2 trillion hujayra mavjud.' },
  { id: 4, fact_text: 'Baobab daraxti o\'z tanasida 120 000 litrgacha suv saqlashi mumkin.' },
  { id: 5, fact_text: 'Delfin uyquda ham bir ko\'zi ochiq bo\'ladi, chunki miyasining faqat yarmi uxlaydi.' },
  { id: 6, fact_text: 'DNK molekulasining uzunligi 2 metrga yetadi, lekin u hujayraning yadrosiga joylashadi.' },
  { id: 7, fact_text: 'Kamalak 12 ta rangni ko\'ra oladi, inson esa atigi 3 ta (qizil, yashil, ko\'k).' },
  { id: 8, fact_text: 'Eng kichik sut emizuvchi — bumblebee ko\'rshapalak, og\'irligi atigi 2 gramm.' },
  { id: 9, fact_text: 'O\'simliklarning 80% dan ortig\'i okean tubida o\'sadi, biz faqat 20% ini ko\'ramiz.' },
  { id: 10, fact_text: 'Inson miyasi kuniga taxminan 70 000 ta fikr ishlab chiqaradi.' },
  { id: 11, fact_text: 'Bambuk o\'simligi kuniga 91 sm gacha o\'sishi mumkin — bu eng tez o\'suvchi o\'simlik!' },
  { id: 12, fact_text: 'Qizil qon tanachalarining (eritrotsitlarning) umri atigi 120 kun.' },
  { id: 13, fact_text: 'Inson skeleti 206 ta suyakdan iborat, lekin tug\'ilgan chaqaloqda 270 dan ortiq suyak bor!' },
  { id: 14, fact_text: 'Kapalaklarning ta\'m bilish organi oyoqlarida joylashgan — ular oyoqlari bilan ta\'m biladi!' },
  { id: 15, fact_text: 'Inson ko\'zi taxminan 10 million turli rangni ajrata oladi.' },
];
