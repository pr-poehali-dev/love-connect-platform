import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface FeedProps {
  currentUser: any;
  onOpenChat: (user: any) => void;
}

const MOCK_POSTS = [
  {
    id: 1,
    author: {
      id: 2,
      name: 'Мария',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=maria',
      color: '#33C3F0'
    },
    content: 'Привет всем! Очень рада присоединиться к Alex CA. Ищу новых друзей для общения 😊',
    likes: 12,
    comments: [],
    timestamp: '10 минут назад'
  },
  {
    id: 2,
    author: {
      id: 3,
      name: 'Александр',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alex',
      color: '#0EA5E9'
    },
    content: 'Кто хочет обсудить путешествия? Недавно вернулся из Италии, впечатлений море!',
    likes: 24,
    comments: [
      { id: 1, author: 'Елена', text: 'Расскажи подробнее! Очень интересно' }
    ],
    timestamp: '1 час назад'
  }
];

const FORBIDDEN_WORDS = ['война', 'политика', 'казино', '18+', 'ставки'];

export default function Feed({ currentUser, onOpenChat }: FeedProps) {
  const [posts, setPosts] = useState(MOCK_POSTS);
  const [newPost, setNewPost] = useState('');
  const [commentText, setCommentText] = useState<{ [key: number]: string }>({});
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

  const checkContent = (text: string): boolean => {
    const lowerText = text.toLowerCase();
    return FORBIDDEN_WORDS.some(word => lowerText.includes(word));
  };

  const handleCreatePost = () => {
    if (!newPost.trim()) return;

    if (checkContent(newPost)) {
      toast.error('Пост содержит запрещенный контент и отправлен на модерацию');
      setNewPost('');
      return;
    }

    const post = {
      id: Date.now(),
      author: currentUser,
      content: newPost,
      likes: 0,
      comments: [],
      timestamp: 'только что'
    };

    setPosts([post, ...posts]);
    setNewPost('');
    toast.success('Пост опубликован!');
  };

  const handleLike = (postId: number) => {
    if (likedPosts.has(postId)) {
      setLikedPosts(new Set([...likedPosts].filter(id => id !== postId)));
      setPosts(posts.map(p => p.id === postId ? { ...p, likes: p.likes - 1 } : p));
    } else {
      setLikedPosts(new Set([...likedPosts, postId]));
      setPosts(posts.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
    }
  };

  const handleComment = (postId: number) => {
    const text = commentText[postId];
    if (!text?.trim()) return;

    if (checkContent(text)) {
      toast.error('Комментарий содержит запрещенный контент');
      return;
    }

    setPosts(posts.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [...p.comments, { id: Date.now(), author: currentUser.name, text }]
        };
      }
      return p;
    }));

    setCommentText({ ...commentText, [postId]: '' });
    toast.success('Комментарий добавлен!');
  };

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      <Card className="border-[#0EA5E9]/30 shadow-lg">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={currentUser.avatar} />
              <AvatarFallback>{currentUser.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{currentUser.name}</p>
              <p className="text-sm text-gray-500">Что у вас нового?</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="Поделитесь своими мыслями..."
            className="min-h-[100px] resize-none"
          />
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleCreatePost}
            className="w-full font-lilita bg-[#0EA5E9] hover:bg-[#0EA5E9]/90"
          >
            <Icon name="Send" size={18} className="mr-2" />
            Опубликовать
          </Button>
        </CardFooter>
      </Card>

      <div className="space-y-4">
        {posts.map(post => (
          <Card key={post.id} className="border-[#0EA5E9]/30 shadow-lg animate-fade-in">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar
                    className="cursor-pointer hover:ring-2 ring-[#0EA5E9] transition-all"
                    onClick={() => onOpenChat(post.author)}
                  >
                    <AvatarImage src={post.author.avatar} />
                    <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{post.author.name}</p>
                    <p className="text-sm text-gray-500">{post.timestamp}</p>
                  </div>
                </div>
                {post.author.id !== currentUser.id && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onOpenChat(post.author)}
                    className="font-lilita"
                  >
                    Написать
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
            </CardContent>
            <CardFooter className="flex-col gap-3">
              <div className="flex gap-4 w-full">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleLike(post.id)}
                  className={likedPosts.has(post.id) ? 'text-red-500' : ''}
                >
                  <Icon name="Heart" size={18} className="mr-1" />
                  {post.likes}
                </Button>
                <Button variant="ghost" size="sm">
                  <Icon name="MessageCircle" size={18} className="mr-1" />
                  {post.comments.length}
                </Button>
              </div>

              {post.comments.length > 0 && (
                <div className="w-full space-y-2 pt-2 border-t">
                  {post.comments.map(comment => (
                    <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                      <p className="font-semibold text-sm">{comment.author}</p>
                      <p className="text-sm text-gray-700">{comment.text}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-2 w-full">
                <Input
                  value={commentText[post.id] || ''}
                  onChange={(e) => setCommentText({ ...commentText, [post.id]: e.target.value })}
                  placeholder="Написать комментарий..."
                  onKeyPress={(e) => e.key === 'Enter' && handleComment(post.id)}
                />
                <Button
                  size="sm"
                  onClick={() => handleComment(post.id)}
                  className="font-lilita bg-[#0EA5E9] hover:bg-[#0EA5E9]/90"
                >
                  <Icon name="Send" size={16} />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
