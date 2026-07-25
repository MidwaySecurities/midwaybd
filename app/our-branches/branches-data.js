// Single source of truth for branch data.
// Used by page.js (Server Component, for metadata + JSON-LD) and
// BranchesFilter.jsx (Client Component, for the interactive list),
// so the two can never drift out of sync.

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
        link: 'https://maps.app.goo.gl/CejsjTizDFiYTRne8',
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
        link: 'https://maps.app.goo.gl/3EfzNxo9LjRqS72Q8',
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
        link: 'https://maps.app.goo.gl/ybF7DHFnz6pNeQcF7',
        // NOTE: no lat/lng supplied for this branch in the original source —
        // left out rather than guessed. Add real coordinates if you have them.
        services: ["Account Opening", "Trading Support", "Customer Service"]
    },
    {
        id: 4,
        name: "Uttara Branch",
        type: "branch",
        building: "HM Plaza",
        room: "Plot 34, Room 7 (6th Floor)",
        address: "Sector 3, Uttara, Dhaka 1230",
        locality: "Dhaka",
        postalCode: "1230",
        tel: [],
        mobile: ["01971227340", "01715325978"],
        link: 'https://maps.app.goo.gl/QeCuCQAQFhZTQ42J8',
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
        mobile: ["01857777529", "01823416181"],
        link: 'https://maps.app.goo.gl/V9HxeuESvzKhujVa9',
        coordinates: { lat: 23.7104, lng: 90.4074 },
        services: ["Account Opening", "Trading Support", "Customer Service"]
    },
    {
        id: 6,
        name: "COMILLA BRANCH",
        type: "branch",
        building: "Makka Tower",
        room: "3rd Floor",
        address: "AK Fazlul Haq Rd, Rajgong, Comilla 3500",
        locality: "Comilla",
        postalCode: "3500",
        tel: ["+8802334400508", "+8802334400509"],
        mobile: ["01711148727"],
        link: 'https://maps.app.goo.gl/FLvBNGfNyQem2H6JA',
        coordinates: { lat: 23.4607, lng: 91.1809 },
        services: ["Account Opening", "Trading Support", "Investment Advisory"]
    },
    {
        id: 7,
        name: "NiKunjA 2 Branch",
        type: "branch",
        building: "DSE TOWER",
        room: "Room 219",
        address: "Plot 46, Road 21, Nikunja 2, Level 11",
        locality: "Dhaka",
        tel: ["41040008", "41040009"],
        mobile: [],
        link: 'https://maps.app.goo.gl/JouBCqzRK38NezC66',
        coordinates: { lat: 23.8103, lng: 90.4125 },
        services: ["Account Opening", "Trading Support"]
    },
    {
        id: 8,
        name: "Kalapara Digital Booth",
        type: "digital",
        building: "Digital Service Center",
        room: "Ground Floor",
        address: "Main Road, Kalapara, Patuakhali",
        locality: "Patuakhali",
        tel: ["41040008"],
        mobile: ["01711148727"],
        link: 'https://maps.app.goo.gl/LzyoZrtrFRCTDW6t8',
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