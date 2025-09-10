import { useAppContext } from "@/context/AppContext";

type Listing = {
  id: number;
  authorId: number;
  name: string;
  type: string
  description: string;
};

export default function ListingCard({ listing }: { listing: Listing }) {


  const context = useAppContext()
  if (!listing || !context) return <div>Not found shop</div>;
  return (
    <div className="border p-2 rounded bg-white">
      <h3 className="font-semibold text-black">{listing.name}</h3>
      <p className="text-black">{listing.description}</p>
      
    </div>
  );
}
