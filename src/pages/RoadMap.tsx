import { Card } from "@/components/ui/card";

const phases = [
  {
    title: "This week",
    items: [
      "Launch MVP",
      "Launch $CLANKBNB"
    ]
  },
  {
    title: "Next Week",
    items: [
      "Get domain.",
      "Add booking tiers; (eg: tier 1; $100 per night, tier 2: $500 per week; tier 3; $1500 per month)",
      "Add possibility to add your own property on Clankbnb"
    ]
  },
  {
    title: "Week after that",
    items: [
      "Add possibility to pay with top 10 clankers by market cap.",
      "Agent so you can book directly on Farcaster feed."
    ]
  }
];

function RoadmapPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-gray-800">Roadmap</h1>
        <p className="text-2xl text-gray-600">
          Mission: Become the #1 p2p rental service on clanker ecosystem.
        </p>
      </div>

      <div className="relative">
        {/* Arrow and Moon */}
        <div className="absolute inset-0 flex items-center justify-end pointer-events-none">
          <div className="w-full h-2 bg-gradient-to-r from-transparent via-pink-200 to-pink-300"></div>
          <img 
            src="https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?w=200&h=200&fit=crop&sat=-100" 
            alt="Moon" 
            className="w-24 h-24 rounded-full ml-4"
          />
        </div>

        {/* Timeline Cards */}
        <div className="grid md:grid-cols-3 gap-6 relative z-10 pt-12">
          {phases.map((phase, index) => (
            <Card key={index} className="p-6 bg-white/80 backdrop-blur">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">
                {phase.title}
              </h3>
              <ul className="space-y-3">
                {phase.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-gray-600 flex items-start">
                    <span className="w-2 h-2 bg-pink-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RoadmapPage;