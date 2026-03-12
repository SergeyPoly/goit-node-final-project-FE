import { Button } from './Button';

export const NetworkLinks = () => (
  <div className="flex gap-4">
    <Button
      variant="icon"
      iconName="facebook-icon"
      iconClass="w-5 h-5"
      href="https://www.facebook.com/goITclub/"
    />
    <Button
      variant="icon"
      iconName="instagram-icon"
      iconClass="w-5 h-5"
      href="https://www.instagram.com/goitclub/"
    />
    <Button
      variant="icon"
      iconName="youtube-icon"
      iconClass="w-5 h-5"
      href="https://www.youtube.com/c/GoIT"
    />
  </div>
);
