import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Check } from "lucide-react"
import { useQueryClient } from "@tanstack/react-query"

interface OrderSuccessDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderDetails: {
    orderNumber: string;
    orderDate: string;
    totalAmount: string;
    paymentMethod: string;
  };
}

export function OrderSuccessDialog({ open, onOpenChange, orderDetails }: OrderSuccessDialogProps) {
  const queryClient = useQueryClient();

  const handleClose = () => {
    onOpenChange(false);
    queryClient.invalidateQueries({ queryKey: ["cart"] });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent showCloseButton={false} className="max-w-[90vw] md:max-w-[550px] md:h-[707px] flex flex-col justify-between p-6 sm:p-8 text-center bg-white rounded-3xl border-none shadow-xl gap-0">
        <DialogHeader className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 bg-[#16a34a] rounded-full flex items-center justify-center mb-2 shadow-sm">
             <Check className="w-8 h-8 text-white stroke-[3]" />
          </div>
          <DialogTitle className="text-2xl font-bold text-gray-900 mt-2 font-cairo">
            تم تأكيد طلبك بنجاح!
          </DialogTitle>
          <DialogDescription className="text-gray-500 text-sm md:text-base leading-relaxed mt-2 font-cairo px-2">
            شكراً لثقتك بنا. لقد استلمنا طلبك وهو الآن قيد التنفيذ. يمكنك متابعة حالة الشحنة والاطلاع على التفاصيل من خلال صفحة طلباتي.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-gray-50 rounded-2xl p-5 mt-8 mb-8 border border-gray-100">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center text-sm md:text-base">
              <span className="font-bold text-gray-900 font-sans" dir="ltr">{orderDetails.orderNumber}</span>
              <span className="text-gray-600 font-cairo">رقم الطلب</span>
            </div>
            <div className="flex justify-between items-center text-sm md:text-base">
              <span className="font-bold text-gray-900 font-cairo">{orderDetails.orderDate}</span>
              <span className="text-gray-600 font-cairo">تاريخ الطلب</span>
            </div>
            <div className="flex justify-between items-center text-sm md:text-base">
              <span className="font-bold text-gray-900 font-sans" dir="ltr">{orderDetails.totalAmount} ﷼</span>
              <span className="text-gray-600 font-cairo">المبلغ الاجمالي</span>
            </div>
            <div className="flex justify-between items-center text-sm md:text-base">
              <span className="font-bold text-gray-900 font-cairo">{orderDetails.paymentMethod}</span>
              <span className="text-gray-600 font-cairo">طريقة الدفع</span>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col gap-3 sm:flex-col mt-0 sm:justify-center p-0 border-t-0 bg-transparent mb-2">
          <Link href="/profile/orders" className="w-full" onClick={handleClose}>
            <Button className="w-full bg-[#f59e0b] hover:bg-[#d97706] text-white rounded-full py-6 md:py-7 text-base md:text-lg font-bold shadow-sm font-cairo transition-colors h-auto">
              تتبع الطلب
            </Button>
          </Link>
          <Link href="/" className="w-full" onClick={handleClose}>
            <Button variant="outline" className="w-full border-[#f59e0b] text-[#f59e0b] hover:bg-[#fef3c7] hover:text-[#d97706] rounded-full py-6 md:py-7 text-base md:text-lg font-bold bg-white transition-colors h-auto font-cairo">
              العودة للرئيسية
            </Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
