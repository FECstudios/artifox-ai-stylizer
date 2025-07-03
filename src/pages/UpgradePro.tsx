
import { useAuth } from "@/hooks/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UpgradePro = () => {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
          Upgrade to Pro
        </h1>
        <p className="text-xl text-muted-foreground mt-4">
          Unlock the full potential of Artifox with a Pro account.
        </p>
      </div>

      {user && (
        <div className="max-w-md mx-auto mt-12">
          <Card>
            <CardHeader>
              <CardTitle>Your Information</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={user.user_metadata.avatar_url} />
                <AvatarFallback>
                  {user.user_metadata.full_name?.[0] || user.email?.[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{user.user_metadata.full_name}</p>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default UpgradePro;
