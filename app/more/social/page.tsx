"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BottomNav } from "@/components/bottom-nav";
import { AgentAvatar } from "@/components/agent-avatar";
import { StatusBadge } from "@/components/status-badge";
import { toast } from "sonner";
import { cn, getPlatformColor, formatDate } from "@/lib/utils";
import { socialPosts, teamMembers, type PostStatus } from "@/lib/data";

const statusFilters: (PostStatus | "All")[] = ["All", "Idea", "Draft", "Scheduled", "Published"];
const platforms = ["Instagram Post", "Instagram Reel", "Facebook Post", "LinkedIn Post", "Story"];
const postStatuses: PostStatus[] = ["Idea", "Draft", "Scheduled", "Published"];

export default function SocialPage() {
  const router = useRouter();
  const [statusFilter, setStatusFilter] = useState<PostStatus | "All">("All");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<typeof socialPosts[0] | null>(null);
  const [newPost, setNewPost] = useState({
    type: "",
    caption: "",
    status: "Draft" as PostStatus,
    scheduledAt: "",
    assignedTo: "",
  });

  const filteredPosts = useMemo(() => {
    return socialPosts.filter((post) => {
      return statusFilter === "All" || post.status === statusFilter;
    });
  }, [statusFilter]);

  const socialMediaManagers = teamMembers.filter(
    (m) => m.role === "Social Media Manager" || m.role === "Admin"
  );

  const handleSaveDraft = () => {
    if (!newPost.type || !newPost.caption) {
      toast.error("Please fill in platform and caption");
      return;
    }
    toast.success("Post saved as draft!");
    setDialogOpen(false);
    setNewPost({
      type: "",
      caption: "",
      status: "Draft",
      scheduledAt: "",
      assignedTo: "",
    });
  };

  const handleMarkPublished = (postId: string) => {
    toast.success("Post marked as published!");
  };
  const handleEditPost = (post: typeof socialPosts[0]) => {
    setEditingPost(post);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    toast.success("Post updated successfully!");
    setEditDialogOpen(false);
    setEditingPost(null);
  };

  const getAssignedPerson = (userId: string) => {
    return teamMembers.find((m) => m.id === userId);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-foreground">Social Media</h1>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-9">
                <Plus className="mr-1 h-4 w-4" />
                New Post
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New Post</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Platform</Label>
                  <Select
                    value={newPost.type}
                    onValueChange={(v) => setNewPost({ ...newPost, type: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      {platforms.map((p) => (
                        <SelectItem key={p} value={p}>
                          {p}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Caption</Label>
                  <Textarea
                    value={newPost.caption}
                    onChange={(e) => setNewPost({ ...newPost, caption: e.target.value })}
                    placeholder="Write your caption..."
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={newPost.status}
                    onValueChange={(v) => setNewPost({ ...newPost, status: v as PostStatus })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {postStatuses.map((s) => (
                        <SelectItem key={s} value={s}>
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Scheduled Date</Label>
                  <Input
                    type="datetime-local"
                    value={newPost.scheduledAt}
                    onChange={(e) => setNewPost({ ...newPost, scheduledAt: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Assign To</Label>
                  <Select
                    value={newPost.assignedTo}
                    onValueChange={(v) => setNewPost({ ...newPost, assignedTo: v })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select person" />
                    </SelectTrigger>
                    <SelectContent>
                      {socialMediaManagers.map((m) => (
                        <SelectItem key={m.id} value={m.id}>
                          {m.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={handleSaveDraft} className="w-full">
                  Save Draft
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </header>

      <main className="p-4">
        {/* Status Filter */}
        <div className="mb-4 overflow-x-auto pb-2">
          <div className="flex gap-2">
            {statusFilters.map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={cn(
                  "shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                  statusFilter === status
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Posts List */}
        {filteredPosts.length > 0 ? (
          <div className="space-y-3">
            {filteredPosts.map((post) => {
              const assignedPerson = getAssignedPerson(post.assignedTo);
              return (
                <Card key={post.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={cn(
                            "rounded-full px-2 py-0.5 text-xs font-medium",
                            getPlatformColor(post.type)
                          )}
                        >
                          {post.type}
                        </span>
                        <StatusBadge status={post.status} />
                      </div>
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm text-foreground">
                      {post.caption}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {assignedPerson && (
                          <>
                            <AgentAvatar name={assignedPerson.name} size="sm" />
                            <span className="text-xs text-muted-foreground">
                              {assignedPerson.name}
                            </span>
                          </>
                        )}
                      </div>
                      {post.scheduledAt && (
                        <span className="text-xs text-muted-foreground">
                          {formatDate(post.scheduledAt)}
                        </span>
                      )}
                    </div>
                    <div className="mt-3 flex gap-2 border-t border-border pt-3">
                      <Button size="sm" variant="outline" className="flex-1" onClick={() => handleEditPost(post)}>
                        Edit
                      </Button>
                      {post.status !== "Published" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleMarkPublished(post.id)}
                        >
                          Mark Published
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
              <Share2 className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mt-4 font-semibold text-foreground">No posts found</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Create your first post to get started
            </p>
          </div>
        )}
      </main>
      {/* Edit Post Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Post</DialogTitle>
          </DialogHeader>
          {editingPost && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Platform</Label>
                <Select
                  value={editingPost.type}
                  onValueChange={(v) => setEditingPost({ ...editingPost, type: v })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {platforms.map((p) => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Caption</Label>
                <Textarea
                  value={editingPost.caption}
                  onChange={(e) => setEditingPost({ ...editingPost, caption: e.target.value })}
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={editingPost.status}
                  onValueChange={(v) => setEditingPost({ ...editingPost, status: v as PostStatus })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {postStatuses.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleSaveEdit} className="w-full">
                Save Changes
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
}
