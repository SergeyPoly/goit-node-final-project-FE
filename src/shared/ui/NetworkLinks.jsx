import { Button } from './Button';

export const NetworkLinks = () => (
  <div className="flex gap-4">
    <Button
      variant="icon"
      iconName="facebook-icon"
      iconClass="w-5 h-5"
      external
      href="https://www.facebook.com/goITclub/"
      iconVisualHiddenText="Share on Facebook"
    />
    <Button
      variant="icon"
      iconName="instagram-icon"
      iconClass="w-5 h-5"
      external
      href="https://www.instagram.com/goitclub/"
      iconVisualHiddenText="Share on Instagram"
    />
    <Button
      variant="icon"
      iconName="youtube-icon"
      iconClass="w-5 h-5"
      external
      href="https://www.youtube.com/c/GoIT"
      iconVisualHiddenText="Share on YouTube"
    />
  </div>
);
