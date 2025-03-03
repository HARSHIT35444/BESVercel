import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>About Us</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-semibold">
            Since 1957, when our forefathers envisioned this company, our motto
            has been to serve not us, but &quot;our people&quot;—our esteemed clients.
          </p>
          <Separator className="my-4" />
          <p>
            Our business vision has always been three-dimensional:
          </p>
          <ul className="list-disc list-inside space-y-2 mt-2">
            <li>
              <strong>Organisational Skills:</strong> From crafting and sequencing
              the present and future needs of our customers, we provide a complete
              map of the engineering world.
            </li>
            <li>
              <strong>Problem Solving:</strong> We take pride in helping our clients
              by offering products and solutions that enable great energy savings.
            </li>
            <li>
              <strong>Industry Expertise:</strong> Our deep knowledge of the Electric
              Motor business allows us to keep up with advancements in engineering
              science, strengthening our customer relationships.
            </li>
          </ul>
          <Separator className="my-4" />
          <p>
            The vocabulary of CG Power and Industrial Solutions Ltd (formerly
            Crompton Greaves Ltd) and Crompton Greaves Consumer Electricals is
            our pulse and forte.
          </p>
          <p className="mt-4 font-semibold">
            We deal in Electric Motors:
          </p>
          <ul className="list-disc list-inside mt-2">
            <li>Single Phase</li>
            <li>Three Phase Low Voltage (LT Motors)</li>
            <li>Three Phase High Voltage (HT Motors)</li>
          </ul>
          <Separator className="my-4" />
          <p>
            Our company, <strong>Bombay Engineering Syndicate (BES)</strong>, is one of
            the oldest, largest, and most reputed authorized partners of CG. We have
            a strong presence in Mumbai (Maharashtra) and Ahmedabad (Gujarat). Known
            as <strong>THE ROTATING MACHINE PEOPLE</strong>, we offer a diverse range
            of products, solutions, and expertise to meet any client’s needs.
          </p>
          <p className="mt-4">
            We handle project and retail inquiries with ease and are well-versed in
            consultant and project jobs such as EIL, TOYO, L&T, Lurgi, Mecons,
            Foster Wheeler, Jacobs, BHEL, NTPC, NPC, and more. Our understanding of
            documentation processes ensures prompt pre-tendering and post-order
            execution support.
          </p>
          <p className="mt-4">
            We specialize in motors for Hazardous Areas (Ex “e”, Ex “n”, Ex “d”),
            Crane Duty, Roller Table, Ginning Motors, Energy Saving Motors, and AC
            Drives for various applications.
          </p>
          <Separator className="my-4" />
          <p className="text-lg font-semibold">
            As India stands on the cusp of industrial and technological growth, we
            promise to navigate the balance of power and service with ease and
            efficiency.
          </p>
          <p className="mt-4 font-bold">Allow us to serve you. Allow us to serve the Globe.</p>
        </CardContent>
      </Card>
    </div>
  );
}
