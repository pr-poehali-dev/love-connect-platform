import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';

interface WelcomeScreenProps {
  onLogin: (user: any) => void;
}

export default function WelcomeScreen({ onLogin }: WelcomeScreenProps) {
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleLogin = () => {
    if (!agreedToTerms) return;
    
    const user = {
      id: Date.now(),
      name: name || 'Пользователь',
      email: email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      color: '#0EA5E9',
      description: 'Новый пользователь на Alex CA'
    };
    
    onLogin(user);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 md:p-12 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-lilita text-[#1A1F2C] mb-4">
            Alex CA
          </h1>
          <div className="flex justify-center mb-6">
            <Icon name="Heart" size={48} className="text-[#0EA5E9]" />
          </div>
        </div>

        <div className="space-y-4 mb-8 text-gray-700">
          <p className="text-lg leading-relaxed">
            Добро пожаловать на Alex CA — современную платформу для знакомств и общения!
          </p>
          <div className="space-y-2">
            <div className="flex items-start gap-3">
              <Icon name="Users" size={20} className="text-[#0EA5E9] mt-1 flex-shrink-0" />
              <p>Знакомьтесь с интересными людьми со всего мира</p>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="MessageCircle" size={20} className="text-[#33C3F0] mt-1 flex-shrink-0" />
              <p>Общайтесь в личных чатах и публичных постах</p>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="Globe" size={20} className="text-[#0EA5E9] mt-1 flex-shrink-0" />
              <p>Поддержка 18 языков для комфортного общения</p>
            </div>
            <div className="flex items-start gap-3">
              <Icon name="Shield" size={20} className="text-[#33C3F0] mt-1 flex-shrink-0" />
              <p>Безопасная среда с автоматической модерацией контента</p>
            </div>
          </div>
        </div>

        <Button
          onClick={() => setShowLoginDialog(true)}
          className="w-full font-lilita text-lg py-6 bg-[#0EA5E9] hover:bg-[#0EA5E9]/90 text-white"
          size="lg"
        >
          Войти
        </Button>
      </div>

      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-lilita text-2xl">Вход в Alex CA</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Имя</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Введите ваше имя"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@mail.com"
                className="mt-1"
              />
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              />
              <label
                htmlFor="terms"
                className="text-sm text-gray-600 leading-tight cursor-pointer"
              >
                Я согласен с{' '}
                <span
                  className="text-[#0EA5E9] hover:underline cursor-pointer"
                  onClick={() => setShowTerms(true)}
                >
                  правилами и условиями использования
                </span>
              </label>
            </div>

            <Button
              onClick={handleLogin}
              disabled={!agreedToTerms || !email || !name}
              className="w-full font-lilita bg-[#0EA5E9] hover:bg-[#0EA5E9]/90"
            >
              Продолжить
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showTerms} onOpenChange={setShowTerms}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-lilita text-2xl">Правила использования</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 text-sm text-gray-700">
            <h3 className="font-bold text-lg">Запрещено публиковать:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>18+ контент в постах и комментариях</li>
              <li>Материалы про войну и политику</li>
              <li>Рекламу казино и букмекерских контор</li>
              <li>Оскорбления и угрозы другим пользователям</li>
            </ul>

            <h3 className="font-bold text-lg">Разрешено:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Обсуждение интимных тем в личных чатах (в меру)</li>
              <li>Дружеское общение и знакомства</li>
            </ul>

            <h3 className="font-bold text-lg">Система наказаний:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>1-е нарушение: мьют на 5 минут</li>
              <li>2-е нарушение: бан на 1 день</li>
              <li>3-е нарушение: удаление аккаунта без возможности восстановления</li>
            </ul>

            <p className="text-gray-600 italic">
              Соблюдая эти правила, вы помогаете создать безопасную и дружелюбную атмосферу для всех пользователей!
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
