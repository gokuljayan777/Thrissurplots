export interface Property {
    id: string;
    title: string;
    location: string;
    price: string;
    area: string;
    type: string;
    status: 'Available' | 'Sold';
    imageUrl: string;
    features: string[];
}

export const mockProperties: Property[] = [
    {
        id: 'p1',
        title: 'Premium Villa Plot in Kuttanellur',
        location: 'Kuttanellur, Thrissur',
        price: '₹45 Lakhs',
        area: '10 Cents',
        type: 'Residential',
        status: 'Available',
        imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000&auto=format&fit=crop',
        features: ['Tar Road Frontage', 'Water Connection', 'Electricity', 'Compound Wall']
    },
    {
        id: 'p2',
        title: 'Commercial Land near Swaraj Round',
        location: 'Swaraj Round, Thrissur',
        price: '₹2.5 Crores',
        area: '5 Cents',
        type: 'Commercial',
        status: 'Available',
        imageUrl: 'https://images.unsplash.com/photo-1503594384566-461fe158e797?q=80&w=2000&auto=format&fit=crop',
        features: ['Highway Frontage', 'Prime Location', 'High ROI']
    },
    {
        id: 'p3',
        title: 'Scenic Agricultural Land',
        location: 'Peechi, Thrissur',
        price: '₹80 Lakhs',
        area: '1 Acre',
        type: 'Agricultural',
        status: 'Available',
        imageUrl: 'https://images.unsplash.com/photo-1582967657934-2e2db4befa0b?q=80&w=2000&auto=format&fit=crop',
        features: ['River Front', 'Fertile Soil', 'Suitable for Resort']
    },
    {
        id: 'p4',
        title: 'Investment Plot near City Center',
        location: 'Mannuthy, Thrissur',
        price: '₹1.2 Crores',
        area: '2 Acres',
        type: 'Investment',
        status: 'Available',
        imageUrl: 'https://images.unsplash.com/photo-1519985176271-1c5e5c5b5c5c?q=80&w=2000&auto=format&fit=crop',
        features: ['High ROI', 'Prime Location', 'Ready for Development']
    }
];
