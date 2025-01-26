"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

function AuthForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [verificationCode, setVerificationCode] = useState("");
  const [needsVerification, setNeedsVerification] = useState(false);
  const [selectedRole, setSelectedRole] = useState("individual");
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    companySize: "",
  });

  const tabs = [
    { id: 'individual', label: 'Individual' },
    { id: 'company', label: 'Company' },
    {id: '3', label: '33'},
    {id: '4', label: '44'},
    {id: '5', label: '55'},
    {id: '6', label: '66'},
    {id: '7', label: '77'},
    {id: '8', label: '88'},
    {id: '9', label: '99'},
    {id: '10', label: '1010'},
  ];
  
  const [selectedTabs, setSelectedTabs] = useState(
    Object.fromEntries(tabs.map(tab => [tab.id, false]))
  );

  async function onSubmit(type) {
    setIsLoading(true);
    try {
      if (type === "login") {
        // Handle login logic here
        await signIn({
          username: formData.email,
          password: formData.password,
        });
        toast({
          title: "Success",
          description: "Logged in successfully",
        });
      } else {
        // Handle register logic here
        await signUp({
          username: formData.email,
          password: formData.password,
          attributes: {
            email: formData.email,
          },
        });
        setNeedsVerification(true);
        toast({
          title: "Verification Required",
          description: "Please check your email for verification code",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleVerification(e) {
    e.preventDefault();
    setIsLoading(true);
    try {
      await confirmSignUp({
        username: formData.email,
        code: verificationCode,
      });
      setNeedsVerification(false);
      toast({
        title: "Success",
        description: "Email verified successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (needsVerification) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Verify Your Email</CardTitle>
            <CardDescription>
              Enter the verification code sent to your email
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="verificationCode">Verification Code</Label>
                <Input
                  id="verificationCode"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              className="w-full" 
              onClick={handleVerification}
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Verify"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Authentication</CardTitle>
          <CardDescription>
            Login or create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button 
              className="w-1/2" 
              variant={isLogin ? "default" : "outline"}
              onClick={() => setIsLogin(true)}
            >
              Login
            </Button>
            <Button 
              className="w-1/2" 
              variant={!isLogin ? "default" : "outline"}
              onClick={() => setIsLogin(false)}
            >
              Register
            </Button>
          </div>

          {isLogin ? (
            <div className="mt-6 space-y-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
              <Button 
                className="w-full mt-2" 
                onClick={() => onSubmit("login")}
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              />
            </div>

            <div className="w-full">
                <div className="grid w-full grid-cols-2 gap-4">
                    {tabs.map((tab) => (
                    <Button
                        key={tab.id}
                        variant="outline"
                        className={`w-full ${selectedTabs[tab.id] ? 'bg-primary text-primary-foreground' : ''}`}
                        onClick={() => setSelectedTabs(prev => ({
                        ...prev,
                        [tab.id]: !prev[tab.id]
                        }))}
                    >
                        {tab.label}
                    </Button>
                    ))}
                </div>
            </div>


            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="registerPassword">Password</Label>
              <Input
                id="registerPassword"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              />
            </div>
            <Button 
              className="w-full mt-2" 
              onClick={() => onSubmit("register")}
              disabled={isLoading}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  </div>
  );
}

export default AuthForm;
