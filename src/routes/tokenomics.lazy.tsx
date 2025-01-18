import { createLazyFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export const Route = createLazyFileRoute('/tokenomics')({
  component: RouteComponent,
})

// function RouteComponent() {
//   return <div>Hello "/tokenomics"!</div>
// }

const data = [
  { name: 'Jan', price: 2000 },
  { name: 'Feb', price: 3000 },
  { name: 'Mar', price: 2800 },
  { name: 'Apr', price: 4200 },
  { name: 'May', price: 3800 },
  { name: 'Jun', price: 4800 },
]

function RouteComponent() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-bold text-gray-800">$CLANKBNB</h1>
        <p className="text-2xl text-gray-600">
          Tokenomics: 90% of fees made vía bookings will to buy $CLANKBNB
        </p>
      </div>

      <Card className="p-6">
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#ec4899"
                strokeWidth={2}
                dot={{ fill: '#ec4899' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid gap-4">
        <Button
          variant="outline"
          className="w-full py-6 text-lg"
          onClick={() => window.open('https://app.uniswap.org', '_blank')}
        >
          Buy on Uniswap
        </Button>
        <Button
          variant="outline"
          className="w-full py-6 text-lg"
          onClick={() => window.open('https://dexscreener.com', '_blank')}
        >
          Check Dexscreener
        </Button>
        <Button
          variant="outline"
          className="w-full py-6 text-lg"
          onClick={() => window.open('https://www.clanker.world/', '_blank')}
        >
          Check Clanker site
        </Button>
        <Button
          variant="outline"
          className="w-full py-6 text-lg"
          onClick={() =>
            window.open(
              'https://sepolia.etherscan.io/address/0x121C1344bb936dC50fecc6B1688AdefAad3F39F2',
              '_blank',
            )
          }
        >
          Check Basescan
        </Button>
      </div>
    </div>
  )
}
