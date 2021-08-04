import useCameraPermissions from "../hooks/useCameraPermissions";
/*
> ios: Will permission be prompted if never grant before 
> UX: when accessing via desktop browser disable camera upload // inform user to access via mobile

deskcheck
> finding opera android does not support html input capture camera only, should we not allow user to use opera on mobile?
> will we need to sniff the user browser to display them different information? which are the browser we should support
> iOS Safari always allow camera access for html input capture, should we explictly request for camera permission? 
> iOS request for permission during getUserMedia.
*/

type DeviceTypeProps = "iPhone" | "Android" | "Browser" | null;

const PermissionPage = (): JSX.Element => {
  const { hasPermission, device, ios, android, debugTools } =
    useCameraPermissions();
  return (
    <div>
      <h1>Permission Page</h1>
      <h4>Detected Device: {device}</h4>
      <h4>
        Android User Permission: {android.cameraAccess ? "true" : "false"}
      </h4>
      <h4>IOS Camera Permissions: {ios.cameraAccess ? "true" : "false"}</h4>
      {hasPermission ? (
        <p>
          Permission given: <input type="file" accept="image/*" />
        </p>
      ) : (
        <p>Permission not given to access camera</p>
      )}
      <hr />
      <h2>Debugger</h2>
      <h4>Browser Detection Method: {debugTools.detectMethod}</h4>
      <h4>Navigator Detection Method: {debugTools.navigator}</h4>
      <h4>Error: {debugTools.error}</h4>
    </div>
  );
};

export default PermissionPage;
