export default function StatCard({ name, value, icon }) {
  return (
    <div className=" bg-card  rounded-2xl p-6  shadow-lg transition-colors duration-200 hover:shadow-2xl flex  flex-col items-center">
      <div className="flex items-start justify-between mb-4">
        <p className="">{name}</p>
      </div>
      <p className="text-3xl font-bold mb-2 transition-colors duration-200">
        {value}
      </p>
    </div>
  );
}
