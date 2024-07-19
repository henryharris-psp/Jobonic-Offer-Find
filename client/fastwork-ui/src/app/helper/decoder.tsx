export const decodeJWT = (token: string) => {
    // Split the token into its parts
    const parts = token.split('.');
  
    if (parts.length !== 3) {
      throw new Error('Invalid JWT token');
    }
  
    // Decode the base64Url encoded payload
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);
  }
  
  