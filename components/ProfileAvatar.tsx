import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ProfileAvatarProps {
  imageUrl?: string | null;
  name: string;
  size?: number;
  showName?: boolean;
}

export default function ProfileAvatar({ 
  imageUrl, 
  name, 
  size = 40, 
  showName = false 
}: ProfileAvatarProps) {
  // Get initials from name
  const initials = name
    .split(' ')
    .map(part => part.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2);

  // Generate a consistent color based on the name
  const getColorFromName = (name: string) => {
    const colors = [
      '#6366F1', // Indigo
      '#EC4899', // Pink
      '#10B981', // Emerald
      '#F59E0B', // Amber
      '#8B5CF6', // Violet
      '#EF4444', // Red
    ];
    
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    return colors[Math.abs(hash) % colors.length];
  };

  const backgroundColor = getColorFromName(name);

  return (
    <TouchableOpacity 
      style={[
        styles.container,
        Platform.OS === 'web' && styles.webHoverContainer
      ]}
    >
      {imageUrl ? (
        <Image 
          source={{ uri: imageUrl }} 
          style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]} 
        />
      ) : (
        <View 
          style={[
            styles.initialsContainer, 
            { 
              width: size, 
              height: size, 
              borderRadius: size / 2,
              backgroundColor 
            }
          ]}
        >
          <Text style={[styles.initials, { fontSize: size * 0.4 }]}>
            {initials}
          </Text>
        </View>
      )}
      
      {showName && (
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{name}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  webHoverContainer: {
    cursor: 'pointer',
  },
  avatar: {
    borderWidth: 2,
    borderColor: '#fff',
  },
  initialsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  initials: {
    color: '#fff',
    fontWeight: '600',
  },
  nameContainer: {
    position: 'absolute',
    top: '100%',
    right: 0,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 8,
    marginTop: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    zIndex: 10,
  },
  name: {
    color: '#1E293B',
    fontWeight: '500',
    fontSize: 14,
  },
});
