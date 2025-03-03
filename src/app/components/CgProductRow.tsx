import Image from "next/image";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

// Define static sample products
const sampleProducts = [
  { id: 1, title: "Product 1", image: "https://images.jdmagicbox.com/quickquotes/images_main/electric-motor-pump-crompton-greaves-382005141-bqnr2.jpg", description: "Description for product 1" },
  { id: 2, title: "Product 2", image: "https://images.jdmagicbox.com/quickquotes/images_main/electric-motor-pump-crompton-greaves-382005141-bqnr2.jpg", description: "Description for product 2" },
  { id: 3, title: "Product 3", image: "https://images.jdmagicbox.com/quickquotes/images_main/electric-motor-pump-crompton-greaves-382005141-bqnr2.jpg", description: "Description for product 3" },
];

export default function ProductRow() {
  return (
    <div className="p-4">
      <div className="text-center mb-4">
        {/* Centered logo above heading */}
        <Image 
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/Crompton_Greaves_Logo.svg/1200px-Crompton_Greaves_Logo.svg.png" 
          alt="Logo" 
          width={100} 
          height={100} 
          className="block mx-auto"
        />
        <h1 className="text-3xl font-bold">Cg Power limited</h1>
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {sampleProducts.map((product) => (
          <Card key={product.id} className="border rounded-lg shadow hover:shadow-lg transition">
            <CardHeader>
              {/* Product title as h1 */}
              <h1 className="text-xl font-bold">{product.title}</h1>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                {/* Square image */}
                <Image 
                  src={product.image} 
                  alt={product.title} 
                  width={250} 
                  height={250} 
                  className="object-cover rounded"
                />
                {/* Description with margin and padding */}
                <p className="p-4 mt-2 text-center">{product.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
