import { gql } from '@apollo/client'

// Auth Queries
export const ME_QUERY = gql`
  query Me {
    me {
      id
      username
      email
      role
      isAdmin
      isStaffMember
    }
  }
`

// Dashboard Queries
export const DASHBOARD_QUERY = gql`
  query Dashboard {
    me {
      id
      username
      email
      role
      isAdmin
      isStaffMember
    }
    orderStats {
      totalOrders
      pendingOrders
      preparingOrders
      readyOrders
      completedOrders
      cancelledOrders
      totalRevenue
      todayOrders
      todayRevenue
    }
    recentOrders(limit: 10) {
      id
      orderNumber
      customerName
      status
      statusDisplay
      orderType
      orderTypeDisplay
      total
      createdAt
    }
  }
`

// Orders Queries
export const ORDERS_QUERY = gql`
  query Orders($status: String, $orderType: String, $dateFrom: Date, $dateTo: Date, $limit: Int) {
    orders(status: $status, orderType: $orderType, dateFrom: $dateFrom, dateTo: $dateTo, limit: $limit) {
      id
      orderNumber
      customerName
      customerPhone
      orderType
      orderTypeDisplay
      status
      statusDisplay
      total
      createdAt
      items {
        productName
        quantity
      }
    }
  }
`

export const ORDER_DETAIL_QUERY = gql`
  query OrderDetail($id: ID!) {
    order(orderId: $id) {
      id
      orderNumber
      customerName
      customerEmail
      customerPhone
      orderType
      orderTypeDisplay
      status
      statusDisplay
      orderNotes
      deliveryAddress
      deliveryInstructions
      subtotal
      deliveryFee
      discountCode
      discountAmount
      total
      items {
        productName
        productId
        isCombo
        includedItems
        sizeName
        selectedToppings
        quantity
        unitPrice
        subtotal
      }
      createdAt
      updatedAt
      completedAt
    }
  }
`

// Products Queries
export const PRODUCTS_QUERY = gql`
  query Products {
    allProducts {
      id
      name
      basePrice
      averageRating
      ratingCount
      prepTimeDisplay
      isAvailable
      isFeatured
      imageUrl
      category {
        id
        name
      }
      tags {
        id
        name
        color
      }
    }
    allCategories {
      id
      name
    }
    allTags {
      id
      name
    }
  }
`

export const PRODUCT_EDITOR_QUERY = gql`
  query ProductEditor($id: ID) {
    product(id: $id) {
      id
      name
      shortDescription
      description
      basePrice
      category {
        id
        name
      }
      tags {
        id
        name
      }
      ingredients {
        id
        name
        icon
      }
      availableSizes {
        id
        name
        category
        priceModifier
      }
      availableToppings {
        id
        name
        price
      }
      includedItems {
        id
        name
      }
      isAvailable
      isFeatured
      isCombo
      prepTimeMin
      prepTimeMax
      calories
      imageUrl
      averageRating
      ratingCount
    }
    allCategories {
      id
      name
    }
    allTags {
      id
      name
      slug
      color
    }
    allIngredients {
      id
      name
      icon
    }
    allSizes {
      id
      name
      category
      priceModifier
      displayOrder
    }
    allToppings {
      id
      name
      price
    }
    allIncludedItems {
      id
      name
    }
  }
`

// Categories, Tags, etc. Queries
export const CATEGORIES_QUERY = gql`
  query {
    allCategories {
      id
      name
      slug
      description
      createdAt
    }
  }
`

export const TAGS_QUERY = gql`
  query {
    allTags {
      id
      name
      slug
      color
    }
  }
`

export const INGREDIENTS_QUERY = gql`
  query {
    allIngredients {
      id
      name
      icon
    }
  }
`

export const SIZES_QUERY = gql`
  query {
    allSizes {
      id
      name
      category
      priceModifier
      displayOrder
    }
  }
`

export const TOPPINGS_QUERY = gql`
  query {
    allToppings {
      id
      name
      price
      createdAt
    }
  }
`

export const INCLUDED_ITEMS_QUERY = gql`
  query {
    allIncludedItems {
      id
      name
    }
  }
`

export const PROMOTIONS_QUERY = gql`
  query {
    allPromotions {
      id
      code
      name
      discountDisplay
      discountType
      discountValue
      minimumOrderAmount
      maximumDiscount
      usageLimit
      timesUsed
      isActive
      validFrom
      validUntil
    }
  }
`

export const STORE_SETTINGS_QUERY = gql`
  query {
    storeSettings {
      storeName
      storePhone
      storeEmail
      storeAddress
      businessHours
      acceptOrders
      deliveryEnabled
      pickupEnabled
      orderNotesEnabled
      deliveryFee
      freeDeliveryThreshold
      minimumOrderAmount
      deliveryRadiusKm
      estimatedDeliveryTime
      estimatedPickupTime
      taxRate
      taxIncludedInPrices
    }
  }
`

export const TEAM_QUERY = gql`
  query {
    allUsers {
      id
      username
      email
      role
      isActive
      dateJoined
      createdAt
    }
    teamStats {
      totalUsers
      adminsCount
      staffCount
      activeUsers
      inactiveUsers
    }
  }
`

export const REVIEWS_QUERY = gql`
  query Reviews($productId: ID) {
    productReviews(productId: $productId) {
      id
      customerName
      customerEmail
      rating
      comment
      isApproved
      createdAt
      product {
        id
        name
      }
    }
  }
`

