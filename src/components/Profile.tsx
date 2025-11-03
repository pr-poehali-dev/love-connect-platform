import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface ProfileProps {
  currentUser: any;
}

const LANGUAGES = [
  { code: 'ru', name: 'Русский' },
  { code: 'en', name: 'English' },
  { code: 'be', name: 'Беларуская' },
  { code: 'uk', name: 'Українська' },
  { code: 'it', name: 'Italiano' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'ar', name: 'العربية' },
  { code: 'zh', name: '中文' },
  { code: 'ko', name: '한국어' },
  { code: 'ja', name: '日本語' },
  { code: 'pt', name: 'Português' },
  { code: 'nl', name: 'Nederlands' },
  { code: 'sr', name: 'Српски' },
  { code: 'kk', name: 'Қазақша' },
  { code: 'mn', name: 'Монгол' },
  { code: 'hi', name: 'हिन्दी' }
];

const COLORS = [
  { name: 'Синий', value: '#0EA5E9' },
  { name: 'Голубой', value: '#33C3F0' },
  { name: 'Лазурный', value: '#D3E4FD' },
  { name: 'Фиолетовый', value: '#8B5CF6' },
  { name: 'Розовый', value: '#EC4899' },
  { name: 'Зелёный', value: '#10B981' }
];

export default function Profile({ currentUser }: ProfileProps) {
  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.description);
  const [color, setColor] = useState(currentUser.color);
  const [language, setLanguage] = useState('ru');
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleSave = () => {
    toast.success('Профиль обновлен!');
    setIsEditOpen(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <Card className="border-[#0EA5E9]/30 shadow-lg">
        <CardHeader className="text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Avatar className="w-32 h-32" style={{ borderColor: color, borderWidth: '4px' }}>
                <AvatarImage src={currentUser.avatar} />
                <AvatarFallback className="text-3xl">{currentUser.name[0]}</AvatarFallback>
              </Avatar>
              <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 rounded-full w-10 h-10 p-0 bg-[#0EA5E9] hover:bg-[#0EA5E9]/90"
                  >
                    <Icon name="Pencil" size={16} />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle className="font-lilita text-2xl">Редактировать профиль</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Имя</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Описание</Label>
                      <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="mt-1 min-h-[100px]"
                      />
                    </div>

                    <div>
                      <Label>Цвет профиля</Label>
                      <div className="flex gap-2 mt-2">
                        {COLORS.map(c => (
                          <button
                            key={c.value}
                            onClick={() => setColor(c.value)}
                            className={`w-10 h-10 rounded-full transition-transform ${
                              color === c.value ? 'ring-4 ring-offset-2 ring-gray-400 scale-110' : ''
                            }`}
                            style={{ backgroundColor: c.value }}
                            title={c.name}
                          />
                        ))}
                      </div>
                    </div>

                    <Button
                      onClick={handleSave}
                      className="w-full font-lilita bg-[#0EA5E9] hover:bg-[#0EA5E9]/90"
                    >
                      Сохранить
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <div>
              <CardTitle className="font-lilita text-3xl mb-2">{name}</CardTitle>
              <p className="text-gray-600">{description}</p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Card className="border-[#0EA5E9]/30 shadow-lg">
        <CardHeader>
          <CardTitle className="font-lilita text-xl flex items-center gap-2">
            <Icon name="Globe" size={24} />
            Язык интерфейса
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map(lang => (
                <SelectItem key={lang.code} value={lang.code}>
                  {lang.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm text-gray-500 mt-2">
            Изменение языка применится ко всему интерфейсу сайта
          </p>
        </CardContent>
      </Card>

      <Card className="border-[#0EA5E9]/30 shadow-lg">
        <CardHeader>
          <CardTitle className="font-lilita text-xl flex items-center gap-2">
            <Icon name="BarChart3" size={24} />
            Статистика
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-gradient-to-br from-[#0EA5E9]/10 to-[#33C3F0]/10 rounded-lg">
              <p className="text-3xl font-bold text-[#0EA5E9]">12</p>
              <p className="text-sm text-gray-600">Постов</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-[#33C3F0]/10 to-[#D3E4FD]/10 rounded-lg">
              <p className="text-3xl font-bold text-[#33C3F0]">48</p>
              <p className="text-sm text-gray-600">Друзей</p>
            </div>
            <div className="p-4 bg-gradient-to-br from-[#D3E4FD]/10 to-[#0EA5E9]/10 rounded-lg">
              <p className="text-3xl font-bold text-[#0EA5E9]">156</p>
              <p className="text-sm text-gray-600">Лайков</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-[#0EA5E9]/30 shadow-lg">
        <CardHeader>
          <CardTitle className="font-lilita text-xl flex items-center gap-2">
            <Icon name="Shield" size={24} />
            Безопасность
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center gap-2">
              <Icon name="CheckCircle" size={20} className="text-green-600" />
              <span className="text-sm">Нет нарушений</span>
            </div>
          </div>
          <p className="text-xs text-gray-500">
            Ваш аккаунт в безопасности. Продолжайте соблюдать правила сообщества!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
