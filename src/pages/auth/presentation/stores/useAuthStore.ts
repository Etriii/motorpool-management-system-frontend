import { defineStore } from "pinia";
import { AuthRemoteDataSourceImpl } from "../../data/datasources/AuthRemoteDataSource";
import { AuthLocalDataSourceImpl } from "../../data/datasources/AuthLocalDataSource";
import { AuthRepositoryImpl } from "../../data/repositories/auth_repository_impl";
import { LoginUseCase } from "../../domain/usecases/login_usecase";
import { GoogleLoginUseCase } from "../../domain/usecases/google_login_usecase";
import type { MockUser } from "@pages/auth/domain/entities/user_entity";

const remote = new AuthRemoteDataSourceImpl();
const local = new AuthLocalDataSourceImpl();
const repo = new AuthRepositoryImpl(remote, local);

const loginUseCase = new LoginUseCase(repo);
const googleLoginUseCase = new GoogleLoginUseCase(repo);

export const mock_users: MockUser[] = [
  { username: "admin", password: "123456", role: "admin", profile: "https://www.clipartmax.com/png/middle/319-3191274_male-avatar-admin-profile.png" },
  { username: "advisor", password: "123456", role: "advisor", profile: "https://cdn.vectorstock.com/i/500p/84/68/hipster-man-in-glasses-avatar-profile-userpic-vector-8988468.jpg" },
  { username: "driver", password: "123456", role: "driver", profile: "" },
  { username: "passenger", password: "123456", role: "passenger", profile: "https://png.pngtree.com/png-clipart/20241024/original/pngtree-administrator-admin-avatar-png-image_16497209.png" },
];

export const useAuthStore = defineStore("auth", {
  state: () => ({
    loading: false,
    error: "",
    user: null as MockUser | null,
    initialized: false,
  }),
  getters: {
    getCurrentUser(): any {
      return this.user ?? []
    }
  },
  actions: {
    async initialize() {
      try {
        if (this.initialized) return;
        // this.user = await repo.getCurrentUser(); shall not initialize yet since were not using token for the meantime
        const storedUser = localStorage.getItem('user');
        this.user = storedUser ? JSON.parse(storedUser) : null;
      } catch {
        this.user = null;
      } finally {
        this.initialized = true;
      }
    },
    async login(username: string, password: string) {
      this.loading = true;
      try {
        // await loginUseCase.execute(username, password);
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        const user = mock_users.find(
          (u) => u.username === username && u.password === password
        );

        if (!user) {
          // alert("Invalid credential");
          throw new Error("Invalid credential")
        }
        // this.user = await repo.getCurrentUser();
        this.user = user;
        localStorage.setItem('user', JSON.stringify(user))
      } catch (e: any) {
        this.error = e.message;
        throw e;
      } finally {
        this.loading = false;
      }
    },
    async loginWithGoogle(token: string) {
      this.loading = true;
      try {
        await googleLoginUseCase.execute(token);
        // this.user = await repo.getCurrentUser();
      } catch (e: any) {
        this.error = "Google login failed";
        throw e;
      } finally {
        this.loading = false;
      }
    },
    async logout() {
      await repo.logout();
      this.user = null;
      this.initialized = false;
    },
  },
});
