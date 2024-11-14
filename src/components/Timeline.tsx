
export default function Timeline() {
  return (
    <div className="bg-gray-50 text-gray-900 py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-light mb-16">Case Timeline</h2>
          <div className="space-y-12">
            <TimelineItem
              date="July 2023"
              title="Data Breach Discovery"
              description="HealthEquity discovered unauthorized access to their systems containing sensitive customer information."
            />
            <TimelineItem
              date="August 2023"
              title="Public Announcement"
              description="HealthEquity publicly announced the data breach affecting millions of customers."
            />
            <TimelineItem
              date="March 2024"
              title="Legal Action"
              description="Investigation launched to protect affected individuals' rights and seek compensation."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface TimelineItemProps {
  date: string;
  title: string;
  description: string;
}

function TimelineItem({ date, title, description }: TimelineItemProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center group">
      <div className="w-32 font-light text-gray-500 mb-2 md:mb-0">{date}</div>
      <div className="flex-1 pl-0 md:pl-8 border-l border-gray-300">
        <h3 className="text-xl font-normal mb-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}