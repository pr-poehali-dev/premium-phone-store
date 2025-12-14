import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface iPhone {
  id: string;
  name: string;
  model: string;
  storage: string;
  price: number;
  color: string;
  image: string;
}

interface CartItem extends iPhone {
  quantity: number;
}

interface Transaction {
  id: string;
  date: string;
  items: string[];
  total: number;
  status: string;
}

const iphones: iPhone[] = [
  { id: '1', name: 'iPhone 12 mini', model: '12 mini', storage: '64GB', price: 54990, color: 'Синий', image: 'https://cdn.poehali.dev/projects/d635dfbb-10a5-4589-bc0a-019902e3fe10/files/871a4a5d-a681-4a6b-9798-5e88d6f840f1.jpg' },
  { id: '2', name: 'iPhone 12 mini', model: '12 mini', storage: '128GB', price: 59990, color: 'Черный', image: 'https://cdn.poehali.dev/projects/d635dfbb-10a5-4589-bc0a-019902e3fe10/files/871a4a5d-a681-4a6b-9798-5e88d6f840f1.jpg' },
  { id: '3', name: 'iPhone 12', model: '12', storage: '128GB', price: 64990, color: 'Белый', image: 'https://cdn.poehali.dev/projects/d635dfbb-10a5-4589-bc0a-019902e3fe10/files/871a4a5d-a681-4a6b-9798-5e88d6f840f1.jpg' },
  { id: '4', name: 'iPhone 12 Pro', model: '12 Pro', storage: '256GB', price: 89990, color: 'Графитовый', image: 'https://cdn.poehali.dev/projects/d635dfbb-10a5-4589-bc0a-019902e3fe10/files/871a4a5d-a681-4a6b-9798-5e88d6f840f1.jpg' },
  { id: '5', name: 'iPhone 12 Pro Max', model: '12 Pro Max', storage: '512GB', price: 109990, color: 'Золотой', image: 'https://cdn.poehali.dev/projects/d635dfbb-10a5-4589-bc0a-019902e3fe10/files/871a4a5d-a681-4a6b-9798-5e88d6f840f1.jpg' },
  { id: '6', name: 'iPhone 13 mini', model: '13 mini', storage: '128GB', price: 64990, color: 'Розовый', image: 'https://cdn.poehali.dev/projects/d635dfbb-10a5-4589-bc0a-019902e3fe10/files/871a4a5d-a681-4a6b-9798-5e88d6f840f1.jpg' },
  { id: '7', name: 'iPhone 13', model: '13', storage: '256GB', price: 74990, color: 'Синий', image: 'https://cdn.poehali.dev/projects/d635dfbb-10a5-4589-bc0a-019902e3fe10/files/871a4a5d-a681-4a6b-9798-5e88d6f840f1.jpg' },
  { id: '8', name: 'iPhone 13 Pro', model: '13 Pro', storage: '512GB', price: 109990, color: 'Серебристый', image: 'https://cdn.poehali.dev/projects/d635dfbb-10a5-4589-bc0a-019902e3fe10/files/871a4a5d-a681-4a6b-9798-5e88d6f840f1.jpg' },
  { id: '9', name: 'iPhone 13 Pro Max', model: '13 Pro Max', storage: '1TB', price: 139990, color: 'Графитовый', image: 'https://cdn.poehali.dev/projects/d635dfbb-10a5-4589-bc0a-019902e3fe10/files/871a4a5d-a681-4a6b-9798-5e88d6f840f1.jpg' },
  { id: '10', name: 'iPhone 14', model: '14', storage: '256GB', price: 84990, color: 'Фиолетовый', image: 'https://cdn.poehali.dev/projects/d635dfbb-10a5-4589-bc0a-019902e3fe10/files/67d10da9-9270-4ac2-9b7b-269f76e1c4ea.jpg' },
  { id: '11', name: 'iPhone 14 Plus', model: '14 Plus', storage: '512GB', price: 99990, color: 'Синий', image: 'https://cdn.poehali.dev/projects/d635dfbb-10a5-4589-bc0a-019902e3fe10/files/67d10da9-9270-4ac2-9b7b-269f76e1c4ea.jpg' },
  { id: '12', name: 'iPhone 14 Pro', model: '14 Pro', storage: '512GB', price: 119990, color: 'Темно-фиолетовый', image: 'https://cdn.poehali.dev/projects/d635dfbb-10a5-4589-bc0a-019902e3fe10/files/67d10da9-9270-4ac2-9b7b-269f76e1c4ea.jpg' },
  { id: '13', name: 'iPhone 14 Pro Max', model: '14 Pro Max', storage: '1TB', price: 149990, color: 'Золотой', image: 'https://cdn.poehali.dev/projects/d635dfbb-10a5-4589-bc0a-019902e3fe10/files/67d10da9-9270-4ac2-9b7b-269f76e1c4ea.jpg' },
  { id: '14', name: 'iPhone 15', model: '15', storage: '256GB', price: 89990, color: 'Розовый', image: 'https://cdn.poehali.dev/projects/d635dfbb-10a5-4589-bc0a-019902e3fe10/files/67d10da9-9270-4ac2-9b7b-269f76e1c4ea.jpg' },
  { id: '15', name: 'iPhone 15 Plus', model: '15 Plus', storage: '512GB', price: 104990, color: 'Черный', image: 'https://cdn.poehali.dev/projects/d635dfbb-10a5-4589-bc0a-019902e3fe10/files/67d10da9-9270-4ac2-9b7b-269f76e1c4ea.jpg' },
  { id: '16', name: 'iPhone 15 Pro', model: '15 Pro', storage: '512GB', price: 129990, color: 'Титановый', image: 'https://cdn.poehali.dev/projects/d635dfbb-10a5-4589-bc0a-019902e3fe10/files/67d10da9-9270-4ac2-9b7b-269f76e1c4ea.jpg' },
  { id: '17', name: 'iPhone 15 Pro Max', model: '15 Pro Max', storage: '1TB', price: 159990, color: 'Натуральный титан', image: 'https://cdn.poehali.dev/projects/d635dfbb-10a5-4589-bc0a-019902e3fe10/files/67d10da9-9270-4ac2-9b7b-269f76e1c4ea.jpg' },
  { id: '18', name: 'iPhone 16', model: '16', storage: '256GB', price: 94990, color: 'Ультрамарин', image: 'https://cdn.poehali.dev/projects/d635dfbb-10a5-4589-bc0a-019902e3fe10/files/1f597010-1673-48df-ae04-c975a9aba0b5.jpg' },
  { id: '19', name: 'iPhone 16 Plus', model: '16 Plus', storage: '512GB', price: 109990, color: 'Розовый', image: 'https://cdn.poehali.dev/projects/d635dfbb-10a5-4589-bc0a-019902e3fe10/files/1f597010-1673-48df-ae04-c975a9aba0b5.jpg' },
  { id: '20', name: 'iPhone 16 Pro', model: '16 Pro', storage: '1TB', price: 149990, color: 'Титановый пустынный', image: 'https://cdn.poehali.dev/projects/d635dfbb-10a5-4589-bc0a-019902e3fe10/files/1f597010-1673-48df-ae04-c975a9aba0b5.jpg' },
  { id: '21', name: 'iPhone 16 Pro Max', model: '16 Pro Max', storage: '1TB', price: 169990, color: 'Титановый черный', image: 'https://cdn.poehali.dev/projects/d635dfbb-10a5-4589-bc0a-019902e3fe10/files/1f597010-1673-48df-ae04-c975a9aba0b5.jpg' },
  { id: '22', name: 'iPhone 17 Pro', model: '17 Pro', storage: '1TB', price: 159990, color: 'Титановый синий', image: 'https://cdn.poehali.dev/projects/d635dfbb-10a5-4589-bc0a-019902e3fe10/files/1f597010-1673-48df-ae04-c975a9aba0b5.jpg' },
  { id: '23', name: 'iPhone 17 Pro Max', model: '17 Pro Max', storage: '2TB', price: 199990, color: 'Титановый', image: 'https://cdn.poehali.dev/projects/d635dfbb-10a5-4589-bc0a-019902e3fe10/files/1f597010-1673-48df-ae04-c975a9aba0b5.jpg' },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState('catalog');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedPhone, setSelectedPhone] = useState<iPhone | null>(null);
  const [deliveryMethod, setDeliveryMethod] = useState('delivery');
  const [paymentMethod, setPaymentMethod] = useState('sbp');
  const [showCart, setShowCart] = useState(false);

  const transactions: Transaction[] = [
    { id: 'T001', date: '2024-12-10', items: ['iPhone 15 Pro'], total: 129990, status: 'Доставлен' },
    { id: 'T002', date: '2024-12-08', items: ['iPhone 14'], total: 84990, status: 'В пути' },
    { id: 'T003', date: '2024-12-05', items: ['iPhone 16 Pro Max'], total: 169990, status: 'Доставлен' },
  ];

  const addToCart = (phone: iPhone) => {
    const existing = cart.find(item => item.id === phone.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === phone.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...phone, quantity: 1 }]);
    }
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 glass-effect border-b border-border/50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Smartphone" size={28} className="text-primary" />
            <h1 className="text-2xl font-bold tracking-tight">iPhone Store</h1>
          </div>
          
          <Button
            variant="outline"
            size="lg"
            className="relative hover-scale"
            onClick={() => setShowCart(true)}
          >
            <Icon name="ShoppingCart" size={20} />
            {cartCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground">
                {cartCount}
              </Badge>
            )}
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 glass-effect">
            <TabsTrigger value="catalog" className="transition-all duration-300">
              <Icon name="Grid3x3" size={18} className="mr-2" />
              Каталог
            </TabsTrigger>
            <TabsTrigger value="history" className="transition-all duration-300">
              <Icon name="History" size={18} className="mr-2" />
              История
            </TabsTrigger>
            <TabsTrigger value="settings" className="transition-all duration-300">
              <Icon name="Settings" size={18} className="mr-2" />
              Настройки
            </TabsTrigger>
            <TabsTrigger value="account" className="transition-all duration-300">
              <Icon name="User" size={18} className="mr-2" />
              Аккаунт
            </TabsTrigger>
          </TabsList>

          <TabsContent value="catalog" className="space-y-6 animate-fade-in">
            <div className="text-center space-y-2 mb-8">
              <h2 className="text-4xl font-bold tracking-tight">Премиум коллекция iPhone</h2>
              <p className="text-muted-foreground text-lg">От iPhone 12 mini до iPhone 17 Pro Max</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {iphones.map((phone, index) => (
                <Card
                  key={phone.id}
                  className="group glass-effect overflow-hidden hover-scale cursor-pointer transition-all duration-500"
                  style={{ animationDelay: `${index * 0.05}s` }}
                  onClick={() => setSelectedPhone(phone)}
                >
                  <div className="p-6 space-y-4">
                    <div className="h-48 flex items-center justify-center mb-4 overflow-hidden">
                      <img 
                        src={phone.image} 
                        alt={phone.name}
                        className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">{phone.name}</h3>
                      <div className="flex gap-2 flex-wrap">
                        <Badge variant="secondary">{phone.storage}</Badge>
                        <Badge variant="outline">{phone.color}</Badge>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="text-2xl font-bold text-primary">
                        {phone.price.toLocaleString()} ₽
                      </div>
                    </div>

                    <Button
                      className="w-full hover-scale"
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(phone);
                      }}
                    >
                      <Icon name="Plus" size={18} className="mr-2" />
                      В корзину
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6 animate-fade-in">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold mb-6">История операций</h2>
              <div className="space-y-4">
                {transactions.map((transaction, index) => (
                  <Card
                    key={transaction.id}
                    className="glass-effect p-6 hover-scale"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Icon name="Package" size={24} className="text-primary" />
                        <div>
                          <p className="font-semibold">Заказ {transaction.id}</p>
                          <p className="text-sm text-muted-foreground">{transaction.date}</p>
                        </div>
                      </div>
                      <Badge
                        variant={transaction.status === 'Доставлен' ? 'default' : 'secondary'}
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex justify-between items-center">
                      <div className="space-y-1">
                        {transaction.items.map((item, i) => (
                          <p key={i} className="text-sm">{item}</p>
                        ))}
                      </div>
                      <div className="text-xl font-bold text-primary">
                        {transaction.total.toLocaleString()} ₽
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="animate-fade-in">
            <div className="max-w-2xl mx-auto">
              <Card className="glass-effect p-8">
                <h2 className="text-3xl font-bold mb-6">Настройки</h2>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label className="text-base">Уведомления о заказах</Label>
                    <p className="text-sm text-muted-foreground">
                      Получать уведомления о статусе доставки
                    </p>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label className="text-base">Язык интерфейса</Label>
                    <p className="text-sm text-muted-foreground">Русский</p>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <Label className="text-base">Валюта</Label>
                    <p className="text-sm text-muted-foreground">Российский рубль (₽)</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="account" className="animate-fade-in">
            <div className="max-w-2xl mx-auto">
              <Card className="glass-effect p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center">
                    <Icon name="User" size={40} className="text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Профиль пользователя</h2>
                    <p className="text-muted-foreground">premium@iphone.store</p>
                  </div>
                </div>
                <Separator className="my-6" />
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm text-muted-foreground">Имя</Label>
                      <p className="font-medium">Александр</p>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">Фамилия</Label>
                      <p className="font-medium">Иванов</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Телефон</Label>
                    <p className="font-medium">+7 (999) 123-45-67</p>
                  </div>
                  <div>
                    <Label className="text-sm text-muted-foreground">Бонусов на счету</Label>
                    <p className="text-2xl font-bold text-primary">2,500 ₽</p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={!!selectedPhone} onOpenChange={() => setSelectedPhone(null)}>
        <DialogContent className="max-w-2xl glass-effect">
          <DialogHeader>
            <DialogTitle className="text-3xl">{selectedPhone?.name}</DialogTitle>
            <DialogDescription className="text-lg">
              {selectedPhone?.storage} • {selectedPhone?.color}
            </DialogDescription>
          </DialogHeader>
          
          {selectedPhone && (
            <div className="space-y-6 py-4">
              <div className="h-64 flex items-center justify-center py-8">
                <img 
                  src={selectedPhone.image} 
                  alt={selectedPhone.name}
                  className="w-full h-full object-contain"
                />
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label className="text-base font-semibold mb-3 block">Способ получения</Label>
                  <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
                    <div className="flex items-center space-x-2 glass-effect p-4 rounded-lg hover-scale cursor-pointer">
                      <RadioGroupItem value="delivery" id="delivery" />
                      <Label htmlFor="delivery" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <Icon name="Truck" size={20} />
                          <span>Доставка курьером</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">Бесплатно при заказе от 50,000 ₽</p>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 glass-effect p-4 rounded-lg hover-scale cursor-pointer">
                      <RadioGroupItem value="pickup" id="pickup" />
                      <Label htmlFor="pickup" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-2">
                          <Icon name="Store" size={20} />
                          <span>Самовывоз из магазина</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">Готово через 2 часа</p>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-base font-semibold mb-3 block">Способ оплаты</Label>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2 glass-effect p-4 rounded-lg hover-scale cursor-pointer">
                      <RadioGroupItem value="sbp" id="sbp" />
                      <Label htmlFor="sbp" className="flex-1 cursor-pointer flex items-center gap-2">
                        <Icon name="Smartphone" size={20} />
                        СБП
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 glass-effect p-4 rounded-lg hover-scale cursor-pointer">
                      <RadioGroupItem value="sber" id="sber" />
                      <Label htmlFor="sber" className="flex-1 cursor-pointer flex items-center gap-2">
                        <Icon name="CreditCard" size={20} />
                        Сбербанк
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 glass-effect p-4 rounded-lg hover-scale cursor-pointer">
                      <RadioGroupItem value="tbank" id="tbank" />
                      <Label htmlFor="tbank" className="flex-1 cursor-pointer flex items-center gap-2">
                        <Icon name="CreditCard" size={20} />
                        Т-Банк
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 glass-effect p-4 rounded-lg hover-scale cursor-pointer">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1 cursor-pointer flex items-center gap-2">
                        <Icon name="CreditCard" size={20} />
                        Другие карты
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2 glass-effect p-4 rounded-lg hover-scale cursor-pointer">
                      <RadioGroupItem value="bonus" id="bonus" />
                      <Label htmlFor="bonus" className="flex-1 cursor-pointer flex items-center gap-2">
                        <Icon name="Gift" size={20} />
                        Бонусы (доступно 2,500 ₽)
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <Separator />

                <div className="flex items-center justify-between text-2xl font-bold">
                  <span>Итого:</span>
                  <span className="text-primary">{selectedPhone.price.toLocaleString()} ₽</span>
                </div>

                <Button
                  size="lg"
                  className="w-full text-lg hover-scale"
                  onClick={() => {
                    addToCart(selectedPhone);
                    setSelectedPhone(null);
                  }}
                >
                  <Icon name="ShoppingCart" size={20} className="mr-2" />
                  Добавить в корзину
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showCart} onOpenChange={setShowCart}>
        <DialogContent className="max-w-2xl glass-effect">
          <DialogHeader>
            <DialogTitle className="text-3xl">Корзина</DialogTitle>
            <DialogDescription>
              {cartCount > 0 ? `${cartCount} товар(ов)` : 'Корзина пуста'}
            </DialogDescription>
          </DialogHeader>

          {cart.length > 0 ? (
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-4">
                {cart.map((item) => (
                  <Card key={item.id} className="glass-effect p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.storage} • {item.color}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Количество: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <p className="text-xl font-bold text-primary">
                          {(item.price * item.quantity).toLocaleString()} ₽
                        </p>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div className="py-12 text-center text-muted-foreground">
              <Icon name="ShoppingCart" size={48} className="mx-auto mb-4 opacity-50" />
              <p>Ваша корзина пуста</p>
            </div>
          )}

          {cart.length > 0 && (
            <div className="space-y-4 pt-4 border-t border-border">
              <div className="flex items-center justify-between text-2xl font-bold">
                <span>Итого:</span>
                <span className="text-primary">{getTotalPrice().toLocaleString()} ₽</span>
              </div>
              <Button size="lg" className="w-full text-lg hover-scale">
                <Icon name="CreditCard" size={20} className="mr-2" />
                Оформить заказ
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;