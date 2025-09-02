import { services } from "@/lib/mockData";
import { useAppContext } from "@/context/AppContext";

type Service = {
  id: number;
  listingId: number;
  name: string;
  price: number;
  description: string;
};

export default function ServiceCard({ service }: { service: Service }) {
  const context = useAppContext()
  if (!service || !context) return <div>Not found shop</div>;
  return (
    <div className="border p-2 rounded">
      <h3 className="font-semibold">{service.name}</h3>
      <p>{service.description}</p>
      <p className="font-bold">${service.price}</p>
    </div>
  );
}
