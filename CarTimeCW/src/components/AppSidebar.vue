<script setup lang="ts">
import { Home,  Settings, Info, Braces } from "lucide-vue-next"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { PageViews } from "@/lib/Consts";

// Menu items.
const items = [
  {
    title: "Home",
    view: PageViews.Main,
    icon: Home,
  },
  {
    title: "Settings",
    view: PageViews.Settings,
    icon: Settings,
  },
  {
    title: "About",
    view: PageViews.About,
    icon: Info,
  },
];

const emit = defineEmits<{
  (e: 'viewChange', value: PageViews): void;
}>()

function emitNewView(view:PageViews)
{
  //console.log("New View Selected: " + view)
  emit('viewChange', view)
}
</script>

<template>
  <Sidebar>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
              <SidebarMenuItem v-for="item in items" :key="item.title">
                <SidebarMenuButton asChild>
                    <div @click="emitNewView(item.view)">
                      <component :is="item.icon" />
                      <span>{{item.title}}</span>
                </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>
</template>