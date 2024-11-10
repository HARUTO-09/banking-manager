import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Building2, LogOut, Wallet, ArrowUpRight, ArrowDownRight,
  Clock, DollarSign, CreditCard, Send, User, Phone,
  Mail, MapPin, AlertCircle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DashboardViewProps {
  onLogout: () => void;
}

interface Transaction {
  id: number;
  type: 'deposit' | 'withdrawal' | 'transfer';
  amount: number;
  date: string;
  description: string;
}

export function DashboardView({ onLogout }: DashboardViewProps) {
  const { toast } = useToast();
  const [balance, setBalance] = useState(4550.00);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [depositAmount, setDepositAmount] = useState('');
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: 1, type: 'deposit', amount: 1500, date: '2024-03-20', description: 'Salary Deposit' },
    { id: 2, type: 'withdrawal', amount: 80, date: '2024-03-19', description: 'ATM Withdrawal' },
    { id: 3, type: 'transfer', amount: 200, date: '2024-03-18', description: 'Transfer to Sarah' },
  ]);

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount greater than 0",
        variant: "destructive"
      });
      return;
    }
    if (amount > balance) {
      toast({
        title: "Insufficient funds",
        description: "You don't have enough balance for this withdrawal",
        variant: "destructive"
      });
      return;
    }
    setBalance(prev => prev - amount);
    setTransactions(prev => [{
      id: Date.now(),
      type: 'withdrawal',
      amount,
      date: new Date().toISOString().split('T')[0],
      description: 'ATM Withdrawal'
    }, ...prev]);
    setWithdrawAmount('');
    toast({
      title: "Withdrawal successful",
      description: `$${amount.toFixed(2)} has been withdrawn from your account`
    });
  };

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount greater than 0",
        variant: "destructive"
      });
      return;
    }
    setBalance(prev => prev + amount);
    setTransactions(prev => [{
      id: Date.now(),
      type: 'deposit',
      amount,
      date: new Date().toISOString().split('T')[0],
      description: 'Cash Deposit'
    }, ...prev]);
    setDepositAmount('');
    toast({
      title: "Deposit successful",
      description: `$${amount.toFixed(2)} has been deposited to your account`
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-gray-800 sticky top-0 z-50 bg-slate-900/95 backdrop-blur supports-[backdrop-filter]:bg-slate-900/75">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building2 className="h-8 w-8 text-blue-500" />
              <h1 className="text-2xl font-bold text-white">SecureBank</h1>
            </div>
            <Button
              variant="ghost"
              className="text-gray-400 hover:text-white"
              onClick={onLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="overview" className="space-y-8">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="manage">Manage Account</TabsTrigger>
            <TabsTrigger value="withdraw">Withdraw</TabsTrigger>
            <TabsTrigger value="deposit">Deposit</TabsTrigger>
            <TabsTrigger value="balance">Check Balance</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid gap-6 md:grid-cols-3 mb-8">
              <Card className="bg-white/[0.02] border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">
                    Total Balance
                  </CardTitle>
                  <Wallet className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">${balance.toFixed(2)}</div>
                  <p className="text-xs text-gray-400 mt-1">
                    Available Balance
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white/[0.02] border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">
                    Account Number
                  </CardTitle>
                  <CreditCard className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">****4589</div>
                  <p className="text-xs text-gray-400 mt-1">
                    Checking Account
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white/[0.02] border-gray-800">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">
                    Quick Actions
                  </CardTitle>
                  <Send className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full" variant="outline">Send Money</Button>
                  <Button className="w-full" variant="outline">Request Money</Button>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/[0.02] border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Recent Transactions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.slice(0, 5).map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-4 rounded-lg bg-white/[0.01] border border-gray-800"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-full ${
                          transaction.type === 'deposit'
                            ? 'bg-green-500/10 text-green-500'
                            : transaction.type === 'withdrawal'
                            ? 'bg-red-500/10 text-red-500'
                            : 'bg-blue-500/10 text-blue-500'
                        }`}>
                          {transaction.type === 'deposit' ? (
                            <ArrowDownRight className="h-4 w-4" />
                          ) : transaction.type === 'withdrawal' ? (
                            <ArrowUpRight className="h-4 w-4" />
                          ) : (
                            <Send className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-white">
                            {transaction.description}
                          </p>
                          <p className="text-xs text-gray-400">
                            {transaction.date}
                          </p>
                        </div>
                      </div>
                      <div className={`text-sm font-medium ${
                        transaction.type === 'deposit'
                          ? 'text-green-500'
                          : 'text-red-500'
                      }`}>
                        {transaction.type === 'deposit' ? '+' : '-'}
                        ${transaction.amount.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Manage Account Tab */}
          <TabsContent value="manage">
            <Card className="bg-white/[0.02] border-gray-800">
              <CardHeader>
                <CardTitle className="text-white">Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          id="fullName"
                          placeholder="John Doe"
                          className="pl-10 bg-white/[0.03] border-gray-700"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          id="phone"
                          placeholder="+1 234 567 8900"
                          className="pl-10 bg-white/[0.03] border-gray-700"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="john@example.com"
                          className="pl-10 bg-white/[0.03] border-gray-700"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          id="address"
                          placeholder="123 Main St, City"
                          className="pl-10 bg-white/[0.03] border-gray-700"
                        />
                      </div>
                    </div>
                  </div>
                  <Button className="w-full md:w-auto">Update Information</Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Withdraw Tab */}
          <TabsContent value="withdraw">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-white/[0.02] border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Withdraw Money</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleWithdraw} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="withdrawAmount">Amount to Withdraw</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          id="withdrawAmount"
                          type="number"
                          placeholder="0.00"
                          value={withdrawAmount}
                          onChange={(e) => setWithdrawAmount(e.target.value)}
                          className="pl-10 bg-white/[0.03] border-gray-700"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-yellow-500">
                      <AlertCircle className="h-4 w-4" />
                      <span>Available balance: ${balance.toFixed(2)}</span>
                    </div>
                    <Button type="submit" className="w-full">Withdraw</Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="bg-white/[0.02] border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Recent Withdrawals</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions
                      .filter(t => t.type === 'withdrawal')
                      .slice(0, 5)
                      .map((transaction) => (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between p-4 rounded-lg bg-white/[0.01] border border-gray-800"
                        >
                          <div>
                            <p className="text-sm font-medium text-white">
                              {transaction.description}
                            </p>
                            <p className="text-xs text-gray-400">
                              {transaction.date}
                            </p>
                          </div>
                          <div className="text-sm font-medium text-red-500">
                            -${transaction.amount.toFixed(2)}
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Deposit Tab */}
          <TabsContent value="deposit">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-white/[0.02] border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Deposit Money</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleDeposit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="depositAmount">Amount to Deposit</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <Input
                          id="depositAmount"
                          type="number"
                          placeholder="0.00"
                          value={depositAmount}
                          onChange={(e) => setDepositAmount(e.target.value)}
                          className="pl-10 bg-white/[0.03] border-gray-700"
                        />
                      </div>
                    </div>
                    <Button type="submit" className="w-full">Deposit</Button>
                  </form>
                </CardContent>
              </Card>

              <Card className="bg-white/[0.02] border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Recent Deposits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions
                      .filter(t => t.type === 'deposit')
                      .slice(0, 5)
                      .map((transaction) => (
                        <div
                          key={transaction.id}
                          className="flex items-center justify-between p-4 rounded-lg bg-white/[0.01] border border-gray-800"
                        >
                          <div>
                            <p className="text-sm font-medium text-white">
                              {transaction.description}
                            </p>
                            <p className="text-xs text-gray-400">
                              {transaction.date}
                            </p>
                          </div>
                          <div className="text-sm font-medium text-green-500">
                            +${transaction.amount.toFixed(2)}
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Check Balance Tab */}
          <TabsContent value="balance">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-white/[0.02] border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Current Balance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-6 rounded-lg bg-white/[0.01] border border-gray-800">
                      <p className="text-sm text-gray-400 mb-2">Available Balance</p>
                      <p className="text-4xl font-bold text-white">${balance.toFixed(2)}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-white/[0.01] border border-gray-800">
                        <p className="text-sm text-gray-400 mb-1">Today's Deposits</p>
                        <p className="text-xl font-bold text-green-500">
                          +${transactions
                            .filter(t => t.type === 'deposit' && t.date === new Date().toISOString().split('T')[0])
                            .reduce((sum, t) => sum + t.amount, 0)
                            .toFixed(2)}
                        </p>
                      </div>
                      <div className="p-4 rounded-lg bg-white/[0.01] border border-gray-800">
                        <p className="text-sm text-gray-400 mb-1">Today's Withdrawals</p>
                        <p className="text-xl font-bold text-red-500">
                          -${transactions
                            .filter(t => t.type === 'withdrawal' && t.date === new Date().toISOString().split('T')[0])
                            .reduce((sum, t) => sum + t.amount, 0)
                            .toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/[0.02] border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Transaction History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 rounded-lg bg-white/[0.01] border border-gray-800"
                      >
                        <div className="flex items-center gap-4">
                          <div className={`p-2 rounded-full ${
                            transaction.type === 'deposit'
                              ? 'bg-green-500/10 text-green-500'
                              : 'bg-red-500/10 text-red-500'
                          }`}>
                            {transaction.type === 'deposit' ? (
                              <ArrowDownRight className="h-4 w-4" />
                            ) : (
                              <ArrowUpRight className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">
                              {transaction.description}
                            </p>
                            <p className="text-xs text-gray-400">
                              {transaction.date}
                            </p>
                          </div>
                        </div>
                        <div className={`text-sm font-medium ${
                          transaction.type === 'deposit'
                            ? 'text-green-500'
                            : 'text-red-500'
                        }`}>
                          {transaction.type === 'deposit' ? '+' : '-'}
                          ${transaction.amount.toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}