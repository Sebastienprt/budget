import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Switch } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const avatars = [
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400',
];

const badges = [
  { emoji: '🏆', name: 'Champion d\'épargne', description: 'A atteint tous ses objectifs pendant 3 mois' },
  { emoji: '⭐️', name: 'Étoile montante', description: '5 quêtes quotidiennes accomplies' },
  { emoji: '🎯', name: 'Expert en budget', description: 'Budget respecté pendant 1 mois' },
  { emoji: '💰', name: 'Investisseur', description: 'Premier investissement réalisé' },
];

const statistics = [
  { title: 'Niveau', value: '12', icon: 'star' },
  { title: 'XP Total', value: '2450', icon: 'trophy' },
  { title: 'Quêtes', value: '24/30', icon: 'checkmark-circle' },
  { title: 'Économies', value: '1250 €', icon: 'trending-up' },
];

export default function ProfileScreen() {
  const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [collaborationEnabled, setCollaborationEnabled] = useState(true);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profil</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={24} color="#1E293B" />
        </TouchableOpacity>
      </View>

      <View style={styles.avatarSection}>
        <Image source={{ uri: selectedAvatar }} style={styles.mainAvatar} />
        <Text style={styles.username}>Thomas Dubois</Text>
        <Text style={styles.email}>thomas.dubois@example.com</Text>
      </View>

      <View style={styles.avatarSelection}>
        <Text style={styles.sectionTitle}>Changer d'avatar</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.avatarList}>
          {avatars.map((avatar, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedAvatar(avatar)}
              style={[
                styles.avatarOption,
                selectedAvatar === avatar && styles.selectedAvatarOption,
              ]}>
              <Image source={{ uri: avatar }} style={styles.avatarImage} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.statsGrid}>
        {statistics.map((stat, index) => (
          <View key={index} style={styles.statCard}>
            <Ionicons name={stat.icon} size={24} color="#6366F1" />
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statTitle}>{stat.title}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Badges obtenus</Text>
        {badges.map((badge, index) => (
          <View key={index} style={styles.badgeCard}>
            <View style={styles.badgeEmoji}>
              <Text style={styles.badgeEmojiText}>{badge.emoji}</Text>
            </View>
            <View style={styles.badgeInfo}>
              <Text style={styles.badgeName}>{badge.name}</Text>
              <Text style={styles.badgeDescription}>{badge.description}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Paramètres</Text>
        <View style={styles.settingCard}>
          <View style={styles.settingRow}>
            <Ionicons name="notifications-outline" size={24} color="#1E293B" />
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Notifications</Text>
              <Text style={styles.settingDescription}>Alertes de dépenses et objectifs</Text>
            </View>
            <Switch
              value={notificationsEnabled}
              onValueChange={setNotificationsEnabled}
              trackColor={{ false: '#E2E8F0', true: '#818CF8' }}
              thumbColor={notificationsEnabled ? '#6366F1' : '#CBD5E1'}
            />
          </View>
        </View>

        <View style={styles.settingCard}>
          <View style={styles.settingRow}>
            <Ionicons name="people-outline" size={24} color="#1E293B" />
            <View style={styles.settingInfo}>
              <Text style={styles.settingTitle}>Mode collaboratif</Text>
              <Text style={styles.settingDescription}>Partage de budget avec d'autres</Text>
            </View>
            <Switch
              value={collaborationEnabled}
              onValueChange={setCollaborationEnabled}
              trackColor={{ false: '#E2E8F0', true: '#818CF8' }}
              thumbColor={collaborationEnabled ? '#6366F1' : '#CBD5E1'}
            />
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton}>
        <Ionicons name="log-out-outline" size={24} color="#EF4444" />
        <Text style={styles.logoutText}>Se déconnecter</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  mainAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  username: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#64748B',
  },
  avatarSelection: {
    padding: 16,
  },
  avatarList: {
    flexDirection: 'row',
    paddingVertical: 16,
  },
  avatarOption: {
    marginRight: 16,
    borderRadius: 40,
    padding: 2,
  },
  selectedAvatarOption: {
    backgroundColor: '#6366F1',
  },
  avatarImage: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 16,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E293B',
    marginTop: 8,
  },
  statTitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 16,
  },
  badgeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  badgeEmoji: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeEmojiText: {
    fontSize: 24,
  },
  badgeInfo: {
    flex: 1,
    marginLeft: 12,
  },
  badgeName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  badgeDescription: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 2,
  },
  settingCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  settingInfo: {
    flex: 1,
    marginLeft: 12,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  settingDescription: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEE2E2',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    marginBottom: 32,
  },
  logoutText: {
    color: '#EF4444',
    fontWeight: '600',
    marginLeft: 8,
  },
});
