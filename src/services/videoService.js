import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://taodejcylfdlsgnphgid.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRhb2RlamN5bGZkbHNnbnBoZ2lkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgyODk4OTIsImV4cCI6MTk4Mzg2NTg5Mn0.VCryNE2jt1XoYOVO-5C9nVDXSCq9Wjitk5R1R2tw-3k";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("video")
                    .select("*");
        }
    }
}