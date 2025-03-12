import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import UserPage from "./pages/UserPage";
import BookshelfPage from "./pages/BookshelfPage";
import CategoriesPage from "./pages/CategoriesPage";
import RankingPage from "./pages/RankingPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import AdminNovelsPage from "./pages/AdminNovelsPage";
import AdminCategoriesPage from "./pages/AdminCategoriesPage";
import AdminUsersPage from "./pages/AdminUsersPage";
import AdminCommentsPage from "./pages/AdminCommentsPage";
import UserDashboardPage from "./pages/UserDashboardPage";
import NovelReadingPage from "./pages/NovelReadingPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/bookshelf" element={<BookshelfPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/categories/:categoryId" element={<CategoriesPage />} />
          <Route path="/ranking" element={<RankingPage />} />
          
          {/* 管理员路由 */}
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
          <Route path="/admin/novels" element={<AdminNovelsPage />} />
          <Route path="/admin/categories" element={<AdminCategoriesPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/comments" element={<AdminCommentsPage />} />
          
          <Route path="/user/dashboard" element={<UserDashboardPage />} />
          <Route path="/novel/:novelId" element={<NovelReadingPage />} />
          <Route path="/novel/:novelId/chapter/:chapterId" element={<NovelReadingPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
