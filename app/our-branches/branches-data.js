// Single source of truth for branch data.
// Used by page.js (Server Component, for metadata + JSON-LD) and
// BranchesFilter.jsx (Client Component, for the interactive list),
// so the two can never drift out of sync.

// Small helper so every map embed is fluid (100% wide, capped at 350px on
// larger screens) instead of a fixed 350px box that used to overflow the
// viewport below ~360px wide.
const mapEmbed = (src) => (
    <div className="w-full sm:w-[350px] max-w-full overflow-hidden rounded-lg shrink-0">
        <iframe
            src={src}
            className="w-full h-[180px] sm:h-[150px] border-0 block"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
        />
    </div>
)

export const branches = [
    {
        id: 1,
        name: "HEAD OFFICE @ MOTIJHEEL",
        type: "head",
        building: "Dhaka Stock Exchange Building",
        room: "Room No: 508",
        address: "9/F, Motijheel C/A, Dhaka 1000",
        locality: "Dhaka",
        postalCode: "1000",
        tel: ["9559925", "9576291", "9551960"],
        mobile: ["01874444816"],
        link: mapEmbed("https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58439.7951165157!2d90.41999999999997!3d23.73!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b851e80a53c9%3A0xd242368f9366718e!2sMidway%20Securities%20Ltd.!5e0!3m2!1sen!2sbd!4v1787725932189!5m2!1sen!2sbd"),
        coordinates: { lat: 23.7332, lng: 90.4203 },
        services: ["Account Opening", "Trading Support", "Investment Advisory", "Corporate Services"]
    },
    {
        id: 2,
        name: "SWANTEX @ MOTIJHEEL",
        type: "branch",
        building: "SwanTex Building",
        room: "3rd Floor",
        address: "9/I, Motijheel C/A, Dhaka 1000",
        locality: "Dhaka",
        postalCode: "1000",
        tel: ["47115806", "47115761", "47115318"],
        mobile: ["01845222333", "01874444815"],
        link: mapEmbed("https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d233763.58655046864!2d90.39853690699208!3d23.7275431635448!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b851e80a53c9%3A0xd242368f9366718e!2sMidway%20Securities%20Ltd.!5e0!3m2!1sen!2sbd!4v1787725718689!5m2!1sen!2sbd"),
        coordinates: { lat: 23.7331, lng: 90.4199 },
        services: ["Account Opening", "Trading Support", "Customer Service"]
    },
    {
        id: 3,
        name: "Gulshan Branch",
        type: "branch",
        building: "Jabbar Tower",
        room: "9th Floor, Plot-42, Road-135 Gulshan Avenue",
        address: "Gulshan-1, Dhaka-1212",
        locality: "Dhaka",
        postalCode: "1212",
        tel: ["58815077", "58815078"],
        mobile: ["01841778806", "01841778807"],
        link: mapEmbed("https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d8985.144875355165!2d90.418078!3d23.779222!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c79c07f45e7b%3A0x1e65ce34acd41792!2sMidway%20Securities%20Ltd.!5e1!3m2!1sen!2sbd!4v1787726201727!5m2!1sen!2sbd"),
        // NOTE: no lat/lng supplied for this branch in the original source —
        // left out rather than guessed. Add real coordinates if you have them.
        services: ["Account Opening", "Trading Support", "Customer Service"]
    },
    {
        id: 6,
        name: "Uttara Branch",
        type: "branch",
        building: "HM Plaza",
        room: "Plot 34, Room 7 (6th Floor)",
        address: "Sector 3, Uttara, Dhaka 1230",
        locality: "Dhaka",
        postalCode: "1230",
        tel: [],
        mobile: ["01971227340", "01715325978"],
        link: mapEmbed("https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2244.8080811168006!2d90.399254!3d23.864645!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c420d5c527af%3A0x50fce62d42fa2bc!2sMidway%20Securities%20Ltd.!5e1!3m2!1sen!2sbd!4v1787727412613!5m2!1sen!2sbd"),
        coordinates: { lat: 23.8759, lng: 90.3795 },
        services: ["Account Opening", "Trading Support", "Investment Advisory"]
    },
    {
        id: 5,
        name: "Chowk Bazar Branch",
        type: "branch",
        building: "Shahjahan Imam Tower",
        room: "29-31 Water Works Road",
        address: "Chawkbazar, Dhaka-1211",
        locality: "Dhaka",
        postalCode: "1211",
        tel: ["7342560", "7342561"],
        mobile: ["01335227115", "01335227116"],
        link: mapEmbed("https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d456.6082808597046!2d90.3947669!3d23.71647!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8e03e32ae8f%3A0xe22b821efdc852dd!2sMidway%20Securities%20Ltd!5e0!3m2!1sen!2sbd!4v1787727062599!5m2!1sen!2sbd"),
        coordinates: { lat: 23.7104, lng: 90.4074 },
        services: ["Account Opening", "Trading Support", "Customer Service"]
    },
    {
        id: 7,
        name: "COMILLA BRANCH",
        type: "cumilla",
        building: "Makka Tower",
        room: "3rd Floor",
        address: "AK Fazlul Haq Rd, Rajgong, Comilla 3500",
        locality: "Comilla",
        postalCode: "3500",
        tel: ["+8802334400508", "+8802334400509"],
        mobile: ["01711148727"],
        link: mapEmbed("https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d18013.68949457094!2d91.186811!3d23.463198!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37547f30e9c48493%3A0x60511c41b00e2851!2sMidway%20Securities%20Ltd!5e1!3m2!1sen!2sbd!4v1787728079119!5m2!1sen!2sbd"),
        coordinates: { lat: 23.4607, lng: 91.1809 },
        services: ["Account Opening", "Trading Support", "Investment Advisory"]
    },
    {
        id: 4,
        name: "Nikunja 2 Branch",
        type: "branch",
        building: "DSE TOWER",
        room: "Room 219",
        address: "Plot 46, Road 21, Nikunja 2, Level 11",
        locality: "Dhaka",
        tel: ["41040008", "41040009"],
        mobile: [],
        link: mapEmbed("https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5340.242953212859!2d90.41790488330004!3d23.836503948389495!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7e77c0b8fe9%3A0x1a58e79220ddf2a3!2sMidway%20Securities%20Ltd.!5e1!3m2!1sen!2sbd!4v1787726407668!5m2!1sen!2sbd"),
        coordinates: { lat: 23.8103, lng: 90.4125 },
        services: ["Account Opening", "Trading Support"]
    },
    {
        id: 8,
        name: "Kalapara Digital Booth",
        type: "digital",
        building: "Digital Service Center",
        room: "Ground Floor",
        address: "MM Plaza, Notun Bazar, Kalapara",
        locality: "Patuakhali",
        tel: ["41040008"],
        mobile: ["01711148727"],
        link: mapEmbed("https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d4552.363185434888!2d90.22616!3d21.984538!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30aa8d093c1d9057%3A0x3f33bcf4053ecd08!2sMidway%20Securities%20Ltd.!5e1!3m2!1sen!2sbd!4v1787727869849!5m2!1sen!2sbd"),
        coordinates: { lat: 21.985203260962965, lng: 90.23216196353128 },
        services: ["Digital Account Opening", "Online Support", "Document Verification"]
    }
];

export const faqs = [
    {
        question: "Where is Midway Securities' head office located?",
        answer: "The head office is at the Dhaka Stock Exchange Building, Room 508, 9/F, Motijheel C/A, Dhaka 1000."
    },
    {
        question: "What services are available at Midway Securities branches?",
        answer: "All branches offer account opening, trading support, and customer service. Select locations also provide investment advisory and corporate services."
    },
    {
        question: "How many branches does Midway Securities have?",
        answer: `Midway Securities operates ${branches.filter(b => b.type !== 'digital').length} branches across Bangladesh, plus digital service centers such as the Kalapara Digital Booth.`
    },
    {
        question: "What are Midway Securities' operating hours?",
        answer: "Branches operate Sunday to Thursday, 9:00 AM to 5:00 PM. All branches are closed on Friday and Saturday."
    }
];