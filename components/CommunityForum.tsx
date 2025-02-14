"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  timestamp: string;
  replies: number;
}

const mockPosts: ForumPost[] = [
  {
    id: "1",
    title: "First-time donor tips",
    content: "I'm planning to donate blood for the first time. Any advice?",
    author: {
      name: "NewDonor123",
      avatar: "/avatars/newdonor.jpg",
    },
    timestamp: "2023-06-14T14:30:00Z",
    replies: 5,
  },
  {
    id: "2",
    title: "Post-donation care",
    content:
      "What's the best way to take care of yourself after donating blood?",
    author: {
      name: "HealthyHelper",
      avatar: "/avatars/helper.jpg",
    },
    timestamp: "2023-06-13T09:15:00Z",
    replies: 8,
  },
  {
    id: "3",
    title: "Rare blood type support group",
    content: "Any other AB- donors out there? Let's connect!",
    author: {
      name: "RareType",
      avatar: "/avatars/rare.jpg",
    },
    timestamp: "2023-06-12T16:45:00Z",
    replies: 3,
  },
];

export default function CommunityForum() {
  const [posts, setPosts] = useState<ForumPost[]>([]);
  const [newPost, setNewPost] = useState({ title: "", content: "" });

  useEffect(() => {
    // In a real application, this would be an API call
    setPosts(mockPosts);
  }, []);

  const handleNewPost = () => {
    // In a real application, this would be an API call to create a new post
    const post: ForumPost = {
      id: (posts.length + 1).toString(),
      title: newPost.title,
      content: newPost.content,
      author: {
        name: "CurrentUser",
        avatar: "/avatars/current-user.jpg",
      },
      timestamp: new Date().toISOString(),
      replies: 0,
    };
    setPosts([post, ...posts]);
    setNewPost({ title: "", content: "" });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Discussion Board</CardTitle>
        <Dialog>
          <DialogTrigger asChild>
            <Button>New Post</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a New Post</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Post Title"
                value={newPost.title}
                onChange={(e) =>
                  setNewPost({ ...newPost, title: e.target.value })
                }
              />
              <Textarea
                placeholder="Post Content"
                value={newPost.content}
                onChange={(e) =>
                  setNewPost({ ...newPost, content: e.target.value })
                }
              />
              <Button onClick={handleNewPost}>Submit Post</Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="border-b pb-4 last:border-b-0">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage
                    src={post.author.avatar}
                    alt={post.author.name}
                  />
                  <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <h3 className="font-semibold">{post.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Posted by {post.author.name} on{" "}
                    {new Date(post.timestamp).toLocaleString()}
                  </p>
                  <p className="text-sm mb-2">{post.content}</p>
                  <Button variant="link" size="sm">
                    {post.replies} {post.replies === 1 ? "reply" : "replies"}
                  </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
