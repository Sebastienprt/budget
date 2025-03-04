import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Quest {
  id: string;
  title: string;
  description: string;
  reward: number;
  progress: number;
  total: number;
  icon: string;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  completed: boolean;
}

const dailyQuests: Quest[] = [
  {
    id: '1',
    title: 'Économe du jour',
    description: 'Dépensez moins de 20€ aujourd\'hui',
    reward: 100,
    progress: 15,
    total: 20,
    icon: 'wallet',
  },
  {
    id: '2',
    title: 'Catégorisation parfaite',
    description: 'Catégorisez toutes vos dépenses du jour',
    reward: 50,
    progress: 5,
    total: 5,
    icon: 'list',
  },
];

const weeklyQuests: Quest[] = [
  {
    id: '3',
    title: 'Objectif épargne',
    description: 'Épargnez 100€ cette semaine',
    reward: 200,
    progress: 75,
    total: 100,
    icon: 'trending-up',
  },
];

const achievements: Achievement[] = [
  {
    id: '1',
    title: 'Premier pas',
    description: 'Créez votre premier objectif d\'épargne',
    icon: 'trophy',
    completed: true,
  },
  {
    id: '2',
    title: 'Expert en budget',
    description: 'Respectez votre budget 3 mois de suite',
    icon: 'star',
    completed: false,
  },
];

export default function QuestsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Quêtes</Text>
        <View style={styles.levelContainer}>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>Niveau 12</Text>
          </View>
          <View style={styles.xpContainer}>
            <View style={[styles.xpProgress, { width: '70%' }]} />
            <Text style={styles.xpText}>350/500 XP</Text>
          </View>
        </View>
      </View>

      <View style={styles.avatarSection}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=400' }}
          style={styles.avatar}
        />
        <View style={styles.badgesContainer}>
          {['🏆', '⭐️', '🎯', '💰'].map((badge, index) => (
            <View key={index} style={styles.badge}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quêtes quotidiennes</Text>
        {dailyQuests.map((quest) => (
          <View key={quest.id} style={styles.questCard}>
            <View style={styles.questHeader}>
              <View style={styles.questIconContainer}>
                <Ionicons name={quest.icon as any} size={24} color="#6366F1" />
              </View>
              <View style={styles.questInfo}>
                <Text style={styles.questTitle}>{quest.title}</Text>
                <Text style={styles.questDescription}>{quest.description}</Text>
              </View>
              <View style={styles.rewardContainer}>
                <Text style={styles.rewardText}>+{quest.reward} XP</Text>
              </View>
            </View>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progress, 
                    { width: `${(quest.progress / quest.total) * 100}%` }
                  ]} 
                />
              </View>
              <Text style={styles.progressText}>
                {quest.progress}/{quest.total}
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quêtes hebdomadaires</Text>
        {weeklyQuests.map((quest) => (
          <View key={quest.id} style={styles.questCard}>
            <View style={styles.questHeader}>
              <View style={styles.questIconContainer}>
                <Ionicons name={quest.icon as any} size={24} color="#6366F1" />
              </View>
              <View style={styles.questInfo}>
                <Text style={styles.questTitle}>{quest.title}</Text>
                <Text style={styles.questDescription}>{quest.description}</Text>
              </View>
              <View style={styles.rewardContainer}>
                <Text style={styles.rewardText}>+{quest.reward} XP</Text>
              </View>
            </View>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progress, 
                    { width: `${(quest.progress / quest.total) * 100}%` }
                  ]} 
                />
              </View>
              <Text style={styles.progressText}>
                {quest.progress}/{quest.total} €
              </Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Succès</Text>
        {achievements.map((achievement) => (
          <View 
            key={achievement.id} 
            style={[
              styles.achievementCard,
              achievement.completed && styles.achievementCompleted
            ]}
          >
            <View style={styles.achievementIcon}>
              <Ionicons 
                name={achievement.icon as any} 
                size={24} 
                color={achievement.completed ? '#10B981' : '#64748B'} 
              />
            </View>
            <View style={styles.achievementInfo}>
              <Text style={styles.achievementTitle}>{achievement.title}</Text>
              <Text style={styles.achievementDescription}>
                {achievement.description}
              </Text>
            </View>
            {achievement.completed && (
              <Ionicons name="checkmark-circle" size={24} color="#10B981" />
            )}
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
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
  levelContainer: {
    marginTop: 12,
  },
  levelBadge: {
    backgroundColor: '#818CF8',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  levelText: {
    color: '#fff',
    fontWeight: '600',
  },
  xpContainer: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
    position: 'relative',
  },
  xpProgress: {
    position: 'absolute',
    height: '100%',
    backgroundColor: '#818CF8',
  },
  xpText: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    fontSize: 12,
    color: '#1E293B',
    top: 12,
  },
  avatarSection: {
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  badgesContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  badgeText: {
    fontSize: 20,
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
  questCard: {
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
  questHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  questIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  questInfo: {
    flex: 1,
    marginLeft: 12,
  },
  questTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  questDescription: {
    color: '#64748B',
    marginTop: 2,
  },
  rewardContainer: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  rewardText: {
    color: '#6366F1',
    fontWeight: '600',
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E2E8F0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#6366F1',
    borderRadius: 4,
  },
  progressText: {
    color: '#64748B',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'right',
  },
  achievementCard: {
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
  achievementCompleted: {
    backgroundColor: '#F0FDF4',
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  achievementInfo: {
    flex: 1,
    marginLeft: 12,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  achievementDescription: {
    color: '#64748B',
    marginTop: 2,
  },
});
