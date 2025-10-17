# Virtual Museum MVP

A simple web platform where users can create, customize, and share small virtual museum rooms that display digital artworks, photos, or objects.

## 🎯 MVP Features

### Core User Flows

**Creator Flow:**
- Upload images (paintings, artifacts, photos)
- Arrange them in pre-designed virtual gallery templates
- Add short descriptions or captions
- Publish and share via a link

**Visitor Flow:**
- Enter a virtual gallery via a shared link
- Explore the room using simple navigation (click and drag to look around, scroll to zoom)
- View exhibits and read info popups

### Essential Features

| Category | MVP Feature | Status |
|----------|-------------|---------|
| User Accounts | Basic login/signup (optional guest mode) | ✅ Demo Mode |
| Gallery Templates | 2 preset room designs (Classic & Modern) | ✅ Complete |
| Display Items | Upload 2D images with title/description | ✅ Complete |
| Navigation | Simple orbit view with mouse controls | ✅ Complete |
| Sharing | Public URL generation | ✅ Complete |
| Backend | Local storage (demo) | ✅ Demo Mode |

## 🚀 Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:3000`

## 🧩 How to Use

### Creating a Gallery

1. Click "Create Gallery" on the homepage
2. Choose between Classic (white walls) or Modern (dark theme) templates
3. Add exhibits by clicking "Add Exhibit"
4. Upload images and add titles/descriptions
5. Position exhibits using the editor controls
6. Save your gallery

### Viewing a Gallery

1. Click "View Demo" to see a sample gallery
2. Use mouse to look around (click and drag)
3. Scroll to zoom in/out
4. Click on exhibits to view details

### Sharing a Gallery

1. In the gallery builder, click the share button
2. Copy the generated URL
3. Share the link with others

## 🛠️ Technical Stack

- **Frontend:** Next.js 15 with TypeScript
- **3D Visualization:** Three.js with React Three Fiber
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **3D Helpers:** React Three Drei

## 📁 Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Homepage
│   └── gallery/[id]/      # Public gallery viewing
├── components/            # React components
│   ├── VirtualGallery.tsx # Main 3D gallery component
│   ├── GalleryBuilder.tsx # Gallery creation interface
│   ├── GalleryRoom.tsx    # 3D room templates
│   ├── ExhibitFrame.tsx   # Individual artwork display
│   ├── ExhibitEditor.tsx  # Exhibit positioning controls
│   └── ImageUpload.tsx    # File upload component
├── types/                 # TypeScript type definitions
└── lib/                   # Utility functions
```

## 🎨 Gallery Templates

### Classic Template
- Clean white walls and light flooring
- Traditional museum aesthetic
- Soft ambient lighting

### Modern Template
- Dark walls with accent lighting
- Contemporary gallery feel
- Neon accent strips

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Key Components

- **VirtualGallery**: Main 3D scene with Three.js
- **GalleryBuilder**: Side-by-side editor and 3D preview
- **ExhibitFrame**: 3D artwork display with hover effects
- **GalleryRoom**: Room geometry and lighting setup

## 🚀 Deployment

This MVP is ready for deployment on platforms like:
- Vercel (recommended for Next.js)
- Netlify
- Any static hosting service

## 📈 Success Metrics (MVP Validation)

- Number of users who create at least one gallery
- Time spent exploring galleries
- Number of shared links or returning visitors
- User feedback on ease of use

## 🎯 Example Use Cases

1. **Teacher showcasing student artwork** - Upload student pieces and share with parents
2. **Artist portfolio** - Create a virtual exhibition of your work
3. **Museum preview** - Showcase upcoming exhibitions
4. **Photo collection** - Display family photos in a gallery setting

## 🔮 Future Enhancements

- User authentication and accounts
- Database storage (Supabase/Firebase)
- More gallery templates
- 3D model support
- VR/AR compatibility
- Analytics dashboard
- Community features

## 📝 License

MIT License - feel free to use this MVP as a starting point for your own virtual museum platform!
