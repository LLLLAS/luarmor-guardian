import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Bitcoin, Wallet } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

type Topup = {
  id: string;
  method: string;
  amount: number;
  currency: string;
  status: string;
  payment_url: string | null;
  created_at: string;
};

const CRYPTO_COINS = ["BTC", "ETH", "USDTTRC20", "LTC", "DOGE"];

const TopupTab = () => {
  const { user, profile } = useAuth();
  const [method, setMethod] = useState<"nowpayments" | "truemoney">("nowpayments");
  const [amount, setAmount] = useState("10");
  const [coin, setCoin] = useState("USDTTRC20");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const [topups, setTopups] = useState<Topup[]>([]);

  const load = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("topups")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(20);
    setTopups((data as Topup[]) ?? []);
  };
  useEffect(() => {
    load();
  }, [user]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const amt = Number(amount);
    if (!Number.isFinite(amt) || amt < 1) {
      toast.error("Minimum $1");
      return;
    }
    setBusy(true);
    try {
      const fnName = method === "nowpayments" ? "create-crypto-topup" : "create-truemoney-topup";
      const body = method === "nowpayments" ? { amount: amt, coin } : { amount: amt, phone };
      const { data, error } = await supabase.functions.invoke(fnName, { body });
      if (error) throw error;
      if (data?.payment_url) {
        toast.success("Redirecting to payment…");
        window.open(data.payment_url, "_blank", "noopener");
      } else {
        toast.success("Topup created. Follow the instructions to complete payment.");
      }
      load();
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to create topup";
      toast.error(msg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-card border-border p-6 shadow-card">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-foreground">Balance</h3>
            <p className="text-3xl font-bold text-gradient-gold mt-1">
              ${Number(profile?.balance ?? 0).toFixed(2)}
            </p>
          </div>
          <Wallet className="w-8 h-8 text-primary" />
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-card border-border p-6 shadow-card">
          <div className="flex items-center gap-3 mb-4">
            <Bitcoin className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">Top Up</h3>
          </div>
          <form onSubmit={submit} className="space-y-4">
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <Select value={method} onValueChange={(v) => setMethod(v as typeof method)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nowpayments">Crypto (NOWPayments)</SelectItem>
                  <SelectItem value="truemoney">TrueMoney Wallet</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount (USD)</Label>
              <Input id="amount" type="number" min={1} step="0.01" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </div>

            {method === "nowpayments" && (
              <div className="space-y-2">
                <Label>Coin</Label>
                <Select value={coin} onValueChange={setCoin}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CRYPTO_COINS.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {method === "truemoney" && (
              <div className="space-y-2">
                <Label htmlFor="phone">TrueMoney phone number</Label>
                <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="0812345678" />
              </div>
            )}

            <Button type="submit" className="w-full" disabled={busy}>
              {busy ? "Creating…" : "Continue to Payment"}
            </Button>
            <p className="text-xs text-muted-foreground">
              Payments are credited automatically once confirmed by the provider.
            </p>
          </form>
        </Card>

        <Card className="bg-gradient-card border-border shadow-card">
          <div className="p-6">
            <h3 className="font-semibold text-foreground">Topup History</h3>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topups.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="text-xs">{new Date(t.created_at).toLocaleString()}</TableCell>
                    <TableCell>{t.method}</TableCell>
                    <TableCell>${Number(t.amount).toFixed(2)}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={t.status === "completed" ? "default" : "secondary"}>{t.status}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
                {topups.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                      No topups yet.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default TopupTab;
